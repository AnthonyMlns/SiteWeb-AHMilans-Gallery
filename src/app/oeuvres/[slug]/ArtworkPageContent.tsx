'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import InquireModal from '@/components/artwork/InquireModal'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtworkPreview, SanityImage } from '@/lib/types'

interface ArtworkFull extends ArtworkPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[]
  medium?: string
  dimensions?: string
}

interface ArtworkPageContentProps {
  artwork: ArtworkFull
}

export default function ArtworkPageContent({ artwork }: ArtworkPageContentProps) {
  const { t } = useTranslation()

  const primaryImage: SanityImage | undefined = artwork.images?.[0]
  const additionalImages: SanityImage[] = artwork.images?.slice(1) ?? []

  const specs = [
    artwork.year      && { label: t.works.specs.year,         value: String(artwork.year) },
    artwork.medium    && { label: t.works.specs.medium,        value: artwork.medium },
    artwork.dimensions && { label: t.works.specs.dimensions,   value: artwork.dimensions },
    { label: t.works.specs.availability, value: artwork.available ? t.works.available : t.works.sold },
    artwork.price && artwork.available
      ? { label: t.works.specs.price, value: `${artwork.price.toLocaleString('fr-FR')} €` }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Primary image */}
          <div className="relative aspect-square overflow-hidden bg-placeholder">
            {primaryImage?.url && (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt ?? artwork.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col justify-center">
            {artwork.artist && (
              <Link
                href={`/artistes/${artwork.artist.slug.current}`}
                className="mb-4 text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                {artwork.artist.name}
              </Link>
            )}

            <h1
              className="font-serif leading-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              {artwork.title}
            </h1>

            {/* Specs */}
            <div className="mt-10 divide-y divide-border border-t border-border">
              {specs.map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between py-3 text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="text-right text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="mt-8">
                <PortableTextRenderer value={artwork.description} />
              </div>
            )}

            {artwork.available && (
              <InquireModal
                artworkTitle={artwork.title}
                artistName={artwork.artist?.name}
              />
            )}
          </div>
        </div>

        {/* Additional images */}
        {additionalImages.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
            {additionalImages.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-placeholder">
                <Image
                  src={img.url}
                  alt={img.alt ?? `${artwork.title} — vue ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-16">
          <Link
            href="/oeuvres"
            className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {t.works.backLink}
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
