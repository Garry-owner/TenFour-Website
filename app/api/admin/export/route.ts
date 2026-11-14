import { NextResponse } from 'next/server'
import { exampleCallsFor, exampleClient, isExampleClientId } from '@/lib/admin/example-client'
import { callsForClient } from '@/lib/admin/insights'
import { guardAdmin } from '@/lib/admin/guard'
import { formatCentral, formatPhone, leadName } from '@/lib/admin/format'
import { phoneKey } from '@/lib/admin/policies'
import { loadCalls } from '@/lib/admin/make'
import { loadClients } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function csv(rows: string[][]): string {
  return rows
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
    .join('\n')
}

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const url = new URL(request.url)
  const id = url.searchParams.get('client') || ''
  const kind = url.searchParams.get('kind') === 'leads' ? 'leads' : 'calls'
  const example = isExampleClientId(id) ? exampleClient(id) : null
  const clients = example ? null : await loadClients()
  const client = example || clients?.items.find((item) => item.id === id)
  if (!client) return NextResponse.json({ ok: false, message: 'That client is not on the board.' }, { status: 404 })
  let body = ''
  if (kind === 'calls') {
    const calls = example ? exampleCallsFor(client) : callsForClient((await loadCalls()).items, client)
    body = csv([
      ['when', 'caller', 'outcome', 'called'],
      ...calls.map((call) => [formatCentral(call.startedAt), formatPhone(call.caller), call.outcome, formatPhone(call.to)]),
    ])
  } else {
    const leads = example ? [] : (await loadLeads()).feed.items.filter((lead) => phoneKey(lead.phone) === phoneKey(client.phone))
    body = csv([
      ['name', 'phone', 'trade', 'stage'],
      ...leads.map((lead) => [leadName(lead.firstName, lead.lastName), formatPhone(lead.phone), lead.trade || '', lead.stageLabel]),
    ])
  }
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${kind}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
