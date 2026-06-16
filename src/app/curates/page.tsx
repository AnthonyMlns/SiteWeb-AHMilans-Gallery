import type { Metadata } from 'next'
import CuratesContent from './CuratesContent'
import { getAllCurates } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
  description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
  openGraph: {
    title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
    description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
    url: "https://ahmilans.gallery/curates",
  },
  twitter: {
    title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
    description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/curates",
  },
}

export default async function CuratesPage() {
  const curates = (await getAllCurates()) ?? []
  return <CuratesContent curates={curates} />
}
