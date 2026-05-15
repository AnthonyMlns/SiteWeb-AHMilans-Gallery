import type { Metadata } from 'next'
import ArtistesContent from './ArtistesContent'
import { getAllArtists } from '@/lib/sanity/queries'
import type { ArtistPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Artistes — Ahmilan's Gallery",
  description: "Découvrez tous les artistes représentés par Ahmilan's Gallery.",
}

export default async function ArtistesPage() {
  const artists: ArtistPreview[] = (await getAllArtists()) ?? []
  return <ArtistesContent artists={artists} />
}
