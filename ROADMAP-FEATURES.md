# Roadmap Features — AH — Milans Gallery

> Features & évolutions ciblant artistes, collectionneurs et galeries · alignées avec le positionnement curatorial label.

---

## 🎯 Artistes

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Artist Dashboard privé** | Page protégée (auth) : statistiques de vues des œuvres, nombre d'inquiries, œuvres les plus consultées. Donne aux artistes une visibilité sur leur réception. | ⭐⭐ |
| **Portfolio enrichi** | Ajouter CV, expositions, presse, prix, collections au schéma `artist` Sanity. Crédibilité institutionnelle pour chaque artiste. | ⭐⭐⭐ |
| **Studio Visit / Vidéo** | Nouveau format éditorial : page ou section dédiée avec vidéo/photo en immersion dans l'atelier. Différenciation forte par rapport aux autres labels. | ⭐⭐ |
| **Application / Submission** | Page de soumission pour artistes émergents (formulaire + critères de curation). Pipeline de recrutement ouvert et transparent. | ⭐ |
| **Archives des œuvres vendues** | Œuvres passées toujours visibles sur le site (badge "Sold" + prix historique). Trace du parcours de l'artiste dans le temps. | ⭐⭐ |
| **Éditorial automatique** | Agent IA (BRIEF-IA Phase 1) : à chaque nouvel artiste, génération automatique d'un article "Focus" ou "Portrait" en draft Sanity, validation humaine avant publication. | ⭐⭐ |
| **Distinction Exhibited / Represented** | Distinguer les artistes "Exhibited" (exposés par la galerie) des "Represented" (représentés de manière continue). Nouveau champ dans le schéma Sanity `artist` + badge visuel sur les pages artiste et cards. Clarifie le positionnement curatorial pour les collectionneurs. | ⭐⭐⭐ |

---

## 🧑‍🤝‍🧑 Collectionneurs

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Inquiry backend** | Remplacer le `mailto:` actuel par un vrai formulaire → API → email + CRM interne + suivi. Professionnalise l'acquisition. | ⭐⭐⭐ |
| **Wishlist / Account collector** | Compte simple (email) : sauvegarder des œuvres en favoris, suivre des artistes, recevoir des notifications. Rétention et réengagement. | ⭐⭐ |
| **Provenance / Certificate** | Page œuvre enrichie d'un historique de propriété et d'un certificat digital. Confiance et valeur perçue pour l'acquéreur. | ⭐⭐ |
| **"Why Collect This Work"** | Section éditoriale sur chaque œuvre expliquant sa valeur intrinsèque (texte curatorial, pas description technique). Argumentaire collector. | ⭐⭐⭐ |
| **Artwork alert** | Notification email quand une nouvelle œuvre d'un artiste suivi est disponible. Upsell passif et engagement continu. | ⭐ |
| **Prix visible & transparence** | Déjà en place, mais ajouter : paiement en ligne optionnel, possibilité de "commissioned works" (œuvre commandée), fourchette de prix pour les séries. | ⭐ |
| **Statut de disponibilité en temps réel** | Badge "Available / Sold / Reserved" visible directement sur les cards de `/works` et pages artiste. Évite les inquiries sur des œuvres déjà parties. | ⭐⭐⭐ |
| **Collectors / Témoignages** | Section "Collected by" ou citations d'acheteurs sur les pages œuvre ou page dédiée. Preuve sociale distincte de la presse — parle aux futurs acheteurs. | ⭐⭐ |
| **Partage direct d'une œuvre** | Bouton "Partager cette œuvre" générant un lien avec OG image pré-remplie. Amplifie la diffusion organique sur réseaux sociaux. | ⭐⭐ |

---

