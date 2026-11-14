import { searchHit } from '@/lib/admin/policies'
import { leadName } from '@/lib/admin/format'
import { EXAMPLE_TRACKED } from '@/lib/admin/caught'
import { listMessages } from '@/lib/admin/desk-store'
import { loadCalls } from '@/lib/admin/make'
import { loadAudit, loadClients, loadNotes } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'
import type { SearchHit } from '@/lib/admin/types'

// One search for the top bar and the full search page:
// clients, leads, callers, notes, change history, and texts.
export async function runSearch(query: string) {
  const [clients, leads, calls, notes, audit, messages] = await Promise.all([
    loadClients(),
    loadLeads(),
    loadCalls(),
    loadNotes(),
    loadAudit(),
    listMessages(),
  ])
  const hits: SearchHit[] = []
  for (const client of clients.items) {
    if (searchHit(query, [client.businessName, client.contactName, client.phone, client.ownerCell, client.email, client.trade, client.city])) {
      hits.push({
        kind: 'client',
        id: client.id,
        title: client.businessName,
        detail: [client.contactName, client.phone, client.email].filter(Boolean).join(' · '),
        href: `/admin/customers/client/${client.id}`,
      })
    }
  }
  for (const lead of leads.feed.items) {
    if (searchHit(query, [lead.firstName, lead.lastName, lead.phone, lead.email, lead.trade || '', lead.message])) {
      hits.push({
        kind: 'lead',
        id: lead.id,
        title: leadName(lead.firstName, lead.lastName),
        detail: [lead.phone, lead.email, lead.example ? 'Example' : ''].filter(Boolean).join(' · '),
        href: `/admin/customers/lead/${lead.id}`,
      })
    }
  }
  for (const sample of EXAMPLE_TRACKED) {
    if (searchHit(query, [sample.name, sample.phone])) {
      hits.push({ kind: 'client', id: sample.id, title: sample.name, detail: 'Example', href: `/admin/customers/client/${sample.id}` })
    }
  }
  for (const call of calls.items) {
    if (searchHit(query, [call.caller, call.callerName, call.to])) {
      hits.push({ kind: 'caller', id: call.callSid, title: call.callerName || call.caller, detail: 'Caller', href: `/admin/calls/${call.callSid}` })
    }
  }
  for (const note of notes.items) {
    if (searchHit(query, [note.body, note.clientLabel || ''])) {
      hits.push({ kind: 'note', id: note.id, title: note.body.slice(0, 80), detail: 'Note', href: note.clientId ? `/admin/customers/client/${note.clientId}` : '/admin/log' })
    }
  }
  for (const entry of audit.items) {
    if (searchHit(query, [entry.summary, entry.actor])) {
      hits.push({ kind: 'history', id: entry.id, title: entry.summary, detail: entry.actor, href: '/admin/activity' })
    }
  }
  for (const message of messages) {
    if (searchHit(query, [message.body, message.bodyEn, message.caller])) {
      hits.push({ kind: 'message', id: message.id, title: message.body.slice(0, 80), detail: 'Text', href: message.clientId ? `/admin/customers/client/${message.clientId}` : '/admin' })
    }
  }
  return { hits, leadState: leads.feed.state, clientState: clients.state }
}
