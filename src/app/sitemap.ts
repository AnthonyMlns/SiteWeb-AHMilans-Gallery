import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import {
  getAllArtistSlugs,
  getAllArticleSlugs,
  getAllArtworkSlugs,
  getAllCuratesSlugs,
} from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artistSlugs, articleSlugs, artworkSlugs, curateSlugs] = await Promise.all([
    getAllArtistSlugs().catch(() => []),
    getAllArticleSlugs().catch(() => []),
    getAllArtworkSlugs().catch(() => []),
    getAllCuratesSlugs().catch(() => []),
  ])

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/works`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/artists`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/editorial`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/curates`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
  ]

  const artistPages = artistSlugs.map((s) => ({
    url: `${SITE_URL}/artists/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const artworkPages = artworkSlugs.map((s) => ({
    url: `${SITE_URL}/works/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articlePages = articleSlugs.map((s) => ({
    url: `${SITE_URL}/editorial/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const curatePages = curateSlugs.map((s) => ({
    url: `${SITE_URL}/curates/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...artistPages,
    ...artworkPages,
    ...articlePages,
    ...curatePages,
  ]
}
