import { CtaButton } from '@/components/cta-button'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'

// Same words and buttons as the shared CtaBand, on a solid orange block.
export function HomeCta({ locale }: { locale: Locale }) {
  const t = getCopy(locale).cta

  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl">{t.title}</h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed">{t.subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaButton
            href={lp(locale, '/contact')}
            size="lg"
            className="border-[#0f1011] bg-[#0f1011] text-white shadow-none"
          >
            {t.book}
          </CtaButton>
          <CtaButton
            href={lp(locale, '/pricing')}
            variant="outline"
            size="lg"
            className="border-[#0f1011] text-[#0f1011] hover:bg-[#0f1011] hover:text-white"
          >
            {t.pricing}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
