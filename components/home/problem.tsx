import { HomeHeading } from '@/components/home/home-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Problem({ locale }: { locale: Locale }) {
  const t = getCopy(locale).problem

  return (
    <section id="the-problem" className="border-b-2 border-border py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <HomeHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.cards.map(({ stat, label, body }) => (
            <div key={label} className="border-2 border-border border-t-4 border-t-primary bg-card p-6 transition-colors hover:border-primary">
              <p className="font-stencil text-5xl font-black uppercase leading-none text-foreground">{stat}</p>
              <p className="mt-3 font-condensed text-xl font-extrabold uppercase tracking-[0.03em] text-foreground">
                {label}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-dispatch text-xs text-muted-foreground">
          {t.note}{' '}
          <a
            href={t.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            {t.sourceLabel}
          </a>
        </p>
      </div>
    </section>
  )
}
