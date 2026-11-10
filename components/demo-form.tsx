'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { RichText } from '@/components/rich-text'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { cn } from '@/lib/utils'
import { TRADE_OTHER, TRADE_VALUES } from '@/lib/trades'

const inputClass =
  'w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40'

const labelClass = 'font-mono text-xs uppercase tracking-widest text-muted-foreground'

export function DemoForm() {
  const locale = useLocale()
  const copy = getCopy(locale)
  const t = copy.form
  // Labels follow the page language, but the value sent to Make.com is always
  // the English trade name so Zoho stays consistent.
  const tradeOptions = [
    ...TRADE_VALUES.map((value, index) => ({ value, label: copy.calculator.trades[index] || value })),
    { value: TRADE_OTHER, label: t.tradeOther },
  ]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [trade, setTrade] = useState('')

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
      setTrade('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/40 bg-card p-10 text-center shadow-[0_0_40px_-16px_var(--primary)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-background text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-bold tracking-tight">{t.doneTitle}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t.doneBody}</p>
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
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
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
        <label htmlFor="trade" className={labelClass}>
          {t.trade}
        </label>
        <select
          id="trade"
          name="Trade"
          required
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className={inputClass}
        >
          <option value="">{t.tradePlaceholder}</option>
          {tradeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {trade === TRADE_OTHER && (
        <div className="flex flex-col gap-2">
          <label htmlFor="business-type" className={labelClass}>
            {t.businessType}
          </label>
          <input
            id="business-type"
            name="Business type"
            required
            maxLength={60}
            placeholder={t.businessTypePlaceholder}
            className={inputClass}
          />
        </div>
      )}

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

      <label className="flex items-start gap-3 rounded-md border border-border bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent_check"
          value="on"
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          <RichText text={t.consent} locale={locale} linkClassName="underline" />
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#ff6b1a] px-6 font-mono text-xs uppercase tracking-widest font-medium text-[#0f1011] transition-all hover:bg-[#ff6b1a]/85 hover:shadow-[0_0_24px_-4px_#ff6b1a] disabled:opacity-60"
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

      <p className="text-center font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {t.fine}
      </p>
    </form>
  )
}
