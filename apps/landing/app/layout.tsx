import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/site'

const siteUrl = new URL(siteConfig.domain)

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.name} | Governance Transparency for Polkadot`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: 'technology',
  keywords: [
    'Polkadot',
    'OpenGov',
    'treasury transparency',
    'governance analytics',
    'blockchain audit',
    'Polkassembly',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${siteConfig.name} | Governance Transparency for Polkadot`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/overview.png',
        width: 1200,
        height: 750,
        alt: 'PolkAudit dashboard overview with live indexing KPIs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Governance Transparency for Polkadot`,
    description: siteConfig.description,
    images: ['/overview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e27' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
