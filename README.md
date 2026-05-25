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
| Typo | Instrument Serif · Plus Jakarta Sans |
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
│   ├── cards/            # ArtworkCard
│   ├── artwork/          # ArtworkFilter, InquireModal
│   ├── contact/          # ContactForm
│   └── ui/               # NewsletterForm, PortableTextRenderer
└── lib/
    ├── sanity/           # Client, queries, types
    ├── i18n/             # Traductions (EN)
    └── ThemeContext.tsx  # Dark / Light mode
```

---

## Démarrage

```bash
npm install
npm run dev
```

Copier `.env.local.example` → `.env.local` et renseigner les variables Sanity :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

Studio Sanity accessible sur `/studio`.

---

## Design

- Mise en page centrée sur **1120px max**, marges latérales automatiques
- Chaque section homepage occupe **min 100vh** (sauf hero : 90vh) pour un défilement cinématique
- Artistes : affichage complet du roster (grille responsive 2 → 3 → 4 colonnes)
- Œuvres homepage : **8 toiles** tirées aléatoirement d'un pool de 24, rotation automatique toutes les 12 s avec fondu
- Palette minimale : `--background`, `--foreground`, `--muted`, `--border`
- Dark mode via `localStorage` + classe `html.dark`
- Typographie fluid avec `clamp()` sur les titres et textes hero

---

## Déploiement

```bash
npm run build
```

Le projet est configuré pour Vercel. Les pages avec `revalidate = 60` se régénèrent toutes les minutes (ISR).
