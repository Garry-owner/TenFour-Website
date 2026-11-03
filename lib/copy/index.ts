import { en } from '@/lib/copy/en'
import { es } from '@/lib/copy/es'
import type { Locale } from '@/lib/locale'

export function getCopy(locale: Locale) {
  return locale === 'es' ? es : en
}

export type SiteCopy = typeof en
