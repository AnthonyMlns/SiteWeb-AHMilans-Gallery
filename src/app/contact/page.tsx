import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: "Contact — AH — Milans",
  description: "Contact AH — Milans for acquisition inquiries, collaborations, or information.",
}

export default function ContactPage() {
  return <ContactContent />
}
