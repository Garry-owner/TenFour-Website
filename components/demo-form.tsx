"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/locale"
import { cn } from "@/lib/utils"

const inputClass =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40"

const labelClass = "font-mono text-xs uppercase tracking-widest text-muted-foreground"

const COPY: Record<
  Locale,
  {
    received: string
    thanks: string
    another: string
    first: string
    last: string
    phone: string
    email: string
    message: string
    messagePlaceholder: string
    timezone: string
    selectZone: string
    zones: { value: string; label: string }[]
    sending: string
    submit: string
    error: string
    note: string
  }
> = {
  en: {
    received: "Message received. Ten four.",
    thanks:
      "Thanks for reaching out. We'll be in touch shortly to set up your live demo and get your dispatcher on the air.",
    another: "Submit another request",
    first: "First name",
    last: "Last name",
    phone: "Phone",
    email: "Email",
    message: "What are you hoping to fix? (optional)",
    messagePlaceholder: "We miss a lot of after hours calls during storm season.",
    timezone: "What time zone are you in?",
    selectZone: "Select your time zone",
    zones: [
      { value: "Eastern", label: "Eastern" },
      { value: "Central", label: "Central" },
      { value: "Mountain", label: "Mountain" },
      { value: "Pacific", label: "Pacific" },
    ],
    sending: "Sending",
    submit: "Request My Demo",
    error: "Something went wrong. Please email garry@tenfoursystems.com or call (972) 349 5808 directly.",
    note: "No spam. No obligation. We respond fast.",
  },
  es: {
    received: "Mensaje recibido. Ten four.",
    thanks:
      "Gracias por escribirnos. Te contactaremos pronto para preparar tu demo en vivo y poner tu despachador en el aire.",
    another: "Enviar otra solicitud",
    first: "Nombre",
    last: "Apellido",
    phone: "Teléfono",
    email: "Correo",
    message: "¿Qué quieres resolver? (opcional)",
    messagePlaceholder: "Perdemos muchas llamadas fuera de horario durante la temporada de tormentas.",
    timezone: "¿En qué zona horaria estás?",
    selectZone: "Elige tu zona horaria",
    zones: [
      { value: "Eastern", label: "Este" },
      { value: "Central", label: "Centro" },
      { value: "Mountain", label: "Montaña" },
      { value: "Pacific", label: "Pacífico" },
    ],
    sending: "Enviando",
    submit: "Pedir mi demo",
    error: "Algo salió mal. Escribe a garry@tenfoursystems.com o llama al (972) 349 5808 directamente.",
    note: "Sin spam. Sin compromiso. Respondemos rápido.",
  },
}

export function DemoForm({ locale = "en" }: { locale?: Locale }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle")
  const copy = COPY[locale]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string> = {}
    formData.forEach((value, key) => {
      payload[key] = String(value)
    })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Server error")
      setStatus("done")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/40 bg-card p-10 text-center shadow-[0_0_40px_-16px_var(--primary)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-background text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-bold tracking-tight">{copy.received}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{copy.thanks}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
        >
          {copy.another}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company Website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fname" className={labelClass}>
            {copy.first}
          </label>
          <input id="fname" name="First name" required placeholder="Jordan" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lname" className={labelClass}>
            {copy.last}
          </label>
          <input id="lname" name="Last name" required placeholder="Rivera" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            {copy.phone}
          </label>
          <input
            id="phone"
            name="Phone"
            type="tel"
            required
            placeholder="(214) 555 0148"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            {copy.email}
          </label>
          <input
            id="email"
            name="Email Address"
            type="email"
            required
            placeholder="you@business.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          {copy.message}
        </label>
        <textarea
          id="message"
          name="Message"
          rows={4}
          placeholder={copy.messagePlaceholder}
          className={cn(inputClass, "resize-none")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="timezone" className={labelClass}>
          {copy.timezone}
        </label>
        <select id="timezone" name="Fax" required className={inputClass}>
          <option value="">{copy.selectZone}</option>
          {copy.zones.map((zone) => (
            <option key={zone.value} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 rounded-md border border-border bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent_check"
          value="on"
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          {locale === "es" ? (
            <>
              Al marcar esta casilla, acepto recibir mensajes de texto automatizados de TenFour
              Systems en el número proporcionado, sobre mi consulta de servicio, la programación de
              citas y las actualizaciones de seguimiento. La frecuencia de los mensajes varía. El
              consentimiento no es una condición de compra. Pueden aplicar tarifas de mensajes y
              datos. Responda HELP para ayuda o STOP para cancelar. Vea nuestra{" "}
              <a href={localizeHref("/privacy", locale)} className="underline">
                Política de privacidad
              </a>{" "}
              y nuestros{" "}
              <a href={localizeHref("/terms", locale)} className="underline">
                Términos de servicio
              </a>
              .
            </>
          ) : (
            <>
              By checking this box, I agree to receive automated text messages from TenFour Systems
              at the number provided, regarding my service inquiry, appointment scheduling, and
              follow-up updates. Message frequency varies. Consent is not a condition of purchase.
              Msg and data rates may apply. Reply HELP for help or STOP to opt out. See our{" "}
              <a href={localizeHref("/privacy", locale)} className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href={localizeHref("/terms", locale)} className="underline">
                Terms of Service
              </a>
              .
            </>
          )}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-mono text-xs uppercase tracking-widest font-medium text-primary-foreground transition-all hover:bg-primary/85 hover:shadow-[0_0_24px_-4px_var(--primary)] disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {copy.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {copy.submit}
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-xs text-destructive">{copy.error}</p>
      )}

      <p className="text-center font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {copy.note}
      </p>
    </form>
  )
}
