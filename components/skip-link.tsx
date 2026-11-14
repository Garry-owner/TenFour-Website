'use client'

import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'

export function SkipLink() {
  const locale = useLocale()
  const t = getCopy(locale).chrome

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#ff6b1a] focus:px-4 focus:py-2 focus:font-condensed focus:text-base focus:font-extrabold focus:uppercase focus:tracking-[0.06em] focus:text-[#0f1011]"
    >
      {t.skip}
    </a>
  )
}
