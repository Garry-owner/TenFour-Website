import { createHash } from 'node:crypto'
import { desc, eq } from 'drizzle-orm'
import { boardSettings, blocks, clients, holidays, messages, optOuts, outcomes, rogerSettings, threadHolds } from '@/db/schema'
import { getDb } from '@/db'
import { DEFAULT_ALERTS, DEFAULT_GATES, mergeAlerts, mergeGates } from '@/lib/admin/gates'
import { BoardError } from '@/lib/admin/guard'
import { phoneKey } from '@/lib/admin/policies'
import type { AlertPrefs, BlockedNumber, Holiday, LeadOutcome, OptOut, PlanGates, ThreadHold, ThreadMessage } from '@/lib/admin/types'

// About 15 Pro clients. Change it any time on the Revenue page.
const DEFAULT_QUIT_GOAL = 7500

type Database = ReturnType<typeof getDb>

function iso(value: Date | string | null): string {
  if (!value) return new Date().toISOString()
  if (value instanceof Date) return value.toISOString()
  const time = Date.parse(value)
  return Number.isNaN(time) ? new Date().toISOString() : new Date(time).toISOString()
}

async function withDb<T>(fn: (db: Database) => Promise<T>): Promise<T> {
  try {
    return await fn(getDb())
  } catch (err) {
    if (err instanceof BoardError) throw err
    const raw = err instanceof Error ? err.message : ''
    if (/not been configured|NETLIFY_DB_URL|ECONNREFUSED|does not exist|42P01/i.test(raw)) {
      throw new BoardError('The private store is not ready on this deploy.', 'store')
    }
    throw new BoardError('The private store could not be reached.', 'store')
  }
}

export function hashPortalCode(code: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'tenfour-portal'
  return createHash('sha256').update(`${secret}:${code}`).digest('hex')
}

export type BoardConfig = {
  quitGoal: number
  gates: PlanGates
  alerts: AlertPrefs
  closedMessage: string
  live: boolean
}

export async function loadBoardConfig(): Promise<BoardConfig> {
  try {
    return await withDb(async (db) => {
      const [row] = await db.select().from(boardSettings).where(eq(boardSettings.id, 'board')).limit(1)
      if (!row) {
        return { quitGoal: DEFAULT_QUIT_GOAL, gates: DEFAULT_GATES, alerts: DEFAULT_ALERTS, closedMessage: '', live: true }
      }
      return {
        quitGoal: row.quitGoal || DEFAULT_QUIT_GOAL,
        gates: mergeGates(row.gates),
        alerts: mergeAlerts(row.alertPrefs),
        closedMessage: row.closedMessage,
        live: true,
      }
    })
  } catch {
    return { quitGoal: DEFAULT_QUIT_GOAL, gates: DEFAULT_GATES, alerts: DEFAULT_ALERTS, closedMessage: '', live: false }
  }
}

export async function saveBoardConfig(input: Partial<BoardConfig>): Promise<void> {
  const current = await loadBoardConfig()
  if (!current.live) throw new BoardError('The private store is not ready. Nothing was saved.', 'store')
  const next = {
    id: 'board',
    quitGoal: input.quitGoal ?? current.quitGoal,
    gates: input.gates ?? current.gates,
    alertPrefs: input.alerts ?? current.alerts,
    closedMessage: input.closedMessage ?? current.closedMessage,
    updatedAt: new Date(),
  }
  await withDb(async (db) => {
    const [row] = await db.select().from(boardSettings).where(eq(boardSettings.id, 'board')).limit(1)
    if (row) await db.update(boardSettings).set(next).where(eq(boardSettings.id, 'board'))
    else await db.insert(boardSettings).values(next)
  })
}

export async function listBlocks(clientId: string): Promise<BlockedNumber[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(blocks).where(eq(blocks.clientId, clientId)).orderBy(desc(blocks.createdAt))
    return rows.map((row) => ({
      id: row.id,
      clientId: row.clientId,
      phone: row.phone,
      reason: row.reason,
      createdAt: iso(row.createdAt),
    }))
  })
}

export async function addBlock(clientId: string, phone: string, reason: string): Promise<void> {
  await withDb(async (db) => {
    await db.insert(blocks).values({ clientId, phone: phone.slice(0, 30), reason: reason.slice(0, 160) })
  })
}

