'use client'

import { useLocale } from '@/components/use-locale'
import { absoluteUrl, SITE_URL } from '@/lib/locale'

const AREA = [
  'Dallas',
  'Fort Worth',
  'Rockwall',
  'McKinney',
  'Terrell',
  'Southlake',
  'Grapevine',
  'Prosper',
  'Forney',
  'Mesquite',
  'Garland',
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
        ? 'TenFour Systems le manda un texto a las llamadas perdidas de los negocios de servicio en el hogar y le pasa el prospecto al dueño.'
        : 'TenFour Systems texts back missed calls for home-service businesses and sends the lead to the owner.',
    url: absoluteUrl(locale, '/'),
    telephone: '+1-972-349-5808',
    email: 'garry@tenfoursystems.com',
    image: `${SITE_URL}/roger-avatar.png`,
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
