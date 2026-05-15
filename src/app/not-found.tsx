import Link from 'next/link'
import type { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: "Page introuvable — Ahmilan's Gallery",
}

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-muted">
          Erreur
        </p>

        <h1
          className="font-serif leading-none text-border"
          style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
          aria-label="404"
        >
          404
        </h1>

        <p className="mt-8 max-w-sm text-base text-muted">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-50"
          >
            <span className="text-base leading-none">←</span>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
