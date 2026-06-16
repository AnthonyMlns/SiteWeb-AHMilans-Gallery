'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'
import { useTheme } from '@/lib/ThemeContext'
import { useTranslation } from '@/lib/i18n/LanguageContext'

export function Logo({
  onClick,
  className,
  svgClassName,
}: {
  onClick?: () => void
  className?: string
  /** Tailwind classes applied directly to the <svg>. Defaults to "h-7 w-auto". */
  svgClassName?: string
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AH — Milans"
      className={['inline-block transition-opacity hover:opacity-50', className].filter(Boolean).join(' ')}
    >
      <svg
        width="909"
        height="170"
        viewBox="0 0 909 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName ?? 'h-7 w-auto'}
        aria-hidden="true"
      >
        <path d="M77.1664 117.311L99.6904 53.264H112.242L134.766 117.311H123.934L119.034 102.954H92.9848L87.9985 117.311H77.1664ZM95.9077 93.9276H115.939L104.591 60.3994H107.428L95.9077 93.9276ZM150.961 117.311V53.264H161.106V81.462H190.765V53.264H200.823V117.311H190.765V90.4888H161.106V117.311H150.961Z" fill="currentColor"/>
        <path d="M476.581 117.311V53.264H486.037L510.109 86.6202H505.38L529.022 53.264H538.479V117.311H528.42V65.2137L532.203 66.2454L508.045 99.2577H507.014L483.372 66.2454L486.725 65.2137V117.311H476.581ZM560.317 117.311V53.264H570.461V117.311H560.317ZM592.337 117.311V53.264H602.482V108.284H630.164V117.311H592.337ZM641.603 117.311L664.127 53.264H676.679L699.203 117.311H688.371L683.47 102.954H657.422L652.435 117.311H641.603ZM660.344 93.9276H680.375L669.027 60.3994H671.864L660.344 93.9276ZM715.398 117.311V53.264H723.565L759.5 102.868L755.632 103.47V53.264H765.69V117.311H757.523L721.846 67.363L725.542 66.6752V117.311H715.398ZM809.987 118.343C805.975 118.343 802.249 117.598 798.81 116.108C795.372 114.56 792.449 112.468 790.042 109.832C787.634 107.196 785.858 104.158 784.711 100.719L793.308 97.1084C794.856 101.063 797.12 104.101 800.1 106.221C803.08 108.342 806.519 109.402 810.416 109.402C812.709 109.402 814.715 109.058 816.434 108.37C818.154 107.625 819.472 106.594 820.389 105.276C821.363 103.957 821.85 102.439 821.85 100.719C821.85 98.3693 821.191 96.5067 819.873 95.1311C818.555 93.7556 816.606 92.6667 814.027 91.8643L801.991 88.0816C797.177 86.5915 793.509 84.3276 790.987 81.29C788.465 78.1951 787.205 74.5844 787.205 70.4579C787.205 66.8472 788.093 63.6949 789.87 61.0012C791.646 58.2502 794.082 56.101 797.177 54.5535C800.329 53.0061 803.911 52.2323 807.923 52.2323C811.763 52.2323 815.259 52.9201 818.412 54.2956C821.564 55.6138 824.257 57.4478 826.493 59.7977C828.785 62.1475 830.447 64.8699 831.479 67.9648L823.054 71.6615C821.793 68.28 819.816 65.6722 817.122 63.8382C814.486 62.0042 811.419 61.0872 807.923 61.0872C805.803 61.0872 803.94 61.4597 802.335 62.2048C800.73 62.8926 799.47 63.9242 798.553 65.2997C797.693 66.6179 797.263 68.1654 797.263 69.9421C797.263 72.0053 797.922 73.8394 799.24 75.4441C800.559 77.0489 802.564 78.2525 805.258 79.0548L816.434 82.5796C821.535 84.127 825.375 86.3622 827.954 89.2852C830.533 92.1509 831.823 95.7329 831.823 100.031C831.823 103.585 830.877 106.737 828.986 109.488C827.152 112.239 824.601 114.417 821.335 116.022C818.068 117.569 814.285 118.343 809.987 118.343Z" fill="currentColor"/>
        <line x1="234.404" y1="88.0601" x2="438.152" y2="88.0601" stroke="currentColor" strokeWidth="2.57909"/>
        <rect x="1.08886" y="1.08886" width="905.936" height="167.685" rx="83.8426" stroke="currentColor" strokeWidth="2.17773"/>
      </svg>
    </Link>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const leftLinks = [
    { href: '/artists', label: t.nav.artists },
    { href: '/works', label: t.nav.works },
    { href: '/editorial', label: t.nav.editorial },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header className="relative sticky top-0 z-40 bg-background">
        <div className="flex h-14 items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">

          {/* Left: desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {leftLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'text-[13px] uppercase tracking-widest transition-colors',
                  isActive(item.href) ? 'text-foreground' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center: logo */}
          <div className="flex lg:justify-center">
            <Logo />
          </div>

          {/* Right: contact + lang + dark + hamburger */}
          <div className="flex items-center justify-end gap-6">
            <Link
              href="/contact"
              className="hidden text-[13px] uppercase tracking-widest text-muted transition-colors hover:text-foreground lg:block"
            >
              {t.nav.contact}
            </Link>

<button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              className="flex items-center justify-center p-2 text-muted transition-colors hover:text-foreground"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </button>
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-border" />
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
