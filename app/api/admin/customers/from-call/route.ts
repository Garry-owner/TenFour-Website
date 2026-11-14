import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { loadCall } from '@/lib/admin/make'
import { createClient, findClientByPhone, recordAudit, updateClient } from '@/lib/admin/store'
import { createLeadRecord, zohoConfigured } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    const sid = typeof body.callSid === 'string' ? body.callSid : ''
    const { call } = await loadCall(sid)
    if (!call) return NextResponse.json({ ok: false, message: 'That call is not on the log.' }, { status: 404 })
    if (call.example) {
      return NextResponse.json(
        { ok: false, sent: false, message: 'This call is example data. Nothing was created.' },
        { status: 409 },
      )
    }
    const existing = await findClientByPhone(call.caller)
    if (existing) return NextResponse.json({ ok: true, clientId: existing.id, created: false })
    const client = await createClient({
      businessName: call.callerName || 'New caller',
      contactName: call.callerName,
      phone: call.caller,
      city: [call.callerCity, call.callerState].filter(Boolean).join(', '),
      plan: 'base',
      monthlyStatus: 'active',
      notes: `Opened from call ${call.callSid}`,
    })
    if (zohoConfigured()) {
      try {
        const [firstName, ...rest] = (call.callerName || 'Caller').split(' ')
        const created = await createLeadRecord({
          firstName: firstName || 'Caller',
          lastName: rest.join(' '),
          email: '',
          phone: call.caller,
          mobile: '',
          business: client.businessName,
          trade: '',
          city: call.callerCity,
          state: call.callerState,
          message: `Opened from call ${call.callSid}`,
          amount: null,
        })
        await updateClient(client.id, { ...client, zohoContactId: created.contactId, zohoDealId: created.dealId })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Zoho did not create the contact.'
        return NextResponse.json({ ok: true, clientId: client.id, created: true, warning: message })
      }
    }
    await recordAudit({
      action: 'create',
      entityType: 'client',
      entityId: client.id,
      summary: `Opened a customer from call ${call.callSid}`,
    }).catch(() => undefined)
    return NextResponse.json({ ok: true, clientId: client.id, created: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
