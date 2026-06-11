import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CuratePageContent from './CuratePageContent'
import { getCurateBySlug, getAllCuratesSlugs } from '@/lib/sanity/queries'

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
  return {
    title: `${curate.title} — AH Milans Curates`,
    description: curate.excerpt,
  }
}

export default async function CuratePage({ params }: Props) {
  const { slug } = await params
  const curate = await getCurateBySlug(slug)
  if (!curate) notFound()
  return <CuratePageContent curate={curate} />
}
