'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

// The capability list as a work order. Each box ticks itself, one after
// another, the first time the list scrolls into view.
export function WorkOrder({ items }: { items: { title: string; body: string }[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const [done, setDone] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: ReturnType<typeof setTimeout>[] = []
    const start = () => {
      items.forEach((_, index) => {
        timers.push(setTimeout(() => setDone(index + 1), reduced ? 0 : 250 + index * 260))
      })
    }
    if (typeof IntersectionObserver === 'undefined') {
      start()
      return () => timers.forEach(clearTimeout)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start()
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [items])

  return (
    <ul ref={ref} className={styles.workOrder}>
      {items.map(({ title, body }, index) => (
        <li key={title} className={cn(index < done && styles.done)}>
          <span className={styles.box} aria-hidden="true" />
          <div>
            <h3 className={styles.workTitle}>{title}</h3>
            <p className={styles.workBody}>{body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
