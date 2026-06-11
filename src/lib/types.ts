export interface Slug {
  current: string
}

export interface SanityImage {
  url: string
  alt?: string
}

export interface ArtistPreview {
  _id: string
  name: string
  slug: Slug
  country?: string
  style?: string
  order: number
  featured: boolean
  statementCourt?: string
  profileImageUrl?: string
  featuredImageUrl?: string
}

export interface ArtistFull extends ArtistPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[]
  instagramUrl?: string
  website?: string
  artworks?: ArtworkPreview[]
}

export interface ArtworkPreview {
  _id: string
  title: string
  slug: Slug
  year?: number
  medium?: string
  dimensions?: string
  available: boolean
  featured: boolean
  price?: number
  images?: SanityImage[]
  artist?: {
    name: string
    slug: Slug
  }
}

export interface ArtworkFull extends ArtworkPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[]
  artist?: ArtistPreview
}

export interface ArticlePreview {
  _id: string
  title: string
  slug: Slug
  category?: string
  excerpt?: string
  publishedAt?: string
  readTime?: number
  featured: boolean
  thumbnailUrl?: string
  relatedArtist?: {
    name: string
    slug: Slug
  }
  relatedArtwork?: {
    _id?: string
    title: string
    slug: Slug
  }
}

export interface ArticleFull extends ArticlePreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  relatedArtistArtworks?: ArtworkPreview[]
}


