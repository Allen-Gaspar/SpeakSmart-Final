import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'SPEAKSMART - AI-Powered Voice Language Learning',
  description: 'Master any language with AI-powered voice recognition, accent training, and personalized lessons. Learn 10+ languages with native accents from around the world.',
  keywords: ['language learning', 'voice recognition', 'AI', 'accent training', 'speech practice'],
  authors: [{ name: 'SPEAKSMART' }],
  openGraph: {
    title: 'SPEAKSMART - AI-Powered Voice Language Learning',
    description: 'Master any language with AI-powered voice recognition and accent training.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
