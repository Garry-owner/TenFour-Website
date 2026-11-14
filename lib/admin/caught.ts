import { BUSINESS_LINE_E164, OUTCOME_MISSED } from './constants'
import { phoneKey } from './policies'
import type { CallLog } from './types'

export type Span = 'day' | 'week' | 'month' | 'year'

export type TrackedClient = {
  id: string
  name: string
  phone: string
  example: boolean
}

export type CaughtRow = {
  id: string
  name: string
  count: number
  example: boolean
}

export type CaughtReport = {
  example: boolean
  label: string
  span: Span
  on: string
  clientTotal: number
  tenfourTotal: number
  unassigned: number
  rows: CaughtRow[]
  callsFor: (clientId: string) => CallLog[]
}

const TENFOUR_KEY = phoneKey(BUSINESS_LINE_E164)

export const EXAMPLE_TRACKED: TrackedClient[] = [
  { id: 'example-northside', name: 'Northside HVAC', phone: '+12145550111', example: true },
  { id: 'example-lakewood', name: 'Lakewood Plumbing', phone: '+14695550122', example: true },
  { id: 'example-oakcliff', name: 'Oakcliff Electric', phone: '+18175550133', example: true },
]

export function chicagoYmd(date: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  return { y: read('year'), m: read('month'), d: read('day') }
}

export function formatYmd(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function todayChicago(now = new Date()): string {
  const { y, m, d } = chicagoYmd(now)
  return formatYmd(y, m, d)
}

function chicagoOffset(utcMs: number): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs))
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  const asUtc = Date.UTC(read('year'), read('month') - 1, read('day'), read('hour'), read('minute'), read('second'))
  return asUtc - utcMs
}

export function chicagoMidnight(y: number, m: number, d: number): Date {
  let utc = Date.UTC(y, m - 1, d, 6, 0, 0)
  for (let i = 0; i < 4; i += 1) {
    const next = Date.UTC(y, m - 1, d, 0, 0, 0) - chicagoOffset(utc)
    if (next === utc) break
    utc = next
  }
  return new Date(utc)
}

export function addCalendarDays(y: number, m: number, d: number, days: number) {
  const utc = new Date(Date.UTC(y, m - 1, d + days))
  return { y: utc.getUTCFullYear(), m: utc.getUTCMonth() + 1, d: utc.getUTCDate() }
}

function parseYmd(value: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const y = Number(match[1])
  const m = Number(match[2])
  const d = Number(match[3])
  if (m < 1 || m > 12 || d < 1 || d > 31) return null
  return { y, m, d }
}

function longDate(y: number, m: number, d: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(chicagoMidnight(y, m, d))
}

function monthName(y: number, m: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    year: 'numeric',
  }).format(chicagoMidnight(y, m, 1))
}

export function periodBounds(span: Span, on: string): { start: Date; end: Date; label: string } {
  const parsed = parseYmd(on) || chicagoYmd(new Date())
  const { y, m, d } = parsed
  if (span === 'day') {
    const next = addCalendarDays(y, m, d, 1)
    return {
      start: chicagoMidnight(y, m, d),
      end: chicagoMidnight(next.y, next.m, next.d),
      label: longDate(y, m, d),
    }
  }
  if (span === 'week') {
    const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
    const startYmd = addCalendarDays(y, m, d, -weekday)
    const endYmd = addCalendarDays(startYmd.y, startYmd.m, startYmd.d, 7)
    const last = addCalendarDays(startYmd.y, startYmd.m, startYmd.d, 6)
    return {
      start: chicagoMidnight(startYmd.y, startYmd.m, startYmd.d),
      end: chicagoMidnight(endYmd.y, endYmd.m, endYmd.d),
      label: `${longDate(startYmd.y, startYmd.m, startYmd.d)} through ${longDate(last.y, last.m, last.d)}`,
    }
  }
  if (span === 'year') {
    return {
      start: chicagoMidnight(y, 1, 1),
      end: chicagoMidnight(y + 1, 1, 1),
      label: String(y),
    }
  }
  const nextMonth = m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 }
  return {
    start: chicagoMidnight(y, m, 1),
    end: chicagoMidnight(nextMonth.y, nextMonth.m, 1),
    label: monthName(y, m),
  }
}

function inPeriod(call: CallLog, start: Date, end: Date): boolean {
  if (!call.startedAt) return false
  const time = Date.parse(call.startedAt)
  return time >= start.getTime() && time < end.getTime()
}

function matchClient(call: CallLog, clients: TrackedClient[]): TrackedClient | 'tenfour' | 'unassigned' {
  if (call.clientId) {
    const byId = clients.find((client) => client.id === call.clientId)
    if (byId) return byId
  }
  const to = phoneKey(call.to || '')
  if (to && to === TENFOUR_KEY) return 'tenfour'
  if (to.length >= 10) {
    const byPhone = clients.find((client) => phoneKey(client.phone) === to)
    if (byPhone) return byPhone
  }
  if (!to) return 'tenfour'
  return 'unassigned'
}

export function caughtReport(
  calls: CallLog[],
  clients: TrackedClient[],
  span: Span,
  on: string,
): CaughtReport {
  const bounds = periodBounds(span, on)
  const missed = calls.filter((call) => call.outcome === OUTCOME_MISSED && inPeriod(call, bounds.start, bounds.end))
  const buckets = new Map<string, { client: TrackedClient; calls: CallLog[] }>()
  let tenfourTotal = 0
  let unassigned = 0
  const tenfourCalls: CallLog[] = []
  for (const call of missed) {
    const match = matchClient(call, clients)
    if (match === 'tenfour') {
      tenfourTotal += 1
      tenfourCalls.push(call)
    } else if (match === 'unassigned') {
      unassigned += 1
    } else {
      const bucket = buckets.get(match.id) || { client: match, calls: [] }
      bucket.calls.push(call)
      buckets.set(match.id, bucket)
    }
  }
  const rows = [...buckets.values()]
    .map((bucket) => ({
      id: bucket.client.id,
      name: bucket.client.name,
      count: bucket.calls.length,
      example: bucket.client.example || bucket.calls.every((call) => call.example),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
  return {
    example: calls.length > 0 && calls.every((call) => call.example),
    label: bounds.label,
    span,
    on: formatYmd(parseYmd(on)?.y || bounds.start.getUTCFullYear(), parseYmd(on)?.m || 1, parseYmd(on)?.d || 1),
    clientTotal: rows.reduce((sum, row) => sum + row.count, 0),
    tenfourTotal,
    unassigned,
    rows,
    callsFor: (clientId: string) => {
      if (clientId === 'tenfour') return tenfourCalls
      return buckets.get(clientId)?.calls || []
    },
  }
}

export function atChicagoHour(now: Date, daysBack: number, hour: number): string {
  const { y, m, d } = chicagoYmd(now)
  const shifted = addCalendarDays(y, m, d, -daysBack)
  return new Date(chicagoMidnight(shifted.y, shifted.m, shifted.d).getTime() + hour * 60 * 60 * 1000).toISOString()
}
