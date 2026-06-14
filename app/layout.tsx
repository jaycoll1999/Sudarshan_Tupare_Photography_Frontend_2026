import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Sudarshan Tupare Photography | Capturing Timeless Moments',
  description: 'Professional photography services specializing in weddings, portraits, and events. Book your dream photoshoot with Sudarshan Tupare Photography.',
  keywords: 'photography, wedding photographer, portrait photographer, event photography, professional photography',
  authors: [{ name: 'Sudarshan Tupare' }],
  openGraph: {
    title: 'Sudarshan Tupare Photography',
    description: 'Capturing Timeless Moments - Professional Photography Services',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sudarshan Tupare Photography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudarshan Tupare Photography',
    description: 'Capturing Timeless Moments - Professional Photography Services',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sudarshan Tupare Photography',
  },
  formatDetection: {
    telephone: false,
  },
}

import { ThemeProvider } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-gray-50 text-gray-900 dark:bg-charcoal dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
