import { NextResponse } from 'next/server'
import { guardAdmin } from '@/lib/admin/guard'
import { loadCalls } from '@/lib/admin/make'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  return NextResponse.json(await loadCalls())
}
