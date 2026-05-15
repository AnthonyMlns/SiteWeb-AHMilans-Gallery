'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import HomepageWorkCard from '@/components/cards/HomepageWorkCard'
import FadeIn from '@/components/ui/FadeIn'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtistPreview, ArtworkPreview, ArticlePreview } from '@/lib/types'

interface HomepageSettings {
  heroArtist?: ArtistPreview & { featuredImageUrl?: string }
}

interface HomeContentProps {
  settings: HomepageSettings | null
  articles: ArticlePreview[]
  roster: ArtistPreview[]
  collection: ArtworkPreview[]
}

export default function HomeContent({ settings, articles, roster, collection }: HomeContentProps) {
  const { t } = useTranslation()

  const featuredArticle = articles.find((a) => a.featured) ?? articles[0]
  const sideArticles = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 2)

  return (
    <MainLayout>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section aria-label="Hero">
        <FadeIn className="px-6 pb-12 pt-20 text-center md:pt-28">
          <h1
            className="font-serif uppercase leading-[0.9] tracking-tight text-foreground"
            style={{ fontSize: 'clamp(4rem, 13vw, 9rem)' }}
          >
            AH MILANS
          </h1>
          <p className="mx-auto mt-5 max-w-md font-serif italic text-muted"
             style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            {t.home.heroSubtitle}
          </p>
          <Link
            href="/artistes"
            className="mt-10 inline-flex items-center gap-3 border border-foreground px-8 py-3.5 text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {t.home.discoverRoster}
          </Link>
        </FadeIn>

        {/* Full-width hero image */}
        <div className="relative w-full overflow-hidden bg-placeholder" style={{ height: 'clamp(300px, 60vh, 700px)' }}>
          {settings?.heroArtist?.featuredImageUrl ? (
            <Image
              src={settings.heroArtist.featuredImageUrl}
              alt={settings.heroArtist.name}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-placeholder" />
          )}
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────────── */}
      <section aria-label={t.home.whyTitle} className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <FadeIn>
          <h2
            className="mb-16 max-w-xl font-serif text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {t.home.whyTitle}
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
            {[
              { title: t.home.whyCol1Title, desc: t.home.whyCol1Desc },
              { title: t.home.whyCol2Title, desc: t.home.whyCol2Desc },
              { title: t.home.whyCol3Title, desc: t.home.whyCol3Desc },
            ].map((col, i) => (
              <div key={i} className="border-t border-border pt-8">
                <h3 className="font-serif text-xl text-foreground">{col.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{col.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── SELECTED WORKS ───────────────────────────────────────────────────── */}
      {collection.length > 0 && (
        <section aria-label={t.home.selectedWorks} className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="mb-12 flex items-end justify-between">
                <h2 className="font-serif text-2xl text-foreground">{t.home.selectedWorks}</h2>
                <Link
                  href="/oeuvres"
                  className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                >
                  {t.home.allWorks}
                </Link>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.slice(0, 3).map((artwork, i) => (
                <FadeIn key={artwork._id} delay={i * 80}>
                  <HomepageWorkCard artwork={artwork} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ROSTER STRIP ─────────────────────────────────────────────────────── */}
      {roster.length > 0 && (
        <section aria-label={t.home.theRoster} className="border-t border-border py-24 md:py-32">
          <FadeIn className="mb-10 flex items-end justify-between px-6 md:px-12">
            <h2 className="font-serif text-2xl text-foreground">{t.home.theRoster}</h2>
            <Link
              href="/artistes"
              className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {t.home.allArtists}
            </Link>
          </FadeIn>
          <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 md:px-12">
            {roster.map((artist) => (
              <Link
                key={artist._id}
                href={`/artistes/${artist.slug.current}`}
                className="group shrink-0"
              >
                <div className="relative h-64 w-44 overflow-hidden bg-placeholder md:h-80 md:w-56">
                  {artist.profileImageUrl && (
                    <Image
                      src={artist.profileImageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="224px"
                    />
                  )}
                </div>
                <div className="mt-3">
                  <p className="font-serif text-sm text-foreground transition-opacity group-hover:opacity-60">
                    {artist.name}
                  </p>
                  {artist.country && (
                    <p className="mt-0.5 text-[11px] uppercase tracking-widest text-muted">
                      {artist.country}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── JOURNAL ──────────────────────────────────────────────────────────── */}
      {articles.length > 0 && (
        <section aria-label={t.home.journal} className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn className="mb-12 flex items-end justify-between">
              <h2 className="font-serif text-2xl text-foreground">{t.home.journal}</h2>
              <Link
                href="/articles"
                className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                {t.home.allArticles}
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Featured article — spans 2 columns */}
              {featuredArticle && (
                <FadeIn className="lg:col-span-2">
                <Link
                  href={`/articles/${featuredArticle.slug.current}`}
                  className="group block"
                >
                  {featuredArticle.thumbnailUrl && (
                    <div className="relative mb-6 overflow-hidden bg-placeholder" style={{ aspectRatio: '16/9' }}>
                      <Image
                        src={featuredArticle.thumbnailUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  )}
                  {featuredArticle.category && (
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-muted">
                      {featuredArticle.category}
                    </p>
                  )}
                  <h3 className="font-serif text-2xl text-foreground transition-opacity group-hover:opacity-60 md:text-3xl">
                    {featuredArticle.title}
                  </h3>
                  {featuredArticle.excerpt && (
                    <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  )}
                </Link>
                </FadeIn>
              )}

              {/* Side articles */}
              <div className="flex flex-col gap-8">
                {sideArticles.map((article, i) => (
                  <FadeIn key={article._id} delay={100 + i * 80}>
                  <Link
                    href={`/articles/${article.slug.current}`}
                    className="group flex gap-4"
                  >
                    {article.thumbnailUrl && (
                      <div className="relative aspect-square h-20 shrink-0 overflow-hidden bg-placeholder md:h-24">
                        <Image
                          src={article.thumbnailUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="96px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      {article.category && (
                        <p className="mb-1 text-[10px] uppercase tracking-widest text-muted">
                          {article.category}
                        </p>
                      )}
                      <h3 className="font-serif text-base text-foreground transition-opacity group-hover:opacity-60 line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </MainLayout>
  )
}
