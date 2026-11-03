import { MessageSquareText, Clock, Trophy } from 'lucide-react'
import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'
import { RaceTimer } from '@/components/home/race-timer'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'

export function Hero({ locale }: { locale: Locale }) {
  const t = getCopy(locale).hero

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-control-grid opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="flex flex-col gap-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
            </span>
            {t.badge}
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t.titleBefore}
            <span className="text-primary">{t.titleEmphasis}</span>
            {t.titleAfter}
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.body}</p>

          <div className="flex items-center gap-3 max-w-xl border-l-2 border-border pl-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image src="/roger-avatar.png" alt={t.rogerAlt} width={40} height={40} />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.roger}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href={lp(locale, '/contact')} size="lg">
              <MessageSquareText className="h-4 w-4" />
              {t.primary}
            </CtaButton>
            <CtaButton href={lp(locale, '/how-it-works')} variant="outline" size="lg">
              {t.secondary}
            </CtaButton>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {t.stats.map(({ k, v }, index) => {
              const Icon = [Clock, MessageSquareText, Trophy][index]
              return (
                <div key={v} className="flex flex-col gap-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <dt className="font-mono text-2xl font-bold tracking-tight">{k}</dt>
                  <dd className="text-xs text-muted-foreground">{v}</dd>
                </div>
              )
            })}
          </dl>
        </div>

        <RaceTimer />
      </div>
    </section>
  )
}
