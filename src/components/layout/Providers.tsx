'use client'

import { ThemeProvider } from '@/lib/ThemeContext'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
