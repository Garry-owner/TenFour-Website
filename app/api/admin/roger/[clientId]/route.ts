import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { saveRoger } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(request: Request, context: { params: Promise<{ clientId: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const saved = await saveRoger((await context.params).clientId, await readJson(request))
    return NextResponse.json({ ok: true, roger: saved })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
