import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import MainLayout from '@/components/layout/MainLayout'
import ArtworkFilter from '@/components/artwork/ArtworkFilter'
import { getAvailableArtworks } from '@/lib/sanity/queries'
import type { ArtworkPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Artworks \u2014 Contemporary Abstract Art Collection | AH Milans Gallery",
  description: "Browse the AH Milans collection \u2014 original contemporary abstract paintings and mixed media works by emerging and mid-career artists.",
  openGraph: {
    title: "Artworks \u2014 Contemporary Abstract Art Collection | AH Milans Gallery",
    description: "Browse the AH Milans collection \u2014 original contemporary abstract paintings and mixed media works by emerging and mid-career artists.",
    url: `${SITE_URL}/works`,
  },
  twitter: {
    title: "Artworks \u2014 Contemporary Abstract Art Collection | AH Milans Gallery",
    description: "Browse the AH Milans collection \u2014 original contemporary abstract paintings and mixed media works by emerging and mid-career artists.",
  },
  alternates: {
    canonical: `${SITE_URL}/works`,
  },
}

export default async function OeuvresPage() {
  const artworks: ArtworkPreview[] = (await getAvailableArtworks()) ?? []

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">Works</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">Works chosen for their intrinsic quality, each documented and directly tied to the artist who made them.</p>
        </div>
        <ArtworkFilter artworks={artworks} />
      </div>
    </MainLayout>
  )
}
