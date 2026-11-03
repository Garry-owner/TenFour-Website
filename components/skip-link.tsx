'use client'

import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'

export function SkipLink() {
  const locale = useLocale()
  const t = getCopy(locale).chrome

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      {t.skip}
    </a>
  )
}
