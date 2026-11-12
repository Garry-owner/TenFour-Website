import { NextResponse } from 'next/server'
import { MAKE_SCENARIOS } from '@/lib/admin/constants'
import { guardAdmin, readJson } from '@/lib/admin/guard'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Pause and resume are drawn on the board and intentionally do not call Make.
export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  let body: Record<string, unknown> = {}
  try {
    body = await readJson(request)
  } catch {
    body = {}
  }
  const id = Number(body.scenarioId)
  const known = MAKE_SCENARIOS.find((scenario) => scenario.id === id)
  if (!known) {
    return NextResponse.json({ ok: false, live: false, message: 'That scenario is not on this board.' }, { status: 404 })
  }
  if (known.control === 'locked') {
    return NextResponse.json(
      { ok: false, live: false, message: 'The call log backfill stays inactive. This board will not turn it on.' },
      { status: 409 },
    )
  }
  return NextResponse.json(
    {
      ok: false,
      live: false,
      message: 'Pause and resume are on the board and are not live in this preview. Nothing was sent to Make.',
    },
    { status: 409 },
  )
}
