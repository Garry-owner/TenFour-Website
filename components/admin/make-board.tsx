'use client'

import { useState } from 'react'
import { FeedBanner, Panel, Sheet, sendJson } from '@/components/admin/ui'
import type { ScenarioCard } from '@/lib/admin/types'

export function MakeBoard({
  connected,
  notice,
  items,
}: {
  connected: boolean
  notice: string | null
  items: ScenarioCard[]
}) {
  const [picked, setPicked] = useState<ScenarioCard | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Make · us2</p>
        <h1 className="admin-title text-6xl">Breakers</h1>
        <p className="mt-2 text-sm leading-relaxed">
          Status is a live read when Make is connected. Pause and resume are drawn here and do not call Make in this
          preview.
        </p>
      </div>
      <FeedBanner notice={notice} />
      {message && <p className="admin-banner">{message}</p>}
      <ul className="flex flex-col gap-3">
        {items.map((scenario) => (
          <li key={scenario.id}>
            <Panel>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="admin-kicker">#{scenario.id}</p>
                  <h2 className="admin-title text-3xl">{scenario.boardName}</h2>
                </div>
                <StatusPill status={scenario.status} />
              </div>
              <p className="mt-2 text-sm leading-relaxed">{scenario.detail}</p>
              {scenario.liveName && <p className="admin-kicker mt-2">{scenario.liveName}</p>}
              {scenario.notice && <p className="mt-2 text-sm">{scenario.notice}</p>}
              {scenario.control === 'locked' ? (
                <p className="admin-stamp mt-3">Bolted off</p>
              ) : (
                <button type="button" className="admin-btn mt-3" onClick={() => setPicked(scenario)}>
                  {scenario.status === 'active' ? 'Pause' : 'Resume'} · not live
                </button>
              )}
            </Panel>
          </li>
        ))}
      </ul>
      {!connected && <p className="admin-kicker">Connect MAKE_API_TOKEN to replace “unknown” with live status.</p>}
      {picked && (
        <Sheet
          title="Not live yet"
          body={`“${picked.boardName}” stays as it is in Make. This preview will not pause, resume, or edit scenario ${picked.id}.`}
          confirmLabel="Leave it in Make"
          cancelLabel="Close"
          busy={busy}
          onClose={() => setPicked(null)}
          onConfirm={async () => {
            setBusy(true)
            const result = await sendJson('/api/admin/make/control', 'POST', {
              scenarioId: picked.id,
              action: picked.status === 'active' ? 'pause' : 'resume',
              confirm: true,
            })
            setBusy(false)
            setMessage(result.message)
            setPicked(null)
          }}
        />
      )}
    </div>
  )
}

function StatusPill({ status }: { status: ScenarioCard['status'] }) {
  const label = status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : status === 'fault' ? 'Fault' : 'Unknown'
  return <span className={`admin-stamp ${status === 'active' ? 'admin-stamp-solid' : ''}`}>{label}</span>
}
