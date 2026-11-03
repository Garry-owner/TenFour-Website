import { CtaButton } from '@/components/cta-button'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'

export function CtaBand({
  locale,
  title,
  subtitle,
}: {
  locale: Locale
  title?: string
  subtitle?: string
}) {
  const t = getCopy(locale).cta

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-control-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title ?? t.title}</h2>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {subtitle ?? t.subtitle}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton href={lp(locale, '/contact')} size="lg">
            {t.book}
          </CtaButton>
          <CtaButton href={lp(locale, '/pricing')} variant="outline" size="lg">
            {t.pricing}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
