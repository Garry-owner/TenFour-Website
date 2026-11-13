import { FeedBanner, Panel } from '@/components/admin/ui'
import { formatCentral } from '@/lib/admin/format'
import { loadAudit } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function ActivityPage() {
  const feed = await loadAudit()
  return (
    <div className="admin-rise flex flex-col gap-4">
      <p className="admin-kicker">Every change from this board</p>
      <h1 className="admin-title text-5xl">Activity</h1>
      <FeedBanner notice={feed.notice} />
      {feed.items.length === 0 ? (
        <Panel>
          <p className="admin-title text-4xl">No edits yet</p>
          <p className="mt-2">Saves, deletes, and Make on/off land here with a before and after.</p>
        </Panel>
      ) : (
        <ul className="flex flex-col gap-2">
          {feed.items.map((entry) => (
            <li key={entry.id} className="admin-card">
              <span className="admin-kicker">{formatCentral(entry.at)}</span>
              <span className="admin-title text-2xl">{entry.summary}</span>
              <span className="admin-kicker">
                {entry.action} · {entry.entityType}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
