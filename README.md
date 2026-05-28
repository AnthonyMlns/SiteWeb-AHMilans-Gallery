# AH Milans Gallery

Website for the curatorial label **AH Milans** — showcasing emerging artists, works available for acquisition, and an editorial programme.

Built with **Next.js** (App Router) and **Sanity v3** as a headless CMS.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity v3 |
| Styles | Tailwind CSS v4 |
| Typography | Crimson Text (headings) + Geist (body) |
| Deployment | Vercel |

---

## Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── editorial/        # Editorial journal
│   ├── artists/          # Roster + artist pages
│   ├── works/            # Collection + artwork pages
│   ├── contact/          # Contact form
│   ├── newsletter/       # Newsletter page
│   └── signin/           # Authentication (coming soon)
├── components/
│   ├── layout/           # Header, Footer, MobileNav, MainLayout
│   ├── artwork/          # ArtworkFilter, InquireModal
│   ├── contact/          # ContactForm
│   └── ui/               # NewsletterForm, PortableTextRenderer
└── lib/
    ├── sanity/           # Client, queries, types
    ├── i18n/             # Translations (EN)
    ├── config.ts         # Global constants (CONTACT_EMAIL…)
    └── ThemeContext.tsx  # Dark / Light mode
```

---

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` → `.env.local` and fill in the variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_CONTACT_EMAIL=
```

Sanity Studio is available at `/studio`.

---

## Design

**Palette — "White Cube"**
- Background `#fcfcfc` (near-white) · text `#0f0f0f` · warm tones on all greys
- Dark mode via `localStorage` + `html.dark` class

**Typography**
- **Headings**: Crimson Text (serif — 400/600/700) via `next/font`
- **Body**: Geist (sans-serif variable) via `next/font`
- No italic, no serif/sans-serif contrast — uniform typographic system

**Card / Nav / Footer font sizes**:
- Navbar links: 13px
- Footer: 12px
- Artist & artwork card metadata: 13px
- Section labels (Scroll, Artists, Works…): 9px

**Homepage layout — section order:**
1. Hero (90vh) — centred logo + tagline + scroll indicator
2. Artists — 4-column grid, all artists, info visible below image
3. Works — 4-column × 2-row grid (8 works), shuffled **once per session**
4. Editorial — 4-column × 2-row grid (8 articles)
5. Manifesto
6. Newsletter

**Section CTAs** — positioned at the bottom-right of the section header (flex `justify-between items-end`)

**Container** — `max-w-[1120px]` centred, auto margins

**Contact email** — centralised in `src/lib/config.ts` via `NEXT_PUBLIC_CONTACT_EMAIL`

---

## Roadmap

- [x] **v1.0 MVP** — Core gallery site: homepage, artists, artworks, Sanity CMS
- [ ] **v1.1 UX & Design** — Lightbox, enriched filters, artist page redesign, consistent photography, full-screen nav, route migration to English
- [ ] **v1.2 SEO & Analytics** — GA4, OG tags, JSON-LD, sitemap, cookie consent

> Detailed planning in [GitHub Projects](https://github.com/AnthonyMlns/AH-Milans-SanityCMS/projects) and [Milestones](https://github.com/AnthonyMlns/AH-Milans-SanityCMS/milestones).

## Deployment

```bash
npm run build
```

The project is configured for Vercel. Pages with `revalidate = 60` regenerate every minute (ISR).
