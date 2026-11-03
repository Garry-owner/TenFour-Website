import { PhoneMissed, MoonStar, TrendingDown } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [PhoneMissed, MoonStar, TrendingDown]

export function Problem({ locale }: { locale: Locale }) {
  const t = getCopy(locale).problem

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.cards.map(({ stat, label, body }, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={label}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-6 font-mono text-4xl font-bold tracking-tight text-foreground">{stat}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">{t.note}</p>
      </div>
    </section>
  )
}
