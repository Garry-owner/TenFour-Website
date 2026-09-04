import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { CtaButton } from '@/components/cta-button'
import { CtaBand } from '@/components/cta-band'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pricing. TenFour Systems',
  description:
    'Straightforward pricing for the 24/7 AI dispatcher. Pick the tier that fits your call volume, no hidden fees.',
}

const PLANS = [
  {
    name: 'Base Dispatch',
    tag: 'Get started',
    price: '$299',
    cadence: '/mo',
    setup: '$699 one time setup fee',
    blurb: 'Instant automated response to every missed call and web inquiry, with full CRM tracking.',
    features: [
      'Instant automated text response to every missed call and web inquiry',
      'Full lead and CRM tracking',
      'Standard monthly message quota',
      'One dedicated phone number',
    ],
    featured: false,
    cta: 'Start with Base Dispatch',
  },
  {
    name: 'Pro Dispatch',
    tag: 'Most popular',
    price: '$499',
    cadence: '/mo',
    setup: '$899 one time setup fee',
    blurb: 'Everything in Base Dispatch, plus storm reactive follow up for weather driven trades.',
    features: [
      'Everything in Base Dispatch',
      'Storm reactive re engagement for weather driven trades',
      'Higher message quota',
      'Priority support',
    ],
    featured: true,
    cta: 'Start with Pro Dispatch',
  },
  {
    name: 'Elite Full Stack',
    tag: 'Full coverage',
    price: '$799',
    cadence: '/mo',
    setup: '$1,199 one time setup fee',
    blurb: 'Everything in Pro Dispatch, plus an emergency phone alert for your most urgent leads.',
    features: [
      'Everything in Pro Dispatch',
      'Emergency phone call alert for urgent leads',
      'Highest quota ceiling',
      'Dedicated onboarding',
    ],
    featured: false,
    cta: 'Start with Elite Full Stack',
  },
]

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Flat pricing. No missed-call math."
        description="One booked job usually covers the month. Every plan includes setup, tuning, and a dispatcher that never sleeps."
      />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col gap-6 rounded-xl border bg-card p-8',
                  plan.featured
                    ? 'border-primary shadow-[0_0_40px_-12px_var(--primary)]'
                    : 'border-border',
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-primary-foreground">
                    {plan.tag}
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  {!plan.featured && (
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {plan.tag}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold tracking-tight">{plan.name}</h2>
                </div>

                <div className="flex items-end gap-1">
                  <span className="font-mono text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="mb-1 font-mono text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{plan.setup}</span>

                <p className="text-sm leading-relaxed text-muted-foreground">{plan.blurb}</p>

                <CtaButton
                  href="/contact"
                  variant={plan.featured ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </CtaButton>

                <ul className="flex flex-col gap-3 border-t border-border pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
                Overage billing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Messages beyond your plan&apos;s monthly quota are billed at 5 cents per message,
                logged automatically and billed at month end. No surprise overages, no service
                gaps.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
                New client offer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your first month is billed at 50 percent off. After three full paid months, your
                fourth month is completely free. A one time welcome, not a recurring discount.
              </p>
            </div>
          </div>

          <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            No long term contracts.{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Questions? Talk to us
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Not sure which plan fits?"
        subtitle="Tell us your call volume and trade. We will recommend the right setup and show you a live demo."
      />
    </main>
  )
}
