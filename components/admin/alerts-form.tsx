'use client'

import { useState } from 'react'
import { sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import type { AlertPrefs } from '@/lib/admin/types'

const ROWS: { key: keyof AlertPrefs; label: string }[] = [
  { key: 'pushFailure', label: 'Push when a system fails' },
  { key: 'textFailure', label: 'Text when a system fails' },
  { key: 'emailFailure', label: 'Email when a system fails' },
  { key: 'pushPaused', label: 'Push when a client is paused' },
  { key: 'textPaused', label: 'Text when a client is paused' },
  { key: 'emailPaused', label: 'Email when a client is paused' },
  { key: 'pushPayment', label: 'Push when a payment fails' },
  { key: 'textPayment', label: 'Text when a payment fails' },
  { key: 'emailPayment', label: 'Email when a payment fails' },
]

export function AlertsForm({ alerts, live }: { alerts: AlertPrefs; live: boolean }) {
  const [value, setValue] = useState(alerts)
  const toast = useToast()
  return (
    <form
      className="admin-rise flex flex-col gap-3"
      onSubmit={async (event) => {
        event.preventDefault()
        const result = await sendJson('/api/admin/desk', 'POST', { action: 'alerts', alerts: value })
        toast(result.ok ? 'Choices saved. Nothing was sent.' : result.message, result.ok)
      }}
    >
      <h1 className="admin-title">Owner alerts</h1>
      <p className="admin-muted">Pick how you want to hear about problems. Saving does not send anything. Sending stays off until that connection is wired. {!live && 'The private store is not ready, so this will not save.'}</p>
      {ROWS.map((row) => (
        <label key={row.key} className="admin-panel flex items-center gap-2">
          <input
            type="checkbox"
            checked={value[row.key]}
            onChange={(event) => setValue({ ...value, [row.key]: event.target.checked })}
          />
          {row.label}
        </label>
      ))}
      <button className="admin-btn" type="submit">Save alert choices</button>
    </form>
  )
}
