'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface NewsletterFormProps {
  /** Extra classes applied to the root wrapper div */
  className?: string
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const { t } = useTranslation()
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={className}>
      {status === 'success' ? (
        <p className="py-3 font-sans text-[11px] uppercase tracking-widest text-muted">
          {t.newsletter.subscribed}
        </p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-b border-foreground"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              required
              disabled={status === 'loading'}
              className="flex-1 bg-transparent px-3 py-4 font-sans text-sm text-foreground placeholder:text-subtle focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label="S'inscrire à la newsletter"
              className="px-3 text-foreground transition-opacity hover:opacity-40 disabled:opacity-30"
            >
              →
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-1.5 font-sans text-[10px] text-red-500">
              {t.newsletter.error}
            </p>
          )}
        </>
      )}
    </div>
  )
}
