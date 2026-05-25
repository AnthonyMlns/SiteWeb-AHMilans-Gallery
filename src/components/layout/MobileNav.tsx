'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from './Header'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/articles', label: t.nav.editorial },
    { href: '/artistes', label: t.nav.artists },
    { href: '/oeuvres', label: t.nav.works },
    { href: '/contact', label: t.nav.contact },
    { href: '/newsletter', label: 'Newsletter' },
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

return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={[
        'fixed inset-0 z-50 flex flex-col bg-background',
        'transition-[opacity,visibility] duration-300 ease-in-out',
        isOpen ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0',
      ].join(' ')}
    >
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between px-6">
        <Logo onClick={onClose} />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute inset-x-0 top-1/2 block h-px origin-center -translate-y-px -rotate-45 bg-foreground" />
            <span className="absolute inset-x-0 top-1/2 block h-px origin-center -translate-y-px rotate-45 bg-foreground" />
          </span>
        </button>
      </div>

      {/* Nav items */}
      <nav
        aria-label="Mobile navigation"
        className="flex flex-1 flex-col justify-center px-6"
      >
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{ transitionDelay: isOpen ? `${50 + i * 45}ms` : '0ms' }}
            className={[
              'py-5',
              'font-sans font-light uppercase tracking-[0.1em]',
              'transition-all duration-300',
              'text-[clamp(1.75rem,7vw,2.75rem)]',
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              isActive(item.href) ? 'text-foreground' : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="flex shrink-0 items-center px-6 py-6 text-[10px] uppercase tracking-widest">
        <a
          href="https://www.instagram.com/ahmilans.gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-foreground"
        >
          Instagram
        </a>
      </div>
    </div>
  )
}
