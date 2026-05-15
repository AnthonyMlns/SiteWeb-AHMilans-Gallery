import type { Metadata } from 'next'
import ArticlesContent from './ArticlesContent'
import { getAllArticles } from '@/lib/sanity/queries'
import type { ArticlePreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Journal — Ahmilan's Gallery",
  description: "Interviews, portraits et réflexions sur l'art contemporain.",
}

export default async function ArticlesPage() {
  const articles: ArticlePreview[] = (await getAllArticles()) ?? []
  return <ArticlesContent articles={articles} />
}
