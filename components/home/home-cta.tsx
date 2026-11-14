import { CtaBand } from '@/components/cta-band'
import type { Locale } from '@/lib/locale'

// Same close as every other page, anchored so the homepage band has its own link.
export function HomeCta({ locale }: { locale: Locale }) {
  return <CtaBand locale={locale} id="get-started" />
}
