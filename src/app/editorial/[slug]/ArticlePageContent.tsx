'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArticlePreview } from '@/lib/types'

interface ArticleFull extends ArticlePreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
}

interface ArticlePageContentProps {
  article: ArticleFull
}

export default function ArticlePageContent({ article }: ArticlePageContentProps) {
  const { t } = useTranslation()

  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const categoryLabel = article.category
    ? (t.categories as Record<string, string>)[article.category] ?? article.category
    : null

  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          {categoryLabel && (
            <p className="mb-5 text-[10px] uppercase tracking-widest text-muted">{categoryLabel}</p>
          )}

          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-muted">{article.excerpt}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
            {dateStr && <span>{dateStr}</span>}
            {article.readTime && <span>· {t.articles.readTime(article.readTime)}</span>}
            {article.relatedArtist && (
              <>
                <span>·</span>
                <Link
                  href={`/artists/${article.relatedArtist.slug.current}`}
                  className="transition-colors hover:text-foreground"
                >
                  {article.relatedArtist.name}
                </Link>
              </>
            )}
          </div>
        </header>

        {article.thumbnailUrl && (
          <div className="relative mb-14 aspect-[16/9] overflow-hidden bg-placeholder">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {article.body && <PortableTextRenderer value={article.body} />}

        {article.relatedArtist && (
          <div className="mt-20 border-t border-border pt-10">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-muted">
              {t.articles.relatedArtist}
            </p>
            <Link
              href={`/artists/${article.relatedArtist.slug.current}`}
              className="font-serif text-3xl text-foreground transition-opacity hover:opacity-50"
            >
              {article.relatedArtist.name}
              <span className="ml-3 font-sans text-base">→</span>
            </Link>
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/editorial"
            className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.articles.backLink}
          </Link>
        </div>
      </article>
    </MainLayout>
  )
}
