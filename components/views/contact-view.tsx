import { Mail, MapPin, Clock, PhoneCall } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { DemoForm } from '@/components/demo-form'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [Mail, PhoneCall, MapPin, Clock]

export function ContactView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).contact

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section id="waitlist" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-stencil text-4xl font-black uppercase leading-[0.95]">{t.heading}</h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t.intro}</p>
            </div>

            <ul className="flex flex-col gap-4">
              {t.cards.map(({ label, value, href }, index) => {
                const Icon = ICONS[index]
                const inner = (
                  <div className="flex items-center gap-4 border-2 border-border bg-card p-4 transition-colors hover:border-primary">
                    <span className="flex h-11 w-11 items-center justify-center border-2 border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-dispatch text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-base font-medium">{value}</span>
                    </div>
                  </div>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="border-2 border-border border-l-4 border-l-[var(--signal)] bg-card p-5">
              <div className="flex items-center gap-2 font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-[var(--signal)]">
                <span className="h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
                {t.online}
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.onlineBody}</p>
            </div>
          </div>

          <DemoForm />
        </div>
      </section>
    </main>
  )
}
