'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { ctaVariants } from '@/components/cta-button'
import { RichText } from '@/components/rich-text'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full border-2 border-input bg-background px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary'

const labelClass = 'font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground'

export function DemoForm() {
  const locale = useLocale()
  const t = getCopy(locale).form
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string> = {}
    formData.forEach((value, key) => {
      payload[key] = String(value)
    })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('done')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 border-2 border-primary bg-card p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center border-2 border-primary bg-background text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="font-stencil text-3xl font-black uppercase leading-none">{t.doneTitle}</h3>
        <p className="max-w-sm text-base leading-relaxed text-muted-foreground">{t.doneBody}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
        >
          {t.another}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5 border-2 border-border bg-card p-6 sm:p-8"
    >
      {/* Honeypot field: hidden from real visitors, catches simple bots */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">{t.honeypot}</label>
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
            {t.first}
          </label>
          <input id="fname" name="First name" required placeholder={t.firstPlaceholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lname" className={labelClass}>
            {t.last}
          </label>
          <input id="lname" name="Last name" required placeholder={t.lastPlaceholder} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            {t.phone}
          </label>
          <input
            id="phone"
            name="Phone"
            type="tel"
            required
            placeholder={t.phonePlaceholder}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            {t.email}
          </label>
          <input
            id="email"
            name="Email Address"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="message"
          name="Message"
          rows={4}
          placeholder={t.messagePlaceholder}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="timezone" className={labelClass}>
          {t.timezone}
        </label>
        <select id="timezone" name="Fax" required className={inputClass}>
          <option value="">{t.timezonePlaceholder}</option>
          {t.zones.map((zone) => (
            <option key={zone.value} value={zone.value}>
              {zone.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 border-2 border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent_check"
          value="on"
          className="mt-1 h-5 w-5 shrink-0 accent-primary"
        />
        <span>
          <RichText text={t.consent} locale={locale} linkClassName="underline" />
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={ctaVariants({ variant: 'primary', size: 'lg', className: 'w-full sm:w-auto' })}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t.submit}
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-center text-xs text-destructive">{t.error}</p>
      )}

      <p className="text-center font-dispatch text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {t.fine}
      </p>
    </form>
  )
}
