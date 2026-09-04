'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

type Line = { role: 'caller' | 'agent' | 'system'; text: string }

const SCRIPT: Line[] = [
  { role: 'system', text: 'Inbound text · area code 817 · 11:47 PM' },
  { role: 'caller', text: 'Storm took half my shingles off tonight. Can someone come look at it?' },
  { role: 'agent', text: 'That sounds stressful, we want to get this looked at quickly. Is this for a home in the Keller area?' },
  { role: 'caller', text: 'Yes, 1042 Oak Street. As soon as possible please.' },
  { role: 'agent', text: 'Understood, you are in our service area. I have flagged this as urgent, someone will call you first thing this morning to schedule an inspection.' },
  { role: 'system', text: 'Lead qualified · Urgent flag set · Owner notified' },
]

export function DispatchConsole() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= SCRIPT.length) {
      const reset = setTimeout(() => setCount(0), 3500)
      return () => clearTimeout(reset)
    }
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 600 : 1100)
    return () => clearTimeout(t)
  }, [count])

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-6 top-0 z-10 h-24 bg-gradient-to-b from-primary/10 to-transparent"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--signal)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            dispatch.log · live
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--signal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] animate-signal" />
            rec
          </span>
        </div>

        {/* transcript */}
        <div className="relative min-h-[22rem] space-y-3 p-5 font-mono text-sm">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/[0.06] to-transparent animate-scan"
            aria-hidden
          />
          {SCRIPT.slice(0, count).map((line, i) => (
            <ConsoleLine key={i} line={line} />
          ))}
          {count < SCRIPT.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-primary align-middle" aria-hidden />
          )}
        </div>
      </div>
    </div>
  )
}

function ConsoleLine({ line }: { line: Line }) {
  if (line.role === 'system') {
    const done = line.text.includes('booked') || line.text.includes('qualified')
    return (
      <div className="flex items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground">
        {done && <CheckCircle2 className="h-3.5 w-3.5 text-[var(--signal)]" />}
        <span dangerouslySetInnerHTML={{ __html: line.text }} />
      </div>
    )
  }
  const isAgent = line.role === 'agent'
  return (
    <div className="flex flex-col gap-1">
      <span
        className={
          isAgent
            ? 'text-[0.65rem] uppercase tracking-widest text-primary'
            : 'text-[0.65rem] uppercase tracking-widest text-muted-foreground'
        }
      >
        {isAgent ? 'TenFour Agent' : 'Caller'}
      </span>
      <p
        className={
          isAgent
            ? 'leading-relaxed text-foreground'
            : 'leading-relaxed text-muted-foreground'
        }
        dangerouslySetInnerHTML={{ __html: line.text }}
      />
    </div>
  )
}
