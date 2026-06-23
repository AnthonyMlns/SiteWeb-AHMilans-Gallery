import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
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
  const artistName = artwork.artist?.name || ''
  const mediumShort = artwork.medium?.replace(' on Canvas', '') || ''
  const metaTitle = `"${artwork.title}"${artistName ? ` by ${artistName}` : ''}${mediumShort ? ` — ${mediumShort}` : ''}${artwork.year ? `, ${artwork.year}` : ''} | AH Milans`
  const firstDescText = artwork.description?.[0]?.children?.[0]?.text || ''
  const cleanDesc = firstDescText.replace(/^["']|["']$/g, '').trim()
  const metaDesc = cleanDesc
    ? `${cleanDesc} Available at AH Milans Gallery.`
    : `"${artwork.title}" by ${artistName}${artwork.year ? ` (${artwork.year})` : ''}${mediumShort ? ` — ${mediumShort}` : ''}. Available at AH Milans Gallery.`
  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_URL}/works/${artwork.slug.current}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/works/${artwork.slug.current}`,
    },
  }
}

export default async function OeuvrePage({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtworkBySlug(slug)
  if (!artwork) notFound()
  return <ArtworkPageContent artwork={artwork} />
}
