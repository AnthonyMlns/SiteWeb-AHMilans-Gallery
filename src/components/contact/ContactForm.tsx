'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/LanguageContext'

type Status = 'idle' | 'sent'

export default function ContactForm() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Message via ahmilans.gallery')
    const body = encodeURIComponent(`De : ${name} <${email}>\n\n${message}`)
    window.location.href = `mailto:contact@ahmilans.gallery?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-[300px] flex-col items-start justify-center">
        <p className="font-serif text-2xl text-foreground">{t.contact.form.sent}</p>
        <p className="mt-3 text-sm text-muted">{t.contact.form.sentDesc}</p>
        <button
          onClick={() => { setName(''); setEmail(''); setMessage(''); setStatus('idle') }}
          className="mt-8 text-[11px] uppercase tracking-widest text-muted underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          {t.contact.form.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="mb-2 block text-[10px] uppercase tracking-widest text-muted">
          {t.contact.form.name} *
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.contact.form.namePlaceholder}
          className="w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] uppercase tracking-widest text-muted">
          {t.contact.form.email} *
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.contact.form.emailPlaceholder}
          className="w-full border-b border-border bg-transparent py-2.5 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] uppercase tracking-widest text-muted">
          {t.contact.form.message} *
        </label>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.contact.form.messagePlaceholder}
          className="w-full resize-none border-b border-border bg-transparent py-2.5 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-3 border border-foreground px-8 py-3.5 text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {t.contact.form.send}
        <span className="text-base leading-none">→</span>
      </button>
    </form>
  )
}
