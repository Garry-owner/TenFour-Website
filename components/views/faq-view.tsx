import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function FaqView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).faq

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section id="questions" className="border-b-2 border-border py-16 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6">
          {t.items.map((item) => (
            <div key={item.q} className="border-2 border-border border-l-4 border-l-primary bg-card p-6 transition-colors hover:border-primary">
              <h2 className="mb-3 font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">{item.q}</h2>
              <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
