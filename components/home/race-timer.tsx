"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Locale } from "@/lib/locale"
import styles from "./race-timer.module.css"

const STEP_META = [
  { id: "s0", t: 0, time: "0:00", avoided: false, endState: false, isRoger: false },
  { id: "s1", t: 4, time: "0:04", avoided: false, endState: false, isRoger: false },
  { id: "s2", t: 6, time: "0:06", avoided: false, endState: false, isRoger: true },
  { id: "s3", t: 8, time: "0:08", avoided: true, endState: false, isRoger: false },
  { id: "s4", t: 10, time: "0:10", avoided: false, endState: true, isRoger: false },
]

const COPY: Record<
  Locale,
  {
    watching: string
    onIt: string
    missed: string
    ready: string
    money: string
    caption: string
    sequence: string
    avoided: string
    steps: string[]
  }
> = {
  en: {
    watching: "WATCHING FOR MISSED CALLS",
    onIt: "ROGER IS ON IT",
    missed: "Missed call.",
    ready: "Ready to book.",
    money: "Money on the line.",
    caption: "Time since the call was missed",
    sequence: "Incident response sequence",
    avoided: "AVOIDED",
    steps: [
      "Missed call",
      "Customer hangs up",
      "Roger texts back",
      "Calls a competitor",
      "Lead ready to book",
    ],
  },
  es: {
    watching: "VIGILANDO LLAMADAS PERDIDAS",
    onIt: "ROGER YA LO ATIENDE",
    missed: "Llamada perdida.",
    ready: "Listo para agendar.",
    money: "Dinero en juego.",
    caption: "Tiempo desde que se perdió la llamada",
    sequence: "Secuencia de respuesta al incidente",
    avoided: "EVITADO",
    steps: [
      "Llamada perdida",
      "El cliente cuelga",
      "Roger responde por texto",
      "Llama a un competidor",
      "Prospecto listo para agendar",
    ],
  },
}

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function RaceTimer({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]
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
        {copy.missed}{" "}
        <span className={cx(styles.money, safe && styles.safe)}>{safe ? copy.ready : copy.money}</span>
      </p>

      <div className={styles.timerWrap}>
        <div role="timer" aria-live="off" className={cx(styles.timer, safe && styles.safe)}>
          0:{String(Math.max(0, tick)).padStart(2, '0')}
        </div>
      </div>
      <div className={styles.timerCaption}>{copy.caption}</div>

      <div className={styles.timeline} aria-label={copy.sequence}>
        <div className={styles.timelineFill} style={{ height: `${percent}%` }} />
        {STEP_META.map((s, index) => {
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
                {copy.steps[index]}
                {s.avoided && <span className={styles.avoidedTag}>{copy.avoided}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
