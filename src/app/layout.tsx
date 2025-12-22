import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NomadVPN Pro | Secure Travel VPN Solutions',
    template: '%s | NomadVPN Pro',
  },
  description:
    'Secure VPN solutions for travelers and remote professionals. Protect your connection on public WiFi and maintain reliable access to US networks from anywhere in the world.',
  keywords: [
    'travel VPN',
    'secure WiFi',
    'residential VPN',
    'travel router setup',
    'GL.iNet router',
    'WireGuard VPN',
    'public WiFi security',
    'VPN for travelers',
    'secure internet abroad',
    'US IP address',
  ],
  authors: [{ name: 'NomadVPN Pro' }],
  creator: 'NomadVPN Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NomadVPN Pro',
    title: 'NomadVPN Pro | Secure Travel VPN Solutions',
    description:
      'Secure VPN solutions for travelers. Protect your connection on public WiFi and access US networks from anywhere.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NomadVPN Pro - Stay Connected Securely',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomadVPN Pro | Secure Travel VPN Solutions',
    description:
      'Secure VPN solutions for travelers. Protect your connection on public WiFi and access US networks from anywhere.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when needed
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
