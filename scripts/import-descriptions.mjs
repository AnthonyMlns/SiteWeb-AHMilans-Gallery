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

function extractSections(md) {
  const sections = {}
  const lines = md.split('\n')
  let currentSection = 'intro'
  let currentContent = []

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/)
    if (h2Match) {
      if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim()
      }
      currentSection = h2Match[1].trim()
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }
  if (currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim()
  }

  return sections
}

function mdToPortableText(md) {
  const blocks = []
  const lines = md.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') { i++; continue }

    if (/^### (.+)/.test(line)) {
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'h3',
        children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^### /, '') }],
        markDefs: [],
      })
      i++; continue
    }

    if (/^## (.+)/.test(line)) {
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'h2',
        children: [{ _type: 'span', _key: nextKey(), marks: [], text: line.replace(/^## /, '') }],
        markDefs: [],
      })
      i++; continue
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'blockquote',
        children: [{ _type: 'span', _key: nextKey(), marks: [], text: quoteLines.join(' ') }],
        markDefs: [],
      })
      continue
    }

    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^##/.test(lines[i]) &&
      !/^###/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i])
    ) {
      paraLines.push(lines[i].trim())
      i++
    }
    if (paraLines.length > 0) {
      const text = paraLines.join(' ')
      const { children, markDefs } = parseInline(text)
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'normal',
        children,
        markDefs,
      })
    } else { i++ }
  }

  return blocks
}

function parseInline(text) {
  const children = []
  const markDefs = []
  let remaining = text

  while (remaining.length > 0) {
    const boldItalic = remaining.match(/^\*\*\*(.+?)\*\*\*/)
    if (boldItalic) {
      children.push({ _type: 'span', _key: nextKey(), marks: ['strong', 'em'], text: boldItalic[1] })
      remaining = remaining.slice(boldItalic[0].length)
      continue
    }

    const bold = remaining.match(/^\*\*(.+?)\*\*/)
    if (bold) {
      children.push({ _type: 'span', _key: nextKey(), marks: ['strong'], text: bold[1] })
      remaining = remaining.slice(bold[0].length)
      continue
    }

    const italic = remaining.match(/^\*(.+?)\*/)
    if (italic) {
      children.push({ _type: 'span', _key: nextKey(), marks: ['em'], text: italic[1] })
      remaining = remaining.slice(italic[0].length)
      continue
    }

    const link = remaining.match(/^\[(.+?)\]\((.+?)\)/)
    if (link) {
      const markKey = nextKey()
      children.push({ _type: 'span', _key: nextKey(), marks: [markKey], text: link[1] })
      markDefs.push({ _key: markKey, _type: 'link', href: link[2] })
      remaining = remaining.slice(link[0].length)
      continue
    }

    const nextMarker = remaining.search(/\*\*\*|\*\*|\*|\[/)
    if (nextMarker === 0) continue
    if (nextMarker === -1) {
      children.push({ _type: 'span', _key: nextKey(), marks: [], text: remaining })
      break
    } else {
      children.push({ _type: 'span', _key: nextKey(), marks: [], text: remaining.slice(0, nextMarker) })
      remaining = remaining.slice(nextMarker)
    }
  }

  return { children, markDefs }
}

function extractSlugFromFilename(filename) {
  const name = filename.replace(/\.[^.]+$/, '')
  const knownArtists = ['sebastien-cheramy', 'benka']
  for (const artist of knownArtists) {
    if (name.endsWith('-' + artist)) {
      return name.slice(0, -(artist.length + 1))
    }
  }
  const parts = name.split('-')
  if (parts.length > 2) {
    return parts.slice(0, -2).join('-')
  }
  return name
}

async function importDescriptions() {
  const sourceDir = join(__dirname, '..', 'content', 'descriptions')

  if (!existsSync(sourceDir)) {
    console.error('Dossier introuvable:', sourceDir)
    process.exit(1)
  }

  const files = readdirSync(sourceDir).filter(f => extname(f) === '.md')

  if (files.length === 0) {
    console.log('Aucun fichier .md trouvé')
    return
  }

  for (const file of files) {
    const raw = readFileSync(join(sourceDir, file), 'utf-8')
    const sections = extractSections(raw)

    const aboutWork = sections['About This Work']
    const whyCollect = sections['Why Collect This Work']

    if (!aboutWork) {
      console.warn(`  ⚠ Section "About This Work" introuvable: ${file}`)
      continue
    }

    // Build description content from sections
    let descriptionMd = aboutWork
    if (whyCollect) {
      descriptionMd += '\n\n' + whyCollect
    }

    const slug = extractSlugFromFilename(file)
    console.log(`  → Slug extrait: "${slug}"`)

    const existing = await client.fetch('*[_type == "artwork" && slug.current == $slug][0]{_id, title}', { slug })

    if (!existing) {
      console.warn(`  ⚠ Œuvre introuvable dans Sanity: ${slug}`)
      continue
    }

    const portableText = mdToPortableText(descriptionMd)

    await client.patch(existing._id).set({ description: portableText }).commit()
    console.log(`  ✓ "${existing.title}" — description mise à jour`)
  }
}

importDescriptions().catch((err) => {
  console.error('Erreur:', err)
  process.exit(1)
})
