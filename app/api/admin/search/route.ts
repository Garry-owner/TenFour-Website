import { NextResponse } from 'next/server'
import { guardAdmin } from '@/lib/admin/guard'
import { searchHit } from '@/lib/admin/policies'
import { leadName } from '@/lib/admin/format'
import { loadClients } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'
import type { SearchHit } from '@/lib/admin/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const query = new URL(request.url).searchParams.get('q') || ''
  const [clients, leads] = await Promise.all([loadClients(), loadLeads()])
  const hits: SearchHit[] = []
  for (const client of clients.items) {
    if (
      searchHit(query, [
        client.businessName,
        client.contactName,
        client.phone,
        client.ownerCell,
        client.email,
        client.trade,
        client.city,
      ])
    ) {
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
  return NextResponse.json({
    query,
    hits: hits.slice(0, 20),
    leadState: leads.feed.state,
    clientState: clients.state,
  })
}
