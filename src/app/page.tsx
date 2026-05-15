import HomeContent from './HomeContent'
import {
  getHomepageSettings,
  getLatestArticles,
  getAllArtists,
  getFeaturedArtworks,
} from '@/lib/sanity/queries'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

export const revalidate = 60

export default async function HomePage() {
  const [settings, articles, artists, featuredArtworks] = await Promise.all([
    getHomepageSettings(),
    getLatestArticles(),
    getAllArtists(),
    getFeaturedArtworks(),
  ])

  return (
    <HomeContent
      settings={settings}
      articles={(articles ?? []) as ArticlePreview[]}
      roster={(artists ?? []) as ArtistPreview[]}
      collection={(featuredArtworks ?? []) as ArtworkPreview[]}
    />
  )
}
