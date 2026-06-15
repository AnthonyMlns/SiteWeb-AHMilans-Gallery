import type { Metadata } from 'next'
import MobileContent from './MobileContent'
import { getAllArtists, getRandomArtworks, getLatestArticles } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: "AH \u2014 Milans",
  description: "Link in bio \u2014 AH Milans",
  openGraph: {
    title: "AH \u2014 Milans",
    description: "Link in bio \u2014 AH Milans",
    url: "https://ahmilans.gallery/mobile",
  },
  twitter: {
    title: "AH \u2014 Milans",
    description: "Link in bio \u2014 AH Milans",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/mobile",
  },
}

export default async function MobilePage() {
  const [artists, randomWorks, latestArticles] = await Promise.all([
    getAllArtists(),
    getRandomArtworks(4),
    getLatestArticles(),
  ])

  return <MobileContent artists={artists} randomWorks={randomWorks} latestArticles={latestArticles} />
}
