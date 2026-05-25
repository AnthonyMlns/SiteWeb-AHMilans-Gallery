'use client'

import { createContext, useContext } from 'react'
import { translations, type Translations } from './index'

export type Lang = 'en' | 'fr'

interface LanguageContextValue {
  t: Translations
  lang: Lang
}

const LanguageContext = createContext<LanguageContextValue>({ t: translations, lang: 'en' })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Fixed language: 'en'. Add useState<Lang> here if implementing a language switcher.
  return (
    <LanguageContext.Provider value={{ t: translations, lang: 'en' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
