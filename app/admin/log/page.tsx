import { LogBoard } from '@/components/admin/log-board'
import { loadClients, loadNotes } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function LogPage() {
  const [notes, leads, clients] = await Promise.all([loadNotes(), loadLeads(), loadClients()])
  return <LogBoard notes={notes} leads={leads.feed.items} clients={clients} leadsLive={leads.feed.state === 'live'} />
}
