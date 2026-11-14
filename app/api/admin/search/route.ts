import { NextResponse } from 'next/server'
import { guardAdmin } from '@/lib/admin/guard'
import { runSearch } from '@/lib/admin/search'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const query = new URL(request.url).searchParams.get('q') || ''
  const { hits, leadState, clientState } = await runSearch(query)
  return NextResponse.json({
    query,
    hits: hits.slice(0, 20),
    leadState,
    clientState,
  })
}
