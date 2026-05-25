import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: "Contact — Ahmilan's Gallery",
  description: "Contact Ahmilan's Gallery for acquisition inquiries, collaborations, or information.",
}

export default function ContactPage() {
  return <ContactContent />
}
