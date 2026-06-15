import type { Metadata } from 'next'
import ArtistesContent from './ArtistesContent'
import { getAllArtists } from '@/lib/sanity/queries'
import type { ArtistPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Artists \u2014 AH \u2014 Milans",
  description: "Discover all artists represented by AH \u2014 Milans.",
  openGraph: {
    title: "Artists \u2014 AH \u2014 Milans",
    description: "Discover all artists represented by AH \u2014 Milans.",
    url: "https://ahmilans.gallery/artists",
  },
  twitter: {
    title: "Artists \u2014 AH \u2014 Milans",
    description: "Discover all artists represented by AH \u2014 Milans.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/artists",
  },
}

export default async function ArtistesPage() {
  const artists: ArtistPreview[] = (await getAllArtists()) ?? []
  return <ArtistesContent artists={artists} />
}
