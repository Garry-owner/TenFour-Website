import { SectionHeading } from '@/components/section-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Steps({ locale, withHeading = true }: { locale: Locale; withHeading?: boolean }) {
  const t = getCopy(locale).steps

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {withHeading && (
          <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        )}

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((step, index) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              <span className="font-mono text-sm font-bold tracking-widest text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px w-full bg-border" aria-hidden />
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
