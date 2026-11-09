'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

// Slides a block in from the side the first time it scrolls into view.
// Blocks that start on screen, and visitors who prefer less motion,
// see everything in place with no movement.
export function Reveal({
  children,
  className,
  fromRight = false,
}: {
  children: React.ReactNode
  className?: string
  fromRight?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top <= window.innerHeight) return

    setArmed(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArmed(false)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(styles.slide, armed && styles.armed, fromRight && styles.fromRight, className)}
    >
      {children}
    </div>
  )
}
