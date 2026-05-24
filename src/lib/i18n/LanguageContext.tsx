'use client'

import { createContext, useContext } from 'react'
import { translations, type Translations } from './index'

interface LanguageContextValue {
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({ t: translations })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
