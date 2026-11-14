'use client'

import { useState } from 'react'
import { sendJson } from '@/components/admin/ui'
import { useConfirm } from '@/components/admin/confirm'

export function PortalOutcome({ caller, token }: { caller: string; token: string }) {
  const [message, setMessage] = useState('')
  const confirm = useConfirm()
  async function mark(outcome: 'booked' | 'lost') {
    if (!(await confirm(outcome === 'booked' ? 'Mark booked' : 'Mark lost', `Mark ${caller} as ${outcome === 'booked' ? 'a booked job' : 'lost'}?`))) return
    const result = await sendJson('/api/portal/outcome', 'POST', { token, outcome, confirm: true })
    setMessage(result.ok ? (outcome === 'booked' ? 'Marked booked.' : 'Marked lost.') : result.message)
  }
  return (
    <div className="mt-2 flex flex-col gap-2">
      <p className="admin-muted">Was {caller} a booked job or a lost one?</p>
      <div className="flex gap-2">
        <button type="button" className="admin-btn" onClick={() => mark('booked')}>Booked</button>
        <button type="button" className="admin-btn admin-btn-ghost" onClick={() => mark('lost')}>Lost</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}
