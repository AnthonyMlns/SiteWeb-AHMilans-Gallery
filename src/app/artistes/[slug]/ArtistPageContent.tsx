'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import ArtworkCard from '@/components/cards/ArtworkCard'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtistPreview, ArtworkPreview } from '@/lib/types'

interface ArtistFull extends ArtistPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[]
  instagramUrl?: string
  artworks?: ArtworkPreview[]
}

interface ArtistPageContentProps {
  artist: ArtistFull
}

export default function ArtistPageContent({ artist }: ArtistPageContentProps) {
  const { t } = useTranslation()
  const heroImage = artist.featuredImageUrl ?? artist.profileImageUrl
  const artworks: ArtworkPreview[] = artist.artworks ?? []

  return (
    <MainLayout>
      {/* Hero pleine largeur */}
      <section className="relative h-[90vh] min-h-[500px] w-full overflow-hidden bg-placeholder">
        {heroImage && (
          <Image
            src={heroImage}
            alt={artist.name}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-[#111111]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 lg:px-16 lg:pb-16">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-white/60">
            {[artist.country, artist.style].filter(Boolean).join(' · ')}
          </p>
          <h1
            className="font-serif leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            {artist.name}
          </h1>
        </div>
        <Link
          href="/artistes"
          className="absolute left-8 top-8 text-[10px] uppercase tracking-widest text-white/60 transition-opacity hover:text-white lg:left-16"
        >
          {t.artists.backLink}
        </Link>
      </section>

      {/* Bio */}
      {(artist.bio || artist.instagramUrl) && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          {artist.bio && <PortableTextRenderer value={artist.bio} />}
          {artist.instagramUrl && (
            <div className="mt-8">
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                Instagram
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          )}
        </section>
      )}

      {/* Œuvres */}
      {artworks.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-10 border-b border-border pb-5">
            <h2 className="font-serif text-3xl text-foreground">
              {t.artists.worksHeading}
              <span className="ml-3 font-sans text-base font-light text-muted">
                ({artworks.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  )
}
