'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { Logo } from '@/components/layout/Header'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

interface HomepageSettings {
  heroArtist?: ArtistPreview
}

interface HomeContentProps {
  settings: HomepageSettings | null
  articles: ArticlePreview[]
  roster: ArtistPreview[]
  collection: ArtworkPreview[]
}

// ─── Fisher-Yates (client-side only) ─────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const ARTWORKS_VISIBLE = 8
const ROTATION_INTERVAL_MS = 12_000

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeContent({ settings, articles, roster, collection }: HomeContentProps) {
  const { t } = useTranslation()

  const featuredArticle = articles.find((a) => a.featured) ?? articles[0]
  const gridArticles    = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 4)
  const featuredArtist  = settings?.heroArtist ?? roster[0]

  // ── Rotation des œuvres ────────────────────────────────────────────────────
  const [displayedArtworks, setDisplayedArtworks] = useState<ArtworkPreview[]>(
    collection.slice(0, ARTWORKS_VISIBLE)
  )
  const [artworksVisible, setArtworksVisible] = useState(true)

  const rotate = useCallback(() => {
    if (collection.length <= ARTWORKS_VISIBLE) return
    setArtworksVisible(false)
    setTimeout(() => {
      setDisplayedArtworks(shuffle(collection).slice(0, ARTWORKS_VISIBLE))
      setArtworksVisible(true)
    }, 500)
  }, [collection])

  useEffect(() => {
    rotate()
    const id = setInterval(rotate, ROTATION_INTERVAL_MS)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainLayout>

      {/* ── HERO — typographique, centré ──────────────────────────────── */}
      <section className="relative flex h-[90vh] flex-col items-center justify-center text-center px-6">
        <Logo svgClassName="w-[min(520px,78vw)] h-auto" />
        <p
          className="mt-6 font-serif italic text-muted"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
        >
          A curatorial label for contemporary abstract art
        </p>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-subtle">Scroll</span>
          <div className="h-10 w-px bg-border" />
        </div>
      </section>

      {/* ── ARTICLE À LA UNE ──────────────────────────────────────────── */}
      <section aria-label="Article à la une">
        {featuredArticle ? (
          <Link href={`/articles/${featuredArticle.slug.current}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
              <div
                className="relative overflow-hidden bg-placeholder"
                style={{ minHeight: 'clamp(320px, 65vh, 800px)' }}
              >
                {featuredArticle.thumbnailUrl && (
                  <Image
                    src={featuredArticle.thumbnailUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
              </div>
              <div className="flex flex-col justify-end px-8 py-12 lg:px-12 lg:py-14">
                {featuredArticle.category && (
                  <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.22em] text-subtle">
                    {featuredArticle.category}
                  </p>
                )}
                <h1
                  className="font-serif italic leading-[1.05] text-foreground"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
                >
                  {featuredArticle.title}
                </h1>
                {featuredArticle.excerpt && (
                  <p className="mt-5 font-sans text-sm leading-relaxed text-muted">
                    {featuredArticle.excerpt}
                  </p>
                )}
                <p className="mt-8 font-sans text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
                  {t.home.readMore}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
            <div className="bg-placeholder" style={{ minHeight: 'clamp(320px, 65vh, 800px)' }} />
            <div className="flex flex-col justify-end px-8 py-12 lg:px-12 lg:py-14">
              <div className="mb-4 h-1.5 w-10 rounded-sm bg-placeholder" />
              <div className="h-10 w-3/4 rounded-sm bg-placeholder" />
              <div className="mt-5 space-y-2">
                <div className="h-2 w-full rounded-sm bg-placeholder" />
                <div className="h-2 w-5/6 rounded-sm bg-placeholder" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── GRILLE ÉDITORIALE ─────────────────────────────────────────── */}
      <section aria-label={t.nav.editorial}>
        <div className="px-6 pb-10 pt-24 lg:px-10 lg:pb-12 lg:pt-36">
          <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.22em] text-subtle">{t.nav.editorial}</p>
          <h2
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, maxWidth: '22ch' }}
          >
            {t.home.sectionJournalDesc}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const article = gridArticles[i]
            if (!article) {
              return (
                <div key={`ph-a-${i}`} className="bg-background">
                  <div className="bg-placeholder" style={{ aspectRatio: '4/3' }} />
                  <div className="space-y-2 px-4 py-5">
                    <div className="h-1.5 w-10 rounded-sm bg-placeholder" />
                    <div className="h-3 w-3/4 rounded-sm bg-placeholder" />
                  </div>
                </div>
              )
            }
            const categoryLabel = article.category
              ? (t.categories as Record<string, string>)[article.category] ?? article.category
              : null
            return (
              <Link
                key={article._id}
                href={`/articles/${article.slug.current}`}
                className="group block bg-background"
              >
                <div className="relative overflow-hidden bg-placeholder" style={{ aspectRatio: '4/3' }}>
                  {article.thumbnailUrl && (
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="px-4 py-5">
                  {categoryLabel && (
                    <p className="mb-1.5 font-sans text-[9px] uppercase tracking-[0.18em] text-subtle">
                      {categoryLabel}
                    </p>
                  )}
                  <h3 className="line-clamp-2 font-serif italic text-[0.9rem] leading-snug text-foreground transition-opacity group-hover:opacity-50">
                    {article.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="px-6 py-8 lg:px-10 lg:py-12">
          <Link
            href="/articles"
            className="font-sans text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.readMore} ↗
          </Link>
        </div>
      </section>

      {/* ── PORTRAIT PLEIN ÉCRAN ──────────────────────────────────────── */}
      <section
        aria-label="Portrait"
        className="relative min-h-screen overflow-hidden bg-placeholder"
      >
        {featuredArtist?.featuredImageUrl && (
          <Image
            src={featuredArtist.featuredImageUrl}
            alt={featuredArtist.name}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </section>

      {/* ── MOMENT ÉDITORIAL ──────────────────────────────────────────── */}
      <section aria-label="Artiste en avant">
        {featuredArtist ? (
          <Link
            href={`/artistes/${featuredArtist.slug.current}`}
            className="group flex flex-col items-center justify-center px-6 py-28 text-center lg:py-44"
          >
            <p className="mb-5 font-sans text-[9px] uppercase tracking-[0.28em] text-subtle">
              {t.home.portrait}
            </p>
            <h2
              className="font-serif italic text-foreground transition-opacity group-hover:opacity-40"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', lineHeight: 1 }}
            >
              {featuredArtist.name}
            </h2>
            <p className="mt-8 font-sans text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
              {t.home.readNow}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-28 text-center lg:py-44">
            <div className="mb-5 h-1.5 w-14 rounded-sm bg-placeholder" />
            <div className="h-16 w-64 rounded-sm bg-placeholder" />
            <div className="mt-8 h-1.5 w-20 rounded-sm bg-placeholder" />
          </div>
        )}
      </section>

      {/* ── MANIFESTE ─────────────────────────────────────────────────── */}
      <section className="px-6 py-24 lg:px-10 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-32">
          <p
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)', lineHeight: 1.15 }}
          >
            {t.home.manifestoLeft}
          </p>
          <p className="font-sans leading-relaxed text-muted lg:self-center" style={{ fontSize: '0.9rem' }}>
            {t.home.manifestoRight}
          </p>
        </div>
      </section>

      {/* ── GRILLE ARTISTES — tous, full-bleed ────────────────────────── */}
      <section aria-label={t.home.theRoster}>
        <div className="px-6 pb-10 pt-24 lg:px-10 lg:pb-12 lg:pt-36">
          <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.22em] text-subtle">{t.nav.artists}</p>
          <h2
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, maxWidth: '22ch' }}
          >
            {t.home.sectionArtistsDesc}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
          {roster.length > 0
            ? roster.map((artist) => {
                const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl
                return (
                  <Link
                    key={artist._id}
                    href={`/artistes/${artist.slug.current}`}
                    className="group relative block overflow-hidden bg-placeholder"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-white">
                        {artist.name}
                      </p>
                      {(artist.country || artist.style) && (
                        <p className="mt-0.5 font-sans text-[10px] text-white/60">
                          {[artist.country, artist.style].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })
            : Array.from({ length: 4 }).map((_, i) => (
                <div key={`ph-r-${i}`} className="bg-placeholder" style={{ aspectRatio: '3/4' }} />
              ))
          }
        </div>
        <div className="px-6 py-8 lg:px-10 lg:py-12">
          <Link
            href="/artistes"
            className="font-sans text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.artistsLink}
          </Link>
        </div>
      </section>

      {/* ── GRILLE ŒUVRES — 8 toiles, rotation, full-bleed ───────────── */}
      <section aria-label={t.home.selectedWorks}>
        <div className="px-6 pb-10 pt-24 lg:px-10 lg:pb-12 lg:pt-36">
          <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.22em] text-subtle">{t.nav.works}</p>
          <h2
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, maxWidth: '22ch' }}
          >
            {t.home.sectionWorksDesc}
          </h2>
        </div>
        <div
          className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4 transition-opacity duration-500"
          style={{ opacity: artworksVisible ? 1 : 0 }}
        >
          {Array.from({ length: ARTWORKS_VISIBLE }).map((_, i) => {
            const artwork = displayedArtworks[i]
            if (!artwork) {
              return <div key={`ph-w-${i}`} className="bg-placeholder" style={{ aspectRatio: '3/4' }} />
            }
            const image = artwork.images?.[0]
            return (
              <Link
                key={artwork._id}
                href={`/oeuvres/${artwork.slug.current}`}
                className="group relative block overflow-hidden bg-placeholder"
                style={{ aspectRatio: '3/4' }}
              >
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-white">
                    {artwork.title}
                  </p>
                  {artwork.artist && (
                    <p className="mt-0.5 font-sans text-[10px] text-white/60">{artwork.artist.name}</p>
                  )}
                  {artwork.available && artwork.price && (
                    <p className="mt-1 font-sans text-[10px] text-white/50">
                      {artwork.price.toLocaleString('fr-FR')} €
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
        <div className="px-6 py-8 lg:px-10 lg:py-12">
          <Link
            href="/oeuvres"
            className="font-sans text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.artworksLink}
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────── */}
      <section aria-label="Newsletter" className="px-6 py-28 text-center lg:py-44">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-subtle">
          {t.home.newsletterTitle}
        </p>
        <p
          className="mt-3 font-serif italic text-foreground"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          {t.home.newsletterSubtitle}
        </p>
        <NewsletterForm className="mx-auto mt-10 max-w-xs" />
      </section>

    </MainLayout>
  )
}