## 🏛️ Galeries / Partenaires

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Curatorial Partnerships** | Page dédiée "En partenariat avec" : autres galeries, foires, lieux d'exposition, avec liens et visuels. Crédibilité réseau. | ⭐⭐ |
| **Exhibitions** | Nouveau content type Sanity `exhibition` : exposition (physique ou virtuelle) avec lieu, dates, œuvres exposées, communiqué de presse. Contenu éditorial + événementiel. | ⭐⭐⭐ |
| **Press & Mentions** | Page presse : citations, articles de presse, interviews du label, logos de publications. Autorité et preuve sociale. | ⭐⭐ |
| **Open Studios / Events** | Calendrier d'événements (salons, expositions, visites d'atelier) avec page dédiée et rappels newsletter. Animation de communauté. | ⭐⭐ |
| **Collector newsletter segments** | Newsletter ciblée par medium, budget, artiste plutôt qu'envoi unique. Personnalisation de la relation collector. | ⭐ |
| **Cross-label features** | Mise en avant de galeries partenaires en bas d'article ou page artiste. Mise en réseau et recommandations croisées. | ⭐ |

---

## 🔍 Découverte & Navigation

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Recherche globale** | Champ de recherche full-text couvrant artistes, œuvres, articles et curates. Aujourd'hui impossible de trouver "peinture abstraite 2023" — frein direct à la découverte. | ⭐⭐⭐ |
| **Tags / thèmes transversaux** | Mots-clés partagés entre œuvres, artistes et curates (ex. "nature", "minimalisme", "figuratif"). Crée une navigation thématique au-delà des catégories actuelles. | ⭐⭐ |
| **Filtres plus riches sur `/works`** | Filtres par année, fourchette de prix, medium, format — au-delà du filtre artiste existant. Indispensable quand le catalogue grandit. | ⭐⭐⭐ |

---

## 🖼️ Expérience visuelle

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Zoom haute résolution** | Visionneuse avec zoom sur les pages œuvre. Les collectionneurs ont besoin de voir la texture et les détails avant d'acquérir. | ⭐⭐⭐ |
| **Vue "salle d'exposition" / Room View** | Visualiser une œuvre mise en situation dans un espace intérieur réaliste. Standard des galeries en ligne (Artsy, 1stDibs). Forte complexité mais fort impact perçu. | ⭐ |
| **Comparaison d'œuvres** | Sélectionner 2–3 œuvres pour les voir côte à côte (dimensions, prix, medium). Utile pour les acheteurs indécis entre plusieurs pièces. | ⭐ |

---

## ✍️ Éditorial (transverse)

| Feature | Description | Priorité |
|---------|-------------|----------|
| **Séries éditoriales** | Tags de série ("Studio Visit", "Collector's Notes", "Process") au-delà des 4 catégories actuelles. Navigation thématique dans le journal. | ⭐⭐ |
| **Audio articles / Podcast** | Version audio des articles (TTS ou podcast natif). Accessibilité, expérience mobile, diffusion externalisable. | ⭐ |
| **Bilingual content FR/EN** | Compléter le framework i18n existant — chaque article en deux langues avec détection navigateur + sélecteur. Portée internationale. | ⭐⭐⭐ |
| **Curated collections** | Playlists d'œuvres autour d'un thème ("Abstract Landscapes", "Works on Paper", "Sous 5000€"). Cross-selling éditorial. | ⭐⭐ |
| **Archive newsletter visible** | Rendre les newsletters passées accessibles sur le site (page `/newsletter/archive`). Réutilise le contenu envoyé par mail pour le SEO et la rétention. | ⭐⭐ |
| **Import articles depuis Webflow** | Migrer les meilleurs articles de blog depuis Webflow vers Sanity. Script d'import + mapping des contenus existants pour enrichir le journal éditorial sans réécriture. | ⭐⭐⭐ |
| **Agent curateur actif** | Implémenter l'agent BRIEF-IA Phase 2 : rotation automatique des `featured`, sélection de l'œuvre du mois, suggestion de rotation des articles en home. Site vivant sans effort humain. | ⭐⭐⭐ |
| **Lightbox** | Roadmap v1.1 — visionneuse plein écran pour les images d'œuvres. Manquant actuellement. | ⭐⭐⭐ |
| **Description enrichie des œuvres** | Ajouter une description éditoriale/curatoriale pour chaque œuvre (contexte, inspiration, technique). Actuellement les œuvres n'ont pas de texte dédié — essentiel pour le SEO et l'argumentaire collector. | ⭐⭐⭐ |

