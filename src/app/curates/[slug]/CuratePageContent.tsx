'use client'

import { useState } from 'react'
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
  faq?: { _key: string; question: string; answer: string }[]
}

interface CuratePageContentProps {
  curate: CurateFull
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm text-foreground transition-colors hover:opacity-70"
      >
        <span className="font-medium">{question}</span>
        <span className={`ml-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-muted">
          {answer}
        </div>
      )}
    </div>
  )
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
  const artworkHref = artwork ? `/works/${artwork.slug.current}` : null
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
            {curate.readTime && <span className="before:mr-2 before:content-['·']">{curate.readTime} min read</span>}
            {artwork?.artist && (
              <Link
                href={`/artists/${artwork.artist.slug.current}`}
                className="before:mr-2 before:content-['·'] transition-colors hover:text-foreground"
              >
                {artwork.artist.name}
              </Link>
            )}
          </div>

          {artworkImage?.url && artworkHref && (
            <Link href={artworkHref} className="group mt-10 block">
              <div className="relative aspect-square overflow-hidden md:aspect-[4/3]">
                <Image
                  src={artworkImage.url}
                  alt={artworkImage.alt ?? artwork?.title ?? curate.title}
                  fill
                  className="object-contain transition-opacity duration-500 group-hover:opacity-80"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </Link>
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
            {artworkHref && (
              <Link
                href={artworkHref}
                className="mt-4 inline-block text-[11px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-40"
              >
                View artwork →
              </Link>
            )}
          </div>
          </FadeIn>
        )}

        {curate.faq && curate.faq.length > 0 && (
          <FadeIn>
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-4 font-serif text-2xl text-foreground">FAQs</h2>
            {curate.faq.map((item) => (
              <FAQItem key={item._key} question={item.question} answer={item.answer} />
            ))}
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
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {curate.relatedArtist.statementCourt}
              </p>
            )}
          </div>
          </FadeIn>
        )}

        {curate.relatedArtistArtworks && curate.relatedArtistArtworks.length > 0 && (
          <FadeIn>
          <div className="mt-10">
            <p className="mb-6 text-[10px] uppercase tracking-widest text-muted">More works by this artist</p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
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
