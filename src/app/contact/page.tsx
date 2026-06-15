import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: "Contact \u2014 AH \u2014 Milans",
  description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
  openGraph: {
    title: "Contact \u2014 AH \u2014 Milans",
    description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
    url: "https://ahmilans.gallery/contact",
  },
  twitter: {
    title: "Contact \u2014 AH \u2014 Milans",
    description: "Contact AH \u2014 Milans for acquisition inquiries, collaborations, or information.",
  },
  alternates: {
    canonical: "https://ahmilans.gallery/contact",
  },
}

export default function ContactPage() {
  return <ContactContent />
}
