import type { Metadata } from 'next'
import SignInContent from './SignInContent'

export const metadata: Metadata = {
  title: "Sign in — AH Milans",
  description: "Log in or join AH Milans.",
}

export default function SignInPage() {
  return <SignInContent />
}
