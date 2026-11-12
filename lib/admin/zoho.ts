import { EXAMPLE_LEAD_NOTICE } from '@/lib/admin/constants'
import { exampleLeads } from '@/lib/admin/examples'
import { BoardError, fetchTimeout } from '@/lib/admin/guard'
import { shapeLead, sortLeads, stageChoices, type DealInput, type LeadInput } from '@/lib/admin/shape'
import type { LeadBoard, LeadDetail, StageChoice, TestFieldValue, ZohoNote } from '@/lib/admin/types'

// Website signups are Zoho Contacts plus Deals, written by Make scenario 3767837.
// Consent is stored in Skype_ID ("Form_Opt_In" or "No_SMS_Consent").
// The form's timezone is stored in Fax (Eastern, Central, Mountain, Pacific).
// The visitor's message is the Deal description, not the Contact description.

const CONTACT_FIELDS = [
  'First_Name',
  'Last_Name',
  'Email',
  'Phone',
  'Fax',
  'Skype_ID',
  'Title',
  'Description',
  'Lead_Source',
  'Created_Time',
]
const DEAL_FIELDS = [
  'Deal_Name',
  'Stage',
  'Description',
  'Lead_Source',
  'Contact_Name',
  'Created_Time',
]
const TRADE_KEYS = ['Trade', 'Trade_Type', 'Service', 'Service_Type']

type FieldMeta = {
  apiName: string
  label: string
  dataType: string
  picklist: string[]
}

type Auth = { token: string; apiDomain: string; exp: number }

let authCache: Auth | null = null
let authInflight: Promise<Auth> | null = null
let fieldCache: { at: number; contacts: FieldMeta[]; deals: FieldMeta[] } | null = null

export function zohoConfigured(): boolean {
  return Boolean(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN)
}

function accountsUrl(): string {
  const host = (process.env.ZOHO_ACCOUNTS_DOMAIN || 'accounts.zoho.com').replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  if (!/^(accounts|www)\.zoho\.(com|eu|in|com\.au|jp)$/.test(host) && host !== 'accounts.zohocloud.ca') {
    throw new BoardError('ZOHO_ACCOUNTS_DOMAIN is not a Zoho accounts host.', 'zoho')
  }
  return `https://${host}/oauth/v2/token`
}

function safeApiDomain(value: string): string {
  let url: URL
  try {
    url = new URL(value.startsWith('http') ? value : `https://${value}`)
  } catch {
    throw new BoardError('Zoho did not return an API host.', 'zoho')
  }
  const host = url.hostname
  const ok =
    /^([a-z0-9-]+\.)*zohoapis\.(com|eu|in|com\.au|jp)$/.test(host) || host.endsWith('.zohocloud.ca')
  if (url.protocol !== 'https:' || !ok) {
    throw new BoardError('Zoho did not return an API host.', 'zoho')
  }
  return url.origin
}

async function refresh(): Promise<Auth> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: process.env.ZOHO_CLIENT_ID || '',
    client_secret: process.env.ZOHO_CLIENT_SECRET || '',
    refresh_token: process.env.ZOHO_REFRESH_TOKEN || '',
  })
  let response: Response
  try {
    response = await fetchTimeout(accountsUrl(), { method: 'POST', body })
  } catch {
    throw new BoardError('Zoho could not be reached.', 'zoho')
  }
  const json = (await response.json().catch(() => null)) as { access_token?: string; expires_in?: number; api_domain?: string } | null
  if (!response.ok || !json?.access_token) {
    throw new BoardError('Zoho did not accept the credentials on this deploy.', 'zoho')
  }
  const domain = process.env.ZOHO_API_DOMAIN || json.api_domain || 'https://www.zohoapis.com'
  return {
    token: json.access_token,
    apiDomain: safeApiDomain(domain),
    exp: Date.now() + (json.expires_in || 3600) * 1000,
  }
}

async function getAuth(): Promise<Auth> {
  if (authCache && authCache.exp > Date.now() + 15_000) return authCache
  if (!authInflight) {
    authInflight = refresh()
      .then((auth) => {
        authCache = auth
        return auth
      })
      .finally(() => {
        authInflight = null
      })
  }
  return authInflight
}

