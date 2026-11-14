import { AlertsForm } from '@/components/admin/alerts-form'
import { loadBoardConfig } from '@/lib/admin/desk-store'

export const dynamic = 'force-dynamic'

export default async function AlertsPage() {
  const config = await loadBoardConfig()
  return <AlertsForm alerts={config.alerts} live={config.live} />
}
