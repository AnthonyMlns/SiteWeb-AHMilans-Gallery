# Brief — Gestion IA d'AH — Milans Gallery

> Site entièrement piloté par des agents IA : production éditoriale, curation, newsletter, relation collector, SEO.

---

## Vision

Remplacer ~95% du travail humain de production et d'opérations par des pipelines d'agents IA, tout en gardant un humain dans la boucle pour la validation éditoriale et la direction artistique.

---

## Architecture générale

```
                    ┌─────────────────────────────────────┐
                    │      Orchestrateur (GitHub Cron)     │
                    │  Planifie, dispatch, valide, publie  │
                    └──────────┬──────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                      ▼
   ┌──────────┐        ┌──────────────┐      ┌──────────────┐
   │ Éditorial│        │    Visuel    │      │  Curateur    │
   │ Agent    │        │   Agent      │      │  Agent       │
   │          │        │              │      │              │
   │ • Articles│       │ • Social     │      │ • Featured   │
   │ • Bios   │        │   cards      │      │   selection  │
   │ • Descr. │        │ • Bannières  │      │ • Rotation   │
   │ • SEO    │        │ • Optimisation│     │   roster     │
   │ • Trad.  │        │              │      │              │
   └─────┬────┘        └──────┬───────┘      └──────┬───────┘
         │                    │                      │
         ▼                    ▼                      ▼
   ┌──────────────────────────────────────────────────────┐
   │                 Sanity CMS (Content Lake)              │
   │    Toute la production transite par Sanity Studio     │
   └────────────────────┬─────────────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
   ┌──────────┐   ┌────────────┐   ┌──────────┐
   │  Vercel  │   │ Newsletter │   │  Social  │
   │ Next.js  │   │   Agent    │   │  Agent   │
   │ ISR/SSR  │   │  (Brevo)   │   │(Manuel ou│
   │          │   │            │   │ API)     │
   └──────────┘   └─────┬──────┘   └──────────┘
                        │
                  ┌─────┴──────┐
                  │  Inquiry   │
                  │   Agent    │
                  │  (Email)   │
                  └────────────┘
```

---

## Agents détaillés

### 1. Agent Éditorial
**Modèle** : GPT-4o-mini (coût négligeable)
**Déclencheur** : Hebdomadaire + on-demand

| Tâche | Fréquence | Estimation tokens/mois |
|-------|-----------|----------------------|
| Rédaction article (Interview/Focus/Essay) | 4/mois | 24K |
| Mise à jour bios artistes | 2/mois | 5K |
| Description œuvres | 10/mois | 13K |
| SEO metadata (title, description, alt) | 50 pages | 30K |
| Traduction FR ↔ EN | 4 articles | 40K |
| **Total** | | **~112K tokens** → **~$0.02/mois**

**Prompt système** : Connaît la ligne éditoriale (LLM.md), le ton « curatorial label », les 4 catégories d'articles, la structure Portable Text.

### 2. Agent Visuel
**Modèle** : Flux via Replicate (~$0.03/image) ou GPT Image 1 Mini ($0.005/image)
**Déclencheur** : À la publication d'article ou d'œuvre

| Tâche | Quantité | Coût |
|-------|----------|------|
| Social cards (1200×630) | 8/mois | $0.24 |
| Bannières newsletter | 4/mois | $0.12 |
| Visuels articles | 4/mois | $0.12 |
| **Total** | | **~$0.48/mois** |

### 3. Agent Curateur
**Modèle** : GPT-4o-mini
**Déclencheur** : Hebdomadaire

- Sélectionne artiste à la une (`featured`) selon critères (nouveauté, saison, équilibre médiums)
- Sélectionne œuvre du mois
- Suggère rotation des articles en home
- **Coût** : ~$0.005/mois

### 4. Agent Newsletter
**Modèle** : GPT-4o-mini
**Déclencheur** : Hebdomadaire via GitHub Actions cron

- Compile les 3-4 actualités de la semaine
- Rédige l'éditorial + résumés
- Génère l'email via Brevo API
- **Coût** : ~$0.01/mois + Brevo (gratuit 300/jour)

### 5. Agent Inquiry (Relation Collector)
**Modèle** : GPT-4o (pas mini — besoin de qualité pour les clients)
**Déclencheur** : Webhook contact@ → API → analyse → draft réponse

- Analyse la demande (œuvre, budget, urgence)
- Rédige réponse personnalisée avec prix, disponibilité, contexte artiste
- Envoie via Brevo transactional
- **Volume** : ~10-20/mois
- **Coût** : ~$0.15/mois

### 6. Agent Analytics
**Modèle** : GPT-4o-mini
**Déclencheur** : Mensuel

- Lis les logs Vercel Analytics ou un export
- Suggère optimisations SEO, améliorations contenu
- **Coût** : ~$0.01/mois

