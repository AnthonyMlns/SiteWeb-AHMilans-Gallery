import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: join(__dirname, '..', '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

let keyCounter = 0
function nextKey() { return `k${++keyCounter}` }

function mdToPortableText(md) {
  const blocks = []
  const lines = md.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { i++; continue }
    if (/^### (.+)/.test(line)) {
      blocks.push({ _type: 'block', _key: nextKey(), style: 'h3', children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^### /, '') }], markDefs: [] })
      i++; continue
    }
    if (/^## (.+)/.test(line)) {
      blocks.push({ _type: 'block', _key: nextKey(), style: 'h2', children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^## /, '') }], markDefs: [] })
      i++; continue
    }
    if (/^>\s?/.test(line)) {
      const quoteLines = []
      while (i < lines.length && /^>\s?/.test(lines[i])) { quoteLines.push(lines[i].replace(/^>\s?/, '')); i++ }
      const text = quoteLines.join(' ')
      const { children, markDefs } = parseInline(text)
      blocks.push({ _type: 'block', _key: nextKey(), style: 'blockquote', children, markDefs })
      continue
    }
    if (/^---/.test(line.trim())) { i++; continue }
    const paraLines = []
    while (i < lines.length && lines[i].trim() !== '' && !/^##/.test(lines[i]) && !/^###/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^[-*]\s/.test(lines[i]) && !/^---/.test(lines[i].trim())) {
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

function extractSlugFromFilename(filename) {
  const name = filename.replace(/\.[^.]+$/, '')
  const knownArtists = ['sebastien-cheramy', 'benka']
  for (const artist of knownArtists) {
    if (name.endsWith('-' + artist)) return name.slice(0, -(artist.length + 1))
  }
  const parts = name.split('-')
  return parts.length > 2 ? parts.slice(0, -2).join('-') : name
}

async function importDescriptions() {
  const sourceDir = join(__dirname, '..', 'content', 'descriptions')
  if (!existsSync(sourceDir)) { console.error('Dossier introuvable:', sourceDir); process.exit(1) }

  const files = readdirSync(sourceDir).filter(f => extname(f) === '.md')
  if (files.length === 0) { console.log('Aucun fichier .md trouvé'); return }

  for (const file of files) {
    const raw = readFileSync(join(sourceDir, file), 'utf-8')
    const lines = raw.split('\n')

    // Find FAQ section
    const faqIdx = lines.findIndex(l => l.trim() === '## FAQ')
    const hasFaq = faqIdx !== -1

    // Body = everything before ## FAQ (skip H1, image, blockquote metadata, first ---)
    let bodyStart = 0
    // Find first non-empty line after first ---
    const firstSep = lines.findIndex((l, i) => l.trim() === '---' && i > 0)
    if (firstSep !== -1) {
      bodyStart = firstSep + 1
      while (bodyStart < lines.length && lines[bodyStart].trim() === '') bodyStart++
    }
    const bodyEnd = hasFaq ? faqIdx : lines.length
    const bodyMd = lines.slice(bodyStart, bodyEnd).join('\n').trim()
    const portableText = mdToPortableText(bodyMd)

    // Extract FAQ items
    const faqItems = []
    if (hasFaq) {
      const faqLines = lines.slice(faqIdx + 1)
      let currentQ = null
      let currentA = ''
      for (const fl of faqLines) {
        if (fl.trim() === '') continue
        if (fl.trim() === '---') break
        const qMatch = fl.match(/^\*\*Q:\s*(.+?)\*\*/)
        if (qMatch) {
          if (currentQ) {
            faqItems.push({ _key: `faq${faqItems.length}`, _type: 'faqItem', question: currentQ, answer: currentA.trim() })
          }
          currentQ = qMatch[1].trim()
          currentA = ''
        } else if (currentQ) {
          const aMatch = fl.match(/^A:\s*(.*)/)
          if (aMatch) currentA += (currentA ? ' ' : '') + aMatch[1].trim()
          else currentA += (currentA ? ' ' : '') + fl.trim()
        }
      }
      if (currentQ) {
        faqItems.push({ _key: `faq${faqItems.length}`, _type: 'faqItem', question: currentQ, answer: currentA.trim() })
      }
    }

    const slug = extractSlugFromFilename(file)
    const existing = await client.fetch('*[_type == "artwork" && slug.current == $slug][0]{_id, title}', { slug })
    if (!existing) { console.warn(`  ⚠ Œuvre introuvable: ${slug}`); continue }

    const patch = { description: portableText }
    if (faqItems.length > 0) patch.faq = faqItems
    await client.patch(existing._id).set(patch).commit()
    console.log(`  ✓ "${existing.title}" — desc + ${faqItems.length} FAQ items`)
  }
}

importDescriptions().catch((err) => { console.error('Erreur:', err); process.exit(1) })
