import type { Metadata } from 'next'
import CuratesContent from './CuratesContent'
import { getAllCurates } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Curates \u2014 AH \u2014 Milans",
  description: "A weekly curated selection of artworks from AH \u2014 Milans.",
  openGraph: {
    title: "Curates \u2014 AH \u2014 Milans",
    description: "A weekly curated selection of artworks from AH \u2014 Milans.",
    url: "https://ahmilans.gallery/curates",
  },
  twitter: {
    title: "Curates \u2014 AH \u2014 Milans",
    description: "A weekly curated selection of artworks from AH \u2014 Milans.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/curates",
  },
}

export default async function CuratesPage() {
  const curates = (await getAllCurates()) ?? []
  return <CuratesContent curates={curates} />
}