export async function removeBlock(id: string): Promise<void> {
  await withDb(async (db) => {
    await db.delete(blocks).where(eq(blocks.id, id))
  })
}

export async function listOptOuts(clientId: string): Promise<OptOut[]> {
  try {
    return await withDb(async (db) => {
      const rows = await db.select().from(optOuts).where(eq(optOuts.clientId, clientId)).orderBy(desc(optOuts.at))
      return rows.map((row) => ({ id: row.id, clientId: row.clientId, phone: row.phone, source: row.source, at: iso(row.at) }))
    })
  } catch {
    return []
  }
}

export async function listMessages(clientId?: string): Promise<ThreadMessage[]> {
  try {
    return await withDb(async (db) => {
      const rows = clientId
        ? await db.select().from(messages).where(eq(messages.clientId, clientId)).orderBy(desc(messages.at))
        : await db.select().from(messages).orderBy(desc(messages.at)).limit(200)
      return rows.map(mapMessage)
    })
  } catch {
    return []
  }
}

function mapMessage(row: typeof messages.$inferSelect): ThreadMessage {
  return {
    id: row.id,
    clientId: row.clientId,
    caller: row.caller,
    direction: row.direction === 'out' ? 'out' : 'in',
    body: row.body,
    bodyEn: row.bodyEn,
    language: row.language,
    reviewStatus: row.reviewStatus,
    opened: row.opened,
    at: iso(row.at),
  }
}

export async function saveMessage(input: {
  clientId: string
  caller: string
  body: string
  bodyEn?: string
  language?: string
}): Promise<void> {
  await withDb(async (db) => {
    await db.insert(messages).values({
      clientId: input.clientId,
      caller: input.caller.slice(0, 30),
      direction: 'out',
      body: input.body.slice(0, 1000),
      bodyEn: (input.bodyEn || input.body).slice(0, 1000),
      language: input.language || 'en',
      reviewStatus: 'none',
      opened: true,
    })
  })
}

export async function setReview(id: string, status: 'approved' | 'fixed', bodyEn?: string): Promise<void> {
  await withDb(async (db) => {
    await db
      .update(messages)
      .set({ reviewStatus: status, ...(bodyEn ? { bodyEn: bodyEn.slice(0, 1000) } : {}) })
      .where(eq(messages.id, id))
  })
}

export async function listHolidays(): Promise<Holiday[]> {
  try {
    return await withDb(async (db) => {
      const rows = await db.select().from(holidays)
      return rows.map((row) => ({ id: row.id, clientId: row.clientId, onDate: row.onDate, label: row.label }))
    })
  } catch {
    return []
  }
}

export async function addHoliday(clientId: string, onDate: string, label: string): Promise<void> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(onDate)) throw new BoardError('Use a real date.', 'input')
  await withDb(async (db) => {
    await db.insert(holidays).values({ clientId, onDate, label: label.slice(0, 80) })
  })
}

export async function removeHoliday(id: string): Promise<void> {
  await withDb(async (db) => {
    await db.delete(holidays).where(eq(holidays.id, id))
  })
}

export async function listOutcomes(clientId?: string): Promise<LeadOutcome[]> {
  try {
    return await withDb(async (db) => {
      const rows = clientId
        ? await db.select().from(outcomes).where(eq(outcomes.clientId, clientId)).orderBy(desc(outcomes.at))
        : await db.select().from(outcomes).orderBy(desc(outcomes.at)).limit(200)
      return rows.map((row) => ({
        id: row.id,
        clientId: row.clientId,
        caller: row.caller,
        leadId: row.leadId,
        outcome: row.outcome === 'lost' ? 'lost' : 'booked',
        at: iso(row.at),
      }))
    })
  } catch {
    return []
  }
}

export async function setOutcome(input: { clientId: string; caller: string; leadId?: string; outcome: 'booked' | 'lost' }): Promise<void> {
  await withDb(async (db) => {
    await db.insert(outcomes).values({
      clientId: input.clientId,
      caller: input.caller.slice(0, 40),
      leadId: (input.leadId || '').slice(0, 40),
      outcome: input.outcome,
    })
  })
}

