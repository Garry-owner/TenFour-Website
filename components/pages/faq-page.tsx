import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import type { Locale } from "@/lib/locale"

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    faqs: { q: string; a: string }[]
    ctaTitle: string
    ctaSubtitle: string
  }
> = {
  en: {
    eyebrow: "FAQ",
    title: "Questions people actually ask",
    description: "Straight answers about how Roger works, no hype.",
    faqs: [
      {
        q: "Does Roger replace my receptionist?",
        a: "Not entirely. Roger catches the calls nobody could get to, missed calls, after-hours, mid-job, and turns them into qualified, ready-to-book leads over text. It's built for the calls that would have gone to voicemail, not to replace a front desk you already have covered.",
      },
      {
        q: "Does Roger answer the phone live?",
        a: "No, and we're upfront about that. Roger works entirely over text. The moment a call to your business goes unanswered, Roger texts that customer back within seconds, asks the right questions for your trade, and hands you a ready lead. There's no live voice conversation today.",
      },
      {
        q: "What happens after hours or on weekends?",
        a: "The same thing that happens during the day. Roger doesn't have hours, he watches for missed calls 24/7/365, including nights, weekends, and holidays.",
      },
      {
        q: "Do I need to change my phone number?",
        a: "No. Roger works alongside your existing business number using a standard phone feature called conditional call forwarding, only unanswered calls get forwarded to Roger. Your number stays exactly the same, and answered calls work exactly like they do today.",
      },
      {
        q: "How fast does Roger actually respond?",
        a: "Within seconds of a call going unanswered, well before most callers give up and dial the next business on their list.",
      },
      {
        q: "What if a customer wants pricing right away?",
        a: "Roger never gives firm pricing or arrival times over text. He qualifies the lead, service type, location, urgency, and gets them ready to book, then hands that lead straight to you with full details so you can follow up with real numbers.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No. TenFour runs month to month.",
      },
    ],
    ctaTitle: "Still have questions?",
    ctaSubtitle: "Book a demo and we'll walk through exactly how it would work for your business.",
  },
  es: {
    eyebrow: "Preguntas",
    title: "Preguntas que la gente sí hace",
    description: "Respuestas directas sobre cómo trabaja Roger, sin exageraciones.",
    faqs: [
      {
        q: "¿Roger reemplaza a mi recepcionista?",
        a: "No del todo. Roger capta las llamadas que nadie pudo atender, llamadas perdidas, fuera de horario y a mitad del trabajo, y las convierte en prospectos calificados y listos para agendar por texto. Está hecho para las llamadas que habrían ido al buzón de voz, no para reemplazar una recepción que ya tienes cubierta.",
      },
      {
        q: "¿Roger contesta el teléfono en vivo?",
        a: "No, y lo decimos con claridad. Roger trabaja por completo por texto. En el momento en que una llamada a tu negocio se queda sin respuesta, Roger le manda un texto a ese cliente en segundos, hace las preguntas correctas para tu oficio y te entrega un prospecto listo. Hoy no hay una conversación de voz en vivo.",
      },
      {
        q: "¿Qué pasa fuera de horario o los fines de semana?",
        a: "Lo mismo que pasa durante el día. Roger no tiene horario. Vigila las llamadas perdidas las 24 horas, los 365 días, incluidas las noches, los fines de semana y los días festivos.",
      },
      {
        q: "¿Tengo que cambiar mi número de teléfono?",
        a: "No. Roger trabaja junto a tu número de negocio actual usando una función estándar del teléfono llamada desvío condicional de llamadas. Solo las llamadas sin respuesta se desvían a Roger. Tu número sigue exactamente igual, y las llamadas contestadas funcionan igual que hoy.",
      },
      {
        q: "¿Qué tan rápido responde Roger de verdad?",
        a: "En segundos después de que una llamada se queda sin respuesta, mucho antes de que la mayoría de las personas se rindan y marquen al siguiente negocio de su lista.",
      },
      {
        q: "¿Qué pasa si un cliente quiere precios de inmediato?",
        a: "Roger nunca da precios firmes ni tiempos de llegada por texto. Califica al prospecto, el tipo de servicio, la ubicación y la urgencia, y lo deja listo para agendar. Luego te entrega ese prospecto con todos los detalles para que des seguimiento con números reales.",
      },
      {
        q: "¿Hay un contrato a largo plazo?",
        a: "No. TenFour funciona mes a mes.",
      },
    ],
    ctaTitle: "¿Todavía tienes preguntas?",
    ctaSubtitle: "Reserva una demo y te explicamos exactamente cómo funcionaría para tu negocio.",
  },
}

export function FaqPage({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6">
          {copy.faqs.map((item) => (
            <div key={item.q} className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">{item.q}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} title={copy.ctaTitle} subtitle={copy.ctaSubtitle} />
    </main>
  )
}
