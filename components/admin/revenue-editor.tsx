'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'

export function RevenueEditor({ goal, live }: { goal: number; live: boolean }) {
  const [value, setValue] = useState(String(goal))
  const toast = useToast()
  const router = useRouter()
  return (
    <form
      className="admin-panel flex flex-col gap-2"
      onSubmit={async (event) => {
        event.preventDefault()
        const result = await sendJson('/api/admin/desk', 'POST', { action: 'goal', quitGoal: Number(value) })
        toast(result.ok ? 'Goal saved.' : result.message, result.ok)
        if (result.ok) router.refresh()
      }}
    >
      <h2>Quit driving goal</h2>
      <p className="admin-muted">The monthly number you are aiming for. {live ? '' : 'The private store is not ready, so this will not save.'}</p>
      <input className="admin-field" inputMode="numeric" value={value} onChange={(event) => setValue(event.target.value)} />
      <button className="admin-btn" type="submit">Save goal</button>
    </form>
  )
}
