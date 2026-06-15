import type { Metadata } from 'next'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 AH \u2014 Milans",
  description: "Privacy policy and personal data processing at AH \u2014 Milans.",
  openGraph: {
    title: "Privacy Policy \u2014 AH \u2014 Milans",
    description: "Privacy policy and personal data processing at AH \u2014 Milans.",
    url: "https://ahmilans.gallery/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy \u2014 AH \u2014 Milans",
    description: "Privacy policy and personal data processing at AH \u2014 Milans.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
