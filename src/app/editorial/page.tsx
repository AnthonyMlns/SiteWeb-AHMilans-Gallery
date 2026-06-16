import type { Metadata } from 'next'
import ArticlesContent from './ArticlesContent'
import { getAllArticles } from '@/lib/sanity/queries'
import type { ArticlePreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Editorial \u2014 AH Milans Gallery | Contemporary Art Journal & Collector Guides",
  description: "Discover the AH Milans editorial program \u2014 artist profiles, collector guides, and essays on contemporary abstract art.",
  openGraph: {
    title: "Editorial \u2014 AH Milans Gallery | Contemporary Art Journal & Collector Guides",
    description: "Discover the AH Milans editorial program \u2014 artist profiles, collector guides, and essays on contemporary abstract art.",
    url: "https://ahmilans.gallery/editorial",
  },
  twitter: {
    title: "Editorial \u2014 AH Milans Gallery | Contemporary Art Journal & Collector Guides",
    description: "Discover the AH Milans editorial program \u2014 artist profiles, collector guides, and essays on contemporary abstract art.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/editorial",
  },
}

export default async function ArticlesPage() {
  const articles: ArticlePreview[] = (await getAllArticles()) ?? []
  return <ArticlesContent articles={articles} />
}
