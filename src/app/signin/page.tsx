import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import SignInContent from './SignInContent'

export const metadata: Metadata = {
  title: "Sign in \u2014 AH \u2014 Milans",
  description: "Log in or create an account to access exclusive content.",
  openGraph: {
    title: "Sign in \u2014 AH \u2014 Milans",
    description: "Log in or create an account to access exclusive content.",
    url: `${SITE_URL}/signin`,
  },
  twitter: {
    title: "Sign in \u2014 AH \u2014 Milans",
    description: "Log in or create an account to access exclusive content.",
  },
  alternates: {
    canonical: `${SITE_URL}/signin`,
  },
}

export default function SignInPage() {
  return <SignInContent />
}
