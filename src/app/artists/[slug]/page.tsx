import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArtistPageContent from './ArtistPageContent'
import { getArtistBySlug, getAllArtistSlugs } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllArtistSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) return {}
  return {
    title: `${artist.name} — Ahmilan's Gallery`,
    description: `Discover artworks by ${artist.name}${artist.country ? ` (${artist.country})` : ''}.`,
  }
}

export default async function ArtistePage({ params }: Props) {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) notFound()
  return <ArtistPageContent artist={artist} />
}
