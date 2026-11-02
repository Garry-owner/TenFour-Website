import { SectionHeading } from "@/components/section-heading"
import type { Locale } from "@/lib/locale"

const COPY: Record<
  Locale,
  { eyebrow: string; title: string; description: string; steps: { id: string; title: string; body: string }[] }
> = {
  en: {
    eyebrow: "How It Works",
    title: "Live in a day. Answering forever.",
    description: "No apps to babysit, no scripts to memorize. We handle the wiring, you get your evenings back.",
    steps: [
      {
        id: "01",
        title: "We watch your line",
        body: "Roger connects to your existing business number and watches for any call that goes unanswered. Setup takes minutes, not weeks.",
      },
      {
        id: "02",
        title: "We tune Roger",
        body: "We script your text-back message and qualifying questions around your trade, service area, and hours, and add your booking link when you have one.",
      },
      {
        id: "03",
        title: "Missed calls get caught",
        body: "The moment a call goes unanswered, Roger texts that caller back before they can call the next name on their list.",
      },
      {
        id: "04",
        title: "You get the lead",
        body: "If you have a booking link, Roger texts it so the customer can book themselves. Otherwise a ready to book lead, transcript, and callback details land with your team.",
      },
    ],
  },
  es: {
    eyebrow: "Cómo funciona",
    title: "En línea en un día. Contestando para siempre.",
    description:
      "Sin aplicaciones que cuidar ni guiones que memorizar. Nosotros hacemos la instalación y tú recuperas tus tardes.",
    steps: [
      {
        id: "01",
        title: "Vigilamos tu línea",
        body: "Roger se conecta a tu número de negocio actual y vigila cualquier llamada que se quede sin respuesta. La configuración toma minutos, no semanas.",
      },
      {
        id: "02",
        title: "Ajustamos a Roger",
        body: "Escribimos tu mensaje de respuesta y las preguntas de calificación según tu oficio, tu zona de servicio y tu horario, y agregamos tu enlace de reserva cuando lo tienes.",
      },
      {
        id: "03",
        title: "Las llamadas perdidas se captan",
        body: "En el momento en que una llamada se queda sin respuesta, Roger le manda un texto a esa persona antes de que pueda llamar al siguiente nombre de su lista.",
      },
      {
        id: "04",
        title: "Tú recibes el prospecto",
        body: "Si tienes un enlace de reserva, Roger se lo manda por texto para que el cliente pueda agendar solo. Si no, un prospecto listo para agendar, la transcripción y los datos para devolver la llamada llegan a tu equipo.",
      },
    ],
  },
}

export function Steps({
  withHeading = true,
  locale = "en",
}: {
  withHeading?: boolean
  locale?: Locale
}) {
  const copy = COPY[locale]

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {withHeading && (
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        )}

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step) => (
            <li
              key={step.id}
              className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              <span className="font-mono text-sm font-bold tracking-widest text-primary">{step.id}</span>
              <div className="h-px w-full bg-border" aria-hidden />
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
