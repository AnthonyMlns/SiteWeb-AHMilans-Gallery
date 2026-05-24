import type { Metadata } from 'next'
import NewsletterContent from './NewsletterContent'
import { getFeaturedArtworks } from '@/lib/sanity/queries'
import type { ArtworkPreview } from '@/lib/types'

export const metadata: Metadata = {
  title: "Newsletter — AH Milans",
  description: "Not your average newsletter. Best emerging artist updates.",
}

export const revalidate = 3600

export default async function NewsletterPage() {
  const artworks = (await getFeaturedArtworks()) as ArtworkPreview[]
  const heroImageUrl = artworks?.[0]?.images?.[0]?.url ?? null

  return <NewsletterContent heroImageUrl={heroImageUrl} />
}
