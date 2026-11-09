import { HomeEyebrow } from '@/components/home/home-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function Industries({ locale }: { locale: Locale }) {
  const t = getCopy(locale).industries

  return (
    <section className="border-b-2 border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <HomeEyebrow>{t.eyebrow}</HomeEyebrow>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">{t.description}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {t.items.map((industry) => (
              <li
                key={industry}
                className="border-2 border-border px-4 py-2 font-dispatch text-xs font-bold uppercase tracking-[0.15em] text-foreground"
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
