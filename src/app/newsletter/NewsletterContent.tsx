'use client'

import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import NewsletterForm from '@/components/ui/NewsletterForm'
import FadeIn from '@/components/ui/FadeIn'

interface NewsletterContentProps {
  heroImageUrl: string | null
}

export default function NewsletterContent({ heroImageUrl }: NewsletterContentProps) {
  return (
    <MainLayout>
      <div className="flex flex-col items-center px-6 py-28 lg:py-36">

        {/* ── Hero image ──────────────────────────────────────────────── */}
        <FadeIn>
        <div
          className="relative w-full max-w-md overflow-hidden bg-placeholder"
          style={{ aspectRatio: '3/4' }}
        >
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              alt="AH — Milans"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          )}
        </div>
        </FadeIn>

        {/* ── Newsletter copy + form ───────────────────────────────────── */}
        <FadeIn delay={100}>
        <div className="mt-20 flex flex-col items-center">
          <p className="text-center font-sans text-[10px] uppercase tracking-[0.25em] text-muted">
            Not your average newsletter
          </p>
          <p className="mt-1 text-center font-sans text-[10px] uppercase tracking-[0.25em] text-foreground">
            Best emerging artist updates
          </p>
          <NewsletterForm className="mt-7 w-full max-w-xs" />
        </div>
        </FadeIn>

      </div>
    </MainLayout>
  )
}
