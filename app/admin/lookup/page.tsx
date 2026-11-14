import Link from 'next/link'
import { exampleCalls } from '@/lib/admin/call-examples'
import { EXAMPLE_TRACKED } from '@/lib/admin/caught'
import { listMessages } from '@/lib/admin/desk-store'
import { formatCentral, formatPhone } from '@/lib/admin/format'
import { loadCalls } from '@/lib/admin/make'
import { phoneKey } from '@/lib/admin/policies'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function LookupPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n = '' } = await searchParams
  const key = phoneKey(n)
  const [clients, calls, messages] = await Promise.all([loadClients(), loadCalls(), listMessages()])
  const owned = clients.items.filter((client) => phoneKey(client.phone) === key || phoneKey(client.ownerCell) === key)
  const exampleOwned = key.length >= 7 ? EXAMPLE_TRACKED.filter((client) => phoneKey(client.phone) === key) : []
  const pool = calls.state === 'example' ? exampleCalls() : calls.items
  const matched = key.length >= 7 ? pool.filter((call) => phoneKey(call.caller) === key || phoneKey(call.to) === key) : []
  const texts = key.length >= 7 ? messages.filter((message) => phoneKey(message.caller) === key) : []
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Number lookup</h1>
      <p className="admin-muted">Type any number. This shows the client, the calls, and the texts on the board.</p>
      <form className="flex flex-col gap-2" action="/admin/lookup">
        <input className="admin-field" name="n" defaultValue={n} placeholder="Phone number" inputMode="tel" />
        <button className="admin-btn" type="submit">Look up</button>
      </form>
      {key.length >= 7 && owned.length === 0 && exampleOwned.length === 0 && <p>No client owns that number.</p>}
      {owned.map((client) => (
        <Link key={client.id} className="admin-card" href={`/admin/customers/client/${client.id}`}>
          <span className="admin-pii">{client.businessName}</span>
          <span>On the private board</span>
        </Link>
      ))}
      {exampleOwned.map((client) => (
        <Link key={client.id} className="admin-card" href={`/admin/customers/client/${client.id}`}>
          <span className="admin-pii">{client.name}</span>
          <span>Example</span>
        </Link>
      ))}
      {matched.map((call) => (
        <p key={call.callSid} className="admin-pii">{formatCentral(call.startedAt)} · {formatPhone(call.caller)} · {call.outcome}</p>
      ))}
      {texts.map((message) => (
        <p key={message.id} className="admin-pii">{message.body}</p>
      ))}
    </div>
  )
}
