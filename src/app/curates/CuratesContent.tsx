'use client'

import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import FadeIn from '@/components/ui/FadeIn'

interface CuratePreview {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  readTime?: number
  relatedArtwork?: {
    title: string
    slug: { current: string }
    images?: { url: string; alt: string }[]
    artist?: { name: string; slug: { current: string } }
  }
}

interface CuratesContentProps {
  curates: CuratePreview[]
}

export default function CuratesContent({ curates }: CuratesContentProps) {
  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">AH Milans Curates</h1>
          <p className="mt-2 text-sm text-muted">
            A weekly selection — one artwork, one story, every Friday.
          </p>
        </div>

        {curates.length > 0 ? (
          <FadeIn>
          <div className="divide-y divide-transparent">
            {curates.map((curate) => {
              const dateStr = curate.publishedAt
                ? new Date(curate.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : null

              const artworkImage = curate.relatedArtwork?.images?.[0]

              return (
                <Link
                  key={curate._id}
                  href={`/curates/${curate.slug.current}`}
                  className="group flex items-start gap-6 py-8 md:gap-10"
                >
                  <div className="relative w-24 shrink-0 overflow-hidden bg-placeholder aspect-[3/4] md:w-32">
                    {artworkImage?.url ? (
                      <Image
                        src={artworkImage.url}
                        alt={artworkImage.alt ?? curate.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 144px, 176px"
                      />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </div>

                  <div className="flex-1 pt-1">
                    <h2 className="mt-1 font-serif text-xl leading-snug text-foreground group-hover:opacity-70 md:text-2xl">
                      {curate.title}
                    </h2>
                    {curate.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {curate.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3 text-[13px] text-muted">
                      {dateStr && <span>{dateStr}</span>}
                      {curate.readTime && (
                        <span className="before:mr-3 before:content-['·']">
                          {curate.readTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          </FadeIn>
        ) : (
          <FadeIn><p className="text-muted">No curates yet. Subscribe to the newsletter to be the first to receive one.</p></FadeIn>
        )}
      </div>
    </MainLayout>
  )
}
