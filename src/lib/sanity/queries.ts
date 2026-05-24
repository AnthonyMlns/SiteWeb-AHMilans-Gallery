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
  *[_type == "article"] | order(publishedAt desc) [0..4] {
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
      slug
    }
  }
`

export const featuredArtworksQuery = groq`
  *[_type == "artwork" && featured == true] | order(_createdAt desc) [0..5] {
    ${artworkPreviewFields}
  }
`

export const homepageSettingsQuery = groq`
  *[_type == "settings"][0] {
    tickerText,
    "services": services[]{
      title,
      description
    },
    "heroArtist": heroArtist->{
      ${artistPreviewFields}
    },
    "artistOfTheMonth": artistOfTheMonth->{
      ${artistPreviewFields}
    },
    "featuredArtwork": featuredArtwork->{
      ${artworkPreviewFields}
    }
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

export async function getHomepageSettings() {
  return client.fetch(homepageSettingsQuery)
}
