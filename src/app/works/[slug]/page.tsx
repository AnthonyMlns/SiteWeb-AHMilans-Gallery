import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArtworkPageContent from './ArtworkPageContent'
import { getArtworkBySlug, getAllArtworkSlugs } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllArtworkSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artwork = await getArtworkBySlug(slug)
  if (!artwork) return {}
  return {
    title: `${artwork.title} — Ahmilan's Gallery`,
    description: artwork.medium
      ? `${artwork.title}, ${artwork.medium}${artwork.year ? `, ${artwork.year}` : ''}.`
      : undefined,
  }
}

export default async function OeuvrePage({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtworkBySlug(slug)
  if (!artwork) notFound()
  return <ArtworkPageContent artwork={artwork} />
}
