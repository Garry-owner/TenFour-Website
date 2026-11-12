'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BookText, HardHat, House, LogOut, Moon, Phone, SlidersHorizontal, Sun, Users } from 'lucide-react'
import { LogoStacked } from '@/components/brand-logo'
import { formatClock } from '@/lib/admin/format'
import type { Connections } from '@/lib/admin/types'
import { sendJson } from '@/components/admin/ui'

const NAV = [
  { href: '/admin', label: 'Glance', icon: House },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/calls', label: 'Calls', icon: Phone },
  { href: '/admin/clients', label: 'Clients', icon: HardHat },
  { href: '/admin/log', label: 'Log', icon: BookText },
]

export function AdminFrame({
  authed,
  shift,
  children,
}: {
  authed: boolean
  shift: 'day' | 'night'
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mode, setMode] = useState(shift)
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState('Central')
  const [lamps, setLamps] = useState<Connections | null>(null)

  useEffect(() => {
    setMode(shift)
  }, [shift])

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!authed) return
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
  }, [authed, pathname])

  function chooseShift(next: 'day' | 'night') {
    setMode(next)
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `tenfour_admin_shift=${next}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
  }

  async function signOut() {
    await sendJson('/api/admin/logout', 'POST', {})
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div className={`admin-deck ${mode === 'day' ? 'admin-day' : 'admin-night'}`}>
      {authed ? (
        <>
          <a className="admin-skip" href="#admin-main">
            Skip to the board
          </a>
          <header className="admin-top">
            <Link href="/admin" aria-label="TenFour command center">
              <LogoStacked className="admin-logo" />
            </Link>
            <div className="min-w-0">
              <p className="admin-kicker">Command</p>
              <p className="admin-clock">{clock}</p>
            </div>
            <button type="button" className="admin-btn px-3 text-base" onClick={() => setOpen(true)}>
              Systems
            </button>
            <div className="admin-lamps">
              <Lamp name="Zoho" state={lamps?.zoho} detail={lamps?.detail.zoho} />
              <Lamp name="Make" state={lamps?.make} detail={lamps?.detail.make} />
              <Lamp name="Twilio" state={lamps?.twilio} detail={lamps?.detail.twilio} />
              <Lamp name="Store" state={lamps?.store} detail={lamps?.detail.store} />
            </div>
          </header>
          <main id="admin-main" className="admin-main">
            {children}
          </main>
          <nav className="admin-nav" aria-label="Command center">
            {NAV.map((item) => {
              const Icon = item.icon
              const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>
                  <Icon aria-hidden="true" size={20} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {open && (
            <div className="admin-sheet" role="presentation" onClick={() => setOpen(false)}>
              <div
                className="admin-sheet-card flex flex-col gap-3"
                role="dialog"
                aria-modal="true"
                aria-label="Systems"
                onClick={(event) => event.stopPropagation()}
              >
                <h2 className="admin-title text-4xl">Systems</h2>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="admin-choice" aria-pressed={mode === 'night'} onClick={() => chooseShift('night')}>
                    <Moon className="mr-1 inline" size={16} aria-hidden="true" /> Night
                  </button>
                  <button type="button" className="admin-choice" aria-pressed={mode === 'day'} onClick={() => chooseShift('day')}>
                    <Sun className="mr-1 inline" size={16} aria-hidden="true" /> Day
                  </button>
                </div>
                <Link className="admin-btn admin-btn-ghost" href="/admin/report" onClick={() => setOpen(false)}>
                  Monthly report
                </Link>
                <Link className="admin-btn admin-btn-ghost" href="/admin/make" onClick={() => setOpen(false)}>
                  <SlidersHorizontal size={18} aria-hidden="true" /> Make
                </Link>
                <button type="button" className="admin-btn" onClick={signOut}>
                  <LogOut size={18} aria-hidden="true" /> Sign out
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        children
      )}
    </div>
  )
}

function Lamp({
  name,
  state,
  detail,
}: {
  name: string
  state?: 'ready' | 'missing' | 'fault'
  detail?: string
}) {
  const label = state === 'ready' ? 'Live' : state === 'fault' ? 'Fault' : state === 'missing' ? 'Off' : '…'
  return (
    <span className="admin-lamp" data-state={state || 'missing'} title={detail || name}>
      <span className="admin-dot" aria-hidden="true" />
      {name} {label}
    </span>
  )
}
