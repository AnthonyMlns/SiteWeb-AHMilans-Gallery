import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import PrivacyPolicyContent from './PrivacyPolicyContent'

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 AH \u2014 Milans",
  description: "Privacy policy and personal data processing at AH \u2014 Milans.",
  openGraph: {
    title: "Privacy Policy \u2014 AH \u2014 Milans",
    description: "Privacy policy and personal data processing at AH \u2014 Milans.",
    url: `${SITE_URL}/privacy-policy`,
  },
  twitter: {
    title: "Privacy Policy \u2014 AH \u2014 Milans",
    description: "Privacy policy and personal data processing at AH \u2014 Milans.",
  },
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
