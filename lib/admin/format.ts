import { PLANS } from '@/lib/admin/constants'
import type { MonthlyStatus, PlanId } from '@/lib/admin/types'

const CENTRAL: Intl.DateTimeFormatOptions = { timeZone: 'America/Chicago' }

export function formatCentral(iso: string | null, withTime = true): string {
  if (!iso) return 'Unknown time'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Unknown time'
  return new Intl.DateTimeFormat('en-US', {
    ...CENTRAL,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(withTime ? { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' } : {}),
  }).format(date)
}

export function formatClock(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    ...CENTRAL,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export function formatMonthChicago(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    ...CENTRAL,
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (national.length === 10) {
    return `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}`
  }
  return raw.trim() || 'No number'
}

export function telHref(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  if (digits.length >= 8 && digits.length <= 15) return `tel:+${digits}`
  return null
}

export function formatSeconds(value: number | null): string {
  if (value == null) return '—'
  const minutes = Math.floor(value / 60)
  const seconds = value % 60
  if (minutes <= 0) return `${seconds}s`
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`
}

export function money(amount: number): string {
  return `$${amount}`
}

export function planName(id: PlanId): string {
  return PLANS.find((plan) => plan.id === id)?.name ?? id
}

export function planPrice(id: PlanId): string {
  const plan = PLANS.find((item) => item.id === id)
  if (!plan) return ''
  return `${money(plan.setup)} setup / ${money(plan.month)} a month`
}

export function monthlyLabel(status: MonthlyStatus): string {
  if (status === 'past_due') return 'Past due'
  if (status === 'paused') return 'Paused'
  if (status === 'cancelled') return 'Cancelled'
  return 'Active'
}

export function setupLabel(founding: boolean, setupPaid: boolean): string {
  if (founding) return 'Waived'
  if (setupPaid) return 'Paid'
  return 'Unpaid'
}

export function leadName(first: string, last: string): string {
  return `${first} ${last}`.trim() || 'Unnamed signup'
}

export function sourceStamp(source: string, example: boolean): string {
  if (example) return 'Example'
  if (/backfill/i.test(source)) return 'Backfill'
  if (/live/i.test(source)) return 'Live'
  return 'Log'
}

export function placeLine(city: string, state: string): string {
  const parts = [city.trim(), state.trim()].filter(Boolean)
  return parts.length ? parts.join(', ') : 'City not on the log'
}
