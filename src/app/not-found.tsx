import Link from 'next/link'
import type { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: "Page Not Found — Ahmilan's Gallery",
}

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-muted">
          Error
        </p>

        <h1
          className="font-serif leading-none text-border"
          style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
          aria-label="404"
        >
          404
        </h1>

        <p className="mt-8 max-w-sm text-base text-muted">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-foreground transition-opacity hover:opacity-50"
          >
            <span className="text-base leading-none">←</span>
            Back to home
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
