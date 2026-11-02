import type { Locale } from "@/lib/locale"

const COPY: Record<Locale, { k: string; v: string; note: string }[]> = {
  en: [
    { k: "Captured", v: "Every after-hours call", note: "nights, weekends, holidays" },
    { k: "Faster", v: "Seconds, not hours", note: "texted back before they call a competitor" },
    { k: "Qualified", v: "Ready to book", note: "your link, or a lead your team can book" },
  ],
  es: [
    { k: "Captadas", v: "Cada llamada fuera de horario", note: "noches, fines de semana, días festivos" },
    { k: "Más rápido", v: "Segundos, no horas", note: "respuesta por texto antes de que llamen a un competidor" },
    { k: "Calificados", v: "Listos para agendar", note: "tu enlace, o un prospecto que tu equipo puede agendar" },
  ],
}

export function Proof({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {COPY[locale].map((item) => (
            <div key={item.k} className="flex flex-col gap-1 rounded-lg border border-border bg-card p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">{item.k}</span>
              <span className="text-lg font-semibold tracking-tight">{item.v}</span>
              <span className="text-sm text-muted-foreground">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
