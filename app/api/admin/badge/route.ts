import { NextResponse } from 'next/server'
import { listMessages } from '@/lib/admin/desk-store'
import { guardAdmin } from '@/lib/admin/guard'
import { cancellationWarnings, repeatCallers } from '@/lib/admin/insights'
import { loadCalls } from '@/lib/admin/make'
import { loadClients, loadNotes } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const denied = await guardAdmin(request)
  if (denied) return denied
  const [clients, calls, notes, messages] = await Promise.all([loadClients(), loadCalls(), loadNotes(), listMessages()])
  const today = new Date().toISOString().slice(0, 10)
  const due = notes.items.filter((note) => note.dueOn && note.dueOn <= today).length
  const warnings = cancellationWarnings(clients.items, calls.items, messages).length
  const repeats = repeatCallers(clients.items, calls.items).length
  const review = messages.filter((message) => message.language === 'es' && message.reviewStatus === 'pending').length
  return NextResponse.json({ count: due + warnings + repeats + review })
}
