import { RichText } from '@/components/rich-text'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function LegalView({ locale, kind }: { locale: Locale; kind: 'privacy' | 'terms' }) {
  const t = getCopy(locale)[kind]

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="border-b-2 border-border pb-8">
        <p className="font-dispatch text-xs font-bold uppercase tracking-[0.2em] text-primary">TenFour Systems</p>
        <h1 className="mt-3 font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {t.updated}
        </p>
      </header>

      <div className="mt-2">
        {t.sections.map((section) => (
          <section
            key={section.heading}
            id={'id' in section ? section.id : undefined}
            className="border-b border-border py-8 last:border-b-0"
          >
            <h2 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em] text-foreground">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base leading-relaxed text-foreground/85">
                <RichText text={paragraph} locale={locale} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
