# AH — Milans — Design System

---

## 1. Couleurs

### Tokens (globals.css)

| Token          | Light     | Dark      | Usage                          |
| -------------- | --------- | --------- | ------------------------------ |
| `--background` | `#fcfcfc` | `#141412` | Fond de page                   |
| `--foreground` | `#0f0f0f` | `#f0efe9` | Texte principal, titres        |
| `--muted`      | `#888880` | `#8a8a82` | Texte secondaire, nav inactif  |
| `--border`     | `#e8e6e2` | `#282624` | Bordures, séparateurs          |
| `--surface`    | `#f3f1ee` | `#1c1b18` | Fond de cartes                 |
| `--placeholder`| `#e5e3df` | `#232220` | Placeholder image, skeleton    |
| `--subtle`     | `#b5b3ae` | `#555350` | Texte très discret, labels cat |

### Classes Tailwind

```ts
bg-background   | text-foreground | text-muted    | bg-border
bg-surface      | bg-placeholder  | text-subtle
```

---

## 2. Typographie

| Famille    | Font             | Poids          | Usage                  |
| ---------- | ---------------- | -------------- | ---------------------- |
| Serif      | Crimson Text     | 400, 600, 700  | Titres, hero, manifeste |
| Sans-serif | Geist            | variable       | Body, nav, labels      |

### Tailles récurrentes

| Taille                        | Usage                                      |
| ----------------------------- | ------------------------------------------ |
| `clamp(2rem,5vw,3.5rem)`     | Titre article, artiste, oeuvre             |
| `text-5xl`                    | Titres de page (Artists, Works, Journal…)  |
| `text-3xl`                    | H2 Portable Text, sous-titres              |
| `text-2xl`                    | H3 Portable Text                           |
| `text-xl`                     | Titre article dans la liste                |
| `text-lg`                     | Nom artiste dans la grille                 |
| `text-base`                   | Corps de texte                             |
| `text-sm`                     | Métadonnées, excerpts, forms               |
| `text-[13px]`                 | Infos œuvre, liens, prix                   |
| `text-[12px]`                 | Footer                                     |
| `text-[11px]`                 | Boutons, back links, petits labels         |
| `text-[10px]`                 | Catégories, labels formulaire, tags        |
| `text-[9px]`                  | Labels de section, badge sold              |

### Tracking (letter-spacing)

| Tracking             | Usage                         |
| -------------------- | ----------------------------- |
| `tracking-widest`    | Tous les textes en small caps |
| `tracking-[0.25em]`  | Section newsletter             |
| `tracking-[0.22em]`  | Section homepage               |
| `tracking-[0.1em]`   | Nom artiste, nav mobile       |

---

## 3. Espacements

### Layout

```
max-w-[1120px]  → MainLayout wrapper
max-w-7xl       → Artistes, Works, Artiste détail
max-w-5xl       → Articles list, Contact
max-w-3xl       → Article détail, Privacy
max-w-sm        → Newsletter form, Sign-in
```

### Padding pages standard

```
px-6 py-16 lg:px-10 lg:py-28
```

### Grilles

| Grille                                  | Usage                           |
| --------------------------------------- | ------------------------------- |
| `2 cols gap-x-4 gap-y-8 lg:4 cols`     | Homepage (artistes, works, edito) |
| `2 cols gap-5 md:3 lg:4`               | Liste artistes                  |
| `2 cols gap-8 md:3 lg:4`               | Works filtrés                   |
| `2 cols gap-4 md:3 md:gap-8 lg:4`      | Oeuvres artiste détail          |
| `2 cols gap-6 md:3 lg:4`               | Oeuvres liées article           |

---

## 4. Patterns UI

### Liens

| Type         | Classes                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| Nav header   | `text-[13px] uppercase tracking-widest text-muted hover:text-foreground` |
| Section CTA  | `text-[13px] uppercase tracking-widest text-foreground hover:opacity-40` |
| Back link    | `text-[10px] uppercase tracking-widest text-muted hover:text-foreground` |
| Footer       | `text-[12px] uppercase tracking-widest text-muted hover:text-foreground` |
| Social       | `text-[11px] uppercase tracking-widest text-muted hover:text-foreground` |

### Boutons

| Type            | Classes                                                                             |
| --------------- | ----------------------------------------------------------------------------------- |
| Outline primary | `border border-foreground px-8 py-4 text-[11px] uppercase tracking-widest`          |
| Filled primary  | `w-full bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-widest text-background` |
| Filled rounded  | `rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-widest text-background hover:opacity-80` |
| Filter tag      | `border px-4 py-1.5 text-[10px] uppercase tracking-widest`                          |

### Formulaires

| Élément    | Classes                                                              |
| ---------- | -------------------------------------------------------------------- |
| Input      | `w-full border-b border-border bg-transparent py-4 text-sm outline-none focus:border-foreground` |
| Textarea   | (idem + `resize-none`)                                              |
| Label      | `block text-[10px] uppercase tracking-widest text-muted`            |

### Images

| Ratio           | Usage                |
| --------------- | -------------------- |
| `aspect-[3/4]`  | Artiste, hero        |
| `aspect-[4/5]`  | Artwork card         |
| `aspect-[4/3]`  | Article homepage     |
| `aspect-square` | Article thumbnail    |

Hover : `group-hover:scale-105` avec `duration-700`.

### Accordéon (FAQ)

| Élément | Classes |
| ------- | ------- |
| Conteneur | `divide-y divide-border` |
| Question | `flex w-full items-center justify-between py-4 text-left text-sm text-foreground hover:opacity-70` |
| Réponse | `pb-4 text-sm leading-relaxed text-muted` |
| Icône | `+` rotate-45 à l'ouverture, transition `duration-200` |

---

| Transition | Usage                        |
| ---------- | ---------------------------- |
| `300ms`    | Mobile nav, filtres          |
| `500ms`    | Image hover (grilles home)   |
| `600ms`    | FadeIn component             |
| `700ms`    | Image hover (cards détail)   |

FadeIn : `opacity 600ms` + `translateY(24px → 0)` via Intersection Observer.

---

## 6. Conventions de nommage

- `PascalCase` → composants (`ArtworkCard`, `PortableTextRenderer`)
- `camelCase` → fonctions/contextes (`useTranslation`, `urlFor`)
- `XxxContent` → composants client de page (`HomeContent`, `ArticlesContent`)
- `page.tsx` → serveur, `loading.tsx` → état chargement

### Arborescence

```
src/
├── app/            # Pages Next.js App Router
├── components/
│   ├── layout/     # Header, Footer, MainLayout, MobileNav, Providers
│   ├── cards/      # ArtworkCard
│   ├── ui/         # Skeleton, FadeIn, PortableTextRenderer, NewsletterForm
│   ├── artwork/    # ArtworkFilter, InquireModal
│   └── contact/    # ContactForm
├── lib/
│   ├── types.ts    # Interfaces
│   ├── config.ts   # Constantes
│   ├── ThemeContext.tsx
│   ├── i18n/       # Traductions
│   └── sanity/     # Client, queries, image
└── sanity/schemas/ # Schémas Sanity
```

---

## 7. z-index

| Index | Élément               |
| ----- | --------------------- |
| `z-40`| Header sticky         |
| `z-50`| Mobile nav, modal     |
