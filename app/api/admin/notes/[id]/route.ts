import { NextResponse } from 'next/server'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { deleteNote, updateNote } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const note = await updateNote((await context.params).id, await readJson(request))
    return NextResponse.json({ ok: true, note })
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
      return NextResponse.json({ ok: false, message: 'Confirm before removing a note.' }, { status: 400 })
    }
    await deleteNote((await context.params).id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
