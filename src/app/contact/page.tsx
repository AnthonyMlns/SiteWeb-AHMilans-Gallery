import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: "Contact — Ahmilan's Gallery",
  description: "Contactez Ahmilan's Gallery pour toute demande d'acquisition, de collaboration ou d'information.",
}

export default function ContactPage() {
  return <ContactContent />
}
