'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'
import { useTheme } from '@/lib/ThemeContext'
import { useTranslation } from '@/lib/i18n/LanguageContext'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useTranslation()

  const navItems = [
    { href: '/artistes', label: t.nav.artists },
    { href: '/oeuvres', label: t.nav.works },
    { href: '/articles', label: t.nav.editorial },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-60" aria-label="Ahmilan's Gallery">
            <Image
              src="/logo.svg"
              alt="Ahmilan's Gallery"
              width={160}
              height={32}
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'text-xs uppercase tracking-widest transition-colors',
                  isActive(item.href) ? 'text-foreground' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">

            {/* Language toggle */}
            <div className="flex items-center gap-1 text-[10px] tracking-widest">
              <button
                onClick={() => setLang('fr')}
                className={lang === 'fr' ? 'text-foreground' : 'text-muted transition-colors hover:text-foreground'}
              >
                FR
              </button>
              <span className="text-muted">|</span>
              <button
                onClick={() => setLang('en')}
                className={lang === 'en' ? 'text-foreground' : 'text-muted transition-colors hover:text-foreground'}
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
              className="text-muted transition-colors hover:text-foreground"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span className="block h-px w-5 bg-foreground transition-transform" />
              <span className="block h-px w-5 bg-foreground transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
