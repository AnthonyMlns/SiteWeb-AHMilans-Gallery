'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from '@/lib/i18n/LanguageContext'

interface InquireModalProps {
  artworkTitle: string
  artistName?: string
}

export default function InquireModal({ artworkTitle, artistName }: InquireModalProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(() => t.works.inquireDefaultMessage(artworkTitle, artistName))

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(t.works.inquireSubject(artworkTitle))
    const body = encodeURIComponent(`De : ${name} <${email}>\n\n${message}`)
    window.location.href = `mailto:contact@ahmilans.gallery?subject=${subject}&body=${body}`
    close()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-10 w-full border border-foreground px-6 py-3.5 text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {t.works.inquireTrigger}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/40 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full max-w-lg bg-background p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  {t.works.inquireHeading}
                </p>
                <h2 className="mt-1 font-serif text-xl text-foreground">{artworkTitle}</h2>
              </div>
              <button
                onClick={close}
                aria-label="Fermer"
                className="relative ml-4 flex h-8 w-8 shrink-0 items-center justify-center text-muted hover:text-foreground"
              >
                <span className="absolute block h-px w-4 origin-center rotate-45 bg-current" />
                <span className="absolute block h-px w-4 origin-center -rotate-45 bg-current" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted">
                    {t.works.namePlaceholder} *
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.works.namePlaceholder}
                    className="w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.works.emailPlaceholder}
                    className="w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none border-b border-border bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-widest text-background transition-opacity hover:opacity-70"
              >
                {t.works.inquireSubmit}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
