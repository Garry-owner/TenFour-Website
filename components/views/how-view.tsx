import { PhoneMissed, SlidersHorizontal, MessageSquareText, Inbox, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Steps } from '@/components/steps'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [PhoneMissed, MessageSquareText, SlidersHorizontal, Inbox]

export function HowView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).how

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section id="call-flow" className="border-b-2 border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.flowEyebrow} title={t.flowTitle} description={t.flowDescription} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.flow.map(({ title, body }, index) => {
              const Icon = ICONS[index]
              return (
                <div
                  key={title}
                  className="relative flex flex-col gap-4 border-2 border-border bg-card p-6 transition-colors hover:border-primary"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border-2 border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-stencil text-3xl font-black leading-none text-primary">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">{title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Steps locale={locale} withHeading id="setup" />

      <section id="included" className="border-b-2 border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow={t.includedEyebrow}
            title={t.includedTitle}
            description={t.includedDescription}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-2 border-border bg-card p-4 text-base"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </main>
  )
}
