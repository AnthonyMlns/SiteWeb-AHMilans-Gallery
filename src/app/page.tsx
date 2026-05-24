import HomeContent from './HomeContent'
import {
  getHomepageSettings,
  getLatestArticles,
  getAllArtists,
  getAvailableArtworks,
} from '@/lib/sanity/queries'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

export const revalidate = 60

/** Fisher-Yates shuffle — runs server-side, safe for SSR */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default async function HomePage() {
  const [settings, articles, artists, allArtworks] = await Promise.all([
    getHomepageSettings(),
    getLatestArticles(),
    getAllArtists(),
    getAvailableArtworks(),
  ])

  // Pick 4 random artworks from the full catalogue
  const randomArtworks = shuffle((allArtworks ?? []) as ArtworkPreview[]).slice(0, 4)

  return (
    <HomeContent
      settings={settings}
      articles={(articles ?? []) as ArticlePreview[]}
      roster={(artists ?? []) as ArtistPreview[]}
      collection={randomArtworks}
    />
  )
}
