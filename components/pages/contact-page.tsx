import { Mail, MapPin, Clock, PhoneCall } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { DemoForm } from "@/components/demo-form"
import type { Locale } from "@/lib/locale"

const ICONS = [Mail, PhoneCall, MapPin, Clock]

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    heading: string
    body: string
    contacts: { label: string; value: string; href: string | null }[]
    online: string
    onlineBody: string
  }
> = {
  en: {
    eyebrow: "Book a Demo",
    title: "See Roger catch a missed call",
    description:
      "Tell us about your business and we'll set up a live demo tuned to your trade. You'll see exactly how Roger texts your callers back.",
    heading: "Let's get you on the air",
    body: "Fill out the form and we'll reach out to schedule your demo. Prefer to talk first? Reach us directly below.",
    contacts: [
      { label: "Email", value: "garry@tenfoursystems.com", href: "mailto:garry@tenfoursystems.com" },
      { label: "Phone", value: "(972) 349 5808", href: "tel:+19723495808" },
      { label: "Based in", value: "Terrell, Texas", href: null },
      { label: "Dispatcher hours", value: "24 / 7 / 365", href: null },
    ],
    online: "Dispatcher online",
    onlineBody:
      "Your future callers never hit voicemail again. The moment you're live, every missed call gets a text back, days, nights, and weekends included.",
  },
  es: {
    eyebrow: "Reservar una demo",
    title: "Mira a Roger captar una llamada perdida",
    description:
      "Cuéntanos de tu negocio y prepararemos una demo en vivo ajustada a tu oficio. Vas a ver exactamente cómo Roger les responde por texto a quienes te llaman.",
    heading: "Vamos a ponerte en el aire",
    body: "Llena el formulario y te contactaremos para agendar tu demo. ¿Prefieres hablar primero? Comunícate directo aquí abajo.",
    contacts: [
      { label: "Correo", value: "garry@tenfoursystems.com", href: "mailto:garry@tenfoursystems.com" },
      { label: "Teléfono", value: "(972) 349 5808", href: "tel:+19723495808" },
      { label: "Con sede en", value: "Terrell, Texas", href: null },
      { label: "Horario del despachador", value: "24 / 7 / 365", href: null },
    ],
    online: "Despachador en línea",
    onlineBody:
      "Quienes te llamen ya no van a caer en el buzón de voz. En el momento en que estés en línea, cada llamada perdida recibe un texto de vuelta, de día, de noche y los fines de semana.",
  },
}

export function ContactPage({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{copy.heading}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
            </div>

            <ul className="flex flex-col gap-4">
              {copy.contacts.map(({ label, value, href }, index) => {
                const Icon = ICONS[index]
                const inner = (
                  <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  </div>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block transition-opacity hover:opacity-80">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
                <span className="h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
                {copy.online}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.onlineBody}</p>
            </div>
          </div>

          <DemoForm locale={locale} />
        </div>
      </section>
    </main>
  )
}
