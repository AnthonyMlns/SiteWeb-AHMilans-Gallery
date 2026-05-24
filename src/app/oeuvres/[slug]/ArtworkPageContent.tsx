import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import InquireModal from '@/components/artwork/InquireModal'
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
  const primaryImage: SanityImage | undefined = artwork.images?.[0]
  const additionalImages: SanityImage[] = artwork.images?.slice(1) ?? []

  const specs = [
    artwork.year       && { label: 'Année',         value: String(artwork.year) },
    artwork.medium     && { label: 'Technique',      value: artwork.medium },
    artwork.dimensions && { label: 'Dimensions',     value: artwork.dimensions },
    { label: 'Disponibilité', value: artwork.available ? 'Disponible' : 'Vendue' },
    artwork.price && artwork.available
      ? { label: 'Prix', value: `${artwork.price.toLocaleString('fr-FR')} €` }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-28">

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
            <div className="mt-10 divide-y divide-transparent">
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
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-24 lg:gap-4">
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
        <div className="mt-12 lg:mt-24">
          <Link
            href="/oeuvres"
            className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            ← Toutes les œuvres
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
