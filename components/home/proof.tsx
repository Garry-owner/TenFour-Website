import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Proof({ locale }: { locale: Locale }) {
  const t = getCopy(locale).proof

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.items.map((item) => (
            <div key={item.k} className="flex flex-col gap-1 rounded-lg border border-border bg-card p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">{item.k}</span>
              <span className="text-lg font-semibold tracking-tight">{item.v}</span>
              <span className="text-sm text-muted-foreground">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
