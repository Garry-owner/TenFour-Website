import type { Metadata } from 'next'
import { absoluteUrl, lp, type Locale } from '@/lib/locale'

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
} as const

export function languageAlternates(path: string): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: lp('en', path),
      languages: {
        en: lp('en', path),
        es: lp('es', path),
        'x-default': lp('en', path),
      },
    },
  }
}

export function spanishMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: lp('es', path),
      languages: {
        en: lp('en', path),
        es: lp('es', path),
        'x-default': lp('en', path),
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
