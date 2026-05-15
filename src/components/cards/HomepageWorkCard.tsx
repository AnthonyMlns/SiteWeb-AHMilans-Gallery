'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtworkPreview } from '@/lib/types'

export default function HomepageWorkCard({ artwork }: { artwork: ArtworkPreview }) {
  const { t } = useTranslation()
  const image = artwork.images?.[0]

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-placeholder">
        {image?.url && (
          <Image
            src={image.url}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {artwork.available && artwork.price ? (
            <p className="font-sans text-sm text-background">
              {artwork.price.toLocaleString('fr-FR')} €
            </p>
          ) : !artwork.available ? (
            <p className="font-sans text-sm text-background/60">{t.works.sold}</p>
          ) : null}
          <Link
            href={`/oeuvres/${artwork.slug.current}`}
            className="border border-background px-5 py-2 text-[11px] uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
          >
            {t.works.inquireTrigger}
          </Link>
        </div>
      </div>

      <Link href={`/oeuvres/${artwork.slug.current}`} className="mt-4 block">
        <h3 className="font-serif text-base text-foreground transition-opacity group-hover:opacity-70">
          {artwork.title}
        </h3>
        {artwork.artist && (
          <p className="mt-0.5 text-xs text-muted">{artwork.artist.name}</p>
        )}
        {artwork.dimensions && (
          <p className="mt-0.5 text-xs text-subtle">{artwork.dimensions}</p>
        )}
      </Link>
    </div>
  )
}
