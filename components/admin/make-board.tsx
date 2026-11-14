'use client'

import { useState } from 'react'
import { formatCentral } from '@/lib/admin/format'
import { FeedBanner, Panel, Sheet, sendJson } from '@/components/admin/ui'
import type { ScenarioCard } from '@/lib/admin/types'

export function MakeBoard({
  connected,
  notice,
  items,
  initialConfirm = null,
}: {
  connected: boolean
  notice: string | null
  items: ScenarioCard[]
  initialConfirm?: string | null
}) {
  const preset = items.find((item) => String(item.id) === initialConfirm && item.control !== 'locked')
  const [picked, setPicked] = useState<{ scenario: ScenarioCard; on: boolean } | null>(
    preset ? { scenario: preset, on: preset.status !== 'active' } : null,
  )
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Make · us2</p>
        <h1 className="admin-title text-6xl">Breakers</h1>
        <p className="mt-2 text-sm leading-relaxed">
          Turn on and turn off call Make after you confirm the scenario by name. Scenario 6998096 stays off.
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
              {scenario.lastRun && <p className="admin-kicker mt-2">Last run {formatCentral(scenario.lastRun)}</p>}
              {scenario.notice && <p className="mt-2 text-sm">{scenario.notice}</p>}
              {scenario.control === 'locked' ? (
                <p className="admin-stamp mt-3">Stays off</p>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" className="admin-btn" onClick={() => setPicked({ scenario, on: true })}>
                    Turn on
                  </button>
                  <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setPicked({ scenario, on: false })}>
                    Turn off
                  </button>
                </div>
              )}
            </Panel>
          </li>
        ))}
      </ul>
      {!connected && <p className="admin-kicker">Connect MAKE_API_TOKEN to replace “unknown” with live status.</p>}
      {picked && (
        <Sheet
          title={picked.on ? 'Turn on' : 'Turn off'}
          body={`${picked.on ? 'Turn on' : 'Turn off'} “${picked.scenario.boardName}” (scenario ${picked.scenario.id}). This calls Make.`}
          confirmLabel={picked.on ? 'Turn it on' : 'Turn it off'}
          busy={busy}
          onClose={() => setPicked(null)}
          onConfirm={async () => {
            setBusy(true)
            const result = await sendJson('/api/admin/make/control', 'POST', {
              scenarioId: picked.scenario.id,
              action: picked.on ? 'on' : 'off',
              confirm: true,
            })
            setBusy(false)
            setMessage(result.ok ? `${picked.scenario.boardName} is ${picked.on ? 'on' : 'off'}.` : result.message)
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
