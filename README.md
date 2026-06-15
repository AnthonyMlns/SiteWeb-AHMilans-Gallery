# AH — Milans Gallery

Website for the curatorial label **AH — Milans** — showcasing emerging artists, works available for acquisition, and an editorial programme.

Built with **Next.js** (App Router) and **Sanity v3** as a headless CMS.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS | Sanity v3 |
| Styles | Tailwind CSS v4 |
| Typography | Crimson Text (serif headings) + Geist (sans body) — via `next/font` |
| Deployment | Vercel (ISR, 60s revalidation) |
| SEO | OG tags + Twitter cards, sitemap.xml, robots.txt, canonical URLs, metadataBase |

---

## Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── editorial/        # Editorial journal
│   ├── artists/          # Roster + artist pages
│   ├── works/            # Collection + artwork pages
│   ├── curates/          # Curatorial selections + FAQ
│   ├── contact/          # Contact form
│   ├── newsletter/       # Newsletter page
│   ├── mobile/           # Link-in-bio page
│   ├── signin/           # Authentication (coming soon)
│   ├── privacy-policy/   # GDPR privacy policy
│   ├── sitemap.ts        # Dynamic XML sitemap
│   └── robots.ts         # Crawl rules
├── components/
│   ├── layout/           # Header, Footer, MobileNav, MainLayout
│   ├── artwork/          # ArtworkFilter, InquireModal
│   ├── contact/          # ContactForm
│   └── ui/               # NewsletterForm, PortableTextRenderer
└── lib/
    ├── sanity/           # Client, queries, groq
    ├── i18n/             # Translations (EN)
    ├── config.ts         # Global constants (SITE_NAME, SITE_URL, CONTACT_EMAIL…)
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

**SEO metadata** — centralized config (`SITE_NAME`, `SITE_URL`) in `src/lib/config.ts`. All dynamic pages have OG images (artwork/artist/article thumbnails), Twitter cards, and canonical URLs. Sitemap at `/sitemap.xml`, crawl rules at `/robots.txt`. Root layout sets `metadataBase` for absolute URL resolution.

---

## Roadmap

- [x] **v1.0 MVP** — Core gallery site: homepage, artists, artworks, Sanity CMS
- [x] **v1.1 UX & Design** — Lightbox, enriched filters, artist page redesign, consistent photography, full-screen nav, route migration to English
- [x] **Link in bio** — `/mobile` page for mobile audiences
- [x] **Artwork descriptions** — Import pipeline MD → Sanity, harmonised 3-paragraph format, specs moved below image
- [x] **Curates** — `/curates` section with schema, queries, routes, and sample article
- [x] **Phase 1 SEO** — OG tags + images, sitemap, robots.txt, canonical URLs, metadata homepage, title harmonization
- [ ] **Phase 2 SEO** — JSON-LD structured data, tarteaucitron (cookie consent), GA4
- [ ] **High-value features** — Backend inquiry, real-time availability, richer filters, "Why Collect This Work", zoom HD, lightbox
- [ ] **Maintenance** — Update sitemap and `LLM.md` with each new page or content addition
- [ ] **Auction** — `/auction` page with lot listings and detail pages (mockup ready, pending implementation)

> Detailed planning in [ROADMAP-FEATURES.md](./ROADMAP-FEATURES.md) and [GitHub Issues](https://github.com/AnthonyMlns/SiteWeb-AHMilans-Gallery/issues).

## Deployment

```bash
npm run build
```

The project is configured for Vercel. Pages with `revalidate = 60` regenerate every minute (ISR).
