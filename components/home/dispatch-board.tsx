'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

// Same timeline as the old race timer: a missed call, Roger texting back
// at six seconds, and a lead ready to book at ten. Each line types in like
// an incoming call on a dispatch board, then the board resets and repeats.
const STEP_META = [
  { id: 's0', t: 0, time: '0:00', avoided: false, endState: false, isRoger: false },
  { id: 's1', t: 4, time: '0:04', avoided: false, endState: false, isRoger: false },
  { id: 's2', t: 6, time: '0:06', avoided: false, endState: false, isRoger: true },
  { id: 's3', t: 8, time: '0:08', avoided: true, endState: false, isRoger: false },
  { id: 's4', t: 10, time: '0:10', avoided: false, endState: true, isRoger: false },
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return reduced
}

function TypedLabel({ text, active, reduced }: { text: string; active: boolean; reduced: boolean }) {
  const [shown, setShown] = useState(text.length)

  useEffect(() => {
    if (!active || reduced) {
      setShown(text.length)
      return
    }
    setShown(0)
    let n = 0
    const timer = setInterval(() => {
      n += 1
      setShown(n)
      if (n >= text.length) clearInterval(timer)
    }, 26)
    return () => clearInterval(timer)
  }, [active, reduced, text])

  return (
    <span className={styles.logText}>
      {text.slice(0, shown)}
      {active && shown < text.length && <span className={styles.caret} aria-hidden="true" />}
    </span>
  )
}

export function DispatchBoard() {
  const copy = getCopy(useLocale()).race
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(-1)

  useEffect(() => {
    if (reduced) {
      setTick(10)
      return
    }
    let current = -1
    let paused = false
    let resetTimer: ReturnType<typeof setTimeout> | undefined
    const interval = setInterval(() => {
      if (paused) return
      if (current + 1 > 10) {
        paused = true
        resetTimer = setTimeout(() => {
          paused = false
          current = -1
          setTick(-1)
        }, 2600)
        return
      }
      current += 1
      setTick(current)
    }, 750)
    return () => {
      clearInterval(interval)
      if (resetTimer) clearTimeout(resetTimer)
    }
  }, [reduced])

  const safe = tick >= 6

  return (
    <div className={cn(styles.board, safe && styles.safe)} aria-label={copy.sequence}>
      <div className={styles.boardTop}>
        <span className={styles.boardDot} aria-hidden="true" />
        <span className={styles.boardStatus} role="status">
          {safe ? copy.onIt : copy.watching}
        </span>
      </div>
      <p className={styles.boardHead}>
        {copy.missed} <span className={styles.money}>{safe ? copy.ready : copy.money}</span>
      </p>
      <div className={styles.clockRow}>
        <div className={styles.clock} role="timer" aria-live="off">
          0:{String(Math.max(0, tick)).padStart(2, '0')}
        </div>
        <div className={styles.clockCap}>{copy.caption}</div>
      </div>
      <ol className={styles.log}>
        {STEP_META.map((step, index) => {
          const active = tick >= step.t
          const label = copy.steps[index]
          return (
            <li
              key={step.id}
              className={cn(active && styles.on, step.avoided && styles.avoided, step.endState && styles.end)}
            >
              <span className={styles.logTime}>{step.time}</span>
              {step.isRoger ? (
                <span className={styles.logAvatar}>
                  <Image src="/roger-avatar.png" alt="Roger" width={28} height={28} />
                </span>
              ) : (
                <span className={styles.logMark} aria-hidden="true" />
              )}
              <span className={styles.logLabel}>
                <TypedLabel text={label} active={active} reduced={reduced} />
                {step.avoided && <span className={styles.stamp}>{copy.avoided}</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
