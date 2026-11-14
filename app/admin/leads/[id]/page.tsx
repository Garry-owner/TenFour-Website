import { LeadDetailBoard } from '@/components/admin/lead-detail'
import { loadClients, loadNotes } from '@/lib/admin/store'
import { loadLead } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [detail, notes, clients] = await Promise.all([loadLead(id), loadNotes(), loadClients()])
  return <LeadDetailBoard detail={detail} notes={notes} clients={clients} />
}
