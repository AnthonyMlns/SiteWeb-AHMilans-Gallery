'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface FooterProps {
  hideAdmin?: boolean
}

export default function Footer({ hideAdmin }: FooterProps = {}) {
  const { t } = useTranslation()

  return (
    <footer className="relative">
      <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-border" />
      <div className="flex flex-col gap-4 px-6 py-8 lg:px-10">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex items-center gap-6">
            <Link href="/works"   className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.works}</Link>
            <Link href="/artists"  className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.artists}</Link>
            <Link href="/editorial"  className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.editorial}</Link>
            <Link href="/curates"   className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">Curates</Link>
            <Link href="/contact"   className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.contact}</Link>
          </nav>

          <Link
            href="/privacy-policy"
            className="font-sans text-[12px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
          >
            {t.footer.privacy}
          </Link>
        </div>

        <div className="text-center">
          <p className="font-sans text-[12px] uppercase tracking-widest text-subtle">
            © 2018—{new Date().getFullYear()} AH — Milans
            {!hideAdmin && (
            <Link
              href="/studio"
              className="ml-1 font-sans text-[10px] text-[#888]/20 transition-colors hover:text-[#888]"
              aria-label="Admin"
            >
              *
            </Link>
            )}
          </p>
        </div>

      </div>
    </footer>
  )
}
