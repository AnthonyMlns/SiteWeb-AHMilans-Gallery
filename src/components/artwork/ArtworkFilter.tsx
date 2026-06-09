'use client'

import { useState, useMemo } from 'react'
import ArtworkCard from '@/components/cards/ArtworkCard'
import FadeIn from '@/components/ui/FadeIn'
import type { ArtworkPreview } from '@/lib/types'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface ArtworkFilterProps {
  artworks: ArtworkPreview[]
}

export default function ArtworkFilter({ artworks }: ArtworkFilterProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const { t } = useTranslation()

  const artists = useMemo(() => {
    const seen = new Map<string, string>()
    artworks.forEach((aw) => {
      if (aw.artist && !seen.has(aw.artist.slug.current)) {
        seen.set(aw.artist.slug.current, aw.artist.name)
      }
    })
    return Array.from(seen.entries()).map(([slug, name]) => ({ slug, name }))
  }, [artworks])

  const visible = selected
    ? artworks.filter((aw) => aw.artist?.slug.current === selected)
    : artworks

  if (artworks.length === 0) {
    return <p className="text-muted">{t.works.empty}</p>
  }

  return (
    <div>
      {/* Filter bar */}
      {artists.length > 1 && (
        <div className="mb-12 flex flex-wrap gap-2">
          <button
            onClick={() => setSelected(null)}
            className={[
              'border px-4 py-1.5 text-[10px] uppercase tracking-widest transition-colors',
              selected === null
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted hover:border-foreground hover:text-foreground',
            ].join(' ')}
          >
            {t.works.all}
          </button>
          {artists.map((a) => (
            <button
              key={a.slug}
              onClick={() => setSelected(a.slug)}
              className={[
                'border px-4 py-1.5 text-[10px] uppercase tracking-widest transition-colors',
                selected === a.slug
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted hover:border-foreground hover:text-foreground',
              ].join(' ')}
            >
              {a.name}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mb-8 text-sm text-muted">{t.works.count(visible.length)}</p>

      {/* Grid */}
      <FadeIn>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((artwork) => (
          <ArtworkCard key={artwork._id} artwork={artwork} />
        ))}
      </div>
      </FadeIn>

      {visible.length === 0 && (
        <FadeIn><p className="text-muted">{t.works.emptyFiltered}</p></FadeIn>
      )}
    </div>
  )
}
