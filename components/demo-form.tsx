'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40'

const labelClass = 'font-mono text-xs uppercase tracking-widest text-muted-foreground'

const WEBHOOK_URL = 'https://hook.us2.make.com/7jbyj4l1ysf5l6ompdzabl47l2p752lq'

export function DemoForm() {
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
    // Unchecked checkboxes never appear in FormData at all.
    // That is intentional: it is how the backend knows consent was not given.

    try {
      const res = await fetch(WEBHOOK_URL, {
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
      <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/40 bg-card p-10 text-center shadow-[0_0_40px_-16px_var(--primary)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-background text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-bold tracking-tight">Message received. Ten four.</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. We&apos;ll be in touch shortly to set up your live demo and get
          your dispatcher on the air.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fname" className={labelClass}>
            First name
          </label>
          <input id="fname" name="First name" required placeholder="Jordan" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lname" className={labelClass}>
            Last name
          </label>
          <input id="lname" name="Last name" required placeholder="Rivera" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
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
            Email
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
          What are you hoping to fix? (optional)
        </label>
        <textarea
          id="message"
          name="Message"
          rows={4}
          placeholder="We miss a lot of after hours calls during storm season."
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <label className="flex items-start gap-3 rounded-md border border-border bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent_check"
          value="on"
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          By checking this box, I agree to receive automated text messages from TenFour Systems at
          the number provided. Consent is not a condition of purchase. Msg and data rates may
          apply. Reply STOP to opt out.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-mono text-xs uppercase tracking-widest font-medium text-primary-foreground transition-all hover:bg-primary/85 hover:shadow-[0_0_24px_-4px_var(--primary)] disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Request My Demo
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-center text-xs text-destructive">
          Something went wrong. Please email garry@tenfoursystems.com or call (231) 218 2360
          directly.
        </p>
      )}

      <p className="text-center font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        No spam. No obligation. We respond fast.
      </p>
    </form>
  )
}
