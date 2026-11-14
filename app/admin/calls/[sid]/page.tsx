import { CallDetailBoard } from '@/components/admin/call-detail'
import { loadCall } from '@/lib/admin/make'
import { loadClients, loadNotes } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function CallPage({ params }: { params: Promise<{ sid: string }> }) {
  const { sid } = await params
  const [{ feed, call }, leads, notes, clients] = await Promise.all([
    loadCall(sid),
    loadLeads(),
    loadNotes(),
    loadClients(),
  ])
  return (
    <CallDetailBoard
      call={call}
      notice={feed.notice}
      leads={leads.feed.items}
      notes={notes}
      clients={clients}
      leadsLive={leads.feed.state === 'live'}
    />
  )
}
