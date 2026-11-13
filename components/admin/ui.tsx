'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

export function Panel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn('admin-panel', className)}>
      <span className="admin-corner admin-corner-tl" />
      <span className="admin-corner admin-corner-tr" />
      <span className="admin-corner admin-corner-bl" />
      <span className="admin-corner admin-corner-br" />
      {children}
    </section>
  )
}

export function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(value)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(value)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 420)
      setShown(Math.round(value * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <>{String(shown).padStart(2, '0')}</>
}

export function FeedBanner({ notice }: { notice: string | null }) {
  if (!notice) return null
  return <p className="admin-banner">{notice}</p>
}

export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="admin-kicker">{label}</span>
      {children}
    </label>
  )
}

export function Sheet({
  title,
  body,
  confirmLabel,
  cancelLabel = 'Not now',
  onConfirm,
  onClose,
  busy = false,
}: {
  title: string
  body: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onClose: () => void
  busy?: boolean
}) {
  const titleId = useId()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    cancelRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  if (!mounted) return null
  const root = document.querySelector('.admin-deck') || document.body
  return createPortal(
    <div className="admin-sheet" role="presentation" onClick={onClose}>
      <div
        className="admin-sheet-card flex flex-col gap-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="admin-title text-4xl">
          {title}
        </h2>
        <p className="text-base leading-relaxed">{body}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <button ref={cancelRef} type="button" className="admin-btn admin-btn-ghost" onClick={onClose}>
            {cancelLabel}
          </button>
          <button type="button" className="admin-btn" onClick={onConfirm} disabled={busy}>
            {busy ? 'Working' : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    root,
  )
}

export async function sendJson(url: string, method: string, body?: unknown) {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (response.status === 401 && !url.endsWith('/api/admin/login')) {
    window.location.assign('/admin/login')
    return { ok: false as const, message: 'The board is locked.' }
  }
  const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string }
  return {
    ...data,
    ok: Boolean(response.ok && data.ok !== false),
    message: data.message || (response.ok ? '' : 'The board could not finish that.'),
  }
}
