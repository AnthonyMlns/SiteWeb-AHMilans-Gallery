'use client'

import MainLayout from '@/components/layout/MainLayout'
import ContactForm from '@/components/contact/ContactForm'
import FadeIn from '@/components/ui/FadeIn'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import { CONTACT_EMAIL } from '@/lib/config'

export default function ContactContent() {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-28">
        <div className="mb-10 lg:mb-20">
          <h1 className="font-serif text-5xl text-foreground">{t.contact.title}</h1>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">

          {/* Form */}
          <FadeIn><div>
            <ContactForm />
          </div></FadeIn>

          {/* Info */}
          <FadeIn delay={100}><div className="flex flex-col gap-12 lg:pl-8">
            <div>
              <p className="mb-2 leading-relaxed text-muted text-sm">
                AH — Milans is a curatorial label based in Paris, connecting collectors directly with emerging contemporary artists.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[10px] uppercase tracking-widest text-muted">{t.contact.email}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-foreground transition-opacity hover:opacity-60"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <p className="mb-4 text-[10px] uppercase tracking-widest text-muted">{t.contact.follow}</p>
              <a
                href="https://www.instagram.com/ahmilans.gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[13px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                Instagram
                <span className="text-base leading-none">→</span>
              </a>
            </div>

            <div>
              <p className="mb-4 text-[10px] uppercase tracking-widest text-muted">{t.contact.acquisitions}</p>
              <p className="text-sm leading-relaxed text-muted">{t.contact.acquisitionsText}</p>
            </div>
          </div></FadeIn>
        </div>
      </div>
    </MainLayout>
  )
}