---

## 🛠️ SEO & Référencement

### ✅ Ce qui existe déjà

| Bonnes pratiques | État |
|------------------|------|
| `generateStaticParams` sur toutes les routes dynamiques | ✅ Pages pré-rendues au build |
| `revalidate = 60` partout | ✅ ISR — régénération sans rebuild complet |
| `lang="en"` sur `<html>` | ✅ Attribut présent |
| Fonts via `next/font` | ✅ Pas de render-blocking, pas de FOUT |
| Rendu serveur | ✅ Tout le contenu dans le HTML initial — crawlable sans JS |
| `generateMetadata` titles dynamiques | ✅ Chaque page a son propre `<title>` |
| Descriptions dynamiques | ✅ Utilisent les vrais champs Sanity (excerpt, statementCourt, medium) |

### ❌ Ce qui manque — par priorité

| Priorité | Action | Impact | Effort | Statut |
|----------|--------|--------|--------|--------|
| 🔴 **1** | **OG tags + image sur toutes les pages** — `openGraph` + `twitter:card` dans chaque `generateMetadata`. Les images existent déjà dans Sanity (thumbnailUrl, profileImageUrl, images[0].url). | Partage réseaux sociaux (Instagram, WhatsApp, X) | Moyen | ✅ |
| 🔴 **2** | **Sitemap** — `src/app/sitemap.ts` avec toutes les routes dynamiques (déjà en `generateStaticParams`, trivial à générer). | Indexation Google | Faible | ✅ |
| 🔴 **3** | **robots.ts** — `src/app/robots.ts` pour contrôler le crawl. | Contrôle crawl | Très faible | ✅ |
| 🟡 **4** | **JSON-LD structured data** — Injecter les types pertinents : `VisualArtwork` (works), `Person` (artists), `Article` (editorial), `Article` + `ItemList` (curates). | Rich snippets Google Search | Moyen | ❌ |
| 🟡 **5** | **URL canonique** — `alternates.canonical` dans les metadata pour éviter la duplication (www/non-www, HTTP/HTTPS). | Déduplication SEO | Faible | ✅ |
| 🟢 **6** | **Metadata homepage enrichie** — Actuellement héritée du root layout ("A curated gallery of contemporary artists."). À personnaliser avec le nom de marque et le positionnement. | Branding dans les SERP | Très faible | ✅ |
| 🟢 **7** | **Harmonisation des titres** — Incohérences : `/curates` → "AH Milans Curates — AH — Milans" (redondant), séparateur non unifié (— vs -). | Cohérence | Très faible | ✅ |
| 🟢 **8** | **tarteaucitron** — Intégrer la bannière de consentement RGPD tarteaucitron.js. La Privacy Policy existe mais pas de bannière. | Conformité légale | Moyen | ❌ |
| 🟢 **9** | **GA4 / Analytics** — Intégration Google Analytics 4. | Mesure d'audience | Faible | ❌ |

### OG metadata — détail par route

Chaque `generateMetadata` doit exposer :

