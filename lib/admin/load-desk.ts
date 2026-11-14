import { exampleCalls } from '@/lib/admin/call-examples'
import { callsForClient, moneyCaught, nextChargeLabel, textCost } from '@/lib/admin/insights'
import { exampleClient, exampleRoger, exampleThread, isExampleClientId } from '@/lib/admin/example-client'
import { listBlocks, listHolidays, listHolds, listMessages, listOptOuts, listOutcomes, loadBoardConfig } from '@/lib/admin/desk-store'
import { loadAudit, loadClients, loadNotes, loadRoger } from '@/lib/admin/store'
import { loadCalls } from '@/lib/admin/make'
import { loadLeads } from '@/lib/admin/zoho'
import { phoneKey } from '@/lib/admin/policies'
import { wires } from '@/lib/admin/wired'
import type { CallLog, ClientRecord, GlanceNote, Lead, RogerSettings, ThreadMessage } from '@/lib/admin/types'
import { PLAN_FEATURES, planAllows } from '@/lib/admin/gates'

export type DeskPayload = {
  client: ClientRecord
  roger: RogerSettings | null
  calls: CallLog[]
  leads: Lead[]
  notes: GlanceNote[]
  messages: ThreadMessage[]
  storeLive: boolean
  gatesNote: string
  includes: string[]
  nextCharge: string
  money: { dollars: number; booked: number; ready: boolean }
  cost: ReturnType<typeof textCost>
  holidays: { id: string; onDate: string; label: string; global: boolean }[]
  blocks: { id: string; phone: string; reason: string }[]
  optOuts: { phone: string; at: string }[]
  history: { id: string; at: string; summary: string; actor: string }[]
  holds: string[]
  wired: ReturnType<typeof wires>
  reviewAllowed: boolean
}

export async function loadDesk(id: string): Promise<DeskPayload | null> {
  const config = await loadBoardConfig()
  if (isExampleClientId(id)) {
    const client = exampleClient(id)
    if (!client) return null
    const calls = exampleCalls().filter((call) => call.clientId === id || call.to === client.phone)
    const missed = calls.filter((call) => call.outcome === 'Missed')
    return pack(client, exampleRoger(client), calls, [], [], exampleThread(client), false, config, missed.length)
  }
  const [clients, calls, leads, notes, audit] = await Promise.all([loadClients(), loadCalls(), loadLeads(), loadNotes(), loadAudit()])
  const client = clients.items.find((item) => item.id === id)
  if (!client) return null
  const [blocks, optOuts, messages, holidays, outcomes, holds] = await Promise.all([
    listBlocks(id).catch(() => []),
    listOptOuts(id),
    listMessages(id),
    listHolidays(),
    listOutcomes(id),
    listHolds(id),
  ])
  const mine = callsForClient(calls.items, client)
  const key = phoneKey(client.phone)
  const matchedLeads = leads.feed.items.filter((lead) => phoneKey(lead.phone) === key)
  const missed = mine.filter((call) => call.outcome === 'Missed')
  const roger = await loadRoger(id)
  const payload = pack(client, roger, mine, matchedLeads, notes.items.filter((note) => note.clientId === id), messages, clients.state === 'live', config, missed.length)
  payload.blocks = blocks.map((row) => ({ id: row.id, phone: row.phone, reason: row.reason }))
  payload.optOuts = optOuts.map((row) => ({ phone: row.phone, at: row.at }))
  payload.holidays = holidays
    .filter((row) => row.clientId === id || row.clientId === '')
    .map((row) => ({ id: row.id, onDate: row.onDate, label: row.label, global: row.clientId === '' }))
  payload.history = audit.items
    .filter((row) => row.entityId === id)
    .slice(0, 8)
    .map((row) => ({ id: row.id, at: row.at, summary: row.summary, actor: row.actor }))
  payload.holds = holds.map((row) => row.caller)
  payload.money = moneyCaught(client, outcomes)
  return payload
}

function pack(
  client: ClientRecord,
  roger: RogerSettings | null,
  calls: CallLog[],
  leads: Lead[],
  notes: GlanceNote[],
  messages: ThreadMessage[],
  storeLive: boolean,
  config: Awaited<ReturnType<typeof loadBoardConfig>>,
  missed: number,
): DeskPayload {
  const includes = PLAN_FEATURES.filter((feature) => planAllows(config.gates, client.plan, feature.id)).map((feature) => feature.label)
  return {
    client,
    roger,
    calls,
    leads,
    notes,
    messages,
    storeLive,
    gatesNote: config.live ? '' : 'Plan features are the defaults until the private store is ready.',
    includes,
    nextCharge: nextChargeLabel(client),
    money: { dollars: 0, booked: 0, ready: client.avgJobCents > 0 },
    cost: textCost(missed, client),
    holidays: [],
    blocks: [],
    optOuts: [],
    history: [],
    holds: [],
    wired: wires(),
    reviewAllowed: planAllows(config.gates, client.plan, 'reviews'),
  }
}
