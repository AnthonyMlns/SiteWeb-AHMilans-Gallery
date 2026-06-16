import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { config } from 'dotenv'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: join(__dirname, '..', '.env.local') })

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET
const API_TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !DATASET || !API_TOKEN) {
  console.error('Manque : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET ou SANITY_API_TOKEN dans .env.local')
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
function nextKey() {
  return `k${++keyCounter}`
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  try {
    const frontmatter = yaml.load(match[1])
    const body = match[2].trim()
    return { frontmatter, body }
  } catch {
    return null
  }
}

function mdToPortableText(md) {
  const blocks = []
  const lines = md.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Heading h2: ## text
    if (/^## (.+)/.test(line)) {
      const text = line.replace(/^## /, '')
      const { children, markDefs } = parseInline(text)
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'h2',
        children,
        markDefs,
      })
      i++
      continue
    }

    // Heading h3: ### text
    if (/^### (.+)/.test(line)) {
      const text = line.replace(/^### /, '')
      const { children, markDefs } = parseInline(text)
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'h3',
        children,
        markDefs,
      })
      i++
      continue
    }

    // Blockquote: > text (handle multiline)
    if (/^>\s?/.test(line)) {
      const quoteLines = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      const text = quoteLines.join(' ')
      const { children, markDefs } = parseInline(text)
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'blockquote',
        children,
        markDefs,
      })
      continue
    }

    // Table: | ... | ... |
    if (/^\|.+\|$/.test(line.trim()) && /^\|([ :-]+\|)+$/.test(lines[i + 1]?.trim() ?? '')) {
      const tableRows = []
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        // Skip separator row (| --- | --- |)
        if (!/^\|([ :-]+\|)+$/.test(lines[i].trim())) {
          const cells = lines[i].trim().split('|').filter(c => c.trim() !== '').map(c => c.trim().replace(/\*\*(.+?)\*\*/g, '$1'))
          tableRows.push({ _type: 'tableRow', cells })
        }
        i++
      }
      if (tableRows.length > 0) {
        blocks.push({
          _type: 'table',
          _key: nextKey(),
          rows: tableRows,
        })
      }
      continue
    }

    // Unordered list: - text or * text
    if (/^[-*]\s/.test(line)) {
      const listItems = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^[-*]\s/, ''))
        i++
      }
      for (const itemText of listItems) {
        const { children, markDefs } = parseInline(itemText)
        blocks.push({
          _type: 'block',
          _key: nextKey(),
          style: 'normal',
          level: 1,
          listItem: 'bullet',
          children,
          markDefs,
        })
      }
      continue
    }

    // Horizontal rule: --- (skip)
    if (/^---+$/.test(line.trim())) {
      i++
      continue
    }

    // Paragraph (collect until blank line or next block element)
    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^##/.test(lines[i]) &&
      !/^###/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\|/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
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
    } else {
      i++
    }
  }

  return blocks
}

function parseInline(text) {
  const children = []
  const markDefs = []
  let remaining = text

  while (remaining.length > 0) {
    // Bold + italic: ***text***
    const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/)
    if (boldItalicMatch) {
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: ['strong', 'em'],
        text: boldItalicMatch[1],
      })
      remaining = remaining.slice(boldItalicMatch[0].length)
      continue
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: ['strong'],
        text: boldMatch[1],
      })
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*(.+?)\*/)
    if (italicMatch) {
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: ['em'],
        text: italicMatch[1],
      })
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/)
    if (linkMatch) {
      const linkText = linkMatch[1]
      const href = linkMatch[2]
      const markKey = nextKey()
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: [markKey],
        text: linkText,
      })
      markDefs.push({ _key: markKey, _type: 'link', href })

      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Regular text until next marker
    const nextMarker = remaining.search(/\*\*\*|\*\*|\*|\[/)
    if (nextMarker === 0) continue
    if (nextMarker === -1) {
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: [],
        text: remaining,
      })
      break
    } else {
      children.push({
        _type: 'span',
        _key: nextKey(),
        marks: [],
        text: remaining.slice(0, nextMarker),
      })
      remaining = remaining.slice(nextMarker)
    }
  }

  return { children, markDefs }
}

async function importArticles() {
  const articlesDir = join(__dirname, '..', 'content', 'articles')
  if (!existsSync(articlesDir)) {
    console.log('Dossier content/articles/ introuvable. Création...')
    return
  }

  const files = readdirSync(articlesDir).filter(f => extname(f) === '.md')

  if (files.length === 0) {
    console.log('Aucun fichier .md dans content/articles/')
    return
  }

  for (const file of files) {
    const raw = readFileSync(join(articlesDir, file), 'utf-8')
    const parsed = parseFrontmatter(raw)
    if (!parsed) {
      console.warn(`  ⚠ Frontmatter invalide : ${file}`)
      continue
    }

    const { frontmatter, body } = parsed

    if (!frontmatter.title || !frontmatter.slug) {
      console.warn(`  ⚗️ Champs requis manquants (title, slug) : ${file}`)
      continue
    }

    const document = {
      _type: 'article',
      title: frontmatter.title,
      slug: { _type: 'slug', current: frontmatter.slug },
      category: frontmatter.category || null,
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      readTime: frontmatter.readTime || null,
      excerpt: frontmatter.excerpt || null,
      featured: frontmatter.featured || false,
      body: mdToPortableText(body),
    }

    if (Array.isArray(frontmatter.faq)) {
      document.faq = frontmatter.faq.map((item, i) => ({
        _key: `faq${i}`,
        _type: 'faqItem',
        question: item.question,
        answer: item.answer,
      }))
    }

    if (frontmatter.relatedArtist && frontmatter.relatedArtist !== 'null') {
      const artist = await client.fetch(`*[_type == "artist" && slug.current == $slug][0]{_id}`, {
        slug: frontmatter.relatedArtist,
      })
      if (artist) {
        document.relatedArtist = { _type: 'reference', _ref: artist._id }
      }
    }

    // Check if article already exists
    const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, {
      slug: frontmatter.slug,
    })

    if (existing) {
      await client.patch(existing._id).set(document).commit()
      console.log(`  ✓ Mis à jour : ${frontmatter.slug}`)
    } else {
      const result = await client.create(document)
      console.log(`  ✓ Créé : ${frontmatter.slug} (${result._id})`)
    }
  }
}

importArticles().catch((err) => {
  console.error('Erreur :', err)
  process.exit(1)
})
