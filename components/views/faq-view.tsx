import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function FaqView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).faq

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6">
          {t.items.map((item) => (
            <div key={item.q} className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">{item.q}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
