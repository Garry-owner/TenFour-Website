import { phoneKey } from '@/lib/admin/policies'
import { loadCalls } from '@/lib/admin/make'
import { findClientByPhone, loadClients, loadNotes, loadRoger } from '@/lib/admin/store'
import { loadLead, zohoConfigured } from '@/lib/admin/zoho'
import type { CallLog, ClientRecord, GlanceNote, LeadDetail, RogerSettings, ZohoNote } from '@/lib/admin/types'

export type CustomerBundle = {
  kind: 'lead' | 'client'
  zohoConnected: boolean
  storeLive: boolean
  storeNotice: string | null
  lead: LeadDetail | null
  client: ClientRecord | null
  notes: GlanceNote[]
  zohoNotes: ZohoNote[]
  calls: CallLog[]
  roger: RogerSettings | null
}

function callsFor(calls: CallLog[], phones: string[]): CallLog[] {
  const keys = phones.map(phoneKey).filter((key) => key.length >= 7)
  if (!keys.length) return []
  return calls.filter((call) => keys.includes(phoneKey(call.caller)))
}

export async function loadLeadCustomer(id: string): Promise<CustomerBundle> {
  const [lead, clients, notes, calls] = await Promise.all([loadLead(id), loadClients(), loadNotes(), loadCalls()])
  const client =
    clients.items.find((item) => item.zohoContactId === id) ||
    (lead.lead ? (await findClientByPhone(lead.lead.phone)) : null)
  const roger = client ? await loadRoger(client.id) : null
  return {
    kind: 'lead',
    zohoConnected: zohoConfigured(),
    storeLive: clients.state === 'live',
    storeNotice: clients.notice,
    lead,
    client,
    notes: notes.items.filter((note) => note.leadId === id || (client && note.clientId === client.id)),
    zohoNotes: lead.zohoNotes,
    calls: callsFor(calls.items, [lead.lead?.phone || '', client?.phone || '', client?.ownerCell || '']),
    roger,
  }
}

export async function loadClientCustomer(id: string): Promise<CustomerBundle> {
  const [clients, notes, calls] = await Promise.all([loadClients(), loadNotes(), loadCalls()])
  const client = clients.items.find((item) => item.id === id) || null
  const lead = client?.zohoContactId ? await loadLead(client.zohoContactId) : null
  const roger = client ? await loadRoger(client.id) : null
  return {
    kind: 'client',
    zohoConnected: zohoConfigured(),
    storeLive: clients.state === 'live',
    storeNotice: clients.notice,
    lead,
    client,
    notes: notes.items.filter((note) => note.clientId === id || (client?.zohoContactId && note.leadId === client.zohoContactId)),
    zohoNotes: lead?.zohoNotes || [],
    calls: callsFor(calls.items, [client?.phone || '', client?.ownerCell || '', lead?.lead?.phone || '']),
    roger,
  }
}