export async function listHolds(clientId?: string): Promise<ThreadHold[]> {
  try {
    return await withDb(async (db) => {
      const rows = clientId
        ? await db.select().from(threadHolds).where(eq(threadHolds.clientId, clientId))
        : await db.select().from(threadHolds).limit(200)
      return rows.map((row) => ({ id: row.id, clientId: row.clientId, caller: row.caller, at: iso(row.at) }))
    })
  } catch {
    return []
  }
}

export async function patchClientFields(id: string, input: Record<string, unknown>): Promise<void> {
  const next: Record<string, unknown> = { updatedAt: new Date() }
  for (const key of ['onboardForm', 'onboardNumber', 'onboardA2p', 'onboardTest', 'onboardLive', 'onboardStuck'] as const) {
    if (typeof input[key] === 'boolean') next[key] = input[key]
  }
  if (typeof input.nextChargeDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input.nextChargeDate)) next.nextChargeDate = input.nextChargeDate
  if (typeof input.avgJobCents === 'number' && input.avgJobCents >= 0 && input.avgJobCents < 10_000_000) next.avgJobCents = Math.round(input.avgJobCents)
  if (typeof input.referredBy === 'string') next.referredBy = input.referredBy.trim().slice(0, 120)
  if (typeof input.referralCredit === 'string') next.referralCredit = input.referralCredit.trim().slice(0, 80)
  if (typeof input.reviewUrl === 'string') {
    const url = input.reviewUrl.trim().slice(0, 300)
    if (url && !/^https?:\/\//i.test(url)) throw new BoardError('A review link needs to start with http:// or https://.', 'input')
    next.reviewUrl = url
  }
  if (typeof input.portalCode === 'string' && input.portalCode.trim()) {
    next.portalCodeHash = hashPortalCode(input.portalCode.trim())
  }
  if (typeof input.hours === 'string') next.hours = input.hours.trim().slice(0, 200)
  if (typeof input.bookingLink === 'string') {
    const link = input.bookingLink.trim().slice(0, 300)
    if (link && !/^https?:\/\//i.test(link)) throw new BoardError('A booking link needs to start with http:// or https://.', 'input')
    next.bookingLink = link
  }
  await withDb(async (db) => {
    await db.update(clients).set(next).where(eq(clients.id, id))
  })
}

export async function setRogerPause(clientId: string, enabled: boolean, pausedUntil: string | null): Promise<void> {
  await withDb(async (db) => {
    const [row] = await db.select().from(rogerSettings).where(eq(rogerSettings.clientId, clientId)).limit(1)
    const next = { enabled, pausedUntil, updatedAt: new Date() }
    if (row) await db.update(rogerSettings).set(next).where(eq(rogerSettings.clientId, clientId))
    else {
      await db.insert(rogerSettings).values({
        clientId,
        enabled,
        pausedUntil,
        textBack: '',
        questions: '',
        leadPhone: '',
        leadEmail: '',
        bookingLink: '',
        alertLanguage: 'en',
        closedMessage: '',
        updatedAt: new Date(),
      })
    }
  })
}

export async function setClosedMessage(clientId: string, closedMessage: string): Promise<void> {
  await withDb(async (db) => {
    const [row] = await db.select().from(rogerSettings).where(eq(rogerSettings.clientId, clientId)).limit(1)
    if (!row) throw new BoardError('Save Roger once before adding a closed message.', 'input')
    await db.update(rogerSettings).set({ closedMessage: closedMessage.slice(0, 500), updatedAt: new Date() }).where(eq(rogerSettings.clientId, clientId))
  })
}

export async function matchPortal(phone: string, code: string): Promise<string | null> {
  const hashed = hashPortalCode(code)
  return withDb(async (db) => {
    const rows = await db.select({
      id: clients.id,
      phone: clients.phone,
      ownerCell: clients.ownerCell,
      hash: clients.portalCodeHash,
    }).from(clients)
    const key = phoneKey(phone)
    const row = rows.find((item) => phoneKey(item.phone) === key || phoneKey(item.ownerCell) === key)
    if (!row?.hash || row.hash !== hashed) return null
    return row.id
  })
}

export async function holdThread(clientId: string, caller: string): Promise<void> {
  await withDb(async (db) => {
    await db.insert(threadHolds).values({ clientId, caller: caller.slice(0, 30) })
  })
}
