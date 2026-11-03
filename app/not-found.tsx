'use client'

import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'
import { useEffect } from 'react'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'

export default function NotFound() {
  const locale = useLocale()
  const t = getCopy(locale).notFound

  useEffect(() => {
    if (locale === 'es') document.title = 'Página no encontrada. TenFour Systems'
  }, [locale])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 h-20 w-20 overflow-hidden rounded-full border border-border">
        <Image src="/roger-avatar.png" alt="Roger" width={80} height={80} />
      </div>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">404</p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mb-8 max-w-md text-pretty text-muted-foreground">{t.body}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <CtaButton href={lp(locale, '/')} size="lg">
          {t.home}
        </CtaButton>
        <CtaButton href={lp(locale, '/contact')} variant="outline" size="lg">
          {t.demo}
        </CtaButton>
      </div>
    </main>
  )
}
