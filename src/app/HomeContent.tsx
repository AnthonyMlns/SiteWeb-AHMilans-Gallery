'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
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

export default function HomeContent({ settings, articles, roster, collection }: HomeContentProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const featuredArticle = articles.find((a) => a.featured) ?? articles[0]
  const gridArticles = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 4)
  const featuredArtist = settings?.heroArtist ?? roster[0]

  return (
    <MainLayout>

      {/* ── HERO ARTICLE ─────────────────────────────────────────────────── */}
      {featuredArticle && (
        <section aria-label="Article à la une" className="border-b border-border">
          <Link href={`/articles/${featuredArticle.slug.current}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">

              {/* Image */}
              <div
                className="relative overflow-hidden bg-placeholder"
                style={{ minHeight: 'clamp(260px, 52vh, 620px)' }}
              >
                {featuredArticle.thumbnailUrl ? (
                  <Image
                    src={featuredArticle.thumbnailUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-placeholder" />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center border-t border-border px-8 py-12 lg:border-l lg:border-t-0 lg:px-14 lg:py-16">
                {featuredArticle.category && (
                  <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                    {featuredArticle.category}
                  </p>
                )}
                <h1
                  className="font-serif italic text-foreground leading-[1.05]"
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
        </section>
      )}

      {/* ── ARTICLE GRID ─────────────────────────────────────────────────── */}
      {gridArticles.length > 0 && (
        <section aria-label={t.nav.editorial} className="border-b border-border">
          {/* gap-px trick: container bg = border color, cells bg = white */}
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {gridArticles.map((article) => (
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
                <h3 className="font-serif italic text-[0.95rem] leading-snug text-foreground transition-opacity group-hover:opacity-60 line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-muted line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>

          <div className="px-6 py-5 lg:px-10">
            <Link
              href="/articles"
              className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              Read More ↗
            </Link>
          </div>
        </section>
      )}

      {/* ── FULL-WIDTH IMAGE ─────────────────────────────────────────────── */}
      {featuredArtist?.featuredImageUrl && (
        <section
          aria-label="Image portrait"
          className="relative overflow-hidden bg-placeholder border-b border-border"
          style={{ height: 'clamp(300px, 58vh, 680px)' }}
        >
          <Image
            src={featuredArtist.featuredImageUrl}
            alt={featuredArtist.name}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </section>
      )}

      {/* ── EDITORIAL MOMENT ─────────────────────────────────────────────── */}
      {featuredArtist && (
        <section aria-label="Portrait" className="border-b border-border">
          <Link
            href={`/artistes/${featuredArtist.slug.current}`}
            className="group flex flex-col items-center justify-center px-6 py-20 text-center md:py-28"
          >
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.28em] text-muted">
              Portrait
            </p>
            <h2
              className="font-serif italic text-foreground transition-opacity group-hover:opacity-60"
              style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', lineHeight: 1 }}
            >
              {featuredArtist.name}
            </h2>
            <p className="mt-7 font-sans text-[11px] uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
              Read Now ↗
            </p>
          </Link>
        </section>
      )}

      {/* ── ARTWORK GRID ─────────────────────────────────────────────────── */}
      {collection.length > 0 && (
        <section aria-label={t.home.selectedWorks} className="border-b border-border">
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {collection.slice(0, 4).map((artwork) => {
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
                  {artwork.price && artwork.available && (
                    <p className="mt-1 font-sans text-[11px] text-muted">
                      {artwork.price.toLocaleString('fr-FR')} €
                    </p>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="px-6 py-5 lg:px-10">
            <Link
              href="/oeuvres"
              className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              Artworks ↗
            </Link>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section aria-label="Newsletter" className="px-6 py-16 text-center lg:py-20">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted">
          Not your average newsletter
        </p>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.25em] text-foreground">
          Best emerging artist updates
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-7 flex max-w-xs items-center border-b border-foreground"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-subtle focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="pl-4 text-foreground transition-opacity hover:opacity-40"
          >
            →
          </button>
        </form>
      </section>

    </MainLayout>
  )
}
