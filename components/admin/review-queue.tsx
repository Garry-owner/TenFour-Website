'use client'

import { useState } from 'react'
import { sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import type { ThreadMessage } from '@/lib/admin/types'

export function ReviewQueue({ items, example }: { items: ThreadMessage[]; example: boolean }) {
  const toast = useToast()
  const [fix, setFix] = useState<Record<string, string>>({})
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Spanish review</h1>
      <p className="admin-muted">Spanish texts waiting for a person. Approve them, or fix the English line.</p>
      {example && <p className="admin-pill">Example data</p>}
      {items.map((item) => (
        <article key={item.id} className="admin-panel flex flex-col gap-2">
          <p>{item.body}</p>
          <p className="admin-muted">{item.bodyEn}</p>
          <textarea className="admin-area" value={fix[item.id] ?? item.bodyEn} onChange={(event) => setFix({ ...fix, [item.id]: event.target.value })} />
          <button
            type="button"
            className="admin-btn"
            onClick={async () => {
              if (example) return toast('Example only. Nothing was saved.', false)
              const result = await sendJson('/api/admin/desk', 'POST', { action: 'review', messageId: item.id, status: 'approved' })
              toast(result.ok ? 'Approved.' : result.message, result.ok)
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={async () => {
              if (example) return toast('Example only. Nothing was saved.', false)
              const result = await sendJson('/api/admin/desk', 'POST', { action: 'review', messageId: item.id, status: 'fixed', bodyEn: fix[item.id] || item.bodyEn })
              toast(result.ok ? 'English line saved.' : result.message, result.ok)
            }}
          >
            Save the fix
          </button>
        </article>
      ))}
    </div>
  )
}
