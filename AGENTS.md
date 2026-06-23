<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-roadmap -->
# Projet — AH Milans Gallery

## Stack
- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity v3
- **Hébergement**: Vercel (Hobby)
- **Email**: Brevo API
- **IA**: Anthropic Claude Sonnet (API directe, pas OpenAI)
- **Images IA**: Replicate (Flux) — optionnel

## Pipeline d'automatisation

```
Calendar JSON → TU FOURNIS (.md) ou IA GÉNÈRE (Sonnet)
       → Draft Sanity → Validation humaine → Publication
       → Newsletter (Brevo) → Curateur (rotation featured)
```

## Scripts à créer

| Script | Rôle | Statut |
|--------|------|--------|
| `scripts/editorial-agent.mjs` | Lit le calendrier → Sonnet → Sanity draft | ❌ |
| `scripts/newsletter-agent.mjs` | Compile la semaine → Brevo | ❌ |
| `scripts/curator-agent.mjs` | Rotation featured → Sanity | ❌ |
| `content/editorial-calendar.json` | Calendrier 52 semaines (extraire du HTML) | ❌ |
| `.github/workflows/editorial-weekly.yml` | Cron hebdo | ❌ |
| `.github/workflows/newsletter-weekly.yml` | Cron hebdo | ❌ |
| `.github/workflows/curator-weekly.yml` | Cron hebdo | ❌ |

## Dépendances à ajouter
- `@anthropic-ai/sdk` (au lieu de `openai`)

## Règles
- L'IA ne publie jamais — elle crée des drafts dans Sanity
- Les prix des œuvres sont définis manuellement (pas d'IA)
- Budget API cap : ~$5/mois max
- Toujours garder un humain dans la boucle pour la validation
<!-- END:project-roadmap -->
