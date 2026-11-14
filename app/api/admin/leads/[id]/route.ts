import { NextResponse } from 'next/server'
import { asString, boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { deleteLeadRecord, updateLeadRecord, zohoConfigured, zohoMissingMessage, type LeadWrite } from '@/lib/admin/zoho'
import { recordAudit } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function leadWrite(body: Record<string, unknown>): LeadWrite {
  const raw = body.amount
  const amount = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() ? Number(raw) : null
  return {
    firstName: asString(body.firstName, 60),
    lastName: asString(body.lastName, 60),
    email: asString(body.email, 160),
    phone: asString(body.phone, 30),
    mobile: asString(body.mobile, 30),
    business: asString(body.business, 120),
    trade: asString(body.trade, 80),
    city: asString(body.city, 80),
    state: asString(body.state, 40),
    message: asString(body.message, 2000),
    amount: amount != null && Number.isFinite(amount) ? amount : null,
    stage: asString(body.stage, 80) || undefined,
    dealId: asString(body.dealId, 32) || undefined,
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const { id } = await context.params
    if (id.startsWith('example-') || !zohoConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          sent: false,
          message: id.startsWith('example-')
            ? 'This lead is example data. Nothing was changed.'
            : zohoMissingMessage(),
        },
        { status: 409 },
      )
    }
    const draft = leadWrite(await readJson(request))
    await updateLeadRecord(id, draft)
    await recordAudit({
      action: 'update',
      entityType: 'lead',
      entityId: id,
      summary: `Edited Zoho contact ${draft.firstName} ${draft.lastName}`.trim(),
      after: draft,
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
      return NextResponse.json({ ok: false, message: 'Confirm before deleting a Zoho contact.' }, { status: 400 })
    }
    const { id } = await context.params
    if (id.startsWith('example-') || !zohoConfigured()) {
      return NextResponse.json(
        { ok: false, sent: false, message: id.startsWith('example-') ? 'This lead is example data. Nothing was changed.' : zohoMissingMessage() },
        { status: 409 },
      )
    }
    await deleteLeadRecord(id)
    await recordAudit({
      action: 'delete',
      entityType: 'lead',
      entityId: id,
      summary: `Deleted Zoho contact ${id}`,
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, sent: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
