import type { Metadata } from 'next'
import ArtistesContent from './ArtistesContent'
import { getAllArtists } from '@/lib/sanity/queries'
import type { ArtistPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Artists — AH — Milans",
  description: "Discover all artists represented by AH — Milans.",
}

export default async function ArtistesPage() {
  const artists: ArtistPreview[] = (await getAllArtists()) ?? []
  return <ArtistesContent artists={artists} />
}
