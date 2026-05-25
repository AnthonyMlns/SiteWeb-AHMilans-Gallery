'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f8] px-6 text-center">
      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b]">
        Unexpected error
      </p>

      <h1 className="font-serif text-4xl text-[#111111]">
        Something went wrong.
      </h1>

      <p className="mt-4 max-w-sm text-sm text-[#6b6b6b]">
        An error occurred while loading this page.
      </p>

      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={reset}
          className="text-[11px] uppercase tracking-widest text-[#111111] underline underline-offset-4 transition-opacity hover:opacity-50"
        >
          Try again
        </button>
        <span className="text-[#e2e2e4]">|</span>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-widest text-[#6b6b6b] transition-colors hover:text-[#111111]"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
