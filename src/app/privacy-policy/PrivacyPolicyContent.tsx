'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useTranslation } from '@/lib/i18n/LanguageContext'

function FrenchPolicy() {
  return (
    <div className="space-y-12 text-sm leading-relaxed text-muted">
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées via ce site est Ahmilan&apos;s Gallery,
          joignable à l&apos;adresse : <a href="mailto:contact@ahmilans.gallery" className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">contact@ahmilans.gallery</a>.
        </p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">2. Données collectées</h2>
        <p className="mb-4">Nous collectons les données suivantes :</p>
        <ul className="list-none space-y-3">
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span><strong className="font-medium text-foreground">Formulaire de contact</strong> : nom, adresse email et contenu du message. Ces données sont uniquement utilisées pour répondre à votre demande.</span></li>
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span><strong className="font-medium text-foreground">Cookies analytiques</strong> : données de navigation anonymisées (pages visitées, durée de session, pays d&apos;origine) pour mesurer l&apos;audience du site.</span></li>
        </ul>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">3. Finalités du traitement</h2>
        <ul className="list-none space-y-3">
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span>Répondre à vos demandes d&apos;information ou d&apos;acquisition</span></li>
          <li className="flex gap-3"><span className="mt-1 shrink-0 text-border">—</span><span>Améliorer l&apos;expérience et le contenu du site via des statistiques d&apos;audience anonymes</span></li>
        </ul>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">4. Base légale</h2>
        <p>Le traitement de vos données repose sur votre <strong className="font-medium text-foreground">consentement</strong> et sur notre <strong className="font-medium text-foreground">intérêt légitime</strong> à assurer la sécurité et le bon fonctionnement du site.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">5. Durée de conservation</h2>
        <p>Les données issues du formulaire de contact sont conservées le temps nécessaire au traitement de votre demande, et au maximum 3 ans à compter du dernier contact. Les données analytiques sont conservées sous forme agrégée et anonymisée.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">6. Partage des données</h2>
        <p>Ahmilan&apos;s Gallery <strong className="font-medium text-foreground">ne vend pas vos données personnelles</strong> à des tiers. Vos données peuvent être transmises à des sous-traitants techniques dans le strict cadre de l&apos;exécution de leurs prestations.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">7. Vos droits</h2>
        <p className="mb-4">Conformément au RGPD, vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et d&apos;opposition. Contactez-nous à <a href="mailto:contact@ahmilans.gallery" className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">contact@ahmilans.gallery</a>. Vous pouvez également saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">CNIL</a>.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">8. Sécurité</h2>
        <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation.</p>
      </section>
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">9. Modifications</h2>
        <p>Cette politique peut être mise à jour afin de refléter les évolutions légales ou de nos pratiques. La date de dernière mise à jour est indiquée en haut de cette page.</p>
      </section>
    </div>
  )
}

function EnglishPolicy() {
  return (
    <div className="space-y-12 text-sm leading-relaxed text-muted">
      <section>
        <h2 className="mb-4 font-serif text-2xl text-foreground">1. Data Controller</h2>
        <p>
          The controller of personal data collected via this site is Ahmilan&apos;s Gallery, reachable at: <a href="mailto:contact@ahmilans.gallery" className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">contact@ahmilans.gallery</a>.
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
        <p>Under the GDPR, you have the right of access, rectification, erasure, restriction, portability and objection. Contact us at <a href="mailto:contact@ahmilans.gallery" className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-60">contact@ahmilans.gallery</a>. You may also lodge a complaint with your national data protection authority.</p>
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
  const { lang, t } = useTranslation()

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-14 border-b border-border pb-6">
          <h1 className="font-serif text-5xl text-foreground">{t.footer.privacy}</h1>
          <p className="mt-3 text-sm text-muted">
            {lang === 'fr' ? 'Dernière mise à jour : mai 2025' : 'Last updated: May 2025'}
          </p>
        </div>

        {lang === 'fr' ? <FrenchPolicy /> : <EnglishPolicy />}
      </div>
    </MainLayout>
  )
}