```ts
openGraph: {
  title: "...",
  description: "...",
  images: [{ url: imageUrl, width: 1200, height: 630 }],
  url: `https://ahmilans.gallery/${route}`,
  type: "website" | "article",
},
twitter: {
  card: "summary_large_image",
}
```

| Route | Type OG | Image source |
|-------|---------|-------------|
| `/` | `website` | Logo ou hero |
| `/artists/[slug]` | `website` | `artist.profileImageUrl` |
| `/works/[slug]` | `website` | `artwork.images[0].url` |
| `/editorial/[slug]` | `article` | `article.thumbnailUrl` |
| `/curates/[slug]` | `article` | `curate.thumbnailUrl` |

### JSON-LD — structured data

| Route | Type Schema.org |
|-------|----------------|
| `/artists/[slug]` | `Person` |
| `/works/[slug]` | `VisualArtwork` |
| `/editorial/[slug]` | `Article` |
| `/curates/[slug]` | `Article` + `ItemList` |

---

## 🛠️ Infrastructure & Automatisation

| Feature | Description | Priorité |
|---------|-------------|----------|
| **GitHub Actions workflows** | BRIEF-IA Phase 1 : CI/CD, cron éditorial, newsletter, curateur, analytics. | ⭐⭐ |
| **Backend inquiry** | API route Next.js + Brevo transactional + CRM léger (Google Sheets ou Sanity). Complète le 🔴 inquiry. | ⭐⭐⭐ |
| **Auction page** | Roadmap README — page `/auction` avec lot listings et pages détail (mockup ready). | ⭐ |
| **LLM.md maintenance** | Mettre à jour le LLM.md avec toutes les pages existantes (curates, mobile, newsletter, privacy). | ⭐⭐⭐ |

---

## 🖨️ Prints on Demand (Gelato)

### Vision

Permettre aux visiteurs d'acheter des reproductions (prints) d'œuvres sélectionnées, imprimées et expédiées via Gelato. Pas de stock, pas d'expédition : Gelato fabrique et envoie à l'unité. Fonctionne **œuvre par œuvre** (opt-in, pas un catalogue print global).

### Use case — Parcours utilisateur

1. **Depuis la page d'une œuvre** (`/works/[slug]`) qui a `printEnabled: true`, un bouton toggle `"Voir le print"` remplace l'affichage — le prix original disparaît, les options print apparaissent.
2. **L'utilisateur choisit** :
   - **Format** : A4 (21×29.7cm), A3 (29.7×42cm), 30×40cm, 50×70cm
   - **Papier** : Premium Matt, Fine Art Paper, Lustre Photo
   - **Encadrement** : Non / Cadre noir / Cadre blanc
3. **Prix calculé** dynamiquement (via API Gelato ou lookup local) et affiché.
4. **"Ajouter au panier"** → stocké dans `localStorage` (persiste entre les pages).
5. **L'utilisateur continue** sa navigation sur le site, visite d'autres œuvres avec print activé, ajoute d'autres prints au même panier.
6. **Icône panier** dans le header (badge avec compteur) → tiroir latéral ou dropdown récapitulatif : produit, variante, quantité, prix unitaire, total.
7. **"Passer la commande"** → redirection vers le **checkout Gelato** (ou formulaire de commande simplifié + paiement Stripe).
8. **Confirmation** : email via Brevo (déjà intégré) + tracking Gelato envoyé par email.

### Données — Schema Sanity

**Sur `artwork`**, ajouter :

```ts
defineField({
  name: 'printEnabled',
  title: 'Print available',
  type: 'boolean',
  initialValue: false,
})
```

Optionnel : un document `printProduct` lié à l'artwork si on veut des réglages fins (images cropées pour print, variantes custom, marges).

### Frontend — Composants à créer

| Composant | Rôle |
|-----------|------|
| `PrintToggle` | Bascule entre vue œuvre originale et vue print (bouton + state) |
| `PrintOptions` | Sélecteur format × papier × cadre avec prix dynamique |
| `PrintCartDrawer` | Tiroir panier latéral (accessible depuis le header) |
| `PrintCartProvider` | Contexte React + localStorage pour le panier |
| `CheckoutButton` | Redirection vers checkout Gelato ou formulaire de paiement |

### API Routes (Vercel)

| Route | Rôle |
|-------|------|
| `POST /api/gelato/products` | Créer/mettre à jour un produit print dans Gelato |
| `POST /api/gelato/price` | Obtenir un devis (print + shipping) pour une variante |
| `POST /api/gelato/orders` | Créer une commande Gelato |
| `POST /api/gelato/webhook` | Recevoir les mises à jour de statut (en production, expédié) |

### Gestion du panier & suivi client

- **Panier** : 100% client-side (`localStorage`). Pas de compte utilisateur requis. Pas de panier général — le print-cart est isolé, ne touche pas aux œuvres originales.
- **Checkout** : au choix —
  - **Checkout Gelato direct** (recommandé) : Gelato gère paiement + expédition + tracking. Pas de données bancaires à gérer.
  - **Formulaire custom** : nom, email, adresse → appel API Gelato pour créer la commande → email confirmation Brevo + tracking de Gelato transmis par email.
- **Suivi** : Gelato envoie directement l'email de confirmation d'expédition avec le tracking number (colis). Aucune gestion côté site.

### Architecture technique

```
Sanity (printEnabled + images)
        │
        ▼
