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

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{t.heading}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.intro}</p>
            </div>

            <ul className="flex flex-col gap-4">
              {t.cards.map(({ label, value, href }, index) => {
                const Icon = ICONS[index]
                const inner = (
                  <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  </div>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block transition-opacity hover:opacity-80">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
                <span className="h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
                {t.online}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.onlineBody}</p>
            </div>
          </div>

          <DemoForm />
        </div>
      </section>
    </main>
  )
}
