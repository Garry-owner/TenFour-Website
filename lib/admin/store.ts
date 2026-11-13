import { desc, eq } from 'drizzle-orm'
import { auditLog, clients, glanceNotes, rogerSettings } from '@/db/schema'
import { getDb } from '@/db'
import { BoardError } from '@/lib/admin/guard'
import { FOUNDING_SEATS, PLANS } from '@/lib/admin/constants'
import { formatMonthChicago } from '@/lib/admin/format'
import { normalizeMonthly, phoneKey } from '@/lib/admin/policies'
import type {
  AuditEntry,
  ClientRecord,
  Feed,
  GlanceNote,
  PlanId,
  ReportBoard,
  RogerSettings,
} from '@/lib/admin/types'

type Database = ReturnType<typeof getDb>

const PLANS_SET = new Set<PlanId>(PLANS.map((plan) => plan.id))

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

function mapClient(row: typeof clients.$inferSelect): ClientRecord {
  const plan = isPlan(row.plan) ? row.plan : 'base'
  return {
    id: row.id,
    businessName: row.businessName,
    contactName: row.contactName,
    phone: row.phone,
    email: row.email,
    trade: row.trade,
    plan,
    setupPaid: row.setupPaid,
    monthlyStatus: normalizeMonthly(row.monthlyStatus),
    founding: row.founding,
    bookingLink: row.bookingLink,
    notes: row.notes,
    startDate: row.startDate,
    ownerCell: row.ownerCell,
    serviceArea: row.serviceArea,
    hours: row.hours,
    city: row.city,
    zohoContactId: row.zohoContactId,
    zohoDealId: row.zohoDealId,
    createdAt: iso(row.createdAt),
    updatedAt: iso(row.updatedAt),
  }
}

async function audit(
  db: Database,
  entry: { action: string; entityType: string; entityId: string; summary: string; before?: unknown; after?: unknown },
) {
  await db.insert(auditLog).values({
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    summary: entry.summary,
    before: entry.before ?? null,
    after: entry.after ?? null,
  })
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
  const monthlyStatus = typeof input.monthlyStatus === 'string' ? normalizeMonthly(input.monthlyStatus) : 'active'
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
  if (!partial || 'monthlyStatus' in input) next.monthlyStatus = monthlyStatus || 'active'
  if (!partial || 'founding' in input) next.founding = input.founding === true
  if (!partial || 'bookingLink' in input) next.bookingLink = bookingLink
  if (!partial || 'notes' in input) next.notes = typeof input.notes === 'string' ? input.notes.trim().slice(0, 2000) : ''
  if (!partial || 'startDate' in input) {
    const start = typeof input.startDate === 'string' ? input.startDate.trim() : ''
    next.startDate = /^\d{4}-\d{2}-\d{2}$/.test(start) ? start : null
  }
  if (!partial || 'ownerCell' in input) {
    next.ownerCell = typeof input.ownerCell === 'string' ? input.ownerCell.trim().slice(0, 30) : ''
  }
  if (!partial || 'serviceArea' in input) {
    next.serviceArea = typeof input.serviceArea === 'string' ? input.serviceArea.trim().slice(0, 200) : ''
  }
  if (!partial || 'hours' in input) next.hours = typeof input.hours === 'string' ? input.hours.trim().slice(0, 200) : ''
  if (!partial || 'city' in input) next.city = typeof input.city === 'string' ? input.city.trim().slice(0, 80) : ''
  if ('zohoContactId' in input) {
    const zoho = typeof input.zohoContactId === 'string' ? input.zohoContactId.trim() : ''
    next.zohoContactId = /^[0-9]{5,32}$/.test(zoho) ? zoho : null
  }
  if ('zohoDealId' in input) {
    const zoho = typeof input.zohoDealId === 'string' ? input.zohoDealId.trim() : ''
    next.zohoDealId = /^[0-9]{5,32}$/.test(zoho) ? zoho : null
  }
  return next
}

function clientValues(data: Partial<ClientRecord>) {
  return {
    businessName: data.businessName || '',
    contactName: data.contactName || '',
    phone: data.phone || '',
    email: data.email || '',
    trade: data.trade || '',
    plan: data.plan || 'base',
    setupPaid: Boolean(data.setupPaid),
    monthlyStatus: data.monthlyStatus || 'active',
    founding: Boolean(data.founding),
    bookingLink: data.bookingLink || '',
    notes: data.notes || '',
    startDate: data.startDate || null,
    ownerCell: data.ownerCell || '',
    serviceArea: data.serviceArea || '',
    hours: data.hours || '',
    city: data.city || '',
    updatedAt: new Date(),
    ...(data.zohoContactId !== undefined ? { zohoContactId: data.zohoContactId } : {}),
    ...(data.zohoDealId !== undefined ? { zohoDealId: data.zohoDealId } : {}),
  }
}

function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
}

export async function createClient(input: Record<string, unknown>): Promise<ClientRecord> {
  const data = cleanClient(input)
  return withDb(async (db) => {
    const [row] = await db.insert(clients).values(clientValues(data)).returning()
    const client = mapClient(row)
    await audit(db, {
      action: 'create',
      entityType: 'client',
      entityId: client.id,
      summary: `Added client ${client.businessName}`,
      after: client,
    })
    return client
  })
}

