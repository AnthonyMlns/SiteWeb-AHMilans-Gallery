import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import ArtistesContent from './ArtistesContent'
import { getAllArtists } from '@/lib/sanity/queries'
import type { ArtistPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Artists \u2014 Contemporary Abstract Painters | AH Milans Gallery Roster",
  description: "Explore AH Milans Gallery\u2019s curated roster of contemporary abstract artists from France, Germany, the US, and beyond.",
  openGraph: {
    title: "Artists \u2014 Contemporary Abstract Painters | AH Milans Gallery Roster",
    description: "Explore AH Milans Gallery\u2019s curated roster of contemporary abstract artists from France, Germany, the US, and beyond.",
    url: `${SITE_URL}/artists`,
  },
  twitter: {
    title: "Artists \u2014 Contemporary Abstract Painters | AH Milans Gallery Roster",
    description: "Explore AH Milans Gallery\u2019s curated roster of contemporary abstract artists from France, Germany, the US, and beyond.",
  },
  alternates: {
    canonical: `${SITE_URL}/artists`,
  },
}

export default async function ArtistesPage() {
  const artists: ArtistPreview[] = (await getAllArtists()) ?? []
  return <ArtistesContent artists={artists} />
}
