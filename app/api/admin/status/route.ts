import { NextResponse } from 'next/server'
import { guardAdmin } from '@/lib/admin/guard'
import { makeLamp } from '@/lib/admin/make'
import { storeLamp } from '@/lib/admin/store'
import { twilioLamp } from '@/lib/admin/twilio'
import { zohoLamp } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const [zoho, make, twilio, store] = await Promise.all([zohoLamp(), makeLamp(), twilioLamp(), storeLamp()])
  return NextResponse.json({ zoho: zoho.state, make: make.state, twilio: twilio.state, store: store.state, detail: { zoho: zoho.detail, make: make.detail, twilio: twilio.detail, store: store.detail } })
}
