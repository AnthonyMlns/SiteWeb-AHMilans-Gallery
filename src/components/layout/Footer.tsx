'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/LanguageContext'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-60" aria-label="Ahmilan's Gallery">
              <Image
                src="/logo.svg"
                alt="Ahmilan's Gallery"
                width={120}
                height={24}
                className="h-6 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              A curatorial label for contemporary abstract art.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <Link href="/artistes" className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.artists}
            </Link>
            <Link href="/oeuvres" className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.works}
            </Link>
            <Link href="/articles" className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.editorial}
            </Link>
            <Link href="/contact" className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">
              {t.nav.contact}
            </Link>
          </div>

          {/* Contact + social */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:contact@ahmilans.gallery"
              className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              contact@ahmilans.gallery
            </a>
            <a
              href="https://www.instagram.com/ahmilans.gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-subtle">
            © {new Date().getFullYear()} Ahmilan&apos;s Gallery
          </p>
          <Link
            href="/privacy-policy"
            className="text-[11px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
          >
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
