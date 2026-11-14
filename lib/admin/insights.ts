import { addCalendarDays, chicagoMidnight, chicagoYmd } from '@/lib/admin/caught'
import { formatPhone, moneyGrouped } from '@/lib/admin/format'
import { phoneKey } from '@/lib/admin/policies'
import type { CallLog, ClientRecord, LeadOutcome, ThreadMessage } from '@/lib/admin/types'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function rangeBounds(from: string, to: string): { start: Date; end: Date } | null {
  const start = ymdDate(from)
  const finish = ymdDate(to)
  if (!start || !finish) return null
  const endDay = addCalendarDays(finish.y, finish.m, finish.d, 1)
  const startDate = chicagoMidnight(start.y, start.m, start.d)
  const endDate = chicagoMidnight(endDay.y, endDay.m, endDay.d)
  if (endDate.getTime() <= startDate.getTime()) return null
  return { start: startDate, end: endDate }
}

export function shortDayLabel(ymd: string): string {
  const parts = ymdDate(ymd)
  if (!parts) return ymd
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(parts.y, parts.m - 1, parts.d)))
}

function ymdDate(value: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const y = Number(match[1])
  const m = Number(match[2])
  const d = Number(match[3])
  if (m < 1 || m > 12 || d < 1 || d > 31) return null
  return { y, m, d }
}

function chicagoBits(iso: string): { weekday: number; hour: number } | null {
  const time = Date.parse(iso)
  if (Number.isNaN(time)) return null
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date(time))
  const weekday = parts.find((part) => part.type === 'weekday')?.value || 'Sun'
  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0)
  const index = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  return { weekday: index < 0 ? 0 : index, hour }
}

export function callsForClient(calls: CallLog[], client: { id: string; phone: string }): CallLog[] {
  const key = phoneKey(client.phone)
  return calls.filter((call) => {
    if (client.id && call.clientId === client.id) return true
    return key.length >= 7 && phoneKey(call.to) === key
  })
}

function missedIn(calls: CallLog[], start: number, end: number): CallLog[] {
  return calls.filter((call) => {
    if (call.outcome !== 'Missed' || !call.startedAt) return false
    const time = Date.parse(call.startedAt)
    return time >= start && time < end
  })
}

export type PeriodReport = {
  from: string
  to: string
  fromLabel: string
  toLabel: string
  missed: number
  texted: number
  leads: { name: string; phone: string }[]
  bookingLinks: number
  bookingNote: string
  afterHours: number
  businessHours: number
  hoursNote: string
  busiest: string
  languages: { language: string; count: number }[]
  languageNote: string
  money: string | null
  summary: string
}

