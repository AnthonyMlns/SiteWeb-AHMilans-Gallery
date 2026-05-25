'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ArtworkPreview } from '@/lib/types'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface ArtworkCardProps {
  artwork: ArtworkPreview
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t } = useTranslation()
  const firstImage = artwork.images?.[0]

  return (
    <Link href={`/oeuvres/${artwork.slug.current}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-placeholder">
        {firstImage?.url ? (
          <Image
            src={firstImage.url}
            alt={firstImage.alt || artwork.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="h-full w-full" />
        )}
        {!artwork.available && (
          <div className="absolute bottom-3 left-3 bg-foreground px-2 py-0.5 text-[9px] uppercase tracking-widest text-background">
            {t.works.sold}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-0.5">
        <h3 className="font-serif text-base leading-snug text-foreground">
          {artwork.title}
        </h3>
        {artwork.artist && (
          <p className="text-[13px] text-muted">{artwork.artist.name}</p>
        )}
        <div className="flex items-center justify-between pt-0.5">
          {artwork.year && (
            <span className="text-[13px] text-muted">{artwork.year}</span>
          )}
          {artwork.price && artwork.available && (
            <span className="text-[13px] font-medium text-foreground">
              {artwork.price.toLocaleString('en-GB')} €
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
