'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import { CONTACT_EMAIL } from '@/lib/config'

function PrivacyContent() {
  return (
    <div className="space-y-12 text-sm leading-relaxed text-muted">
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">1. Data Controller</h2>
        <p>
          The controller of personal data collected via this site is Ahmilan&apos;s Gallery, reachable at: <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">{CONTACT_EMAIL}</a>.
        </p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">2. Data Collected</h2>
        <p className="mb-4">We collect the following data:</p>
        <ul className="list-none space-y-3">
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span><strong className="font-medium text-foreground">Contact form</strong>: name, email address and message content. This data is used solely to respond to your enquiry.</span></li>
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span><strong className="font-medium text-foreground">Analytics cookies</strong>: anonymised navigation data (pages visited, session duration, country of origin) to measure site audience.</span></li>
        </ul>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">3. Purpose of Processing</h2>
        <ul className="list-none space-y-3">
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span>Responding to your information or acquisition requests</span></li>
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span>Improving the site experience and content through anonymous audience statistics</span></li>
        </ul>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">4. Legal Basis</h2>
        <p>The processing of your data is based on your <strong className="font-medium text-foreground">consent</strong> and our <strong className="font-medium text-foreground">legitimate interest</strong> in ensuring the security and proper functioning of the site.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">5. Retention Period</h2>
        <p>Data from the contact form is retained for as long as necessary to process your request, and for a maximum of 3 years from the last contact. Analytics data is retained in aggregated, anonymised form.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">6. Data Sharing</h2>
        <p>Ahmilan&apos;s Gallery <strong className="font-medium text-foreground">does not sell your personal data</strong> to third parties. Your data may be shared with technical service providers strictly within the scope of their services.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">7. Your Rights</h2>
        <p>Under the GDPR, you have the right of access, rectification, erasure, restriction, portability and objection. Contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">{CONTACT_EMAIL}</a>. You may also lodge a complaint with your national data protection authority.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">8. Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss or disclosure.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">9. Changes</h2>
        <p>This policy may be updated to reflect changes in the law or our practices. The date of the last update is shown at the top of this page.</p>
      </section>
    </div>
  )
}

export default function PrivacyPolicyContent() {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-14 border-b border-border pb-6">
          <h1 className="font-serif text-5xl text-foreground">{t.footer.privacy}</h1>
          <p className="mt-3 text-sm text-muted">
            Last updated: May 2025
          </p>
        </div>

        <PrivacyContent />
      </div>
    </MainLayout>
  )
}
