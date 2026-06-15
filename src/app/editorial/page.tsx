import type { Metadata } from 'next'
import ArticlesContent from './ArticlesContent'
import { getAllArticles } from '@/lib/sanity/queries'
import type { ArticlePreview } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Journal \u2014 AH \u2014 Milans",
  description: "Interviews, artist portraits, and reflections on contemporary art.",
  openGraph: {
    title: "Journal \u2014 AH \u2014 Milans",
    description: "Interviews, artist portraits, and reflections on contemporary art.",
    url: "https://ahmilans.gallery/editorial",
  },
  twitter: {
    title: "Journal \u2014 AH \u2014 Milans",
    description: "Interviews, artist portraits, and reflections on contemporary art.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/editorial",
  },
}

export default async function ArticlesPage() {
  const articles: ArticlePreview[] = (await getAllArticles()) ?? []
  return <ArticlesContent articles={articles} />
}
