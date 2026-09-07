import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Geist_Mono, Bebas_Neue } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tenfoursystems.com'),
  title: 'TenFour Systems. The 24/7 AI Dispatcher for Home Services',
  description:
    "TenFour Systems answers every missed call, qualifies the lead, and books the job, around the clock. We work the second shift so you don't have to.",
  generator: 'v0.app',
  icons: {
    icon: '/roger-avatar.png',
    apple: '/roger-avatar.png',
  },
  openGraph: {
    title: 'TenFour Systems. The 24/7 AI Dispatcher for Home Services',
    description:
      "We catch every missed call and text your next customer back, before your competitor does.",
    url: 'https://www.tenfoursystems.com',
    siteName: 'TenFour Systems',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TenFour Systems, the 24/7 AI dispatcher for home service businesses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenFour Systems. The 24/7 AI Dispatcher for Home Services',
    description:
      "We catch every missed call and text your next customer back, before your competitor does.",
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TenFour Systems',
  description:
    "TenFour Systems catches every missed call for home-service businesses and texts the customer back before they call a competitor.",
  url: 'https://www.tenfoursystems.com',
  telephone: '+1-231-218-2360',
  email: 'garry@tenfoursystems.com',
  image: 'https://www.tenfoursystems.com/roger-avatar.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Terrell',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Dallas' },
    { '@type': 'City', name: 'Fort Worth' },
    { '@type': 'City', name: 'Rockwall' },
    { '@type': 'City', name: 'McKinney' },
    { '@type': 'City', name: 'Terrell' },
    { '@type': 'City', name: 'Southlake' },
    { '@type': 'City', name: 'Grapevine' },
    { '@type': 'City', name: 'Prosper' },
  ],
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme;
                  if (stored) {
                    theme = stored;
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    theme = 'light';
                  } else {
                    theme = 'dark';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased font-sans flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content" class
