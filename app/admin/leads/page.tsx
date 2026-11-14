import { LeadsBoard } from '@/components/admin/leads-board'
import { loadLeads } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  return <LeadsBoard board={await loadLeads()} />
}
