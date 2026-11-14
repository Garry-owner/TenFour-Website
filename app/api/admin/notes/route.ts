import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { createNote, loadNotes } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  return NextResponse.json(await loadNotes())
}

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const note = await createNote(await readJson(request))
    return NextResponse.json({ ok: true, note }, { status: 201 })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
