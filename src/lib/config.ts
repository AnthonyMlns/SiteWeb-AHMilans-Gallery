/**
 * Global configuration constants.
 * All environment variables have an explicit fallback
 * to prevent silent undefined values.
 */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'ahmilans.gallery@gmail.com'
