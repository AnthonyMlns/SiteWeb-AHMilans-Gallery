'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Lang, type Translations } from './index'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  t: translations.fr,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null
      if (saved === 'fr' || saved === 'en') {
        setLangState(saved)
        document.documentElement.lang = saved
      }
    } catch {}
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    document.documentElement.lang = newLang
    try { localStorage.setItem('lang', newLang) } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
