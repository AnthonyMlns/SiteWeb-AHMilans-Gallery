import type { Metadata } from 'next'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: "Privacy Policy — AH — Milans",
  description: "Privacy policy and personal data processing at AH — Milans.",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
