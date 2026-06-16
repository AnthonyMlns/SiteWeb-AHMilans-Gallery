import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArtistPageContent from './ArtistPageContent'
import { getArtistBySlug, getAllArtistSlugs, getArtistCurates } from '@/lib/sanity/queries'

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
  const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl
  const title = `${artist.name} \u2014 AH \u2014 Milans`
  const rawDesc = artist.statementCourt || `${artist.name} is a ${artist.style || 'contemporary'} artist represented by AH Milans Gallery.`
  const description = rawDesc.length > 160 ? rawDesc.slice(0, rawDesc.lastIndexOf(' ', 157)) + '...' : rawDesc
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ahmilans.gallery/artists/${artist.slug.current}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://ahmilans.gallery/artists/${artist.slug.current}`,
    },
  }
}

export default async function ArtistePage({ params }: Props) {
  const { slug } = await params
  const [artist, curates] = await Promise.all([
    getArtistBySlug(slug),
    getArtistCurates(slug),
  ])
  if (!artist) notFound()
  return <ArtistPageContent artist={artist} curateCount={curates.length} />
}
