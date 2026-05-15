'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ArticlePreview } from '@/lib/types'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface ArticleCardProps {
  article: ArticlePreview
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { t, lang } = useTranslation()

  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const categoryLabel = article.category
    ? (t.categories as Record<string, string>)[article.category] ?? article.category
    : null

  return (
    <Link href={`/articles/${article.slug.current}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-placeholder">
        {article.thumbnailUrl ? (
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        {categoryLabel && (
          <span className="text-[10px] uppercase tracking-widest text-muted">
            {categoryLabel}
          </span>
        )}
        <h3 className="font-serif text-xl leading-snug text-foreground">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 pt-1 text-[11px] text-muted">
          {dateStr && <span>{dateStr}</span>}
          {article.readTime && <span>· {article.readTime} min</span>}
        </div>
      </div>
    </Link>
  )
}