function zohoMessage(json: unknown): string | null {
  if (!json || typeof json !== 'object') return null
  const record = json as Record<string, unknown>
  const direct = typeof record.message === 'string' ? record.message : ''
  const row = Array.isArray(record.data) ? (record.data[0] as Record<string, unknown> | undefined) : undefined
  const nested = row && typeof row.message === 'string' ? row.message : ''
  const message = (direct || nested).trim()
  if (!message || /token|secret|refresh|client_id|api_key/i.test(message)) return null
  return message.slice(0, 180)
}

async function zohoSend(path: string, method = 'GET', body?: unknown): Promise<Record<string, unknown>> {
  const auth = await getAuth()
  let response: Response
  try {
    response = await fetchTimeout(`${auth.apiDomain}/crm/v2${path}`, {
      method,
      headers: {
        Authorization: `Zoho-oauthtoken ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new BoardError('Zoho could not be reached.', 'zoho')
  }
  if (response.status === 204) return { data: [] }
  const json = (await response.json().catch(() => null)) as Record<string, unknown> | null
  if (!response.ok) {
    throw new BoardError(zohoMessage(json) || 'Zoho refused the request.', 'zoho')
  }
  const row = Array.isArray(json?.data) ? (json?.data[0] as Record<string, unknown> | undefined) : undefined
  if (row?.status === 'error') {
    throw new BoardError(zohoMessage(row) || 'Zoho refused the change.', 'zoho')
  }
  return json || {}
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function iso(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null
  const time = Date.parse(value)
  return Number.isNaN(time) ? null : new Date(time).toISOString()
}

function safeApiName(name: string): boolean {
  return /^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(name)
}

function parseFields(json: Record<string, unknown>): FieldMeta[] {
  const data = Array.isArray(json.data) ? json.data : []
  return data.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const field = item as Record<string, unknown>
    const apiName = str(field.api_name)
    if (!safeApiName(apiName)) return []
    const picklist = Array.isArray(field.pick_list_values)
      ? field.pick_list_values.flatMap((entry) => {
          if (!entry || typeof entry !== 'object') return []
          const row = entry as Record<string, unknown>
          const value = str(row.actual_value) || str(row.display_value)
          return value ? [value] : []
        })
      : []
    return [
      {
        apiName,
        label: str(field.field_label) || apiName,
        dataType: str(field.data_type),
        picklist,
      },
    ]
  })
}

async function fields(): Promise<{ contacts: FieldMeta[]; deals: FieldMeta[] }> {
  if (fieldCache && Date.now() - fieldCache.at < 10 * 60 * 1000) {
    return fieldCache
  }
  try {
    const [contacts, deals] = await Promise.all([
      zohoSend('/settings/fields?module=Contacts'),
      zohoSend('/settings/fields?module=Deals'),
    ])
    fieldCache = { at: Date.now(), contacts: parseFields(contacts), deals: parseFields(deals) }
    return fieldCache
  } catch {
    return { contacts: [], deals: [] }
  }
}

function findTestField(list: FieldMeta[]): FieldMeta | null {
  const matches = list.filter((field) => /test/i.test(field.label) || /test/i.test(field.apiName))
  return matches.find((field) => field.dataType === 'boolean') || matches.find((field) => field.dataType === 'picklist') || null
}

function testValue(record: Record<string, unknown>, field: FieldMeta | null): TestFieldValue | null {
  if (!field) return null
  const raw = record[field.apiName]
  let value = false
  if (typeof raw === 'boolean') value = raw
  else if (typeof raw === 'string') value = /^(yes|true|test)$/i.test(raw.trim())
  return { apiName: field.apiName, label: field.label, value }
}

function tradeOf(record: Record<string, unknown>, list: FieldMeta[]): string | null {
  const named = list.find((field) => /^trade$/i.test(field.label) || TRADE_KEYS.includes(field.apiName))
  const keys = named ? [named.apiName] : TRADE_KEYS
  for (const key of keys) {
    const value = str(record[key])
    if (value) return value
  }
  return null
}

function contactIdOf(deal: Record<string, unknown>): string | null {
  const contact = deal.Contact_Name
  if (contact && typeof contact === 'object' && 'id' in contact) {
    const id = str((contact as { id?: unknown }).id)
    return id || null
  }
  return null
}

async function listAll(module: string, fieldList: string[]): Promise<Record<string, unknown>[]> {
  const rows: Record<string, unknown>[] = []
  for (let page = 1; page <= 5; page++) {
    const query = new URLSearchParams({
      page: String(page),
      per_page: '200',
      sort_by: 'Created_Time',
      sort_order: 'desc',
      fields: fieldList.join(','),
    })
    const json = await zohoSend(`/${module}?${query}`)
    const data = Array.isArray(json.data) ? (json.data as Record<string, unknown>[]) : []
    rows.push(...data)
    const info = json.info as { more_records?: boolean } | undefined
    if (!info?.more_records) break
  }
  return rows
}

function toDealInput(deal: Record<string, unknown>): DealInput {
  return {
    id: str(deal.id),
    name: str(deal.Deal_Name) || 'Untitled deal',
    stage: str(deal.Stage),
    source: str(deal.Lead_Source),
    createdAt: iso(deal.Created_Time),
    description: str(deal.Description),
  }
}

function toLeadInput(
  contact: Record<string, unknown>,
  deals: DealInput[],
  meta: FieldMeta[],
  testField: FieldMeta | null,
): LeadInput {
  return {
    id: str(contact.id),
    firstName: str(contact.First_Name),
    lastName: str(contact.Last_Name),
    email: str(contact.Email),
    phone: str(contact.Phone),
    fax: str(contact.Fax),
    skypeId: str(contact.Skype_ID),
    title: str(contact.Title),
    contactDescription: str(contact.Description),
    source: str(contact.Lead_Source),
    createdAt: iso(contact.Created_Time),
    trade: tradeOf(contact, meta),
    testField: testValue(contact, testField),
    deals: deals.filter((deal) => deal.id),
  }
}

function stageMeta(dealFields: FieldMeta[]): { stages: StageChoice[]; picklistKnown: boolean } {
  const stage = dealFields.find((field) => field.apiName === 'Stage')
  const picklist = stage?.picklist || []
  return { stages: stageChoices(picklist), picklistKnown: picklist.length > 0 }
}

export async function loadLeads(): Promise<LeadBoard> {
  if (!zohoConfigured()) {
    return {
      feed: { state: 'example', notice: EXAMPLE_LEAD_NOTICE, items: exampleLeads() },
      stages: stageChoices([]),
      picklistKnown: false,
      testField: null,
    }
  }
  try {
    const meta = await fields()
    const testField = findTestField(meta.contacts)
    const contactFields = testField ? [...CONTACT_FIELDS, testField.apiName] : CONTACT_FIELDS
    const [contacts, deals] = await Promise.all([
      listAll('Contacts', contactFields),
      listAll('Deals', DEAL_FIELDS),
    ])
    const byContact = new Map<string, DealInput[]>()
    for (const deal of deals) {
      const contactId = contactIdOf(deal)
      if (!contactId) continue
      const list = byContact.get(contactId) || []
      list.push(toDealInput(deal))
      byContact.set(contactId, list)
    }
    const items = sortLeads(
      contacts
        .filter((contact) => str(contact.id))
        .map((contact) =>
          shapeLead(toLeadInput(contact, byContact.get(str(contact.id)) || [], meta.contacts, testField)),
        ),
    )
    const stage = stageMeta(meta.deals)
    const capped = contacts.length >= 1000
    return {
      feed: {
        state: 'live',
        notice: capped ? 'Showing the latest 1,000 Zoho contacts.' : null,
        items,
      },
      stages: stage.stages,
      picklistKnown: stage.picklistKnown,
      testField: testField ? { apiName: testField.apiName, label: testField.label } : null,
    }
  } catch (err) {
    const message = err instanceof BoardError ? err.message : 'Zoho could not be read.'
    return {
      feed: { state: 'error', notice: message, items: [] },
      stages: stageChoices([]),
      picklistKnown: false,
      testField: null,
    }
  }
}

function parseNotes(json: Record<string, unknown>): ZohoNote[] {
  const data = Array.isArray(json.data) ? json.data : []
  return data.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const note = item as Record<string, unknown>
    const id = str(note.id)
    if (!id) return []
    return [
      {
        id,
        title: str(note.Note_Title) || 'Note',
        body: str(note.Note_Content),
        createdAt: iso(note.Created_Time),
      },
    ]
  })
}

export async function loadLead(id: string): Promise<LeadDetail> {
  const board = await loadLeads()
  if (board.feed.state !== 'live') {
    return { ...board, lead: board.feed.items.find((item) => item.id === id) || null, zohoNotes: [] }
  }
  if (!/^[0-9]{5,32}$/.test(id)) {
    return { ...board, lead: null, zohoNotes: [] }
  }
  try {
    const meta = await fields()
    const testField = findTestField(meta.contacts)
    const [contactJson, dealJson, noteJson] = await Promise.all([
      zohoSend(`/Contacts/${id}`),
      zohoSend(`/Contacts/${id}/Deals`).catch(() => ({ data: [] })),
      zohoSend(`/Contacts/${id}/Notes?fields=Note_Title,Note_Content,Created_Time`).catch(() => ({ data: [] })),
    ])
    const contact = Array.isArray(contactJson.data) ? (contactJson.data[0] as Record<string, unknown>) : null
    if (!contact) return { ...board, lead: null, zohoNotes: [] }
    const deals = (Array.isArray(dealJson.data) ? dealJson.data : []).map((deal) =>
      toDealInput(deal as Record<string, unknown>),
    )
    return {
      ...board,
      lead: shapeLead(toLeadInput(contact, deals, meta.contacts, testField)),
      zohoNotes: parseNotes(noteJson),
    }
  } catch (err) {
    const message = err instanceof BoardError ? err.message : 'Zoho could not open that contact.'
    return {
      feed: { state: 'error', notice: message, items: [] },
      stages: board.stages,
      picklistKnown: board.picklistKnown,
      testField: board.testField,
      lead: null,
      zohoNotes: [],
    }
  }
}

export async function updateLeadStage(id: string, bucket: string): Promise<string> {
  if (!/^[0-9]{5,32}$/.test(id)) throw new BoardError('That lead id is not a Zoho contact.', 'input')
  const detail = await loadLead(id)
  if (!detail.lead) throw new BoardError('That contact is not in Zoho.', 'zoho')
  const choice = detail.stages.find((stage) => stage.bucket === bucket)
  if (!choice) throw new BoardError('That stage is not on the board.', 'input')
  const deal = detail.lead.deals[0]
  if (!deal || !/^[0-9]{5,32}$/.test(deal.id)) {
    throw new BoardError('This contact has no Zoho deal yet, so there is no stage to change.', 'zoho')
  }
  await zohoSend(`/Deals/${deal.id}`, 'PUT', { data: [{ id: deal.id, Stage: choice.zohoStage }] })
  return choice.zohoStage
}

export async function addZohoNote(id: string, body: string): Promise<void> {
  if (!/^[0-9]{5,32}$/.test(id)) throw new BoardError('That lead id is not a Zoho contact.', 'input')
  const note = body.trim()
  if (!note) throw new BoardError('Write a note before saving it.', 'input')
  if (note.length > 4000) throw new BoardError('That note is too long for Zoho.', 'input')
  await zohoSend(`/Contacts/${id}/Notes`, 'POST', {
    data: [
      {
        Note_Title: 'Command center',
        Note_Content: note,
        Parent_Id: id,
        se_module: 'Contacts',
      },
    ],
  })
}

export async function updateTestFlag(id: string, value: boolean): Promise<string> {
  if (!/^[0-9]{5,32}$/.test(id)) throw new BoardError('That lead id is not a Zoho contact.', 'input')
  const meta = await fields()
  const field = findTestField(meta.contacts)
  if (!field) {
    throw new BoardError('This Zoho contact has no test field. Obvious tests are still badged on the board.', 'zoho')
  }
  const payload = field.dataType === 'boolean' ? value : value ? 'Yes' : 'No'
  await zohoSend(`/Contacts/${id}`, 'PUT', { data: [{ id, [field.apiName]: payload }] })
  return field.label
}

export async function zohoLamp(): Promise<{ state: 'ready' | 'missing' | 'fault'; detail: string }> {
  if (!zohoConfigured()) {
    return { state: 'missing', detail: 'Zoho credentials are not set.' }
  }
  try {
    await getAuth()
    return { state: 'ready', detail: 'Zoho accepted the refresh token.' }
  } catch (err) {
    return { state: 'fault', detail: err instanceof BoardError ? err.message : 'Zoho could not be reached.' }
  }
}
