import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import ArtworkCard from '@/components/cards/ArtworkCard'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import FadeIn from '@/components/ui/FadeIn'
import type { ArtistPreview, ArtworkPreview } from '@/lib/types'

interface ArtistFull extends ArtistPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[]
  instagramUrl?: string
  website?: string
  artworks?: ArtworkPreview[]
}

interface ArtistPageContentProps {
  artist: ArtistFull
}

export default function ArtistPageContent({ artist }: ArtistPageContentProps) {
  const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl
  const artworks: ArtworkPreview[] = artist.artworks ?? []
  const featured = artworks.filter((aw) => aw.featured)
  const otherWorks = featured.length > 0
    ? artworks.filter((aw) => !aw.featured)
    : artworks

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">

        {/* Back link */}
        <Link
          href="/artists"
          className="mb-12 block text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground lg:mb-16"
        >
          ← Artists
        </Link>

        {/* Two-column layout: photo + info | bio */}
        <FadeIn><div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">

          {/* ── Left column: photo + contact ──────────────────────────── */}
          <div>
            {imageUrl && (
              <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
                <Image
                  src={imageUrl}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            )}

            <div className="mt-8 space-y-4">
              {[artist.country, artist.style].filter(Boolean).length > 0 && (
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  {[artist.country, artist.style].filter(Boolean).join(' · ')}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {artist.instagramUrl && (
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                  >
                    Instagram
                    <span className="text-xs">↗</span>
                  </a>
                )}
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                  >
                    Website
                    <span className="text-xs">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Right column: name + bio ──────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <h1
              className="font-serif leading-tight text-foreground"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {artist.name}
            </h1>

            {artist.bio && (
              <div className="mt-8">
                <PortableTextRenderer value={artist.bio} />
              </div>
            )}

            {!artist.bio && (
              <p className="mt-8 text-sm leading-relaxed text-muted">
                {artist.statementCourt || `${artist.name} is represented by AH Milans.`}
              </p>
            )}
          </div>
        </div></FadeIn>

        {/* ── Featured works ─────────────────────────────────────────── */}
        {featured.length > 0 && (
          <FadeIn><section className="mt-16 lg:mt-28">
            <h2 className="mb-10 font-serif text-3xl text-foreground lg:mb-16">
              Featured works
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {featured.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          </section></FadeIn>
        )}

        {/* ── All works ──────────────────────────────────────────────── */}
        {otherWorks.length > 0 && (
          <FadeIn><section className="mt-16 lg:mt-28">
            <h2 className="mb-10 font-serif text-3xl text-foreground lg:mb-16">
              {featured.length > 0 ? 'More works' : 'Works'}
              <span className="ml-3 font-sans text-base font-light text-muted">
                ({artworks.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {otherWorks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          </section></FadeIn>
        )}
      </div>
    </MainLayout>
  )
}
