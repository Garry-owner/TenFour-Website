import { PlanGatesForm } from '@/components/admin/plan-gates'
import { loadBoardConfig } from '@/lib/admin/desk-store'

export const dynamic = 'force-dynamic'

export default async function PlansPage() {
  const config = await loadBoardConfig()
  return <PlanGatesForm gates={config.gates} live={config.live} />
}
