import { desc, eq } from 'drizzle-orm'
import { clients, glanceNotes } from '@/db/schema'
import { getDb } from '@/db'
import { BoardError } from '@/lib/admin/guard'
import { FOUNDING_SEATS, PLANS } from '@/lib/admin/constants'
import { formatMonthChicago } from '@/lib/admin/format'
import type {
  ClientRecord,
  Feed,
  GlanceNote,
  MonthlyStatus,
  PlanId,
  ReportBoard,
} from '@/lib/admin/types'

type Database = ReturnType<typeof getDb>

const PLANS_SET = new Set<PlanId>(PLANS.map((plan) => plan.id))
const STATUSES = new Set<MonthlyStatus>(['not_started', 'current', 'past_due', 'paused'])

function storeMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : ''
  if (/not been configured|NETLIFY_DB_URL|ECONNREFUSED|ENOTFOUND|getaddrinfo/i.test(raw)) {
    return 'The private store is not ready on this deploy.'
  }
  if (/does not exist|42P01|admin_clients|admin_glance_notes/i.test(raw)) {
    return 'The private store tables are not ready yet.'
  }
  return 'The private store could not be reached.'
}

async function withDb<T>(fn: (db: Database) => Promise<T>): Promise<T> {
  try {
    return await fn(getDb())
  } catch (err) {
    if (err instanceof BoardError) throw err
    throw new BoardError(storeMessage(err), 'store')
  }
}

function iso(value: Date | string | null): string {
  if (!value) return new Date().toISOString()
  if (value instanceof Date) return value.toISOString()
  const time = Date.parse(value)
  return Number.isNaN(time) ? new Date().toISOString() : new Date(time).toISOString()
}

function isPlan(value: string): value is PlanId {
  return PLANS_SET.has(value as PlanId)
}

function isStatus(value: string): value is MonthlyStatus {
  return STATUSES.has(value as MonthlyStatus)
}

function mapClient(row: typeof clients.$inferSelect): ClientRecord {
  const plan = isPlan(row.plan) ? row.plan : 'base'
  const monthlyStatus = isStatus(row.monthlyStatus) ? row.monthlyStatus : 'not_started'
  return {
    id: row.id,
    businessName: row.businessName,
    contactName: row.contactName,
    phone: row.phone,
    email: row.email,
    trade: row.trade,
    plan,
    setupPaid: row.setupPaid,
    monthlyStatus,
    founding: row.founding,
    bookingLink: row.bookingLink,
    notes: row.notes,
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  }
}

function mapNote(
  row: typeof glanceNotes.$inferSelect,
  names: Map<string, string>,
): GlanceNote {
  return {
    id: row.id,
    body: row.body,
    leadId: row.leadId,
    leadLabel: row.leadLabel,
    clientId: row.clientId,
    clientLabel: (row.clientId && names.get(row.clientId)) || row.clientLabel,
    callSid: row.callSid,
    callLabel: row.callLabel,
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  }
}

export async function loadClients(): Promise<Feed<ClientRecord>> {
  try {
    const items = await withDb(async (db) => {
      const rows = await db.select().from(clients).orderBy(desc(clients.createdAt))
      return rows.map(mapClient)
    })
    return { state: 'live', notice: null, items }
  } catch (err) {
    const message = err instanceof BoardError ? err.message : 'The private store could not be reached.'
    const offline = /not ready/i.test(message)
    return { state: offline ? 'offline' : 'error', notice: message, items: [] }
  }
}

