'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './race-timer.module.css'

const STEPS = [
  { id: 's0', t: 0, time: '0:00', label: 'Missed call', avoided: false, endState: false, isRoger: false },
  { id: 's1', t: 4, time: '0:04', label: 'Customer hangs up', avoided: false, endState: false, isRoger: false },
  { id: 's2', t: 6, time: '0:06', label: 'Roger texts back', avoided: false, endState: false, isRoger: true },
  { id: 's3', t: 8, time: '0:08', label: 'Calls a competitor', avoided: true, endState: false, isRoger: false },
  { id: 's4', t: 10, time: '0:10', label: 'Appointment booked', avoided: false, endState: true, isRoger: false },
]

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function RaceTimer() {
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
          <span>{safe ? 'ROGER IS ON IT' : 'WATCHING FOR MISSED CALLS'}</span>
        </div>
      </div>

      <p className={styles.heading}>
        Missed call. <span className={cx(styles.money, safe && styles.safe)}>{safe ? 'Job secured.' : 'Money on the line.'}</span>
      </p>

      <div className={styles.timerWrap}>
        <div role="timer" aria-live="off" className={cx(styles.timer, safe && styles.safe)}>
          0:{String(Math.max(0, tick)).padStart(2, '0')}
        </div>
      </div>
      <div className={styles.timerCaption}>Time since the call was missed</div>

      <div className={styles.timeline} aria-label="Incident response sequence">
        <div className={styles.timelineFill} style={{ height: `${percent}%` }} />
        {STEPS.map((s) => {
          const active = tick >= s.t
          return (
            <div key={s.id} className={cx(styles.step, active && styles.active, s.avoided && styles.avoided, s.endState && styles.safe)}>
              {s.isRoger ? (
                <div className={cx(styles.stepAvatar, active && styles.stepAvatarActive)}>
                  <Image src="/roger-avatar.png" alt="Roger" width={32} height={32} />
                </div>
              ) : (
                <div className={styles.stepDot} />
              )}
              <div className={styles.stepTime}>{s.time}</div>
              <div className={styles.stepLabel}>
                {s.label}
                {s.avoided && <span className={styles.avoidedTag}>AVOIDED</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
