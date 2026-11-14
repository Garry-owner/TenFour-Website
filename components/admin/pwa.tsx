'use client'

import { useEffect } from 'react'

export function PwaBadge() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/admin/sw.js', { scope: '/admin/' }).catch(() => {})
    }
    const badge = navigator as Navigator & { setAppBadge?: (count?: number) => Promise<void>; clearAppBadge?: () => Promise<void> }
    fetch('/api/admin/badge')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { count?: number } | null) => {
        const count = data?.count || 0
        if (count > 0 && badge.setAppBadge) badge.setAppBadge(count).catch(() => {})
        else if (badge.clearAppBadge) badge.clearAppBadge().catch(() => {})
      })
      .catch(() => {})
  }, [])
  return null
}