function cleanClient(input: Record<string, unknown>, partial = false): Partial<ClientRecord> & { businessName?: string } {
  const businessName = typeof input.businessName === 'string' ? input.businessName.trim().slice(0, 120) : ''
  if (!partial && !businessName) throw new BoardError('A client needs a business name.', 'input')
  const plan = typeof input.plan === 'string' ? input.plan : ''
  if (!partial && !isPlan(plan)) throw new BoardError('Plan has to be Base, Pro, or Elite.', 'input')
  if (plan && !isPlan(plan)) throw new BoardError('Plan has to be Base, Pro, or Elite.', 'input')
  const monthlyStatus = typeof input.monthlyStatus === 'string' ? input.monthlyStatus : ''
  if (monthlyStatus && !isStatus(monthlyStatus)) throw new BoardError('That monthly status is not on the board.', 'input')
  const email = typeof input.email === 'string' ? input.email.trim().slice(0, 160) : ''
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new BoardError('That email does not look usable.', 'input')
  }
  const bookingLink = typeof input.bookingLink === 'string' ? input.bookingLink.trim().slice(0, 300) : ''
  if (bookingLink && !/^https?:\/\//i.test(bookingLink)) {
    throw new BoardError('A booking link needs to start with http:// or https://.', 'input')
  }
  const next: Record<string, unknown> = {}
  if (!partial || 'businessName' in input) next.businessName = businessName
  if (!partial || 'contactName' in input) {
    next.contactName = typeof input.contactName === 'string' ? input.contactName.trim().slice(0, 120) : ''
  }
  if (!partial || 'phone' in input) next.phone = typeof input.phone === 'string' ? input.phone.trim().slice(0, 30) : ''
  if (!partial || 'email' in input) next.email = email
  if (!partial || 'trade' in input) next.trade = typeof input.trade === 'string' ? input.trade.trim().slice(0, 80) : ''
  if (!partial || 'plan' in input) next.plan = plan
  if (!partial || 'setupPaid' in input) next.setupPaid = input.setupPaid === true
  if (!partial || 'monthlyStatus' in input) next.monthlyStatus = monthlyStatus || 'not_started'
  if (!partial || 'founding' in input) next.founding = input.founding === true
  if (!partial || 'bookingLink' in input) next.bookingLink = bookingLink
  if (!partial || 'notes' in input) next.notes = typeof input.notes === 'string' ? input.notes.trim().slice(0, 2000) : ''
  return next
}

function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
}

export async function createClient(input: Record<string, unknown>): Promise<ClientRecord> {
  const data = cleanClient(input)
  return withDb(async (db) => {
    const [row] = await db
      .insert(clients)
      .values({
        businessName: data.businessName || '',
        contactName: data.contactName || '',
        phone: data.phone || '',
        email: data.email || '',
        trade: data.trade || '',
        plan: data.plan || 'base',
        setupPaid: Boolean(data.setupPaid),
        monthlyStatus: data.monthlyStatus || 'not_started',
        founding: Boolean(data.founding),
        bookingLink: data.bookingLink || '',
        notes: data.notes || '',
        updatedAt: new Date(),
      })
      .returning()
    return mapClient(row)
  })
}

export async function updateClient(id: string, input: Record<string, unknown>): Promise<ClientRecord> {
  if (!isUuid(id)) throw new BoardError('That client is not on the private board.', 'input')
  const data = cleanClient(input)
  return withDb(async (db) => {
    const [row] = await db
      .update(clients)
      .set({
        businessName: data.businessName || '',
        contactName: data.contactName || '',
        phone: data.phone || '',
        email: data.email || '',
        trade: data.trade || '',
        plan: data.plan || 'base',
        setupPaid: Boolean(data.setupPaid),
        monthlyStatus: data.monthlyStatus || 'not_started',
        founding: Boolean(data.founding),
        bookingLink: data.bookingLink || '',
        notes: data.notes || '',
        updatedAt: new Date(),
      })
      .where(eq(clients.id, id))
      .returning()
    if (!row) throw new BoardError('That client is not on the private board.', 'input')
    return mapClient(row)
  })
}

export async function deleteClient(id: string): Promise<void> {
  if (!isUuid(id)) throw new BoardError('That client is not on the private board.', 'input')
  await withDb(async (db) => {
    const rows = await db.delete(clients).where(eq(clients.id, id)).returning({ id: clients.id })
    if (!rows.length) throw new BoardError('That client is not on the private board.', 'input')
  })
}

function tie(value: unknown, pattern: RegExp): string | null {
  if (typeof value !== 'string' || !value.trim()) return null
  const trimmed = value.trim()
  if (!pattern.test(trimmed)) throw new BoardError('That tie is not a record on the board.', 'input')
  return trimmed
}

function label(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim().slice(0, 160)
  return trimmed || null
}

async function noteNames(db: Database): Promise<Map<string, string>> {
  const rows = await db.select({ id: clients.id, businessName: clients.businessName }).from(clients)
  return new Map(rows.map((row) => [row.id, row.businessName]))
}

export async function loadNotes(): Promise<Feed<GlanceNote>> {
  try {
    const items = await withDb(async (db) => {
      const names = await noteNames(db)
      const rows = await db.select().from(glanceNotes).orderBy(desc(glanceNotes.createdAt))
      return rows.map((row) => mapNote(row, names))
    })
    return { state: 'live', notice: null, items }
  } catch (err) {
    const message = err instanceof BoardError ? err.message : 'The private store could not be reached.'
    const offline = /not ready/i.test(message)
    return { state: offline ? 'offline' : 'error', notice: message, items: [] }
  }
}

