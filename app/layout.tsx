import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import {
  Space_Grotesk,
  Geist_Mono,
  Bebas_Neue,
  Big_Shoulders_Stencil,
  Big_Shoulders,
  Barlow,
  Overpass_Mono,
} from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HtmlLang } from '@/components/html-lang'
import { SkipLink } from '@/components/skip-link'
import { StructuredData } from '@/components/structured-data'
import { languageAlternates } from '@/lib/seo'
import { SITE_URL } from '@/lib/locale'
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

// Work truck look: stencil headlines and wordmark, condensed subheads,
// road sign body text and a highway style mono for dispatch readouts.
const bigShouldersStencil = Big_Shoulders_Stencil({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--ff-stencil',
  display: 'swap',
})

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--ff-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--ff-barlow',
  display: 'swap',
})

const overpassMono = Overpass_Mono({
  subsets: ['latin'],
  variable: '--ff-overpass',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'TenFour Systems. Missed Call Text Back for Home Service Businesses in DFW',
  description:
    "TenFour Systems texts back your missed calls, asks a few questions, and sends the lead to you. We work the second shift so you don't have to.",
  ...languageAlternates('/'),
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'TenFour Systems. Missed Call Text Back for Home Service Businesses in DFW',
    description:
      'Missed call text back for home service businesses. Roger texts the caller back, asks a few questions, and sends the lead to you.',
    url: SITE_URL,
    siteName: 'TenFour Systems',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TenFour Systems, missed call text back for home service businesses',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['es_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenFour Systems. Missed Call Text Back for Home Service Businesses in DFW',
    description:
      'Missed call text back for home service businesses. Roger texts the caller back, asks a few questions, and sends the lead to you.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#0f1011',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerList = await headers()
  const lang = headerList.get('x-locale') === 'es' ? 'es' : 'en'

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${bebasNeue.variable} ${bigShouldersStencil.variable} ${bigShoulders.variable} ${barlow.variable} ${overpassMono.variable}`}
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
      </head>
      <body className="antialiased font-sans flex min-h-screen flex-col">
        <HtmlLang />
        <StructuredData />
        <SkipLink />
        <SiteHeader />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
