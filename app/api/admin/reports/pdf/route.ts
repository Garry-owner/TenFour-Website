import { NextResponse } from 'next/server'
import { listMessages, listOutcomes } from '@/lib/admin/desk-store'
import { exampleCallsFor, exampleClient, isExampleClientId } from '@/lib/admin/example-client'
import { guardAdmin } from '@/lib/admin/guard'
import { buildPeriodReport, callsForClient } from '@/lib/admin/insights'
import { simplePdf } from '@/lib/admin/pdf'
import { loadCalls } from '@/lib/admin/make'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const url = new URL(request.url)
  const id = url.searchParams.get('client') || ''
  const from = url.searchParams.get('from') || ''
  const to = url.searchParams.get('to') || ''
  const example = isExampleClientId(id) ? exampleClient(id) : null
  const client = example || (await loadClients()).items.find((item) => item.id === id)
  if (!client) return NextResponse.json({ ok: false, message: 'That client is not on the board.' }, { status: 404 })
  const calls = example ? exampleCallsFor(client) : callsForClient((await loadCalls()).items, client)
  const report = buildPeriodReport({
    client,
    calls,
    messages: example ? [] : await listMessages(id),
    outcomes: example ? [] : await listOutcomes(id),
    from,
    to,
    includeMoney: true,
  })
  if (!report) return NextResponse.json({ ok: false, message: 'Pick a start date and an end date.' }, { status: 400 })
  const lines = [
    'TENFOUR',
    client.businessName,
    `${report.fromLabel} to ${report.toLabel}`,
    report.summary,
    `Missed calls caught: ${report.missed}`,
    `Callers texted back: ${report.texted}`,
    `Booking links sent: ${report.bookingLinks}`,
    `After hours: ${report.afterHours}`,
    `Business hours: ${report.businessHours}`,
    report.busiest,
    report.money ? `Money caught: ${report.money}` : 'Money caught: set an average job value',
    ...report.leads.slice(0, 12).map((lead) => `${lead.name} ${lead.phone}`),
  ]
  const pdf = simplePdf(lines)
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="tenfour-report.pdf"',
      'Cache-Control': 'private, no-store',
    },
  })
}
