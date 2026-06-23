import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import NewsletterContent from './NewsletterContent'
import { getFeaturedArtworks } from '@/lib/sanity/queries'
import type { ArtworkPreview } from '@/lib/types'

export const metadata: Metadata = {
  title: "Newsletter \u2014 AH \u2014 Milans",
  description: "Not your average newsletter. Best emerging artist updates.",
  openGraph: {
    title: "Newsletter \u2014 AH \u2014 Milans",
    description: "Not your average newsletter. Best emerging artist updates.",
    url: `${SITE_URL}/newsletter`,
  },
  twitter: {
    title: "Newsletter \u2014 AH \u2014 Milans",
    description: "Not your average newsletter. Best emerging artist updates.",
  },
  alternates: {
    canonical: `${SITE_URL}/newsletter`,
  },
}

export const revalidate = 3600

export default async function NewsletterPage() {
  const artworks = (await getFeaturedArtworks()) as ArtworkPreview[]
  const heroImageUrl = artworks?.[0]?.images?.[0]?.url ?? null

  return <NewsletterContent heroImageUrl={heroImageUrl} />
}
