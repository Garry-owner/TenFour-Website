import { HomeHeading } from '@/components/home/home-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

// Same four steps as the shared Steps section, in the homepage look.
export function HomeSteps({ locale }: { locale: Locale }) {
  const t = getCopy(locale).steps

  return (
    <section className="border-b-2 border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <HomeHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-4 border-2 border-border bg-card p-6">
              <span className="font-stencil text-4xl font-black leading-none text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-[2px] w-full bg-border" aria-hidden />
              <h3 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
