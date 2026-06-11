import { groq } from 'next-sanity'
import { client } from './client'

// ─── Shared field sets ────────────────────────────────────────────────────────

const artistPreviewFields = `
  _id,
  name,
  slug,
  country,
  style,
  order,
  featured,
  statementCourt,
  "profileImageUrl": profileImage.asset->url,
  "featuredImageUrl": featuredImage.asset->url
`

const artworkPreviewFields = `
  _id,
  title,
  slug,
  year,
  medium,
  dimensions,
  available,
  featured,
  price,
  "images": images[]{
    "url": asset->url,
    "alt": alt
  },
  "artist": artist->{
    name,
    slug
  }
`

// ─── Queries ──────────────────────────────────────────────────────────────────

export const allArtistsQuery = groq`
  *[_type == "artist"] | order(order asc) {
    ${artistPreviewFields}
  }
`

export const artistBySlugQuery = groq`
  *[_type == "artist" && slug.current == $slug][0] {
    ${artistPreviewFields},
    bio,
    instagramUrl,
    website,
    "artworks": *[_type == "artwork" && references(^._id)] | order(_createdAt desc) {
      ${artworkPreviewFields}
    }
  }
`

export const availableArtworksQuery = groq`
  *[_type == "artwork" && available == true] | order(_createdAt desc) {
    ${artworkPreviewFields}
  }
`

export const artworkBySlugQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    medium,
    dimensions,
    available,
    featured,
    price,
    description,
    "images": images[]{
      "url": asset->url,
      "alt": alt
    },
    "artist": artist->{
      ${artistPreviewFields}
    },
    "relatedWorks": *[_type == "artwork" && artist._ref == ^.artist._ref && slug.current != $slug] | order(_createdAt desc) [0..7] {
      ${artworkPreviewFields}
    }
  }
`

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    readTime,
    featured,
    "thumbnailUrl": thumbnail.asset->url,
    "relatedArtist": relatedArtist->{
      name,
      slug
    }
  }
`

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0..9] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    readTime,
    featured,
    "thumbnailUrl": thumbnail.asset->url,
    "relatedArtist": relatedArtist->{
      name,
      slug
    }
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    body,
    publishedAt,
    readTime,
    featured,
    "thumbnailUrl": thumbnail.asset->url,
    "relatedArtist": relatedArtist->{
      name,
      slug,
      statementCourt
    },
    "relatedArtistArtworks": *[_type == "artwork" && artist._ref == ^.relatedArtist._ref] | order(_createdAt desc) [0..8] {
      ${artworkPreviewFields}
    }
  }
`

export const featuredArtworksQuery = groq`
  *[_type == "artwork" && featured == true] | order(_createdAt desc) [0..5] {
    ${artworkPreviewFields}
  }
`

// ─── Fetch helpers ─────────────────────────────────────────────────────────────

export async function getAllArtists() {
  return client.fetch(allArtistsQuery)
}

export async function getArtistBySlug(slug: string) {
  return client.fetch(artistBySlugQuery, { slug })
}

export async function getAvailableArtworks() {
  return client.fetch(availableArtworksQuery)
}

export async function getArtworkBySlug(slug: string) {
  return client.fetch(artworkBySlugQuery, { slug })
}

export async function getAllArticles() {
  return client.fetch(allArticlesQuery)
}

export async function getLatestArticles() {
  return client.fetch(latestArticlesQuery)
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(articleBySlugQuery, { slug })
}

export async function getFeaturedArtworks() {
  return client.fetch(featuredArtworksQuery)
}

// ─── Slug queries for generateStaticParams ────────────────────────────────────

const allArtistSlugsQuery = groq`
  *[_type == "artist" && defined(slug.current)]{ "slug": slug.current }
`

const allArticleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`

const allArtworkSlugsQuery = groq`
  *[_type == "artwork" && defined(slug.current)]{ "slug": slug.current }
`

export async function getAllArtistSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allArtistSlugsQuery)
}

export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allArticleSlugsQuery)
}

export async function getAllArtworkSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allArtworkSlugsQuery)
}

// ─── Curates queries ────────────────────────────────────────────────────────────

export const allCuratesQuery = groq`
  *[_type == "curate"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "thumbnailUrl": thumbnail.asset->url,
    "relatedArtist": relatedArtist->{
      name,
      slug,
      statementCourt
    },
    "relatedArtwork": relatedArtwork->{
      title,
      slug,
      medium,
      dimensions,
      year,
      "images": images[]{
        "url": asset->url,
        "alt": alt
      },
      "artist": artist->{
        name,
        slug
      }
    }
  }
`

export const curateBySlugQuery = groq`
  *[_type == "curate" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    faq,
    publishedAt,
    readTime,
    "thumbnailUrl": thumbnail.asset->url,
    "relatedArtist": relatedArtist->{
      name,
      slug,
      statementCourt
    },
    "relatedArtwork": relatedArtwork->{
      title,
      slug,
      medium,
      dimensions,
      year,
      "images": images[]{
        "url": asset->url,
        "alt": alt
      },
      "artist": artist->{
        name,
        slug
      }
    },
    "relatedArtistArtworks": *[_type == "artwork" && artist._ref == ^.relatedArtist._ref] | order(_createdAt desc) [0..3] {
      ${artworkPreviewFields}
    }
  }
`

const allCuratesSlugsQuery = groq`
  *[_type == "curate" && defined(slug.current)]{ "slug": slug.current }
`

export async function getAllCurates() {
  return client.fetch(allCuratesQuery)
}

export async function getCurateBySlug(slug: string) {
  return client.fetch(curateBySlugQuery, { slug })
}

export async function getAllCuratesSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allCuratesSlugsQuery)
}

export const artistCuratesQuery = groq`
  *[_type == "curate" && relatedArtist->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }
`

export async function getArtistCurates(slug: string) {
  return client.fetch(artistCuratesQuery, { slug })
}

export const prevCurateQuery = groq`
  *[_type == "curate" && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current
  }
`

export const nextCurateQuery = groq`
  *[_type == "curate" && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
    title,
    "slug": slug.current
  }
`

export async function getAdjacentCurates(publishedAt: string) {
  const [prev, next] = await Promise.all([
    client.fetch(prevCurateQuery, { publishedAt }),
    client.fetch(nextCurateQuery, { publishedAt }),
  ])
  return { prev, next }
}

export const randomArtworksQuery = groq`
  *[_type == "artwork" && available == true] | order(_createdAt desc) {
    ${artworkPreviewFields}
  }
`

export async function getRandomArtworks(count = 4) {
  const all = await client.fetch(randomArtworksQuery)
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
