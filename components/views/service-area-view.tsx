import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { SERVICE_AREAS, type ServiceArea } from '@/app/service-areas/data'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { languageAlternates, spanishMetadata } from '@/lib/seo'

export function serviceAreaMetadata(locale: Locale, area: ServiceArea): Metadata {
  const path = `/service-areas/${area.slug}`
  if (locale === 'es') {
    return spanishMetadata(
      path,
      `${area.tradeEs} en ${area.city}: texto por llamada perdida. TenFour Systems`,
      area.blurbEs,
    )
  }
  return {
    title: `${area.trade} Missed Call Dispatch in ${area.city}, TX. TenFour Systems`,
    description: area.blurb,
    ...languageAlternates(path),
  }
}

export function ServiceAreaView({ locale, slug }: { locale: Locale; slug: string }) {
  const area = SERVICE_AREAS.find((item) => item.slug === slug)
  if (!area) notFound()
  const t = getCopy(locale).serviceArea

  const eyebrow =
    locale === 'es' ? area.eyebrowEs : `${area.trade} in ${area.city}, TX`
  const title =
    locale === 'es'
      ? area.titleEs
      : `Never miss another ${area.trade.toLowerCase()} call near ${area.landmark}`
  const description = locale === 'es' ? area.blurbEs : area.blurb
  const ctaTitle =
    locale === 'es' ? area.ctaTitleEs : `Ready to stop losing ${area.city} jobs to voicemail?`

  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <CtaBand locale={locale} title={ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
