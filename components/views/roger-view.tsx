import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function RogerView({ locale }: { locale: Locale }) {
  const t = getCopy(locale).roger

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-border">
            <Image src="/roger-avatar.png" alt={t.alt} width={96} height={96} />
          </div>
          <div className="space-y-4 text-pretty text-muted-foreground">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </main>
  )
}
