import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { attachZoho, createClient, loadClients } from '@/lib/admin/store'
import { createLeadRecord, zohoConfigured } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  return NextResponse.json(await loadClients())
}

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    if (body.quick === true && body.confirm !== true) {
      return NextResponse.json({ ok: false, message: 'Confirm the new client before saving.' }, { status: 400 })
    }
    const client = await createClient(body)
    let message = `${client.businessName} is on the board.`
    if (body.quick === true) {
      if (!zohoConfigured()) {
        message += ' Zoho is not connected, so no Zoho record was created.'
      } else {
        const created = await createLeadRecord({
          firstName: client.contactName || client.businessName,
          lastName: 'Owner',
          email: client.email,
          phone: client.phone,
          mobile: '',
          business: client.businessName,
          trade: client.trade,
          city: client.city,
          state: '',
          message: 'Added from the command center.',
          amount: null,
        })
        await attachZoho(client.id, created.contactId, created.dealId)
        message += ' A Zoho contact and deal were created.'
      }
    }
    return NextResponse.json({ ok: true, client, message }, { status: 201 })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
