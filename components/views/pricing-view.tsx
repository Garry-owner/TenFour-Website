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

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {t.plans.map((plan, index) => {
              const featured = index === 1
              return (
                <div
                  key={plan.name}
                  className={cn(
                    'relative flex flex-col gap-6 rounded-xl border bg-card p-8',
                    featured
                      ? 'border-primary shadow-[0_0_40px_-12px_var(--primary)]'
                      : 'border-border',
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-primary-foreground">
                      {plan.tag}
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    {!featured && (
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {plan.tag}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold tracking-tight">{plan.name}</h2>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className="font-mono text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="mb-1 font-mono text-sm text-muted-foreground">{plan.cadence}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{plan.setup}</span>

                  <p className="text-sm leading-relaxed text-muted-foreground">{plan.blurb}</p>

                  <CtaButton
                    href={lp(locale, '/contact')}
                    variant={featured ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </CtaButton>

                  <ul className="flex flex-col gap-3 border-t border-border pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{t.overageTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.overageBody}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{t.offerTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.offerBody}</p>
            </div>
          </div>

          <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.contracts}{' '}
            <Link href={lp(locale, '/contact')} className="text-primary hover:underline">
              {t.questions}
            </Link>
          </p>
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
