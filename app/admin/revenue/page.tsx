import { RevenueEditor } from '@/components/admin/revenue-editor'
import { loadBoardConfig } from '@/lib/admin/desk-store'
import { moneyGrouped } from '@/lib/admin/format'
import { revenueSnapshot } from '@/lib/admin/insights'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function RevenuePage() {
  const [clients, config] = await Promise.all([loadClients(), loadBoardConfig()])
  const snap = revenueSnapshot(clients.items, config.quitGoal)
  const width = snap.goal > 0 ? Math.min(100, Math.round((snap.mrr / snap.goal) * 100)) : 0
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Revenue</h1>
      <p className="admin-muted">Monthly revenue from active clients, new clients this month, and canceled clients.</p>
      <section className="admin-panel flex flex-col gap-2">
        <p className="admin-num admin-num-accent">{moneyGrouped(snap.mrr)}</p>
        <p>New this month {snap.fresh}. Canceled {snap.canceled}.</p>
        <p className="admin-muted">Canceled means the monthly status is cancelled.</p>
        <div className="admin-bar" aria-hidden="true"><span style={{ width: `${width}%` }} /></div>
        <p className="admin-muted">{width}% of the quit driving goal.</p>
      </section>
      <RevenueEditor goal={config.quitGoal} live={config.live} />
    </div>
  )
}
