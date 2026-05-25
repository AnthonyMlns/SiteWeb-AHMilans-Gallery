import type { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import ArtworkFilter from '@/components/artwork/ArtworkFilter'
import { getAvailableArtworks } from '@/lib/sanity/queries'
import type { ArtworkPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Works — Ahmilan's Gallery",
  description: "All works available for acquisition.",
}

export default async function OeuvresPage() {
  const artworks: ArtworkPreview[] = (await getAvailableArtworks()) ?? []

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">Works</h1>
        </div>
        <ArtworkFilter artworks={artworks} />
      </div>
    </MainLayout>
  )
}
