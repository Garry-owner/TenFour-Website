import { RichText } from '@/components/rich-text'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

export function LegalView({ locale, kind }: { locale: Locale; kind: 'privacy' | 'terms' }) {
  const t = getCopy(locale)[kind]

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t.updated}</p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        {t.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 leading-relaxed">
                <RichText text={paragraph} locale={locale} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
