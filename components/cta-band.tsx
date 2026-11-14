import { CtaButton } from '@/components/cta-button'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'

export function CtaBand({
  locale,
  title,
  subtitle,
  id = 'page-cta',
}: {
  locale: Locale
  title?: string
  subtitle?: string
  id?: string
}) {
  const t = getCopy(locale).cta

  return (
    <section id={id} className="border-t-2 border-white/10 bg-[#0f1011] py-16 text-white sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          {title ?? t.title}
        </h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/80">{subtitle ?? t.subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaButton
            href={lp(locale, '/contact')}
            size="lg"
            className="shadow-[4px_4px_0_0_#fff] hover:shadow-[6px_6px_0_0_#fff] active:shadow-[2px_2px_0_0_#fff]"
          >
            {t.book}
          </CtaButton>
          <CtaButton
            href={lp(locale, '/pricing')}
            variant="outline"
            size="lg"
            className="border-white/50 text-white hover:border-white hover:bg-white hover:text-[#0f1011]"
          >
            {t.pricing}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
