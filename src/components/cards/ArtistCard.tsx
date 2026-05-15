import Link from 'next/link'
import Image from 'next/image'
import type { ArtistPreview } from '@/lib/types'

interface ArtistCardProps {
  artist: ArtistPreview
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const imageUrl = artist.profileImageUrl || artist.featuredImageUrl

  return (
    <Link href={`/artistes/${artist.slug.current}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-5xl italic text-muted opacity-20">
              {artist.name[0]}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-0.5">
        <h3 className="font-serif text-lg leading-snug text-foreground">
          {artist.name}
        </h3>
        {(artist.country || artist.style) && (
          <p className="text-[11px] uppercase tracking-wide text-muted">
            {[artist.country, artist.style].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}
