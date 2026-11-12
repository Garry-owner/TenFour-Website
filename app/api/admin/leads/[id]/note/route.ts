import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { addZohoNote, zohoConfigured } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    if (!zohoConfigured()) {
      return NextResponse.json(
        { ok: false, sent: false, message: 'Zoho is not connected on this deploy. The note was not saved there.' },
        { status: 409 },
      )
    }
    const { id } = await context.params
    const body = await readJson(request)
    await addZohoNote(id, typeof body.body === 'string' ? body.body : '')
    return NextResponse.json({ ok: true, sent: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
