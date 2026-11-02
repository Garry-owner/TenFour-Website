import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { serviceAreaCopy, type ServiceArea } from "@/app/service-areas/data"
import type { Locale } from "@/lib/locale"

export function ServiceAreaPage({
  area,
  locale = "en",
}: {
  area: ServiceArea
  locale?: Locale
}) {
  const copy = serviceAreaCopy(area, locale)

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <CtaBand locale={locale} title={copy.ctaTitle} subtitle={copy.ctaSubtitle} />
    </main>
  )
}
