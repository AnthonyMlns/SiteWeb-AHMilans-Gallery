import type { Metadata } from 'next'
import CuratesContent from './CuratesContent'
import { getAllCurates } from '@/lib/sanity/queries'
import type { ArticlePreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "AH Milans Curates — AH — Milans",
  description: "A weekly curated selection of artworks from AH Milans.",
}

export default async function CuratesPage() {
  const curates: ArticlePreview[] = (await getAllCurates()) ?? []
  return <CuratesContent curates={curates} />
}
