import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { createClient, loadClients } from '@/lib/admin/store'

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
    const client = await createClient(body)
    return NextResponse.json({ ok: true, client }, { status: 201 })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
