'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import styles from './race-timer.module.css'

const STEP_META = [
  { id: 's0', t: 0, time: '0:00', avoided: false, endState: false, isRoger: false },
  { id: 's1', t: 4, time: '0:04', avoided: false, endState: false, isRoger: false },
  { id: 's2', t: 6, time: '0:06', avoided: false, endState: false, isRoger: true },
  { id: 's3', t: 8, time: '0:08', avoided: true, endState: false, isRoger: false },
  { id: 's4', t: 10, time: '0:10', avoided: false, endState: true, isRoger: false },
]

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function RaceTimer() {
  const copy = getCopy(useLocale()).race
  const steps = STEP_META.map((step, index) => ({ ...step, label: copy.steps[index] }))
  const [tick, setTick] = useState(-1)
  const pausedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return
      setTick((prev) => {
        const next = prev + 1
        if (next > 10) {
          pausedRef.current = true
          setTimeout(() => {
            pausedRef.current = false
            setTick(-1)
          }, 2600)
          return prev
        }
        return next
      })
    }, 750)
    return () => clearInterval(interval)
  }, [])

  const safe = tick >= 6
  const percent = Math.min(100, Math.max(0, (tick / 10) * 100))

  return (
    <div className={styles.card}>
      <div className={styles.badgeWrap}>
        <div role="status" className={styles.badge}>
          <span aria-hidden="true" className={cx(styles.dot, safe && styles.safe)} />
          <span>{safe ? copy.onIt : copy.watching}</span>
        </div>
      </div>

      <p className={styles.heading}>
        {copy.missed}{' '}
        <span className={cx(styles.money, safe && styles.safe)}>{safe ? copy.ready : copy.money}</span>
      </p>

      <div className={styles.timerWrap}>
        <div role="timer" aria-live="off" className={cx(styles.timer, safe && styles.safe)}>
          0:{String(Math.max(0, tick)).padStart(2, '0')}
        </div>
      </div>
      <div className={styles.timerCaption}>{copy.caption}</div>

      <p className={styles.exampleLabel}>{copy.example}</p>

      <div className={styles.timeline} aria-label={copy.sequence}>
        <div className={styles.timelineFill} style={{ height: `${percent}%` }} />
        {steps.map((s) => {
          const active = tick >= s.t
          return (
            <div key={s.id} className={cx(styles.step, active && styles.active, s.avoided && styles.avoided, s.endState && styles.safe)}>
              {s.isRoger ? (
                <div className={cx(styles.stepAvatar, active && styles.stepAvatarActive)}>
                  <Image src="/roger-avatar.png" alt="Roger" width={28} height={28} />
                </div>
              ) : (
                <div className={styles.stepDot} />
              )}
              <div className={styles.stepTime}>{s.time}</div>
              <div className={styles.stepLabel}>
                {s.label}
                {s.avoided && <span className={styles.avoidedTag}>{copy.avoided}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
