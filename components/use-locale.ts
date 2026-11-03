'use client'

import { usePathname } from 'next/navigation'
import { localeFromPathname, type Locale } from '@/lib/locale'

export function useLocale(): Locale {
  const pathname = usePathname()
  return localeFromPathname(pathname ?? '/')
}
