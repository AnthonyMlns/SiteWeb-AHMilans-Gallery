import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import CuratePageContent from './CuratePageContent'
import { getCurateBySlug, getAllCuratesSlugs, getAdjacentCurates } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllCuratesSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const curate = await getCurateBySlug(slug)
  if (!curate) return {}
  const imageUrl = curate.thumbnailUrl ?? curate.relatedArtwork?.images?.[0]?.url
  const title = `${curate.title} \u2014 AH \u2014 Milans`
  const description = curate.excerpt
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/curates/${curate.slug.current}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/curates/${curate.slug.current}`,
    },
  }
}

export default async function CuratePage({ params }: Props) {
  const { slug } = await params
  const curate = await getCurateBySlug(slug)
  if (!curate) notFound()
  const adjacent = curate.publishedAt ? await getAdjacentCurates(curate.publishedAt) : { prev: null, next: null }
  return <CuratePageContent curate={curate} prev={adjacent.prev} next={adjacent.next} />
}
