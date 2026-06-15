import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticlePageContent from './ArticlePageContent'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/sanity/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  const imageUrl = article.thumbnailUrl
  const title = `${article.title} \u2014 AH \u2014 Milans`
  const description = article.excerpt
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ahmilans.gallery/editorial/${article.slug.current}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://ahmilans.gallery/editorial/${article.slug.current}`,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  return <ArticlePageContent article={article} />
}