export async function updateClient(id: string, input: Record<string, unknown>): Promise<ClientRecord> {
  if (!isUuid(id)) throw new BoardError('That client is not on the private board.', 'input')
  const data = cleanClient(input)
  return withDb(async (db) => {
    const [previous] = await db.select().from(clients).where(eq(clients.id, id)).limit(1)
    if (!previous) throw new BoardError('That client is not on the private board.', 'input')
    const [row] = await db.update(clients).set(clientValues(data)).where(eq(clients.id, id)).returning()
    const client = mapClient(row)
    await audit(db, {
      action: 'update',
      entityType: 'client',
      entityId: id,
      summary: `Edited client ${client.businessName}`,
      before: mapClient(previous),
      after: client,
    })
    return client
  })
}

export async function deleteClient(id: string): Promise<void> {
  if (!isUuid(id)) throw new BoardError('That client is not on the private board.', 'input')
  await withDb(async (db) => {
    const [previous] = await db.select().from(clients).where(eq(clients.id, id)).limit(1)
    if (!previous) throw new BoardError('That client is not on the private board.', 'input')
    await db.delete(clients).where(eq(clients.id, id))
    await audit(db, {
      action: 'delete',
      entityType: 'client',
      entityId: id,
      summary: `Removed client ${previous.businessName}`,
      before: mapClient(previous),
    })
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
    const note = mapNote(row, names)
    await audit(db, {
      action: 'create',
      entityType: 'note',
      entityId: note.id,
      summary: 'Added a glance note',
      after: note,
    })
    return note
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
    const note = mapNote(row, names)
    await audit(db, {
      action: 'update',
      entityType: 'note',
      entityId: note.id,
      summary: 'Edited a glance note',
      after: note,
    })
    return note
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

function mapRoger(row: typeof rogerSettings.$inferSelect): RogerSettings {
  return {
    clientId: row.clientId,
    enabled: row.enabled,
    textBack: row.textBack,
    questions: row.questions,
    leadPhone: row.leadPhone,
    leadEmail: row.leadEmail,
    bookingLink: row.bookingLink,
    updatedAt: iso(row.updatedAt),
  }
}

export async function loadRoger(clientId: string): Promise<RogerSettings | null> {
  if (!isUuid(clientId)) return null
  try {
    return await withDb(async (db) => {
      const [row] = await db.select().from(rogerSettings).where(eq(rogerSettings.clientId, clientId)).limit(1)
      return row ? mapRoger(row) : null
    })
  } catch {
    return null
  }
}

export async function saveRoger(clientId: string, input: Record<string, unknown>): Promise<RogerSettings> {
  if (!isUuid(clientId)) throw new BoardError('That client is not on the private board.', 'input')
  const bookingLink = typeof input.bookingLink === 'string' ? input.bookingLink.trim().slice(0, 300) : ''
  if (bookingLink && !/^https?:\/\//i.test(bookingLink)) {
    throw new BoardError('A booking link needs to start with http:// or https://.', 'input')
  }
  const leadEmail = typeof input.leadEmail === 'string' ? input.leadEmail.trim().slice(0, 160) : ''
  if (leadEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
    throw new BoardError('That lead email does not look usable.', 'input')
  }
  const next = {
    enabled: input.enabled === true,
    textBack: typeof input.textBack === 'string' ? input.textBack.trim().slice(0, 1000) : '',
    questions: typeof input.questions === 'string' ? input.questions.trim().slice(0, 2000) : '',
    leadPhone: typeof input.leadPhone === 'string' ? input.leadPhone.trim().slice(0, 30) : '',
    leadEmail,
    bookingLink,
    updatedAt: new Date(),
  }
  return withDb(async (db) => {
    const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1)
    if (!client) throw new BoardError('That client is not on the private board.', 'input')
    const [previous] = await db.select().from(rogerSettings).where(eq(rogerSettings.clientId, clientId)).limit(1)
    const [row] = previous
      ? await db.update(rogerSettings).set(next).where(eq(rogerSettings.clientId, clientId)).returning()
      : await db.insert(rogerSettings).values({ clientId, ...next }).returning()
    const saved = mapRoger(row)
    await audit(db, {
      action: 'update',
      entityType: 'roger',
      entityId: clientId,
      summary: `Saved Roger settings for ${client.businessName}`,
      before: previous ? mapRoger(previous) : null,
      after: saved,
    })
    return saved
  })
}

export async function findClientByPhone(phone: string): Promise<ClientRecord | null> {
  const key = phoneKey(phone)
  if (key.length < 7) return null
  const feed = await loadClients()
  return (
    feed.items.find((client) => phoneKey(client.phone) === key || phoneKey(client.ownerCell) === key) || null
  )
}

export async function loadAudit(): Promise<Feed<AuditEntry>> {
  try {
    const items = await withDb(async (db) => {
      const rows = await db.select().from(auditLog).orderBy(desc(auditLog.at)).limit(80)
      return rows.map((row) => ({
        id: row.id,
        at: iso(row.at),
        action: row.action,
        entityType: row.entityType,
        entityId: row.entityId,
        summary: row.summary,
        before: row.before,
        after: row.after,
      }))
    })
    return { state: 'live', notice: null, items }
  } catch (err) {
    const message = err instanceof BoardError ? err.message : 'The activity log could not be read.'
    return { state: /not ready/i.test(message) ? 'offline' : 'error', notice: message, items: [] }
  }
}

export async function recordAudit(entry: {
  action: string
  entityType: string
  entityId: string
  summary: string
  before?: unknown
  after?: unknown
}) {
  await withDb(async (db) => {
    await audit(db, entry)
  })
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
