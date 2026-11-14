import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { updateTestFlag, zohoConfigured } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    if (body.confirm !== true) {
      return NextResponse.json({ ok: false, message: 'Confirm the test mark before it is written.' }, { status: 400 })
    }
    if (!zohoConfigured()) {
      return NextResponse.json(
        { ok: false, sent: false, message: 'Zoho is not connected on this deploy. Nothing was changed.' },
        { status: 409 },
      )
    }
    const label = await updateTestFlag((await context.params).id, body.value === true)
    return NextResponse.json({ ok: true, sent: true, label })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
