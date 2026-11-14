import { PipelineBoard } from '@/components/admin/pipeline-board'
import { loadLeads, zohoConfigured } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function PipelinePage() {
  const leads = await loadLeads()
  return <PipelineBoard leads={leads.feed.items} zoho={zohoConfigured()} />
}
