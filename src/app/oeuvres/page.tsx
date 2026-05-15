import type { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import ArtworkFilter from '@/components/artwork/ArtworkFilter'
import { getAvailableArtworks } from '@/lib/sanity/queries'
import type { ArtworkPreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Œuvres — Ahmilan's Gallery",
  description: "Toutes les œuvres disponibles à l'acquisition.",
}

export default async function OeuvresPage() {
  const artworks: ArtworkPreview[] = (await getAvailableArtworks()) ?? []

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 border-b border-border pb-6">
          <h1 className="font-serif text-5xl text-foreground">Œuvres</h1>
        </div>
        <ArtworkFilter artworks={artworks} />
      </div>
    </MainLayout>
  )
}
