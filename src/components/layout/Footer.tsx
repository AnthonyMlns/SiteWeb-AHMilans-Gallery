'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/LanguageContext'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border">
      <div className="px-6 py-8 lg:px-10">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-y-6 lg:grid-cols-4 lg:gap-0">

          {/* Col 1: Brand */}
          <div className="flex items-start">
            <Link href="/" className="font-sans text-[11px] uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-50">
              AH MILANS
            </Link>
          </div>

          {/* Col 2: Tagline */}
          <div className="flex items-start">
            <span className="font-sans text-[11px] uppercase tracking-widest text-muted">
              Contemporary Art Label
            </span>
          </div>

          {/* Col 3: Nav */}
          <div className="flex flex-col gap-2">
            <Link href="/oeuvres" className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.works}
            </Link>
            <Link href="/articles" className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.editorial}
            </Link>
            <Link href="/artistes" className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.artists}
            </Link>
            <Link href="/contact" className="font-sans text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.contact}
            </Link>
          </div>

          {/* Col 4: Location + email */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] uppercase tracking-widest text-muted">
              Europe &amp; USA
            </span>
            <a
              href="mailto:ahmilans.gallery@gmail.com"
              className="font-sans text-[11px] text-muted transition-colors hover:text-foreground"
            >
              ahmilans.gallery@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-5 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] uppercase tracking-widest text-subtle">
            © {new Date().getFullYear()} AH Milans
          </p>
          <Link
            href="/privacy-policy"
            className="font-sans text-[10px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
          >
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
