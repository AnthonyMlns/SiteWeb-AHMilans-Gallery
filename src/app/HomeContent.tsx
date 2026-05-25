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

// ─── Mélange Fisher-Yates (côté client) ──────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Blocs de remplacement ───────────────────────────────────────────────────

function Bar({ w = 'w-24', h = 'h-2' }: { w?: string; h?: string }) {
  return <div className={`rounded-sm bg-placeholder ${w} ${h}`} />
}

function ArticlePlaceholder() {
  return (
    <div className="bg-background px-5 py-7 lg:px-6 lg:py-8">
      <div className="mb-5 bg-placeholder" style={{ aspectRatio: '4/3' }} />
      <Bar w="w-14" h="h-2" />
      <div className="mt-2"><Bar w="w-40" h="h-4" /></div>
      <div className="mt-3 flex flex-col gap-1.5">
        <Bar w="w-full" h="h-2" />
        <Bar w="w-5/6" h="h-2" />
        <Bar w="w-4/6" h="h-2" />
      </div>
    </div>
  )
}

function ArtistPlaceholder() {
  return (
    <div className="bg-background px-5 py-7 lg:px-6 lg:py-8">
      <div className="mb-4 bg-placeholder" style={{ aspectRatio: '3/4' }} />
      <Bar w="w-32" h="h-2.5" />
      <div className="mt-1.5"><Bar w="w-20" h="h-2" /></div>
    </div>
  )
}

