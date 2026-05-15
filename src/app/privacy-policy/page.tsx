import type { Metadata } from 'next'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: "Politique de confidentialité — Ahmilan's Gallery",
  description: "Politique de confidentialité et traitement des données personnelles d'Ahmilan's Gallery.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
