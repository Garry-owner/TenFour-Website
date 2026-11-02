import type { ReactNode } from "react"

export function LegalDocument({
  title,
  updated,
  sections,
}: {
  title: string
  updated: string
  sections: { heading: string; paragraphs: ReactNode[] }[]
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{updated}</p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-2 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
