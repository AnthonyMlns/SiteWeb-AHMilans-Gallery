import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: join(__dirname, '..', '.env.local') })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET
const API_TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !DATASET || !API_TOKEN) {
  console.error('Manque les vars d\'env dans .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: API_TOKEN,
  useCdn: false,
})

let keyCounter = 0
function nextKey() { return `k${++keyCounter}` }

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  const frontmatter = {}
  const lines = match[1].split('\n')
  for (const line of lines) {
    const sep = line.indexOf(': ')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    let value = line.slice(sep + 2).trim()
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1)
    }
    if (value === '' || value === 'null') value = null
    else if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (/^\d+$/.test(value)) value = Number(value)
    frontmatter[key] = value
  }
  const body = match[2].trim()
  return { frontmatter, body }
}

function mdToPortableText(md) {
  const blocks = []
  const lines = md.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { i++; continue }
    if (/^## (.+)/.test(line)) {
      blocks.push({ _type: 'block', _key: nextKey(), style: 'h2', children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^## /, '') }], markDefs: [] })
      i++; continue
    }
    if (/^### (.+)/.test(line)) {
      blocks.push({ _type: 'block', _key: nextKey(), style: 'h3', children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^### /, '') }], markDefs: [] })
      i++; continue
    }
    if (/^>\s?/.test(line)) {
      const quoteLines = []
      while (i < lines.length && /^>\s?/.test(lines[i])) { quoteLines.push(lines[i].replace(/^>\s?/, '')); i++ }
      blocks.push({ _type: 'block', _key: nextKey(), style: 'blockquote', children: [{ _type: 'span', _key: nextKey(), marks: [], text: quoteLines.join(' ') }], markDefs: [] })
      continue
    }
    const paraLines = []
    while (i < lines.length && lines[i].trim() !== '' && !/^##/.test(lines[i]) && !/^###/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^[-*]\s/.test(lines[i])) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length > 0) {
      const text = paraLines.join(' ')
      const { children, markDefs } = parseInline(text)
      blocks.push({ _type: 'block', _key: nextKey(), style: 'normal', children, markDefs })
    } else { i++ }
  }
  return blocks
}

function parseInline(text) {
  const children = []
  const markDefs = []
  let remaining = text
  while (remaining.length > 0) {
    const bi = remaining.match(/^\*\*\*(.+?)\*\*\*/)
    if (bi) { children.push({ _type: 'span', _key: nextKey(), marks: ['strong', 'em'], text: bi[1] }); remaining = remaining.slice(bi[0].length); continue }
    const b = remaining.match(/^\*\*(.+?)\*\*/)
    if (b) { children.push({ _type: 'span', _key: nextKey(), marks: ['strong'], text: b[1] }); remaining = remaining.slice(b[0].length); continue }
    const it = remaining.match(/^\*(.+?)\*/)
    if (it) { children.push({ _type: 'span', _key: nextKey(), marks: ['em'], text: it[1] }); remaining = remaining.slice(it[0].length); continue }
    const l = remaining.match(/^\[(.+?)\]\((.+?)\)/)
    if (l) { const mk = nextKey(); children.push({ _type: 'span', _key: nextKey(), marks: [mk], text: l[1] }); markDefs.push({ _key: mk, _type: 'link', href: l[2] }); remaining = remaining.slice(l[0].length); continue }
    const nm = remaining.search(/\*\*\*|\*\*|\*|\[/)
    if (nm === 0) continue
    if (nm === -1) { children.push({ _type: 'span', _key: nextKey(), marks: [], text: remaining }); break }
    else { children.push({ _type: 'span', _key: nextKey(), marks: [], text: remaining.slice(0, nm) }); remaining = remaining.slice(nm) }
  }
  return { children, markDefs }
}

async function importCurates() {
  const dir = join(__dirname, '..', 'content', 'curates')
  if (!existsSync(dir)) {
    console.log('Dossier content/curates/ introuvable')
    return
  }

  const files = readdirSync(dir).filter(f => extname(f) === '.md')
  if (files.length === 0) { console.log('Aucun fichier .md dans content/curates/'); return }

  for (const file of files) {
    const raw = readFileSync(join(dir, file), 'utf-8')
    const parsed = parseFrontmatter(raw)
    if (!parsed) { console.warn(`  ⚠ Frontmatter invalide : ${file}`); continue }
    const { frontmatter, body } = parsed
    if (!frontmatter.title || !frontmatter.slug) { console.warn(`  ⚠ Champs requis manquants : ${file}`); continue }

    const document = {
      _type: 'curate',
      _id: frontmatter.slug,
      title: frontmatter.title,
      slug: { _type: 'slug', current: frontmatter.slug },
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      readTime: frontmatter.readTime || null,
      excerpt: frontmatter.excerpt || null,
      body: mdToPortableText(body),
    }

    if (frontmatter.relatedArtist && frontmatter.relatedArtist !== 'null') {
      const artist = await client.fetch(`*[_type == "artist" && slug.current == $slug][0]{_id}`, { slug: frontmatter.relatedArtist })
      if (artist) document.relatedArtist = { _type: 'reference', _ref: artist._id }
    }

    if (frontmatter.relatedArtwork && frontmatter.relatedArtwork !== 'null') {
      const artwork = await client.fetch(`*[_type == "artwork" && slug.current == $slug][0]{_id}`, { slug: frontmatter.relatedArtwork })
      if (artwork) document.relatedArtwork = { _type: 'reference', _ref: artwork._id }
    }

    const existing = await client.fetch(`*[_type == "curate" && slug.current == $slug][0]{_id}`, { slug: frontmatter.slug })
    if (existing) {
      await client.patch(existing._id).set(document).commit()
      console.log(`  ✓ Mis à jour : ${frontmatter.slug}`)
    } else {
      const result = await client.create(document)
      console.log(`  ✓ Créé : ${frontmatter.slug} (${result._id})`)
    }
  }
}

importCurates().catch((err) => { console.error(err); process.exit(1) })
