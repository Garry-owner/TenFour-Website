'use client'

import { FormEvent, useState } from 'react'
import { Check } from 'lucide-react'
import { SERVICE_OPTIONS } from '@/lib/preview/barneys-electric/content'

type Values = {
  name: string
  phone: string
  city: string
  service: string
  details: string
}

type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { name: '', phone: '', city: '', service: '', details: '' }

const inputClass =
  'h-12 w-full rounded-lg border border-[#D5DAE1] bg-white px-3 text-base text-[#0F2340] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F2340] focus:ring-2 focus:ring-[#0F2340]/15'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your name.'
  const phone = digits(values.phone)
  const validPhone = phone.length === 10 || (phone.length === 11 && phone.startsWith('1'))
  if (!validPhone) errors.phone = 'Enter a 10-digit phone number.'
  if (values.city.trim().length < 2) errors.city = 'Enter your city.'
  if (!values.service) errors.service = 'Choose the work you need.'
  if (values.details.trim().length > 1000) errors.details = 'Keep the description under 1000 characters.'
  return errors
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  error?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-[#0F2340]">
          {label}
        </label>
        {hint ? <span className="text-xs text-[#64748B]">{hint}</span> : null}
      </div>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1.5 text-sm text-[#9F1239]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function EstimateForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<Values | null>(null)

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0]
      const field = event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)
      field?.focus()
      return
    }
    setSubmitted(values)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E6E8EC] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(15,35,64,0.45)] sm:p-7">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F7F7F5] text-[#0F2340]">
            <Check className="size-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-[#0F2340]">Request received</h3>
            <p className="mt-2 text-base leading-relaxed text-[#334155]">
              Preview mode: on your live site, this goes straight to Barney and sends the homeowner an
              instant confirmation text through Roger.
            </p>
          </div>
        </div>
        <dl className="mt-6 divide-y divide-[#E6E8EC] rounded-xl border border-[#E6E8EC]">
          {[
            ['Name', submitted.name],
            ['Phone', submitted.phone],
            ['City', submitted.city],
            ['Service needed', submitted.service],
            ['Brief description', submitted.details.trim() || 'None added'],
          ].map(([label, value]) => (
            <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-sm font-semibold text-[#0F2340]">{label}</dt>
              <dd className="text-sm leading-relaxed text-[#334155]">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-[#0F2340] px-5 text-base font-semibold text-[#0F2340] transition hover:bg-[#0F2340] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
          onClick={() => {
            setSubmitted(null)
            setValues(EMPTY)
            setErrors({})
          }}
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-[#E6E8EC] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(15,35,64,0.45)] sm:p-7"
    >
      <div className="grid gap-4">
        <Field label="Name" htmlFor="estimate-name" error={errors.name}>
          <input
            id="estimate-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
        </Field>
        <Field label="Phone" htmlFor="estimate-phone" error={errors.phone}>
          <input
            id="estimate-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            placeholder="(972) 555-0100"
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
        </Field>
        <Field label="City" htmlFor="estimate-city" error={errors.city}>
          <input
            id="estimate-city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update('city', event.target.value)}
            placeholder="Rockwall"
            aria-invalid={Boolean(errors.city)}
            className={inputClass}
          />
        </Field>
        <Field label="Service needed" htmlFor="estimate-service" error={errors.service}>
          <select
            id="estimate-service"
            name="service"
            value={values.service}
            onChange={(event) => update('service', event.target.value)}
            aria-invalid={Boolean(errors.service)}
            className={`${inputClass} ${values.service ? 'text-[#0F2340]' : 'text-[#64748B]'}`}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Brief description" hint="Optional" htmlFor="estimate-details" error={errors.details}>
          <textarea
            id="estimate-details"
            name="details"
            rows={4}
            value={values.details}
            onChange={(event) => update('details', event.target.value)}
            placeholder="What is going on, and when did it start?"
            aria-invalid={Boolean(errors.details)}
            className="w-full rounded-lg border border-[#D5DAE1] bg-white px-3 py-3 text-base leading-relaxed text-[#0F2340] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F2340] focus:ring-2 focus:ring-[#0F2340]/15"
          />
        </Field>
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#D97706] px-5 text-base font-semibold text-white transition hover:bg-[#B45309] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2340]"
      >
        Request My Free Estimate
      </button>
      <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
        This preview does not send the form. On the live site, Barney gets it and you get a confirmation text.
      </p>
    </form>
  )
}
