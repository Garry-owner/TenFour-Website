import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { CtaButton } from '@/components/cta-button'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'

export function PricingView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).pricing

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section id="plans" className="border-b-2 border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-stretch gap-6 pt-3 lg:grid-cols-3">
            {t.plans.map((plan, index) => {
              const featured = index === 1
              return (
                <div
                  key={plan.name}
                  className={cn(
                    'relative flex flex-col gap-6 border-2 bg-card p-7 sm:p-8',
                    featured ? 'border-primary border-t-4' : 'border-border',
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 bg-[#ff6b1a] px-3 py-1 font-dispatch text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0f1011]">
                      {plan.tag}
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    {!featured && (
                      <span className="font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {plan.tag}
                      </span>
                    )}
                    <h2 className="font-condensed text-3xl font-extrabold uppercase tracking-[0.02em]">{plan.name}</h2>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className="font-stencil text-5xl font-black leading-none">{plan.price}</span>
                    <span className="mb-1 font-dispatch text-sm text-muted-foreground">{plan.cadence}</span>
                  </div>
                  <span className="font-dispatch text-xs uppercase tracking-[0.08em] text-muted-foreground">{plan.setup}</span>

                  <p className="text-base leading-relaxed text-muted-foreground">{plan.blurb}</p>

                  <CtaButton
                    href={lp(locale, '/contact')}
                    variant={featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </CtaButton>

                  <ul className="flex flex-col gap-3 border-t-2 border-border pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-base">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div id="pricing-notes" className="mx-auto mt-12 max-w-4xl">
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {t.setupNote}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border-2 border-border border-t-4 border-t-primary bg-card p-6">
              <h3 className="font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-primary">{t.overageTitle}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.overageBody}</p>
            </div>
            <div className="border-2 border-border border-t-4 border-t-primary bg-card p-6">
              <h3 className="font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-primary">{t.offerTitle}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.offerBody}</p>
            </div>
          </div>

          <p className="mt-8 text-center font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {t.contracts}{' '}
            <Link href={lp(locale, '/contact')} className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              {t.questions}
            </Link>
          </p>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
