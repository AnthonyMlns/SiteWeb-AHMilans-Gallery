'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { Logo } from '@/components/layout/Header'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

interface MobileContentProps {
  artists: ArtistPreview[]
  randomWorks: ArtworkPreview[]
  latestArticles: ArticlePreview[]
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest text-muted">{children}</p>
  )
}

function SectionHeader({ label, href, allLabel }: { label: string; href: string; allLabel?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between">
      <SectionLabel>{label}</SectionLabel>
      <Link
        href={href}
        className="text-[11px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-40"
      >
        {allLabel || 'All'} →
      </Link>
    </div>
  )
}

export default function MobileContent({ artists, randomWorks, latestArticles }: MobileContentProps) {
  return (
    <div className="mx-auto max-w-sm px-6 py-12">

      {/* Header */}
      <FadeIn>
      <div className="mb-14 text-center">
        <div className="flex justify-center">
          <Logo svgClassName="h-10 w-auto" />
        </div>
        <p className="mt-2 text-sm text-muted">Curatorial label for contemporary artists</p>
      </div>
      </FadeIn>

      <span aria-hidden="true" className="mb-14 block h-px w-full bg-border" />

      {/* Artists */}
      <FadeIn>
      <section className="mb-14">
        <SectionHeader label="Artists" href="/artists" allLabel="All artists" />
        <div className="grid grid-cols-3 gap-4">
          {artists.slice(0, 6).map((artist) => {
            const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl
            return (
              <Link
                key={artist._id}
                href={`/artists/${artist.slug.current}`}
                className="group block text-center"
              >
                <div className="relative mx-auto mb-2 aspect-square w-full max-w-[80px] overflow-hidden rounded-full bg-placeholder">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-serif text-lg text-muted opacity-30">{artist.name[0]}</span>
                    </div>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
                  {artist.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>
      </FadeIn>

      <span aria-hidden="true" className="mb-14 block h-px w-full bg-border" />

      {/* Works */}
      <FadeIn>
      <section className="mb-14">
        <SectionHeader label="Works" href="/works" allLabel="All artworks" />
        <div className="grid grid-cols-2 gap-3">
          {randomWorks.map((work) => {
            const firstImage = work.images?.[0]
            return (
              <Link
                key={work._id}
                href={`/works/${work.slug.current}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-placeholder">
                  {firstImage?.url ? (
                    <Image
                      src={firstImage.url}
                      alt={firstImage.alt || work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 400px) 50vw, 160px"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <p className="mt-1.5 truncate font-serif text-sm text-foreground">{work.title}</p>
                {work.artist && (
                  <p className="truncate text-[11px] text-muted">{work.artist.name}</p>
                )}
              </Link>
            )
          })}
        </div>
      </section>
      </FadeIn>

      {/* Journal */}
      <FadeIn>
      <section className="mb-14 border-t border-border pt-8">
        <SectionHeader label="Journal" href="/editorial" allLabel="All articles" />
        <div className="space-y-5">
          {latestArticles.map((article) => {
            const categoryLabel = article.category
              ? article.category.charAt(0).toUpperCase() + article.category.slice(1)
              : null
            return (
              <Link
                key={article._id}
                href={`/editorial/${article.slug.current}`}
                className="group flex items-start gap-4"
              >
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden bg-placeholder">
                  {article.thumbnailUrl ? (
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="64px"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  {categoryLabel && (
                    <p className="text-[9px] uppercase tracking-widest text-subtle">{categoryLabel}</p>
                  )}
                  <h3 className="line-clamp-2 font-serif text-sm leading-snug text-foreground group-hover:opacity-70">
                    {article.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn>
      <section className="mb-14 border-t border-border pt-8">
        <p className="mb-5 text-center text-sm leading-relaxed text-muted">
          Want to know more about an artwork or an artist?
        </p>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block border border-foreground px-8 py-4 text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Get in touch →
          </Link>
        </div>
      </section>
      </FadeIn>

      {/* Newsletter */}
      <FadeIn>
      <section className="border-t border-border pt-8">
        <SectionLabel>Newsletter</SectionLabel>
        <p className="mb-5 text-sm leading-relaxed text-muted">
          Best emerging artist updates, straight to your inbox.
        </p>
        <NewsletterForm />
      </section>
      </FadeIn>

      {/* Footer */}
      <footer className="mt-16 border-t border-border pt-6 text-center">
        <p className="font-sans text-[12px] uppercase tracking-widest text-subtle">
          © 2018—{new Date().getFullYear()} AH — Milans
        </p>
        <div className="mt-3 flex items-center justify-center gap-5">
          <Link
            href="/privacy-policy"
            className="font-sans text-[12px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
          >
            Privacy
          </Link>
        </div>
      </footer>

    </div>
  )
}
