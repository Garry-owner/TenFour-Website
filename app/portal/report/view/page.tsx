import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { listMessages, listOutcomes, loadBoardConfig } from '@/lib/admin/desk-store'
import { planAllows } from '@/lib/admin/gates'
import { buildPeriodReport, callsForClient } from '@/lib/admin/insights'
import { loadCalls } from '@/lib/admin/make'
import { PORTAL_COOKIE, readPortalToken } from '@/lib/admin/portal-token'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function PortalReportView({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const id = await readPortalToken((await cookies()).get(PORTAL_COOKIE)?.value)
  if (!id) redirect('/portal')
  const query = await searchParams
  const [clients, calls, config, messages, outcomes] = await Promise.all([
    loadClients(),
    loadCalls(),
    loadBoardConfig(),
    listMessages(id),
    listOutcomes(id),
  ])
  const client = clients.items.find((item) => item.id === id)
  if (!client || !planAllows(config.gates, client.plan, 'reports')) redirect('/portal/home')
  const report = buildPeriodReport({
    client,
    calls: callsForClient(calls.items, client),
    messages,
    outcomes,
    from: query.from || '',
    to: query.to || '',
    includeMoney: planAllows(config.gates, client.plan, 'money'),
  })
  if (!report) return <p>Pick a start date and an end date.</p>
  return (
    <article className="admin-panel flex flex-col gap-2">
      <h1 className="admin-title">Your report</h1>
      <p>{report.summary}</p>
      <p>Missed calls caught: {report.missed}</p>
      <p>Callers texted back: {report.texted}</p>
      {planAllows(config.gates, client.plan, 'pdf') && (
        <a className="admin-btn" href={`/api/portal/pdf?from=${report.from}&to=${report.to}`}>Download PDF</a>
      )}
    </article>
  )
}
