import { GlanceBoard } from '@/components/admin/glance-board'
import { loadCalls } from '@/lib/admin/make'
import { loadClients, loadNotes } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [leads, calls, notes, clients] = await Promise.all([loadLeads(), loadCalls(), loadNotes(), loadClients()])
  return <GlanceBoard leads={leads.feed} calls={calls} notes={notes} clients={clients} />
}
