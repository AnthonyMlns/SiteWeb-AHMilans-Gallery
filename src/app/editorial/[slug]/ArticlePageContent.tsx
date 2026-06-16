'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import ArtworkCard from '@/components/cards/ArtworkCard'
import FadeIn from '@/components/ui/FadeIn'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArticlePreview, ArtworkPreview } from '@/lib/types'

interface ArticleFull extends ArticlePreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  faq?: { _key: string; question: string; answer: string }[]
  relatedArtistArtworks?: ArtworkPreview[]
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

  const conclusionIdx = article.body?.findIndex(
    (b: { style?: string; children?: { text?: string }[] }) =>
      b.style === 'h2' && b.children?.[0]?.text?.toLowerCase().includes('conclusion')
  ) ?? -1
  const bodyBeforeFAQ = conclusionIdx > 0 ? article.body?.slice(0, conclusionIdx) : article.body
  const bodyConclusion = conclusionIdx > 0 && article.body ? article.body.slice(conclusionIdx) : []

  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <FadeIn>
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

          <div className="mt-6 flex flex-wrap items-center gap-y-1 text-[11px] text-muted">
            {dateStr && <span>{dateStr}</span>}
            {article.readTime && <><span className="mx-1">·</span><span>{t.articles.readTime(article.readTime)}</span></>}
            {article.relatedArtist && (
              <><span className="mx-1">·</span>
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
        </FadeIn>

        {bodyBeforeFAQ && <PortableTextRenderer value={bodyBeforeFAQ} />}

        {article.faq && article.faq.length > 0 && (
          <FadeIn>
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-4 font-serif text-2xl text-foreground">FAQs</h2>
            {article.faq.map((item) => (
              <FAQItem key={item._key} question={item.question} answer={item.answer} />
            ))}
          </div>
          </FadeIn>
        )}

        {bodyConclusion.length > 0 && <PortableTextRenderer value={bodyConclusion} />}

        {article.relatedArtist && (
          <FadeIn><div className="mt-20 border-t border-border pt-10">
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
          </div></FadeIn>
        )}

        {article.relatedArtistArtworks && article.relatedArtistArtworks.length > 0 && (
          <FadeIn><div className="mt-16">
            <p className="mb-6 text-[10px] uppercase tracking-widest text-muted">
              {t.articles.relatedWorks}
            </p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {article.relatedArtistArtworks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          </div></FadeIn>
        )}

        <div className="mt-16">
          <FadeIn>
          <Link
            href="/editorial"
            className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.articles.backLink}
          </Link>
          </FadeIn>
        </div>
      </article>
    </MainLayout>
  )
}
