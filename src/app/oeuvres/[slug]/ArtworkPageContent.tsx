import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import InquireModal from '@/components/artwork/InquireModal'
import ArtworkCard from '@/components/cards/ArtworkCard'
import type { ArtworkPreview, SanityImage } from '@/lib/types'

interface ArtworkFull extends ArtworkPreview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[]
  medium?: string
  dimensions?: string
  relatedWorks?: ArtworkPreview[]
}

interface ArtworkPageContentProps {
  artwork: ArtworkFull
}

export default function ArtworkPageContent({ artwork }: ArtworkPageContentProps) {
  const primaryImage: SanityImage | undefined = artwork.images?.[0]
  const additionalImages: SanityImage[] = artwork.images?.slice(1) ?? []

  const specs = [
    artwork.year       && { label: 'Year',           value: String(artwork.year) },
    artwork.medium     && { label: 'Medium',          value: artwork.medium },
    artwork.dimensions && { label: 'Dimensions',     value: artwork.dimensions },
    { label: 'Availability', value: artwork.available ? 'Available' : 'Sold' },
    artwork.price && artwork.available
      ? { label: 'Price', value: `${artwork.price.toLocaleString('en-GB')} €` }
      : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-28">

          {/* Primary image */}
          <div className="relative aspect-square overflow-hidden">
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
                className="mb-4 text-[13px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
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
              <div key={i} className="relative aspect-square overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.alt ?? `${artwork.title} — view ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Related works from the same artist */}
        {artwork.relatedWorks && artwork.relatedWorks.length > 0 && (
          <section className="mt-16 lg:mt-28">
            <h2 className="mb-10 font-serif text-3xl text-foreground lg:mb-16">
              From the same artist
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {artwork.relatedWorks.map((related) => (
                <ArtworkCard key={related._id} artwork={related} />
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mt-12 lg:mt-24">
          <Link
            href="/oeuvres"
            className="text-[13px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            ← All works
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
