import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import CuratesContent from './CuratesContent'
import { getAllCurates } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
  description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
  openGraph: {
    title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
    description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
    url: `${SITE_URL}/curates`,
  },
  twitter: {
    title: "AH Milans Curates \u2014 Weekly Artwork Selection | AH Milans Gallery",
    description: "A weekly curated selection of artworks from AH Milans Gallery \u2014 one artwork, one story, every Friday.",
  },
  alternates: {
    canonical: `${SITE_URL}/curates`,
  },
}

export default async function CuratesPage() {
  const curates = (await getAllCurates()) ?? []
  return <CuratesContent curates={curates} />
}
