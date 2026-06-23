import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from '@/components/layout/Providers'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/config'
import './globals.css'

const crimson = localFont({
  src: [
    { path: '../fonts/CrimsonText-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/CrimsonText-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../fonts/CrimsonText-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../fonts/CrimsonText-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: '../fonts/CrimsonText-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/CrimsonText-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-crimson',
})

const geist = localFont({
  src: '../fonts/Geist-Variable.ttf',
  display: 'swap',
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geist.className} ${crimson.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
