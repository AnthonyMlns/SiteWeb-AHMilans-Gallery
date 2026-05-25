/**
 * Constantes de configuration globales.
 * Toutes les valeurs lues depuis les variables d'environnement ont un fallback
 * explicite pour éviter les undefined silencieux.
 */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'ahmilans.gallery@gmail.com'
