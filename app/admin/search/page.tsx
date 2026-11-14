import Link from 'next/link'
import { searchHit } from '@/lib/admin/policies'
import { leadName } from '@/lib/admin/format'
import { loadClients } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const [clients, leads] = await Promise.all([loadClients(), loadLeads()])
  const clientHits = clients.items.filter((client) =>
    searchHit(q, [client.businessName, client.contactName, client.phone, client.ownerCell, client.email, client.city, client.trade]),
  )
  const leadHits = leads.feed.items.filter((lead) =>
    searchHit(q, [lead.firstName, lead.lastName, lead.phone, lead.email, lead.trade || '', lead.message]),
  )
  return (
    <div className="admin-rise flex flex-col gap-4">
      <p className="admin-kicker">Search</p>
      <h1 className="admin-title">{q || 'Find someone'}</h1>
      <form action="/admin/search">
        <input className="admin-field" name="q" defaultValue={q} placeholder="Name, phone, email, business" />
      </form>
      {q.trim().length < 2 && <p>Type at least two characters.</p>}
      <ul className="flex flex-col gap-2">
        {clientHits.map((client) => (
          <li key={client.id}>
            <Link className="admin-card" href={`/admin/customers/client/${client.id}`}>
              <span className="admin-kicker">Client</span>
              <span className="admin-title text-3xl">{client.businessName}</span>
              <span>{client.phone}</span>
            </Link>
          </li>
        ))}
        {leadHits.map((lead) => (
          <li key={lead.id}>
            <Link className="admin-card" href={`/admin/customers/lead/${lead.id}`}>
              <span className="admin-kicker">{lead.example ? 'Example lead' : 'Lead'}</span>
              <span className="admin-title text-3xl">{leadName(lead.firstName, lead.lastName)}</span>
              <span>{lead.phone}</span>
            </Link>
          </li>
        ))}
      </ul>
      {q.trim().length >= 2 && clientHits.length === 0 && leadHits.length === 0 && <p>No match.</p>}
    </div>
  )
}
