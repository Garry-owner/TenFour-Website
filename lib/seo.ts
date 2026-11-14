import type { Metadata } from 'next'
import { absoluteUrl, type Locale } from '@/lib/locale'

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
} as const

export function languageAlternates(path: string): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: absoluteUrl('en', path),
      languages: {
        en: absoluteUrl('en', path),
        es: absoluteUrl('es', path),
        'x-default': absoluteUrl('en', path),
      },
    },
  }
}

/**
 * English page metadata. Sets canonical, hreflang and og:url to the same
 * absolute address so search engines see one version of each page.
 */
export function englishMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    ...languageAlternates(path),
    openGraph: {
      title,
      description,
      url: absoluteUrl('en', path),
      siteName: 'TenFour Systems',
      locale: 'en_US',
      alternateLocale: ['es_US'],
      type: 'website',
      images: [
        {
          ...OG_IMAGE,
          alt: 'TenFour Systems, missed call text back for home service businesses',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export function spanishMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl('es', path),
      languages: {
        en: absoluteUrl('en', path),
        es: absoluteUrl('es', path),
        'x-default': absoluteUrl('en', path),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl('es', path),
      siteName: 'TenFour Systems',
      locale: 'es_US',
      alternateLocale: ['en_US'],
      type: 'website',
      images: [
        {
          ...OG_IMAGE,
          alt: 'TenFour Systems, texto de regreso por llamada perdida para negocios de servicio en el hogar',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export function localeOpenGraph(locale: Locale) {
  return locale === 'es' ? 'es_US' : 'en_US'
}
