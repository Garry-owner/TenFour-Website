import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { deleteZohoNote, updateZohoNote, zohoConfigured, zohoMissingMessage } from '@/lib/admin/zoho'
import { recordAudit } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    if (!zohoConfigured()) {
      return NextResponse.json({ ok: false, sent: false, message: zohoMissingMessage() }, { status: 409 })
    }
    const body = await readJson(request)
    const { id } = await context.params
    await updateZohoNote(id, typeof body.body === 'string' ? body.body : '')
    await recordAudit({
      action: 'update',
      entityType: 'zoho-note',
      entityId: id,
      summary: 'Edited a Zoho note',
      after: { body: body.body },
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, sent: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    if (body.confirm !== true) {
      return NextResponse.json({ ok: false, message: 'Confirm before deleting a Zoho note.' }, { status: 400 })
    }
    if (!zohoConfigured()) {
      return NextResponse.json({ ok: false, sent: false, message: zohoMissingMessage() }, { status: 409 })
    }
    const { id } = await context.params
    await deleteZohoNote(id)
    await recordAudit({
      action: 'delete',
      entityType: 'zoho-note',
      entityId: id,
      summary: 'Deleted a Zoho note',
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, sent: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
