'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArticlePreview } from '@/lib/types'

interface ArticlesContentProps {
  articles: ArticlePreview[]
}

export default function ArticlesContent({ articles }: ArticlesContentProps) {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">{t.articles.title}</h1>
          <p className="mt-2 text-sm text-muted">{t.articles.count(articles.length)}</p>
        </div>

        {articles.length > 0 ? (
          <div className="divide-y divide-transparent">
            {articles.map((article) => {
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
                <Link
                  key={article._id}
                  href={`/articles/${article.slug.current}`}
                  className="group flex items-start gap-6 py-8 md:gap-10"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-36 shrink-0 overflow-hidden bg-placeholder md:h-28 md:w-44">
                    {article.thumbnailUrl ? (
                      <Image
                        src={article.thumbnailUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 144px, 176px"
                      />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 pt-1">
                    {categoryLabel && (
                      <span className="text-[10px] uppercase tracking-widest text-muted">
                        {categoryLabel}
                      </span>
                    )}
                    <h2 className="mt-1 font-serif text-xl leading-snug text-foreground group-hover:opacity-70 md:text-2xl">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
                      {dateStr && <span>{dateStr}</span>}
                      {article.readTime && (
                        <span className="before:mr-3 before:content-['·']">
                          {t.articles.readTime(article.readTime)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-muted">{t.articles.empty}</p>
        )}
      </div>
    </MainLayout>
  )
}
