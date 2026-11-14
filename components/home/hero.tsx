import { MessageSquareText } from 'lucide-react'
import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'
import { RaceTimer } from '@/components/home/race-timer'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'

export function Hero({ locale }: { locale: Locale }) {
  const t = getCopy(locale).hero

  return (
    <section className="border-b-4 border-primary">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="flex flex-col gap-7">
          <span className="inline-flex w-fit items-center gap-2 border-2 border-border px-3 py-1.5 font-dispatch text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-2.5 w-2.5 bg-primary" aria-hidden />
            {t.badge}
          </span>

          <div className="flex flex-col gap-4">
            <h1 className="text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="text-balance font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em] sm:text-3xl">
              {t.taglineBefore}
              <span className="text-primary">{t.taglineEmphasis}</span>
              {t.taglineAfter}
            </p>
          </div>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">{t.body}</p>

          <div className="flex max-w-xl items-center gap-3 border-l-4 border-primary pl-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src="/roger-avatar.png" alt={t.rogerAlt} width={48} height={48} />
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">{t.roger}</p>
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

          <dl className="mt-2 grid grid-cols-2 gap-4 border-t-2 border-border pt-6">
            {t.stats.map(({ k, v }) => (
              <div key={v} className="flex flex-col gap-1">
                <dt className="font-stencil text-3xl font-black uppercase leading-none text-foreground sm:text-4xl">{k}</dt>
                <dd className="font-dispatch text-xs uppercase tracking-[0.12em] text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <RaceTimer />
      </div>
    </section>
  )
}
