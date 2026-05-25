# AH Milans Gallery

Site web du label curatorial **AH Milans** — présentation d'artistes émergents, œuvres disponibles à l'acquisition, et programme éditorial.

Construit avec **Next.js** (App Router) et **Sanity v3** comme CMS headless.

---

## Stack

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Sanity v3 |
| Styles | Tailwind CSS v4 |
| Typo | Inter (regular + 300/400/500/600) |
| Déploiement | Vercel |

---

## Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── articles/         # Journal éditorial
│   ├── artistes/         # Roster + pages artistes
│   ├── oeuvres/          # Collection + pages œuvres
│   ├── contact/          # Formulaire de contact
│   ├── newsletter/       # Page newsletter
│   └── signin/           # Authentification (à venir)
├── components/
│   ├── layout/           # Header, Footer, MobileNav, MainLayout
│   ├── artwork/          # ArtworkFilter, InquireModal
│   ├── contact/          # ContactForm
│   └── ui/               # NewsletterForm, PortableTextRenderer
└── lib/
    ├── sanity/           # Client, queries, types
    ├── i18n/             # Traductions (EN)
    ├── config.ts         # Constantes globales (CONTACT_EMAIL…)
    └── ThemeContext.tsx  # Dark / Light mode
```

---

## Démarrage

```bash
npm install
npm run dev
```

Copier `.env.example` → `.env.local` et renseigner les variables :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
NEXT_PUBLIC_CONTACT_EMAIL=
```

Studio Sanity accessible sur `/studio`.

---

## Design

**Palette — "White Cube"**
- Fond `#faf9f7` (blanc lin) · texte `#0f0f0f` · tons chauds sur tous les gris
- Dark mode via `localStorage` + classe `html.dark`

**Typographie**
- Inter partout (sans italic) — regular, 300/400/500/600
- Titres de section en Inter, sans serif, sans italic

**Layout homepage** — ordre des sections :
1. Hero (90vh) — logo centré + tagline + indicateur scroll
2. Artistes — grille 4 colonnes, tous les artistes, infos visibles sous l'image
3. Œuvres — grille 4 colonnes × 2 rangées (8 toiles), mélange aléatoire **une fois par connexion**
4. Éditorial — grille 4 colonnes × 2 rangées (8 articles)
5. Manifeste
6. Newsletter

**CTA de section** — positionnés en bas à droite du header de section (flex `justify-between items-end`)

**Container** — `max-w-[1120px]` centré, marges automatiques

**Email de contact** — centralisé dans `src/lib/config.ts` via `NEXT_PUBLIC_CONTACT_EMAIL`

---

## Déploiement

```bash
npm run build
```

Le projet est configuré pour Vercel. Les pages avec `revalidate = 60` se régénèrent toutes les minutes (ISR).
