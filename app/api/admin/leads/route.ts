import { NextResponse } from 'next/server'
import { asString, boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { loadLeads, createLeadRecord, zohoMissingMessage, zohoConfigured, type LeadWrite } from '@/lib/admin/zoho'
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

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  return NextResponse.json(await loadLeads())
}

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    if (!zohoConfigured()) {
      return NextResponse.json({ ok: false, sent: false, message: zohoMissingMessage() }, { status: 409 })
    }
    const draft = leadWrite(await readJson(request))
    if (!draft.firstName && !draft.lastName && !draft.business) {
      return NextResponse.json({ ok: false, message: 'A new lead needs a name or a business.' }, { status: 400 })
    }
    const created = await createLeadRecord(draft)
    await recordAudit({
      action: 'create',
      entityType: 'lead',
      entityId: created.contactId,
      summary: `Created Zoho lead ${draft.firstName} ${draft.lastName}`.trim(),
      after: { ...draft, ...created },
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, sent: true, ...created }, { status: 201 })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
