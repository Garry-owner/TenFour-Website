import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loadBoardConfig } from '@/lib/admin/desk-store'
import { planAllows } from '@/lib/admin/gates'
import { PORTAL_COOKIE, readPortalToken } from '@/lib/admin/portal-token'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function PortalReportPage() {
  const id = await readPortalToken((await cookies()).get(PORTAL_COOKIE)?.value)
  if (!id) redirect('/portal')
  const [clients, config] = await Promise.all([loadClients(), loadBoardConfig()])
  const client = clients.items.find((item) => item.id === id)
  if (!client) redirect('/portal')
  if (!planAllows(config.gates, client.plan, 'reports')) {
    return <p>Your plan does not include date range reports.</p>
  }
  return (
    <div className="flex flex-col gap-3">
      <h1 className="admin-title">Your report</h1>
      <p className="admin-muted">Pick the dates. The preview opens on your board.</p>
      <form className="admin-panel flex flex-col gap-2" action="/portal/report/view">
        <input className="admin-field" type="date" name="from" required />
        <input className="admin-field" type="date" name="to" required />
        <button className="admin-btn" type="submit">Generate</button>
      </form>
      {planAllows(config.gates, client.plan, 'pdf') && <p className="admin-muted">PDF download shows after you generate.</p>}
    </div>
  )
}
