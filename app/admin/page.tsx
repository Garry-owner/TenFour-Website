import { GlanceBoard } from '@/components/admin/glance-board'
import { loadCalls, loadScenarios } from '@/lib/admin/make'
import { loadClients } from '@/lib/admin/store'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [leads, calls, clients, scenarios] = await Promise.all([loadLeads(), loadCalls(), loadClients(), loadScenarios()])
  return <GlanceBoard leads={leads.feed} calls={calls} clients={clients} scenarios={scenarios.items} />
}
