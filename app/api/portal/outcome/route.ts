import { NextResponse } from 'next/server'
import { setOutcome } from '@/lib/admin/desk-store'
import { boardErrorResponse, readJson } from '@/lib/admin/guard'
import { recordAudit } from '@/lib/admin/store'
import { readMark } from '@/lib/admin/portal-token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await readJson(request)
    if (body.confirm !== true) {
      return NextResponse.json({ ok: false, message: 'Confirm the result first.' }, { status: 400 })
    }
    const token = typeof body.token === 'string' ? body.token : ''
    const mark = await readMark(token)
    if (!mark) return NextResponse.json({ ok: false, message: 'That link has expired.' }, { status: 401 })
    const outcome = body.outcome === 'lost' ? 'lost' : 'booked'
    await setOutcome({ clientId: mark.clientId, caller: mark.caller, outcome })
    await recordAudit({ action: 'update', entityType: 'client', entityId: mark.clientId, summary: `Client marked a caller ${outcome}` })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
