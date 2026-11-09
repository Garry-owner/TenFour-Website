import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Proof({ locale }: { locale: Locale }) {
  const t = getCopy(locale).proof

  return (
    <section className="border-b-2 border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.items.map((item) => (
            <div key={item.k} className="flex flex-col gap-2 border-2 border-border border-l-4 border-l-primary bg-card p-6">
              <span className="font-dispatch text-xs font-bold uppercase tracking-[0.18em] text-primary">{item.k}</span>
              <span className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">
                {item.v}
              </span>
              <span className="text-base text-muted-foreground">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