Page œuvre ── toggle ──► PrintOptions (format × papier × cadre)
        │                      │
        │                      ▼
        │              localStorage (panier)
        │                      │
        │                      ▼
        │              Checkout ──► Gelato API ──► Fabrication + Expédition
        │                                    │
        │                                    ▼
        │                               Email tracking (Gelato → client)
        │
        └──► InquireModal (inchangé pour œuvres originales)
```

### Notes

- **Per-œuvre** : `printEnabled: false` par défaut. Seules les œuvres explicitement activées dans Sanity affichent le toggle print.
- **Pas de conflit** avec le système existant : le `InquireModal` reste pour les œuvres originales, le panier print est géré à part.
- **Gelato** : compte gratuit, API REST, paiement à l'unité. Pas d'abonnement.

| Feature | Priorité | Effort |
|---------|----------|--------|
| Schema `printEnabled` + `PrintToggle` basique | 🔴 | 1 jour |
| `PrintOptions` (format × papier × cadre) | 🔴 | 2 jours |
| `PrintCartDrawer` + `localStorage` | 🔴 | 1 jour |
| `POST /api/gelato/products` + sync catalogue | 🟡 | 2 jours |
| `POST /api/gelato/orders` + checkout | 🟡 | 2 jours |
| Webhook + email confirmation | 🟢 | 0.5 jour |
| **Total** | | **~8.5 jours** |

---

## Priorisation recommandée

### 🔥 Phase 1 — SEO blast (crawlable, partageable, indexable)
- [x] OG tags + images sur toutes les pages
- [x] Sitemap + robots.ts
- [x] Metadata homepage enrichie
- [x] Harmonisation des titres
- [x] URL canonique
- [ ] JSON-LD structured data
- [ ] tarteaucitron (cookie consent)
- [ ] GA4 / Analytics

### 🔥 Phase 2 — Haute valeur métier
6. Backend inquiry (remplace `mailto:`)
7. Statut de disponibilité en temps réel sur les cards
8. Filtres plus riches sur `/works` (année, prix, medium, format)
9. "Why Collect This Work" (section éditoriale par œuvre)
10. Zoom haute résolution sur les pages œuvre
11. JSON-LD structured data
12. Lightbox

### 🚀 Phase 3 — Découverte & Éditorial
13. Recherche globale
14. Tags / thèmes transversaux
15. Archive newsletter visible
16. Bilingual content FR/EN (framework i18n ready)
17. Partage direct d'une œuvre
18. Agent curateur actif (BRIEF-IA)
19. Cookie consent + GA4

### 🌟 Phase 4 — Différenciation & Réseau
20. Exhibitions (nouveau content type)
21. Portfolio enrichi (CV, expositions, presse)
22. Studio Visit / Vidéo
23. Collectors / Témoignages
24. Press & Mentions
25. Open Studios / Events
26. Artist Dashboard privé
27. Wishlist / Account collector
28. Curatorial Partnerships

### 🔭 Phase 5 — Expérience avancée
29. Vue "salle d'exposition" / Room View
30. Comparaison d'œuvres

### 🖨️ Phase 6 — Prints on Demand
31. Schema `printEnabled` + `PrintToggle` basique
32. `PrintOptions` (format × papier × cadre)
33. `PrintCartDrawer` + localStorage panier
34. Sync catalogue Gelato + API routes
35. Checkout + webhook de statut

---

> Dernière mise à jour : 19 juin 2026 — ajout section Prints on Demand (Gelato) : use case complet, schéma, composants, API, architecture, estimation d'effort.
