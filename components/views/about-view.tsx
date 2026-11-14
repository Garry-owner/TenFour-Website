import { MapPin, Radio, Wrench, Gauge } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [Radio, Wrench, Gauge]

export function AboutView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).about

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section id="our-story" className="border-b-2 border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow={t.storyEyebrow}
            title={t.storyTitle}
            description={t.storyDescription}
          />
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="border-b-2 border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t.valuesEyebrow}
            title={t.valuesTitle}
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {t.values.map(({ title, body }, index) => {
              const Icon = ICONS[index]
              return (
                <div key={title} className="flex flex-col gap-4 border-2 border-border bg-card p-6 transition-colors hover:border-primary sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center border-2 border-border bg-background text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">{title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {t.location}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
