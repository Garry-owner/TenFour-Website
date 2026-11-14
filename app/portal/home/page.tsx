import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PortalOutcome } from '@/components/portal/portal-outcome'
import { loadBoardConfig, listOutcomes } from '@/lib/admin/desk-store'
import { planAllows } from '@/lib/admin/gates'
import { formatPhone, moneyGrouped } from '@/lib/admin/format'
import { callsForClient, moneyCaught } from '@/lib/admin/insights'
import { loadCalls } from '@/lib/admin/make'
import { PORTAL_COOKIE, readPortalToken, signMark } from '@/lib/admin/portal-token'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function PortalHomePage() {
  const token = (await cookies()).get(PORTAL_COOKIE)?.value
  const id = await readPortalToken(token)
  if (!id) redirect('/portal')
  const [clients, calls, config, outcomes] = await Promise.all([loadClients(), loadCalls(), loadBoardConfig(), listOutcomes(id)])
  const client = clients.items.find((item) => item.id === id)
  if (!client) redirect('/portal')
  if (!planAllows(config.gates, client.plan, 'portal')) {
    return <p>Your plan does not include a login yet. Ask TenFour if you need it.</p>
  }
  const mine = callsForClient(calls.items, client).slice(0, 12)
  const cards = []
  for (const call of mine) {
    cards.push({ call, mark: await signMark(client.id, call.caller) })
  }
  const money = moneyCaught(client, outcomes)
  return (
    <div className="flex flex-col gap-4">
      <h1 className="admin-title">{client.businessName}</h1>
      <p className="admin-muted">Only your callers are on this page.</p>
      {planAllows(config.gates, client.plan, 'leads') ? (
        cards.map(({ call, mark }) => (
          <article key={call.callSid} className="admin-panel">
            <p>{formatPhone(call.caller)} · {call.outcome}</p>
            <PortalOutcome caller={formatPhone(call.caller)} token={mark} />
          </article>
        ))
      ) : <p>Your plan does not include the caller list.</p>}
      {planAllows(config.gates, client.plan, 'money') && (
        <p>Money caught {money.ready ? moneyGrouped(money.dollars) : 'is off until an average job value is set'} from {money.booked} booked.</p>
      )}
      {planAllows(config.gates, client.plan, 'reports') && <Link className="admin-link" href="/portal/report">Build a date range report</Link>}
      <form action="/api/portal/logout" method="post">
        <button className="admin-btn admin-btn-ghost" type="submit">Sign out</button>
      </form>
    </div>
  )
}
