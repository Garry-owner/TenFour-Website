import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { listMessages, listOutcomes, loadBoardConfig } from '@/lib/admin/desk-store'
import { planAllows } from '@/lib/admin/gates'
import { buildPeriodReport, callsForClient } from '@/lib/admin/insights'
import { loadCalls } from '@/lib/admin/make'
import { simplePdf } from '@/lib/admin/pdf'
import { PORTAL_COOKIE, readPortalToken } from '@/lib/admin/portal-token'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const id = await readPortalToken((await cookies()).get(PORTAL_COOKIE)?.value)
  if (!id) return NextResponse.json({ ok: false, message: 'Sign in first.' }, { status: 401 })
  const [clients, config] = await Promise.all([loadClients(), loadBoardConfig()])
  const client = clients.items.find((item) => item.id === id)
  if (!client || !planAllows(config.gates, client.plan, 'pdf')) {
    return NextResponse.json({ ok: false, message: 'Your plan does not include PDF download.' }, { status: 403 })
  }
  const url = new URL(request.url)
  const calls = callsForClient((await loadCalls()).items, client)
  const report = buildPeriodReport({
    client,
    calls,
    messages: await listMessages(id),
    outcomes: await listOutcomes(id),
    from: url.searchParams.get('from') || '',
    to: url.searchParams.get('to') || '',
    includeMoney: planAllows(config.gates, client.plan, 'money'),
  })
  if (!report) return NextResponse.json({ ok: false, message: 'Pick a start date and an end date.' }, { status: 400 })
  const pdf = simplePdf(['TENFOUR', client.businessName, report.summary, `Missed calls caught: ${report.missed}`])
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="tenfour-report.pdf"',
      'Cache-Control': 'private, no-store',
    },
  })
}