function ArtworkPlaceholder() {
  return (
    <div className="bg-background px-5 py-7 lg:px-6 lg:py-8">
      <div className="mb-4 bg-placeholder" style={{ aspectRatio: '3/4' }} />
      <Bar w="w-28" h="h-2.5" />
      <div className="mt-1.5"><Bar w="w-20" h="h-2" /></div>
      <div className="mt-1.5"><Bar w="w-16" h="h-2" /></div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ARTWORKS_VISIBLE = 8
const ROTATION_INTERVAL_MS = 12_000 // rotation toutes les 12 s

export default function HomeContent({ settings, articles, roster, collection }: HomeContentProps) {
  const { t } = useTranslation()

  const featuredArticle = articles.find((a) => a.featured) ?? articles[0]
  const gridArticles    = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 4)
  const featuredArtist  = settings?.heroArtist ?? roster[0]

  // ── Rotation des œuvres ────────────────────────────────────────────────────
  // Initialisation déterministe (identique SSR ↔ client) → pas d'erreur d'hydratation.
  // Math.random() n'est appelé que dans les useEffect (côté client uniquement).
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

  // Premier mélange après hydratation, puis rotation régulière
  useEffect(() => {
    rotate()
    const id = setInterval(rotate, ROTATION_INTERVAL_MS)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainLayout>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen">

        {/* Textes centrés à ~50vh */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 grid grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
          <p
            className="font-serif italic text-foreground"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.55rem)', lineHeight: 1.38, maxWidth: '34ch' }}
          >
            {t.home.heroLeft}
          </p>
          <div className="flex flex-col justify-between gap-4 lg:items-end lg:text-right">
            <p className="font-sans leading-relaxed text-muted" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', maxWidth: '30ch' }}>
              {t.home.heroRight}
            </p>
            <Link
              href="/oeuvres"
              className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {t.home.heroLink}
            </Link>
          </div>
        </div>

        {/* Logo à 90vh */}
        <div className="absolute inset-x-0 top-[90%] flex -translate-y-1/2 justify-center">
          <Logo svgClassName="w-[min(640px,84vw)] h-auto" />
        </div>

      </section>

      {/* ── HERO ARTICLE ──────────────────────────────────────────────── */}
      <section aria-label="Article à la une" className="min-h-screen flex flex-col justify-center">
        {featuredArticle ? (
          <Link href={`/articles/${featuredArticle.slug.current}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
              <div
                className="relative overflow-hidden bg-placeholder"
                style={{ minHeight: 'clamp(260px, 52vh, 620px)' }}
              >
                {featuredArticle.thumbnailUrl && (
                  <Image
                    src={featuredArticle.thumbnailUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center px-5 py-8 lg:px-14 lg:py-16">
                {featuredArticle.category && (
                  <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                    {featuredArticle.category}
                  </p>
                )}
                <h1
                  className="font-serif italic leading-[1.05] text-foreground"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)' }}
                >
                  {featuredArticle.title}
                </h1>
                {featuredArticle.excerpt && (
                  <p className="mt-5 font-serif italic text-muted" style={{ fontSize: '1.05rem' }}>
                    — {featuredArticle.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
            <div className="bg-placeholder" style={{ minHeight: 'clamp(260px, 52vh, 620px)' }} />
            <div className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16">
              <div className="mb-5"><Bar w="w-16" h="h-2" /></div>
              <Bar w="w-3/4" h="h-10" />
              <div className="mt-5 flex flex-col gap-2">
                <Bar w="w-full" h="h-3" />
                <Bar w="w-5/6" h="h-3" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── ARTICLE GRID (toujours 4 emplacements) ────────────────────── */}
      <section aria-label={t.nav.editorial} className="min-h-screen flex flex-col justify-center">
        <div className="px-6 pb-8 pt-16 sm:pt-20 lg:px-10 lg:pt-24">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-muted">{t.nav.editorial}</p>
          <p className="font-serif italic text-foreground" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.7rem)', lineHeight: 1.3, maxWidth: '48ch' }}>
            {t.home.sectionJournalDesc}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-background lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const article = gridArticles[i]
            if (!article) return <ArticlePlaceholder key={`ph-a-${i}`} />
            return (
              <Link
                key={article._id}
                href={`/articles/${article.slug.current}`}
                className="group bg-background px-5 py-7 lg:px-6 lg:py-8"
              >
                <div
                  className="relative mb-5 overflow-hidden bg-placeholder"
                  style={{ aspectRatio: '4/3' }}
                >
                  {article.thumbnailUrl && (
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                {article.category && (
                  <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
                    {article.category}
                  </p>
                )}
                <h3 className="line-clamp-2 font-serif italic text-[0.95rem] leading-snug text-foreground transition-opacity group-hover:opacity-60">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-3 font-sans text-[11px] leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
        <div className="px-6 pb-10 pt-5 lg:px-10 lg:pb-16">
          <Link
            href="/articles"
            className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.readMore}
          </Link>
        </div>
      </section>

      {/* ── IMAGE ARTISTE PLEIN ÉCRAN ──────────────────────────────────── */}
      <section
        aria-label="Image portrait"
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
      <section aria-label="Portrait" className="min-h-screen flex flex-col justify-center">
        {featuredArtist ? (
          <Link
            href={`/artistes/${featuredArtist.slug.current}`}
            className="group flex flex-col items-center justify-center px-6 py-20 text-center md:py-32"
          >
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.28em] text-muted">
              {t.home.portrait}
            </p>
            <h2
              className="font-serif italic text-foreground transition-opacity group-hover:opacity-60"
              style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', lineHeight: 1 }}
            >
              {featuredArtist.name}
            </h2>
            <p className="mt-7 font-sans text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
              {t.home.readNow}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-32">
            <div className="mb-4"><Bar w="w-16" h="h-2" /></div>
            <Bar w="w-56" h="h-14" />
            <div className="mt-7"><Bar w="w-20" h="h-2" /></div>
          </div>
        )}
      </section>

      {/* ── MANIFESTE ─────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
          <p className="font-serif italic text-foreground" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', lineHeight: 1.2 }}>
            {t.home.manifestoLeft}
          </p>
          <p className="font-sans leading-relaxed text-muted lg:self-center" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)' }}>
            {t.home.manifestoRight}
          </p>
        </div>
      </section>

      {/* ── GRILLE ARTISTES (tous les artistes) ───────────────────────── */}
      <section aria-label={t.home.theRoster} className="min-h-screen flex flex-col justify-center">
        <div className="px-6 pb-8 pt-16 sm:pt-20 lg:px-10 lg:pt-24">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-muted">{t.nav.artists}</p>
          <p className="font-serif italic text-foreground" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.7rem)', lineHeight: 1.3, maxWidth: '48ch' }}>
            {t.home.sectionArtistsDesc}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-background sm:grid-cols-3 lg:grid-cols-4">
          {roster.length > 0
            ? roster.map((artist) => {
                const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl
                return (
                  <Link
                    key={artist._id}
                    href={`/artistes/${artist.slug.current}`}
                    className="group bg-background px-5 py-7 lg:px-6 lg:py-8"
                  >
                    <div
                      className="relative mb-4 overflow-hidden bg-placeholder"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={artist.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      )}
                    </div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-foreground transition-opacity group-hover:opacity-60">
                      {artist.name}
                    </p>
                    {(artist.country || artist.style) && (
                      <p className="mt-0.5 font-sans text-[11px] text-muted">
                        {[artist.country, artist.style].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </Link>
                )
              })
            : Array.from({ length: 4 }).map((_, i) => <ArtistPlaceholder key={`ph-r-${i}`} />)
          }
        </div>
        <div className="px-6 pb-10 pt-5 lg:px-10 lg:pb-16">
          <Link
            href="/artistes"
            className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.artistsLink}
          </Link>
        </div>
      </section>

      {/* ── GRILLE ŒUVRES (8 toiles, rotation automatique) ────────────── */}
      <section aria-label={t.home.selectedWorks} className="min-h-screen flex flex-col justify-center">
        <div className="px-6 pb-8 pt-16 sm:pt-20 lg:px-10 lg:pt-24">
          <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-muted">{t.nav.works}</p>
          <p className="font-serif italic text-foreground" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.7rem)', lineHeight: 1.3, maxWidth: '48ch' }}>
            {t.home.sectionWorksDesc}
          </p>
        </div>

        {/* Grille avec fondu lors de la rotation */}
        <div
          className="grid grid-cols-2 gap-px bg-background lg:grid-cols-4 transition-opacity duration-500"
          style={{ opacity: artworksVisible ? 1 : 0 }}
        >
          {displayedArtworks.length > 0
            ? Array.from({ length: ARTWORKS_VISIBLE }).map((_, i) => {
                const artwork = displayedArtworks[i]
                if (!artwork) return <ArtworkPlaceholder key={`ph-w-${i}`} />
                const image = artwork.images?.[0]
                return (
                  <Link
                    key={artwork._id}
                    href={`/oeuvres/${artwork.slug.current}`}
                    className="group bg-background px-5 py-7 lg:px-6 lg:py-8"
                  >
                    <div
                      className="relative mb-4 overflow-hidden bg-placeholder"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      )}
                    </div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-foreground transition-opacity group-hover:opacity-60">
                      {artwork.title}
                    </p>
                    {artwork.artist && (
                      <p className="mt-0.5 font-sans text-[11px] text-muted">{artwork.artist.name}</p>
                    )}
                    {artwork.dimensions && (
                      <p className="mt-0.5 font-sans text-[11px] text-subtle">{artwork.dimensions}</p>
                    )}
                    {artwork.available && artwork.price && (
                      <p className="mt-1 font-sans text-[11px] text-muted">
                        {artwork.price.toLocaleString('fr-FR')} €
                      </p>
                    )}
                  </Link>
                )
              })
            : Array.from({ length: ARTWORKS_VISIBLE }).map((_, i) => (
                <ArtworkPlaceholder key={`ph-w-${i}`} />
              ))
          }
        </div>

        <div className="px-6 pb-10 pt-5 lg:px-10 lg:pb-16">
          <Link
            href="/oeuvres"
            className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.home.artworksLink}
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────── */}
      <section aria-label="Newsletter" className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted">
          {t.home.newsletterTitle}
        </p>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.25em] text-foreground">
          {t.home.newsletterSubtitle}
        </p>
        <NewsletterForm className="mx-auto mt-7 max-w-xs" />
      </section>

    </MainLayout>
  )
}
