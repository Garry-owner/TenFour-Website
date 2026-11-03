import { Eyebrow } from '@/components/section-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Industries({ locale }: { locale: Locale }) {
  const t = getCopy(locale).industries

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">{t.description}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {t.items.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
