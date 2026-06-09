'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import NewsletterForm from '@/components/ui/NewsletterForm'
import FadeIn from '@/components/ui/FadeIn'

type Tab = 'login' | 'join'

export default function SignInContent() {
  const [tab, setTab]           = useState<Tab>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')

  const isEmpty = !email || !password || (tab === 'join' && !name)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Auth not yet implemented — Clerk integration coming soon
  }

  return (
    <MainLayout>

      <FadeIn>
      <div className="mx-auto max-w-sm px-6 py-28 lg:py-36">

        {/* Tabs */}
        <div className="mb-14 flex gap-0 border-b border-border">
          {(tab === 'login'
            ? [{ key: 'login', label: 'Log in' }, { key: 'join', label: 'Join' }]
            : [{ key: 'join', label: 'Join' }, { key: 'login', label: 'Log in' }]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as Tab)}
              className={`flex-1 pb-4 text-[11px] uppercase tracking-widest transition-colors ${
                tab === t.key
                  ? 'text-foreground border-b border-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {tab === 'join' && (
            <div>
              <label className="mb-3 block text-[10px] uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your name"
                className="w-full border-b border-border bg-transparent py-4 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
              />
            </div>
          )}

          <div>
            <label className="mb-3 block text-[10px] uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full border-b border-border bg-transparent py-4 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
            />
          </div>

          <div>
            <label className="mb-3 block text-[10px] uppercase tracking-widest text-muted">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              placeholder={tab === 'login' ? 'Your password' : 'Choose a password'}
              className="w-full border-b border-border bg-transparent py-4 text-sm text-foreground placeholder-subtle outline-none transition-colors focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={isEmpty}
            className={`w-full border px-6 py-3.5 text-[11px] uppercase tracking-widest transition-colors ${
              isEmpty
                ? 'border-border text-subtle cursor-default'
                : 'border-foreground text-foreground hover:bg-foreground hover:text-background'
            }`}
          >
            {tab === 'login' ? 'Log in' : 'Join'}
          </button>

          {tab === 'login' && (
            <p className="text-center">
              <button
                type="button"
                className="text-[11px] uppercase tracking-widest text-subtle transition-colors hover:text-muted"
              >
                Forgot password?
              </button>
            </p>
          )}
        </form>
      </div>
      </FadeIn>

      {/* Newsletter */}
      <FadeIn>
      <section aria-label="Newsletter" className="px-6 py-28 text-center lg:py-36">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-subtle">
          Not your average newsletter
        </p>
        <p
          className="mt-3 font-serif text-foreground"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Best emerging artist updates
        </p>
        <NewsletterForm className="mx-auto mt-10 max-w-xs" />
      </section>
      </FadeIn>

    </MainLayout>
  )
}
