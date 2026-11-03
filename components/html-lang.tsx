'use client'

import { useEffect } from 'react'
import { useLocale } from '@/components/use-locale'

export function HtmlLang() {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale === 'es' ? 'es' : 'en'
  }, [locale])

  return null
}
