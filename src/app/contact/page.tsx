import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: "Contact \u2014 AH \u2014 Milans",
  description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
  openGraph: {
    title: "Contact \u2014 AH \u2014 Milans",
    description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    title: "Contact \u2014 AH \u2014 Milans",
    description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

export default function ContactPage() {
  return <ContactContent />
}
