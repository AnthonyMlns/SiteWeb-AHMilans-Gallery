'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import ArtworkCard from '@/components/cards/ArtworkCard'
import FadeIn from '@/components/ui/FadeIn'
import type { ArtworkPreview } from '@/lib/types'

interface CurateFull {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  body?: any[]
  publishedAt?: string
  readTime?: number
  thumbnailUrl?: string
  relatedArtist?: {
    name: string
    slug: { current: string }
    statementCourt?: string
  }
  relatedArtwork?: {
    title: string
    slug: { current: string }
    medium?: string
    dimensions?: string
    year?: number
    images?: { url: string; alt: string }[]
    artist?: { name: string; slug: { current: string } }
  }
  relatedArtistArtworks?: ArtworkPreview[]
}

interface CuratePageContentProps {
  curate: CurateFull
}

export default function CuratePageContent({ curate }: CuratePageContentProps) {
  const dateStr = curate.publishedAt
    ? new Date(curate.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const artwork = curate.relatedArtwork
  const artworkImage = artwork?.images?.[0]

  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <FadeIn>
        <header className="mb-12">
          <p className="mb-5 text-[10px] uppercase tracking-widest text-muted">AH Milans Curates</p>

          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground">
            {curate.title}
          </h1>

          {curate.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-muted">{curate.excerpt}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
            {dateStr && <span>{dateStr}</span>}
            {curate.readTime && <span>· {curate.readTime} min read</span>}
            {artwork?.artist && (
              <>
                <span> · </span>
                <Link
                  href={`/artists/${artwork.artist.slug.current}`}
                  className="transition-colors hover:text-foreground"
                >
                  {artwork.artist.name}
                </Link>
              </>
            )}
          </div>

          {artworkImage?.url && (
            <div className="relative mt-10 aspect-square overflow-hidden md:aspect-[4/3]">
              <Image
                src={artworkImage.url}
                alt={artworkImage.alt ?? artwork?.title ?? curate.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </header>
        </FadeIn>

        {curate.body && (
          <div className="mt-8">
            <PortableTextRenderer value={curate.body} />
          </div>
        )}

        {artwork && (
          <FadeIn>
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-4 font-serif text-2xl text-foreground">Technical Details</h2>
            <div className="divide-y divide-border">
              {artwork.title && (
                <div className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">Title</span>
                  <span className="text-foreground">{artwork.title}</span>
                </div>
              )}
              {artwork.artist?.name && (
                <div className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">Artist</span>
                  <Link href={`/artists/${artwork.artist.slug.current}`} className="text-foreground underline transition-colors hover:opacity-50">
                    {artwork.artist.name}
                  </Link>
                </div>
              )}
              {artwork.medium && (
                <div className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">Medium</span>
                  <span className="text-foreground">{artwork.medium}</span>
                </div>
              )}
              {artwork.year && (
                <div className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">Year</span>
                  <span className="text-foreground">{artwork.year}</span>
                </div>
              )}
              {artwork.dimensions && (
                <div className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">Dimensions</span>
                  <span className="text-foreground">{artwork.dimensions}</span>
                </div>
              )}
            </div>
          </div>
          </FadeIn>
        )}

        {curate.relatedArtist && (
          <FadeIn>
          <div className="mt-12 border-t border-border pt-8">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted">About the Artist</p>
            <Link
              href={`/artists/${curate.relatedArtist.slug.current}`}
              className="font-serif text-3xl text-foreground transition-opacity hover:opacity-50"
            >
              {curate.relatedArtist.name}
              <span className="ml-3 font-sans text-base">→</span>
            </Link>
            {curate.relatedArtist.statementCourt && (
              <p className="mt-4 text-sm leading-relaxed text-muted max-w-prose">
                {curate.relatedArtist.statementCourt}
              </p>
            )}
          </div>
          </FadeIn>
        )}

        {curate.relatedArtistArtworks && curate.relatedArtistArtworks.length > 0 && (
          <FadeIn>
          <div className="mt-16 border-t border-border pt-10">
            <p className="mb-6 text-[10px] uppercase tracking-widest text-muted">More works by this artist</p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {curate.relatedArtistArtworks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          </div>
          </FadeIn>
        )}

        <FadeIn>
        <div className="mt-16 rounded-lg border border-border p-8 text-center">
          <p className="font-serif text-2xl text-foreground">Liked this?</p>
          <p className="mt-2 text-sm text-muted">Get a new artwork in your inbox every Friday.</p>
          <Link
            href="/newsletter"
            className="mt-4 inline-block rounded-full bg-foreground px-6 py-3 text-[11px] uppercase tracking-widest text-background transition-opacity hover:opacity-80"
          >
            Subscribe to AH Milans Curates
          </Link>
        </div>
        </FadeIn>

        <div className="mt-16">
          <FadeIn>
          <Link
            href="/curates"
            className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            ← All curates
          </Link>
          </FadeIn>
        </div>
      </article>
    </MainLayout>
  )
}