export async function createNote(input: Record<string, unknown>): Promise<GlanceNote> {
  const body = typeof input.body === 'string' ? input.body.trim() : ''
  if (!body) throw new BoardError('Write something before logging it.', 'input')
  if (body.length > 2000) throw new BoardError('That note is too long.', 'input')
  const leadId = tie(input.leadId, /^[A-Za-z0-9_-]{1,40}$/)
  const callSid = tie(input.callSid, /^[A-Za-z0-9]{10,64}$/)
  const clientId = tie(input.clientId, /^[0-9a-f-]{36}$/i)
  return withDb(async (db) => {
    let clientLabel = label(input.clientLabel)
    if (clientId) {
      const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1)
      if (!client) throw new BoardError('That client is not on the private board.', 'input')
      clientLabel = client.businessName
    }
    const [row] = await db
      .insert(glanceNotes)
      .values({
        body,
        leadId,
        leadLabel: label(input.leadLabel),
        clientId,
        clientLabel,
        callSid,
        callLabel: label(input.callLabel),
        updatedAt: new Date(),
      })
      .returning()
    const names = await noteNames(db)
    return mapNote(row, names)
  })
}

export async function updateNote(id: string, input: Record<string, unknown>): Promise<GlanceNote> {
  if (!isUuid(id)) throw new BoardError('That note is not on the board.', 'input')
  const body = typeof input.body === 'string' ? input.body.trim() : ''
  if (!body) throw new BoardError('Write something before logging it.', 'input')
  if (body.length > 2000) throw new BoardError('That note is too long.', 'input')
  const leadId = tie(input.leadId, /^[A-Za-z0-9_-]{1,40}$/)
  const callSid = tie(input.callSid, /^[A-Za-z0-9]{10,64}$/)
  const clientId = tie(input.clientId, /^[0-9a-f-]{36}$/i)
  return withDb(async (db) => {
    let clientLabel = label(input.clientLabel)
    if (clientId) {
      const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1)
      if (!client) throw new BoardError('That client is not on the private board.', 'input')
      clientLabel = client.businessName
    }
    const [row] = await db
      .update(glanceNotes)
      .set({
        body,
        leadId,
        leadLabel: label(input.leadLabel),
        clientId,
        clientLabel,
        callSid,
        callLabel: label(input.callLabel),
        updatedAt: new Date(),
      })
      .where(eq(glanceNotes.id, id))
      .returning()
    if (!row) throw new BoardError('That note is not on the board.', 'input')
    const names = await noteNames(db)
    return mapNote(row, names)
  })
}

export async function deleteNote(id: string): Promise<void> {
  if (!isUuid(id)) throw new BoardError('That note is not on the board.', 'input')
  await withDb(async (db) => {
    const rows = await db.delete(glanceNotes).where(eq(glanceNotes.id, id)).returning({ id: glanceNotes.id })
    if (!rows.length) throw new BoardError('That note is not on the board.', 'input')
  })
}

export async function loadReport(): Promise<ReportBoard> {
  const monthLabel = formatMonthChicago(new Date())
  const clientsFeed = await loadClients()
  if (clientsFeed.state !== 'live') {
    return {
      monthLabel,
      store: clientsFeed.state,
      notice: clientsFeed.notice,
      rows: [],
      counting: false,
    }
  }
  if (clientsFeed.items.length === 0) {
    return {
      monthLabel,
      store: 'live',
      notice: 'No clients yet, so there is nothing to count. Roger is not saving leads.',
      rows: [],
      counting: false,
    }
  }
  return {
    monthLabel,
    store: 'live',
    notice: 'Roger is not saving leads yet, so this month has no saved-lead counts.',
    rows: clientsFeed.items.map((client) => ({
      id: client.id,
      businessName: client.businessName,
      plan: client.plan,
      founding: client.founding,
      savedLeads: null,
    })),
    counting: false,
  }
}

export async function storeLamp(): Promise<{ state: 'ready' | 'missing' | 'fault'; detail: string }> {
  const feed = await loadClients()
  if (feed.state === 'live') {
    const founding = feed.items.filter((client) => client.founding).length
    return { state: 'ready', detail: `Private store is up. Founding seats marked: ${founding} of ${FOUNDING_SEATS}.` }
  }
  if (feed.state === 'offline') return { state: 'missing', detail: feed.notice || 'The private store is not ready.' }
  return { state: 'fault', detail: feed.notice || 'The private store could not be reached.' }
}
