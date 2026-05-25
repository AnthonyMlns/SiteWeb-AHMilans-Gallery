import type { Metadata } from 'next'
import SignInContent from './SignInContent'

export const metadata: Metadata = {
  title: "Sign in — Ahmilan's Gallery",
  description: "Log in or create an account to access exclusive content.",
}

export default function SignInPage() {
  return <SignInContent />
}
