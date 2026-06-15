import type { Metadata } from 'next'
import HomeContent from './HomeContent'
import {
  getLatestArticles,
  getAllArtists,
  getAvailableArtworks,
} from '@/lib/sanity/queries'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AH \u2014 Milans | A curated gallery of contemporary artists',
  description: 'Discover emerging and established contemporary artists. AH \u2014 Milans connects collectors with a curated selection of original artworks.',
  openGraph: {
    title: 'AH \u2014 Milans | A curated gallery of contemporary artists',
    description: 'Discover emerging and established contemporary artists. AH \u2014 Milans connects collectors with a curated selection of original artworks.',
    url: 'https://ahmilans.gallery',
  },
  twitter: {
    title: 'AH \u2014 Milans | A curated gallery of contemporary artists',
    description: 'Discover emerging and established contemporary artists. AH \u2014 Milans connects collectors with a curated selection of original artworks.',
  },
  alternates: {
    canonical: 'https://ahmilans.gallery',
  },
}

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
  const [articles, artists, allArtworks] = await Promise.all([
    getLatestArticles(),
    getAllArtists(),
    getAvailableArtworks(),
  ])

  // Pass up to 24 shuffled artworks — client-side rotation picks 8 at a time
  const shuffledArtworks = shuffle((allArtworks ?? []) as ArtworkPreview[]).slice(0, 24)

  return (
    <HomeContent
      articles={(articles ?? []) as ArticlePreview[]}
      roster={(artists ?? []) as ArtistPreview[]}
      collection={shuffledArtworks}
    />
  )
}
