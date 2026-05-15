'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { Lang } from '@/lib/i18n/index'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { lang, setLang, t } = useTranslation()

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/artistes', label: t.nav.artists },
    { href: '/oeuvres', label: t.nav.works },
    { href: '/articles', label: t.nav.editorial },
    { href: '/contact', label: t.nav.contact },
  ]

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleLang = (l: Lang) => { setLang(l); onClose() }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className={[
        'fixed inset-0 z-50 flex flex-col bg-background md:hidden',
        'transition-[opacity,visibility] duration-300 ease-in-out',
        isOpen ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0',
      ].join(' ')}
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
        <Link href="/" onClick={onClose} className="transition-opacity hover:opacity-60" aria-label="Ahmilan's Gallery">
          <Image
            src="/logo.svg"
            alt="Ahmilan's Gallery"
            width={140}
            height={28}
            className="h-7 w-auto"
            unoptimized
          />
        </Link>
        <button onClick={onClose} aria-label="Fermer le menu" className="flex h-10 w-10 items-center justify-center">
          <span className="relative block h-4 w-4">
            <span className="absolute inset-x-0 top-1/2 block h-px origin-center -translate-y-px -rotate-45 bg-foreground" />
            <span className="absolute inset-x-0 top-1/2 block h-px origin-center -translate-y-px rotate-45 bg-foreground" />
          </span>
        </button>
      </div>

      {/* Nav links */}
      <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center px-6">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{ transitionDelay: isOpen ? `${80 + i * 55}ms` : '0ms' }}
            className={[
              'border-b border-border py-6',
              'font-serif leading-none',
              'text-[clamp(2rem,8vw,3.25rem)]',
              'transition-all duration-500',
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              isActive(item.href) ? 'text-foreground' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="flex shrink-0 items-center justify-between px-6 py-8">
        <a
          href="https://www.instagram.com/ahmilans.gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
        >
          Instagram
        </a>

        {/* Language toggle */}
        <div className="flex items-center gap-2 text-[10px] tracking-widest">
          <button
            onClick={() => handleLang('fr')}
            className={lang === 'fr' ? 'text-foreground' : 'text-muted hover:text-foreground transition-colors'}
          >
            FR
          </button>
          <span className="text-border">|</span>
          <button
            onClick={() => handleLang('en')}
            className={lang === 'en' ? 'text-foreground' : 'text-muted hover:text-foreground transition-colors'}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  )
}