export function buildPeriodReport(input: {
  client: ClientRecord
  calls: CallLog[]
  messages: ThreadMessage[]
  outcomes: LeadOutcome[]
  from: string
  to: string
  includeMoney: boolean
}): PeriodReport | null {
  const bounds = rangeBounds(input.from, input.to)
  if (!bounds) return null
  const mine = callsForClient(input.calls, input.client)
  const missed = missedIn(mine, bounds.start.getTime(), bounds.end.getTime())
  const leads = missed.map((call) => ({
    name: call.callerName || 'Unknown caller',
    phone: formatPhone(call.caller),
  }))
  let afterHours = 0
  let businessHours = 0
  const byDay = new Array(7).fill(0)
  const byHour = new Array(24).fill(0)
  for (const call of missed) {
    const bits = call.startedAt ? chicagoBits(call.startedAt) : null
    if (!bits) continue
    byDay[bits.weekday] += 1
    byHour[bits.hour] += 1
    const open = bits.weekday >= 1 && bits.weekday <= 5 && bits.hour >= 8 && bits.hour < 18
    if (open) businessHours += 1
    else afterHours += 1
  }
  const dayMax = Math.max(...byDay)
  const hourMax = Math.max(...byHour)
  const busiest =
    missed.length === 0
      ? 'Not enough calls to pick a busiest day.'
      : `Busiest day is ${WEEKDAYS[byDay.indexOf(dayMax)]}. Busiest hour is ${hourLabel(byHour.indexOf(hourMax))}.`
  const inWindow = input.messages.filter((message) => {
    const time = Date.parse(message.at)
    return time >= bounds.start.getTime() && time < bounds.end.getTime()
  })
  const bookingLinks = inWindow.filter((message) => /https?:\/\//i.test(message.body) || /book/i.test(message.body)).length
  const languages = new Map<string, number>()
  for (const message of inWindow) {
    const name = message.language === 'es' ? 'Spanish' : message.language === 'en' ? 'English' : message.language || 'English'
    languages.set(name, (languages.get(name) || 0) + 1)
  }
  const booked = input.outcomes.filter((row) => row.outcome === 'booked' && Date.parse(row.at) >= bounds.start.getTime() && Date.parse(row.at) < bounds.end.getTime())
  const money =
    input.includeMoney && input.client.avgJobCents > 0
      ? moneyGrouped(Math.round((input.client.avgJobCents * booked.length) / 100))
      : null
  const fromLabel = shortDayLabel(input.from)
  const toLabel = shortDayLabel(input.to)
  const callWord = missed.length === 1 ? 'missed call' : 'missed calls'
  return {
    from: input.from,
    to: input.to,
    fromLabel,
    toLabel,
    missed: missed.length,
    texted: missed.length,
    leads,
    bookingLinks,
    bookingNote: inWindow.length ? '' : 'No text threads are on the board for this period, so booking links sent is 0.',
    afterHours,
    businessHours,
    hoursNote: 'Business hours here are Monday to Friday, 8 AM to 6 PM Central.',
    busiest,
    languages: [...languages.entries()].map(([language, count]) => ({ language, count })),
    languageNote: inWindow.length ? '' : 'No text threads are on the board for this period.',
    money,
    summary: `While you were out ${fromLabel} to ${toLabel}, Roger caught ${missed.length} ${callWord} and texted those callers back.`,
  }
}

function hourLabel(hour: number): string {
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const value = hour % 12 === 0 ? 12 : hour % 12
  return `${value} ${suffix}`
}

export function heatMap(calls: CallLog[]): { grid: number[][]; overnight: number; busiest: string } {
  const grid = Array.from({ length: 7 }, () => new Array(16).fill(0))
  let overnight = 0
  for (const call of calls) {
    if (call.outcome !== 'Missed' || !call.startedAt) continue
    const bits = chicagoBits(call.startedAt)
    if (!bits) continue
    if (bits.hour < 6 || bits.hour > 21) {
      overnight += 1
      continue
    }
    grid[bits.weekday][bits.hour - 6] += 1
  }
  let best = 0
  let day = 0
  let hour = 6
  grid.forEach((row, weekday) => {
    row.forEach((count, index) => {
      if (count > best) {
        best = count
        day = weekday
        hour = index + 6
      }
    })
  })
  return {
    grid,
    overnight,
    busiest: best ? `${WEEKDAYS[day]} at ${hourLabel(hour)}` : 'No missed calls yet',
  }
}

export function monthKey(date: Date): string {
  const { y, m } = chicagoYmd(date)
  return `${y}-${String(m).padStart(2, '0')}`
}

export function revenueSnapshot(clients: ClientRecord[], goal: number, now = new Date()) {
  const month = monthKey(now)
  const active = clients.filter((client) => client.monthlyStatus === 'active' && !client.example)
  const mrr = active.reduce((sum, client) => sum + planMonth(client), 0)
  const fresh = clients.filter((client) => !client.example && monthKey(new Date(client.createdAt)) === month).length
  const canceled = clients.filter((client) => !client.example && client.monthlyStatus === 'cancelled').length
  return { mrr, fresh, canceled, goal, active: active.length }
}

export function planMonth(client: ClientRecord): number {
  if (client.plan === 'elite') return 699
  if (client.plan === 'pro') return 499
  return 299
}

export function textCost(missed: number, client: ClientRecord) {
  const cents = missed * 2
  const planCents = planMonth(client) * 100
  return {
    texts: missed,
    cents,
    planCents,
    profitable: planCents > cents,
    example: true,
  }
}

export function cancellationWarnings(clients: ClientRecord[], calls: CallLog[], messages: ThreadMessage[], now = new Date()) {
  const rows: { id: string; name: string; reason: string; href: string }[] = []
  const end = now.getTime()
  const mid = end - 14 * 24 * 60 * 60 * 1000
  const start = mid - 14 * 24 * 60 * 60 * 1000
  for (const client of clients) {
    if (client.example) continue
    if (client.monthlyStatus === 'past_due') {
      rows.push({ id: `pay-${client.id}`, name: client.businessName, reason: 'Late payment', href: `/admin/customers/client/${client.id}` })
    }
    const mine = callsForClient(calls, client)
    const recent = missedIn(mine, mid, end).length
    const older = missedIn(mine, start, mid).length
    if (older >= 4 && recent * 2 < older) {
      rows.push({ id: `drop-${client.id}`, name: client.businessName, reason: 'Missed calls are dropping', href: `/admin/customers/client/${client.id}` })
    }
    const unopened = messages.filter((message) => message.clientId === client.id && message.direction === 'out' && !message.opened).length
    if (unopened > 0) {
      rows.push({ id: `open-${client.id}`, name: client.businessName, reason: `${unopened} alert${unopened === 1 ? '' : 's'} not opened`, href: `/admin/customers/client/${client.id}` })
    }
  }
  return rows
}

export function repeatCallers(clients: ClientRecord[], calls: CallLog[], now = new Date()) {
  const start = now.getTime() - 7 * 24 * 60 * 60 * 1000
  const rows: { id: string; name: string; caller: string; count: number; href: string }[] = []
  for (const client of clients) {
    const counts = new Map<string, { phone: string; count: number }>()
    for (const call of callsForClient(calls, client)) {
      if (!call.startedAt || Date.parse(call.startedAt) < start) continue
      const key = phoneKey(call.caller)
      if (key.length < 7) continue
      const row = counts.get(key) || { phone: call.caller, count: 0 }
      row.count += 1
      counts.set(key, row)
    }
    for (const [key, row] of counts) {
      if (row.count >= 3) {
        rows.push({
          id: `${client.id}-${key}`,
          name: client.businessName,
          caller: formatPhone(row.phone),
          count: row.count,
          href: `/admin/customers/client/${client.id}`,
        })
      }
    }
  }
  return rows
}

export function moneyCaught(client: ClientRecord, outcomes: LeadOutcome[]): { dollars: number; booked: number; ready: boolean } {
  const booked = outcomes.filter((row) => row.outcome === 'booked').length
  return {
    booked,
    dollars: Math.round((client.avgJobCents * booked) / 100),
    ready: client.avgJobCents > 0,
  }
}

export function nextChargeLabel(client: ClientRecord): string {
  if (client.nextChargeDate) return client.nextChargeDate
  if (!client.startDate) return 'No date yet'
  const parts = ymdDate(client.startDate)
  if (!parts) return 'No date yet'
  const next = parts.m === 12 ? { y: parts.y + 1, m: 1, d: parts.d } : { y: parts.y, m: parts.m + 1, d: parts.d }
  return `${next.y}-${String(next.m).padStart(2, '0')}-${String(Math.min(next.d, 28)).padStart(2, '0')}`
}
