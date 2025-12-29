import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
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
    default: 'NomadVPN Pro | Your Home Network, Anywhere in the World',
    template: '%s | NomadVPN Pro',
  },
  description:
    'Access your home network from anywhere. Pre-configured VPN routers give you YOUR residential IP while traveling. Work from Bali, appear from Boston. Undetectable by IT.',
  keywords: [
    'residential VPN',
    'home network VPN',
    'digital nomad VPN',
    'remote work VPN',
    'travel router',
    'GL.iNet router',
    'WireGuard VPN',
    'work from anywhere',
    'residential IP address',
    'stealth VPN',
    'undetectable VPN',
    'VPN for remote workers',
  ],
  authors: [{ name: 'NomadVPN Pro' }],
  creator: 'NomadVPN Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NomadVPN Pro',
    title: 'NomadVPN Pro | Your Home Network, Anywhere in the World',
    description:
      'Access your home network from anywhere. Pre-configured VPN routers give you YOUR residential IP. Work from Bali, appear from Boston.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NomadVPN Pro - Your Home Network, Anywhere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomadVPN Pro | Your Home Network, Anywhere',
    description:
      'Access your home network from anywhere. Pre-configured VPN routers give you YOUR residential IP. Undetectable by IT.',
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
        <Analytics />
      </body>
    </html>
  )
}
