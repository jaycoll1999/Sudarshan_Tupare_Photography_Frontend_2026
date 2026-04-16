import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Sudarshan Tupare Photography | Capturing Timeless Moments',
  description: 'Professional photography services specializing in weddings, portraits, and events. Book your dream photoshoot with Sudarshan Tupare Photography.',
  keywords: 'photography, wedding photographer, portrait photographer, event photography, professional photography',
  authors: [{ name: 'Sudarshan Tupare' }],
  openGraph: {
    title: 'Sudarshan Tupare Photography',
    description: 'Capturing Timeless Moments - Professional Photography Services',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sudarshan Tupare Photography',
    description: 'Capturing Timeless Moments - Professional Photography Services',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-charcoal text-white antialiased">
        {children}
      </body>
    </html>
  )
}
