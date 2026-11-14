import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { setScenarioPower } from '@/lib/admin/make'
import { recordAudit } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    if (body.confirm !== true) {
      return NextResponse.json({ ok: false, message: 'Confirm before turning a scenario on or off.' }, { status: 400 })
    }
    const id = Number(body.scenarioId)
    if (body.action !== 'on' && body.action !== 'off') {
      return NextResponse.json({ ok: false, message: 'Choose turn on or turn off.' }, { status: 400 })
    }
    await setScenarioPower(id, body.action === 'on')
    await recordAudit({
      action: body.action === 'on' ? 'turn-on' : 'turn-off',
      entityType: 'scenario',
      entityId: String(id),
      summary: `${body.action === 'on' ? 'Turned on' : 'Turned off'} Make scenario ${id}`,
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, sent: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
