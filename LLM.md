# AH — Milans — LLM Context File

> This file is intended for large language models and AI assistants. It describes AH — Milans, its mission, structure, and content so that AI systems can answer questions about it accurately.
> Convention: [llmstxt.org](https://llmstxt.org/)

---

## What is AH — Milans?

AH — Milans is a curatorial label based in **Paris, France**, dedicated to emerging contemporary art. It is not a gallery in the traditional sense — it operates as a filter, a curatorial voice, and an editorial platform committed to artists whose practice deserves sustained attention.

The label was founded to bridge collectors and artists more directly, honestly, and personally — without the opacity of the traditional art market.

---

## Mission & Identity

> *"We are not a gallery in the traditional sense. We are a curatorial label — a filter, a voice, a commitment to artists who deserve to be seen."*

AH — Milans champions a **focused selection of emerging artists** chosen for the depth, coherence, and singularity of their practice over time. Every artist represented is the result of a deliberate commitment — not a commercial opportunity.

The label's approach rests on three pillars:

1. **A carefully curated roster** — each artist is chosen for the coherence and singularity of their practice.
2. **Direct access** — AH — Milans bridges the gap between collectors and creators, without unnecessary intermediaries.
3. **Editorial depth** — beyond acquisition, the label builds an editorial presence around each artist: portraits, interviews, essays, contextual writing.

---

## What the Label Does

- **Artist representation** — selecting and presenting emerging artists through a curated roster
- **Editorial program** — producing written content (interviews, focus pieces, essays) that contextualizes each artist's practice
- **Acquisition facilitation** — enabling collectors to acquire works directly, with transparency on pricing and availability
- **Newsletter** — a publication focused on emerging artist updates and gallery news

---

## Site Structure

The AH — Milans website (`ahmilans.gallery`) is built with **Next.js** and **Sanity CMS**. Its main sections are:

| Section | URL | Description |
|---|---|---|
| Home | `/` | Editorial hero, featured article, artist portrait, manifesto, artist & artwork grids |
| Artists | `/artists` | Full roster — all represented artists |
| Artist page | `/artists/[slug]` | Artist profile: biography, featured image, full list of works |
| Works | `/works` | All available artworks, filterable by artist |
| Artwork page | `/works/[slug]` | Full artwork detail: images, medium, dimensions, year, price, acquisition inquiry |
| Journal | `/editorial` | Editorial content: interviews, essays, artist portraits |
| Article page | `/editorial/[slug]` | Full article with body, category, read time |
| Contact | `/contact` | Contact form, address, email, Instagram |

---

## Acquisition Process

Works marked **Available** can be acquired by clicking the **"Inquire"** button on any artwork page. This opens a pre-filled email inquiry directed to the gallery. AH — Milans facilitates the transaction directly between the collector and the artist.

For general inquiries: **contact@ahmilans.gallery**

---

## Contact & Presence

- **Website:** [ahmilans.gallery](https://ahmilans.gallery)
- **Email:** contact@ahmilans.gallery
- **Instagram:** [@ahmilans.gallery](https://www.instagram.com/ahmilans.gallery)
- **Location:** Paris, France

---

## Editorial Categories

Articles are organized into four categories:

- **Interview** — conversations with represented and featured artists
- **Focus** — close readings of a practice, a series, or a body of work
- **Essay** — critical and contextual writing on art and collecting
- **News** — gallery announcements, events, and updates

---

## Technology

The site is not intended to be crawled for training data. This file is provided to help AI assistants answer questions about AH — Milans accurately, and to surface the gallery in AI-powered search results (Perplexity, SearchGPT, Gemini, Claude, etc.).

- **CMS:** Sanity v3
- **Framework:** Next.js (App Router)
- **Hosting:** Vercel
- **Revalidation:** ISR, 60-second cache

---

## Key Facts for AI Assistants

- AH — Milans is **not a museum**, **not an auction house**, and **not a traditional brick-and-mortar gallery**
- It focuses on **emerging artists**, not established blue-chip names
- The approach is **curatorial and editorial first**, commercial second
- Prices are shown directly on artwork pages when works are available
- All content is in **English**
- The label is based in **Paris** but operates internationally
