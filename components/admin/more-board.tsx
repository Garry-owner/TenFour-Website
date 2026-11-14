'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { ROGER_LINE } from '@/lib/admin/constants'
import { sendJson } from '@/components/admin/ui'
import type { Connections, LampState } from '@/lib/admin/types'

const LINKS = [
  { href: '/admin/log', label: 'Glance log', detail: 'Private notes' },
  { href: '/admin/make', label: 'Make breakers', detail: 'Turn scenarios on or off' },
  { href: '/admin/report', label: 'Report', detail: 'Missed calls caught' },
  { href: '/admin/activity', label: 'Activity', detail: 'What changed, and when' },
]

export function MoreBoard({ shift }: { shift: 'day' | 'night' }) {
  const router = useRouter()
  const [mode, setMode] = useState(shift)
  const [lamps, setLamps] = useState<Connections | null>(null)

  useEffect(() => {
    let gone = false
    fetch('/api/admin/status')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Connections | null) => {
        if (!gone && data) setLamps(data)
      })
      .catch(() => {})
    return () => {
      gone = true
    }
  }, [])

  function chooseShift(next: 'day' | 'night') {
    setMode(next)
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `tenfour_admin_shift=${next}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
    router.refresh()
  }

  async function signOut() {
    await sendJson('/api/admin/logout', 'POST', {})
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div className="admin-rise flex flex-col gap-5">
      <h1 className="admin-title">More</h1>
      <section>
        <div className="admin-section">
          <h2>Connections</h2>
        </div>
        <div className="admin-list">
          <Status name="Zoho" state={lamps?.zoho} detail={lamps?.detail.zoho} />
          <Status name="Make" state={lamps?.make} detail={lamps?.detail.make} />
          <Status name="Twilio" state={lamps?.twilio} detail={lamps?.detail.twilio} />
          <Status name="Store" state={lamps?.store} detail={lamps?.detail.store} />
        </div>
      </section>
      <div className="admin-list">
        {LINKS.map((item) => (
          <Link key={item.href} className="admin-row" href={item.href}>
            <span className="admin-row-copy">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="admin-choice" aria-pressed={mode === 'night'} onClick={() => chooseShift('night')}>
          <Moon className="mr-1 inline" size={16} aria-hidden="true" /> Night
        </button>
        <button type="button" className="admin-choice" aria-pressed={mode === 'day'} onClick={() => chooseShift('day')}>
          <Sun className="mr-1 inline" size={16} aria-hidden="true" /> Day
        </button>
      </div>
      <p className="admin-roger">{ROGER_LINE}</p>
      <button type="button" className="admin-btn" onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}

function Status({ name, state, detail }: { name: string; state?: LampState; detail?: string }) {
  const label = state === 'ready' ? 'Live' : state === 'fault' ? 'Fault' : 'Off'
  return (
    <div className="admin-row">
      <span className="admin-status-dot" data-state={state || 'missing'} />
      <span className="admin-row-copy">
        <strong>{name}</strong>
        <span>{detail || label}</span>
      </span>
      <span className="admin-meta">{label}</span>
    </div>
  )
}
