import { headers } from "next/headers"
import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { localeFromPathname, localizeHref, type Locale } from "@/lib/locale"

const COPY: Record<Locale, { title: string; body: string; home: string; demo: string }> = {
  en: {
    title: "Looks like this page went missing.",
    body: "Kind of like a call nobody caught. Unlike this page, Roger would have texted you back already.",
    home: "Back to home",
    demo: "Book a Demo",
  },
  es: {
    title: "Parece que esta página se perdió.",
    body: "Algo así como una llamada que nadie captó. A diferencia de esta página, Roger ya te habría respondido por texto.",
    home: "Volver al inicio",
    demo: "Reservar una demo",
  },
}

export default async function NotFound() {
  const headerStore = await headers()
  const locale = localeFromPathname(headerStore.get("x-pathname") || "/")
  const copy = COPY[locale]

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 h-20 w-20 overflow-hidden rounded-full border border-border">
        <Image src="/roger-avatar.png" alt="Roger" width={80} height={80} />
      </div>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">404</p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{copy.title}</h1>
      <p className="mb-8 max-w-md text-pretty text-muted-foreground">{copy.body}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <CtaButton href={localizeHref("/", locale)} size="lg">
          {copy.home}
        </CtaButton>
        <CtaButton href={localizeHref("/contact", locale)} variant="outline" size="lg">
          {copy.demo}
        </CtaButton>
      </div>
    </main>
  )
}
