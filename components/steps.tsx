import { SectionHeading } from '@/components/section-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'

export function Steps({
  locale,
  withHeading = true,
  id = 'steps',
}: {
  locale: Locale
  withHeading?: boolean
  id?: string
}) {
  const t = getCopy(locale).steps

  return (
    <section id={id} className="border-b-2 border-border bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {withHeading && (
          <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        )}

        <ol className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4', withHeading && 'mt-12')}>
          {t.items.map((step, index) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 border-2 border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <span className="font-stencil text-4xl font-black leading-none text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-[2px] w-full bg-border" aria-hidden />
              <h3 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">{step.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
