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
  const imageUrl = artwork.images?.[0]?.url
  const title = `${artwork.title} \u2014 AH \u2014 Milans`
  const description = artwork.medium
    ? `${artwork.title}, ${artwork.medium}${artwork.year ? `, ${artwork.year}` : ''}.`
    : undefined
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ahmilans.gallery/works/${artwork.slug.current}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://ahmilans.gallery/works/${artwork.slug.current}`,
    },
  }
}

export default async function OeuvrePage({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtworkBySlug(slug)
  if (!artwork) notFound()
  return <ArtworkPageContent artwork={artwork} />
}
