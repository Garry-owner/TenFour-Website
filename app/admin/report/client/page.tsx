import Link from 'next/link'
import { ReportPreview } from '@/components/admin/report-actions'
import { listMessages, listOutcomes } from '@/lib/admin/desk-store'
import { exampleCallsFor, exampleClient, isExampleClientId } from '@/lib/admin/example-client'
import { buildPeriodReport, callsForClient } from '@/lib/admin/insights'
import { loadCalls } from '@/lib/admin/make'
import { loadClients } from '@/lib/admin/store'
import { wires } from '@/lib/admin/wired'
import { todayChicago } from '@/lib/admin/caught'

export const dynamic = 'force-dynamic'

export default async function ClientReportPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string; from?: string; to?: string }>
}) {
  const query = await searchParams
  const clients = await loadClients()
  const choices = [
    ...clients.items.map((client) => ({ id: client.id, name: client.businessName })),
    { id: 'example-northside', name: 'Northside HVAC (example)' },
  ]
  const id = query.client || ''
  const from = query.from || `${todayChicago().slice(0, 8)}01`
  const to = query.to || todayChicago()
  const example = isExampleClientId(id) ? exampleClient(id) : null
  const client = example || clients.items.find((item) => item.id === id) || null
  const calls = !client ? [] : example ? exampleCallsFor(client) : callsForClient((await loadCalls()).items, client)
  const report = client
    ? buildPeriodReport({
        client,
        calls,
        messages: example ? [] : await listMessages(client.id),
        outcomes: example ? [] : await listOutcomes(client.id),
        from,
        to,
        includeMoney: true,
      })
    : null
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Client report</h1>
      <p className="admin-muted">Pick a client and the dates, then generate. Nothing is sent until you confirm.</p>
      <form className="admin-panel flex flex-col gap-2" action="/admin/report/client">
        <label className="admin-muted">Client
          <select className="admin-field" name="client" defaultValue={id}>
            <option value="">Choose</option>
            {choices.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="admin-muted">Start <input className="admin-field" type="date" name="from" defaultValue={from} /></label>
        <label className="admin-muted">End <input className="admin-field" type="date" name="to" defaultValue={to} /></label>
        <button className="admin-btn" type="submit">Generate</button>
      </form>
      {!report && id && <p>Those dates did not work. The end date has to be the start date or later.</p>}
      {report && client && (
        <ReportPreview
          report={report}
          clientId={client.id}
          email={client.email}
          phone={client.ownerCell || client.phone}
          fromNumber={client.phone}
          emailWired={wires().email}
          smsWired={wires().sms}
          example={Boolean(client.example)}
        />
      )}
      <Link className="admin-link" href="/admin/report">Back to reports</Link>
    </div>
  )
}
