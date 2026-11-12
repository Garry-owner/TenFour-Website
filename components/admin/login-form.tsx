'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogoStacked } from '@/components/brand-logo'
import { sendJson } from '@/components/admin/ui'

export function LoginForm({ locked }: { locked: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(
    locked ? 'The board is bolted. ADMIN_PASSWORD is not set on this deploy, so no password will open it.' : '',
  )
  const [shake, setShake] = useState(false)
  const [busy, setBusy] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (locked || busy) return
    setBusy(true)
    setMessage('')
    const result = await sendJson('/api/admin/login', 'POST', { password })
    setBusy(false)
    if (result.ok) {
      router.replace('/admin')
      router.refresh()
      return
    }
    setMessage(result.message)
    setShake(true)
    window.setTimeout(() => setShake(false), 220)
  }

  return (
    <div className="admin-login">
      <div className={`relative ${shake ? 'admin-shake' : ''}`}>
        <p className="admin-watermark" aria-hidden="true">
          10-4
        </p>
        <LogoStacked className="admin-hero-logo relative" />
        <p className="admin-kicker relative mt-4">Night shift</p>
        <h1 className="admin-title relative mt-2 text-6xl">Command</h1>
        <p className="relative mt-3 max-w-md text-base leading-relaxed">
          Garry’s private board. One login for leads, calls, clients, and the glance log.
        </p>
        <form className="relative mt-6 flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1.5" htmlFor="admin-password">
            <span className="admin-kicker">Password</span>
            <input
              id="admin-password"
              className="admin-field font-dispatch"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={locked}
            />
          </label>
          <button className="admin-btn h-14 text-2xl" type="submit" disabled={locked || busy}>
            {busy ? 'Opening' : 'Open the board'}
          </button>
          {message && (
            <p className="admin-banner" role="alert">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
