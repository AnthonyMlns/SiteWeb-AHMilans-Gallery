import type { Metadata } from 'next'
import MobileContent from './MobileContent'
import { getAllArtists, getRandomArtworks, getLatestArticles } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: "AH — Milans",
  description: "Link in bio — AH Milans",
}

export default async function MobilePage() {
  const [artists, randomWorks, latestArticles] = await Promise.all([
    getAllArtists(),
    getRandomArtworks(4),
    getLatestArticles(),
  ])

  return <MobileContent artists={artists} randomWorks={randomWorks} latestArticles={latestArticles} />
}
