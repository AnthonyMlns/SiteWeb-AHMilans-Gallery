import type { Metadata } from 'next'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: "Privacy Policy — Ahmilan's Gallery",
  description: "Privacy policy and personal data processing at Ahmilan's Gallery.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
