import { PhoneMissed, MoonStar, TrendingDown } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import type { Locale } from "@/lib/locale"

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    note: string
    costs: { stat: string; label: string; body: string }[]
  }
> = {
  en: {
    eyebrow: "The Problem",
    title: "The phone rings after 5 PM. Nobody answers. The job is gone.",
    description:
      "Home service owners can't sit by the phone 24/7, but their customers expect an answer the moment something breaks.",
    note: "Industry figures based on published missed-call and home-service revenue studies.",
    costs: [
      {
        stat: "62%",
        label: "of calls to small businesses go unanswered",
        body: "Every ring that rolls to voicemail is a customer who calls the next name on the list.",
      },
      {
        stat: "27%",
        label: "of home-service calls are never picked up",
        body: "Storms, leaks, and outages do not keep business hours, and neither should your phone.",
      },
      {
        stat: "$1,200+",
        label: "average value of a missed home-service call",
        body: "A single missed emergency call can walk thousands of dollars straight to a competitor.",
      },
    ],
  },
  es: {
    eyebrow: "El problema",
    title: "El teléfono suena después de las 5 p. m. Nadie contesta. El trabajo se fue.",
    description:
      "Los dueños de servicios del hogar no pueden estar junto al teléfono las 24 horas, pero sus clientes esperan una respuesta en el momento en que algo se descompone.",
    note: "Cifras del sector basadas en estudios publicados sobre llamadas perdidas e ingresos de servicios del hogar.",
    costs: [
      {
        stat: "62%",
        label: "de las llamadas a pequeños negocios se quedan sin respuesta",
        body: "Cada timbre que pasa al buzón de voz es un cliente que llama al siguiente nombre de la lista.",
      },
      {
        stat: "27%",
        label: "de las llamadas de servicios del hogar nunca se contestan",
        body: "Las tormentas, las fugas y los apagones no tienen horario de oficina, y tu teléfono tampoco debería tenerlo.",
      },
      {
        stat: "$1,200+",
        label: "valor promedio de una llamada perdida de servicios del hogar",
        body: "Una sola llamada de emergencia perdida puede llevar miles de dólares directo a un competidor.",
      },
    ],
  },
}

const ICONS = [PhoneMissed, MoonStar, TrendingDown]

export function Problem({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.costs.map(({ stat, label, body }, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={label}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-6 font-mono text-4xl font-bold tracking-tight text-foreground">
                  {stat}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">{copy.note}</p>
      </div>
    </section>
  )
}
