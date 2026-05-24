'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import NewsletterForm from '@/components/ui/NewsletterForm'

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

  const inputClass =
    'w-full border border-border bg-background px-4 py-4 font-sans text-sm text-foreground focus:border-foreground focus:outline-none transition-colors'

  return (
    <MainLayout>

      {/* ── Form area ──────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center px-6 py-28 lg:py-36">

        {/* Tabs */}
        <div className="mb-10 flex gap-8">
          {(['login', 'join'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'font-sans text-sm capitalize pb-1 border-b transition-colors',
                tab === t
                  ? 'text-blue-600 border-blue-600'
                  : 'text-muted border-transparent hover:text-foreground',
              ].join(' ')}
            >
              {t === 'login' ? 'Log in' : 'Join'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-8">
          {tab === 'join' && (
            <div>
              <label className="mb-3 block font-sans text-sm text-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label className="mb-3 block font-sans text-sm text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-3 block font-sans text-sm text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isEmpty}
            className={[
              'py-2 font-sans text-sm transition-colors',
              isEmpty ? 'text-subtle cursor-default' : 'text-foreground hover:text-muted',
            ].join(' ')}
          >
            {tab === 'login' ? 'Log in' : 'Join'}
          </button>

          {tab === 'login' && (
            <p className="text-center">
              <button
                type="button"
                className="font-sans text-sm text-subtle transition-colors hover:text-muted"
              >
                Forgot password?
              </button>
            </p>
          )}
        </form>
      </div>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center lg:py-36">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted">
          Not your average newsletter
        </p>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.25em] text-foreground">
          Best emerging artist updates
        </p>
        <NewsletterForm className="mx-auto mt-7 max-w-xs" />
      </section>

    </MainLayout>
  )
}
