'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import { CONTACT_EMAIL } from '@/lib/config'

interface FooterProps {
  hideAdmin?: boolean
}

export default function Footer({ hideAdmin }: FooterProps = {}) {
  const { t } = useTranslation()

  return (
    <footer className="relative">
      <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-border" />
      <div className="flex flex-col items-start gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">

        <p className="font-sans text-[12px] uppercase tracking-widest text-subtle">
          © 2018—{new Date().getFullYear()} AH — Milans
        </p>

        <nav aria-label="Footer" className="flex items-center gap-6">
          <Link href="/works"   className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.works}</Link>
          <Link href="/artists"  className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.artists}</Link>
          <Link href="/editorial"  className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.editorial}</Link>
          <Link href="/contact"   className="font-sans text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-foreground">{t.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sans text-[12px] text-muted transition-colors hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
          <Link
            href="/privacy-policy"
            className="font-sans text-[12px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
          >
            {t.footer.privacy}
          </Link>
          {!hideAdmin && (
          <Link
            href="/studio"
            className="font-sans text-[12px] uppercase tracking-widest text-[#888]/40 transition-colors hover:text-[#888]"
          >
            Admin
          </Link>
          )}
        </div>

      </div>
    </footer>
  )
}