---

## Infrastructure

### Plan de contrôle (orchestration)
```
GitHub Actions (.github/workflows/)
├── editorial-weekly.yml      → Agent Éditorial + publication Sanity
├── newsletter-weekly.yml     → Agent Newsletter → Brevo
├── curator-weekly.yml        → Agent Curateur → mise à jour featured
├── analytics-monthly.yml     → Rapport d'optimisation
└── deploy-on-push.yml        → Build + Deploy Vercel (CI/CD actuel)
```

### Webhooks (temps réel)
```
Sanity Webhook → Vercel API Route → Revalidation ISR
Contact Form   → Vercel API Route → Inquiry Agent → Brevo Email
```

---

## Budget mensuel total

| Poste | Lean (Free tiers) | Standard |
|-------|:-:|:-:|
| Vercel | $0 (Hobby) | $20 (Pro) |
| Sanity | $0 (Free) | $15 (Growth) |
| GitHub Actions | $0 (crons gratuits) | $0 |
| Brevo | $0 (300/jour) | $25 (Starter, 5K/mois) |
| OpenAI GPT-4o-mini | $0.03 | $0.10 |
| OpenAI GPT-4o (inquiries) | $0.15 | $0.50 |
| Replicate (images) | $0.48 | $2.00 |
| Domaine | $0 | $0 |
| **Total / mois** | **~$0.66** | **~$62.60** |

---

## Roadmap de déploiement

### Phase 1 — Socle (Semaine 1)
- [ ] Créer les GitHub Actions workflows
- [ ] Script de connexion OpenAI API + Sanity client
- [ ] Pipeline article : prompt → Sanity document (draft)
- [ ] Validation manuelle dans Sanity Studio avant publication

### ✅ Fait
- Pipeline d'import MD → Sanity (`scripts/import-articles.mjs`)

### Phase 2 — Automatisation (Semaine 2)
- [ ] Pipeline newsletter : contenu → Brevo
- [ ] Agent curateur : rotation featured
- [ ] SEO metadata generator
- [ ] Traduction automatique FR/EN

### Phase 3 — Relation Client (Semaine 3)
- [ ] Agent Inquiry : email → analyse → draft réponse
- [ ] Webhook Sanity → revalidation Vercel
- [ ] Monitoring coûts et alertes budget

### Phase 4 — Optimisation (Semaine 4+)
- [ ] Agent Analytics : rapport mensuel automatique
- [ ] Page "link in bio" (mobile uniquement) → `./mobile`
- [ ] A/B testing de prompts itératif
- [ ] Fine-tuning éventuel d'un petit modèle sur le ton éditorial

---

## Stack technique recommandée

| Composant | Technologie |
|-----------|-------------|
| Orchestration cron | GitHub Actions |
| LLM principal | OpenAI GPT-4o-mini (coût) / GPT-4o (qualité inquiries) |
| Image génération | Replicate (Flux) |
| CMS | Sanity v3 (existant) |
| Framework | Next.js 16 (existant) |
| Hébergement | Vercel (existant) |
| Email transactionnel | Brevo API (existant) |
| SDK IA | Vercel AI SDK ou OpenAI SDK direct |
| Monitoring coûts | OpenAI Usage Dashboard + alertes |

---

## Publication d'articles via fichiers Markdown

Les articles peuvent être écrits en local dans `content/articles/` au format Markdown avec frontmatter, puis importés dans Sanity :

```bash
npm run articles:import
```

### Format du frontmatter

```yaml
---
title: "Titre de l'article"
slug: "titre-de-larticle"
category: "interview" | "focus" | "news" | "essay"
publishedAt: "2026-06-01T10:00:00Z"
readTime: 6
excerpt: "Résumé court (affiché dans la liste des articles)"
featured: true
relatedArtist: null  # ou le slug d'un artiste existant
---
```

### Syntaxe supportée dans le body

- `## Heading` / `### Heading` — titres
- `> Citation` — blockquote
- `- Liste` — listes à puces
- `**gras**`, `*italique*`, `***gras italique***`
- `[texte](url)` — liens
- Paragraphes séparés par une ligne vide

### Prérequis

- `SANITY_API_TOKEN` doit être défini dans `.env.local`
- Le token doit avoir les droits **editor** (création/édition de documents)

---

## Limites & garde-fous

- **Validation humaine obligatoire** pour les articles avant publication
- **Ne pas générer d'images d'œuvres originales** → utiliser uniquement les visuels uploadés dans Sanity
- **Ton éditorial strict** : le label ne doit pas sonner comme un blog automatique → prompts très cadrés
- **Budget API cap** : $5/mois max (sécurisé côté OpenAI)
- **Pas d'IA dans le pricing** : les prix des œuvres sont définis manuellement
- **Fallback** : si API LLM indisponible, les crons passent leur tour (pas de blocage)
