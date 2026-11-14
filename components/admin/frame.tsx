'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Ellipsis, HardHat, House, Phone, Users } from 'lucide-react'
import { LogoMark } from '@/components/brand-logo'
import { SearchBar } from '@/components/admin/search-bar'
import { ToastProvider } from '@/components/admin/toast'
import type { Connections, LampState } from '@/lib/admin/types'

const NAV = [
  { href: '/admin', label: 'Home', icon: House },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/clients', label: 'Clients', icon: HardHat },
  { href: '/admin/calls', label: 'Calls', icon: Phone },
  { href: '/admin/more', label: 'More', icon: Ellipsis },
]

const MORE_PREFIXES = ['/admin/more', '/admin/log', '/admin/make', '/admin/report', '/admin/activity', '/admin/search']

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
  const shareCard = pathname.startsWith('/admin/report/share')
  const [lamps, setLamps] = useState<Connections | null>(null)

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

  const dot = overall(lamps)

  return (
    <div className={`admin-deck ${shift === 'day' ? 'admin-day' : 'admin-night'}`}>
      {authed ? (
        <>
          <a className="admin-skip" href="#admin-main">
            Skip to the board
          </a>
          {!shareCard && (
            <header className="admin-top">
              <Link className="admin-logo-tile" href="/admin" aria-label="TenFour home">
                <LogoMark />
              </Link>
              <SearchBar />
              <Link className="admin-status-link" href="/admin/more" data-state={dot} aria-label="Connection status">
                <span className="admin-status-dot" />
              </Link>
            </header>
          )}
          <ToastProvider>
            <main id="admin-main" className={shareCard ? 'admin-main admin-main-share' : 'admin-main'}>
              {children}
            </main>
          </ToastProvider>
          {!shareCard && (
            <nav className="admin-nav" aria-label="Command center">
              {NAV.map((item) => {
                const Icon = item.icon
                const active = isActive(pathname, item.href)
                return (
                  <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>
                    <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </>
      ) : (
        children
      )}
    </div>
  )
}

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin'
  if (href === '/admin/more') return MORE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  if (href === '/admin/leads') return pathname.startsWith('/admin/leads') || pathname.startsWith('/admin/customers/lead')
  if (href === '/admin/clients') return pathname.startsWith('/admin/clients') || pathname.startsWith('/admin/customers/client')
  return pathname.startsWith(href)
}

function overall(lamps: Connections | null): LampState {
  if (!lamps) return 'missing'
  const states = [lamps.zoho, lamps.make, lamps.twilio, lamps.store]
  if (states.some((state) => state === 'fault')) return 'fault'
  if (states.every((state) => state === 'ready')) return 'ready'
  return 'missing'
}
