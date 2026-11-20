import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { LOCAL_AREAS, SERVICE_AREAS, areasByCity, type ServiceArea } from '@/app/service-areas/data'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'
import { englishMetadata, spanishMetadata } from '@/lib/seo'

export function serviceAreaMetadata(locale: Locale, area: ServiceArea): Metadata {
  const path = `/service-areas/${area.slug}`
  if (locale === 'es') {
    return spanishMetadata(
      path,
      `${area.tradeEs} en ${area.city}: texto por llamada perdida. TenFour Systems`,
      area.local ? `${area.titleEs}. ${area.local.howEs}` : area.blurbEs,
    )
  }
  return englishMetadata(
    path,
    `${area.trade} Missed Call Text Back in ${area.city}, TX. TenFour Systems`,
    area.local ? `${area.local.title}. ${area.local.how}` : area.blurb,
  )
}

export function serviceAreasIndexMetadata(locale: Locale): Metadata {
  const t = getCopy(locale).serviceArea
  return locale === 'es'
    ? spanishMetadata('/service-areas', t.indexMetaTitle, t.indexMetaDescription)
    : englishMetadata('/service-areas', t.indexMetaTitle, t.indexMetaDescription)
}

function areaLabel(locale: Locale, area: ServiceArea) {
  return getCopy(locale).chrome.tradeIn(locale === 'es' ? area.tradeEs : area.trade, area.city)
}

function LinkList({ locale, title, areas }: { locale: Locale; title: string; areas: ServiceArea[] }) {
  if (areas.length === 0) return null
  return (
    <div className="space-y-3">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h2>
      <ul className="space-y-2">
        {areas.map((area) => (
          <li key={area.slug}>
            <Link
              href={lp(locale, `/service-areas/${area.slug}`)}
              className="text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
            >
              {areaLabel(locale, area)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceAreaView({ locale, slug }: { locale: Locale; slug: string }) {
  const area = SERVICE_AREAS.find((item) => item.slug === slug)
  if (!area) notFound()
  const t = getCopy(locale).serviceArea
  const local = area.local

  const eyebrow =
    locale === 'es' ? area.eyebrowEs : `${area.trade} in ${area.city}, TX`
  const title =
    locale === 'es'
      ? area.titleEs
      : local
        ? local.title
        : `Stop losing ${area.trade.toLowerCase()} calls near ${area.landmark}`
  const description = locale === 'es' ? area.blurbEs : area.blurb
  const ctaTitle =
    locale === 'es' ? area.ctaTitleEs : `Ready to stop losing ${area.city} jobs to voicemail?`

  const sameCity = local
    ? SERVICE_AREAS.filter((item) => item.city === area.city && item.slug !== area.slug)
    : []
  const sameTrade = local
    ? LOCAL_AREAS.filter((item) => item.local?.tradeKey === local.tradeKey && item.slug !== area.slug)
    : []

  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      {local && (
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{locale === 'es' ? local.cityLineEs : local.cityLine}</p>
              <p className="border-l-4 border-primary pl-4 text-foreground">
                {locale === 'es' ? local.howEs : local.how}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <LinkList locale={locale} title={t.otherTrades(area.city)} areas={sameCity} />
              <LinkList
                locale={locale}
                title={t.nearby(locale === 'es' ? area.tradeEs : area.trade)}
                areas={sameTrade}
              />
              <Link
                href={lp(locale, '/service-areas')}
                className="w-fit font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.allAreas}
              </Link>
            </div>
          </div>
        </section>
      )}
      <CtaBand locale={locale} title={ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}

export function ServiceAreasIndexView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).serviceArea
  const groups = areasByCity()

  return (
    <main>
      <PageHero eyebrow={t.indexEyebrow} title={t.indexTitle} description={t.indexDescription} />
      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {groups.map(({ city, areas }) => (
            <div key={city} className="space-y-3 border-t-2 border-border pt-4">
              <h2 className="font-stencil text-2xl font-black uppercase">{city}</h2>
              <ul className="space-y-2">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={lp(locale, `/service-areas/${area.slug}`)}
                      className="text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
                    >
                      {locale === 'es' ? area.tradeEs : area.trade}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} subtitle={t.ctaSubtitle} />
    </main>
  )
}
