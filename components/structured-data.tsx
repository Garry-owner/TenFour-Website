'use client'

import { useLocale } from '@/components/use-locale'
import { absoluteUrl } from '@/lib/locale'

const AREA = [
  'Dallas',
  'Fort Worth',
  'Rockwall',
  'McKinney',
  'Terrell',
  'Southlake',
  'Grapevine',
  'Prosper',
]

export function StructuredData() {
  const locale = useLocale()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TenFour Systems',
    inLanguage: locale === 'es' ? 'es' : 'en',
    description:
      locale === 'es'
        ? 'TenFour Systems atrapa cada llamada perdida de los negocios de servicio en el hogar y le manda un texto al cliente antes de que llame a la competencia.'
        : 'TenFour Systems catches every missed call for home-service businesses and texts the customer back before they call a competitor.',
    url: absoluteUrl(locale, '/'),
    telephone: '+1-972-349-5808',
    email: 'garry@tenfoursystems.com',
    image: 'https://www.tenfoursystems.com/roger-avatar.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Terrell',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: AREA.map((name) => ({ '@type': 'City', name })),
    priceRange: '$$',
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
