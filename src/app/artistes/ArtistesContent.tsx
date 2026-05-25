'use client'

import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { ArtistPreview } from '@/lib/types'

interface ArtistesContentProps {
  artists: ArtistPreview[]
}

export default function ArtistesContent({ artists }: ArtistesContentProps) {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">{t.artists.title}</h1>
          <p className="mt-2 text-sm text-muted">{t.artists.count(artists.length)}</p>
        </div>

        {artists.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {artists.map((artist) => {
              const imageUrl = artist.profileImageUrl ?? artist.featuredImageUrl

              return (
                <div key={artist._id}>
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
                          <span className="font-serif text-5xl text-muted opacity-20">
                            {artist.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pb-1">
                      <h2 className="font-serif text-lg leading-snug text-foreground">{artist.name}</h2>
                      {(artist.country || artist.style) && (
                        <p className="mt-0.5 text-[13px] uppercase tracking-wide text-muted">
                          {[artist.country, artist.style].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-muted">{t.artists.empty}</p>
        )}
      </div>
    </MainLayout>
  )
}
