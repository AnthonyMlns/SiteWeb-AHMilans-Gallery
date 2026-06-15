/**
 * Global configuration constants.
 * All environment variables have an explicit fallback
 * to prevent silent undefined values.
 */

export const SITE_NAME = 'AH \u2014 Milans'
export const SITE_URL = 'https://ahmilans.gallery'
export const SITE_DESCRIPTION = 'A curated gallery of contemporary artists.'

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'ahmilans.gallery@gmail.com'
