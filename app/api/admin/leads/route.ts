import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin } from '@/lib/admin/guard'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  try {
    return NextResponse.json(await loadLeads())
  } catch (err) {
    return boardErrorResponse(err)
  }
}
