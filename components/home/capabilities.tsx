import {
  PhoneCall,
  ClipboardCheck,
  CalendarClock,
  MessageSquareText,
  BellRing,
  ShieldCheck,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [PhoneCall, ClipboardCheck, CalendarClock, MessageSquareText, BellRing, ShieldCheck]

export function Capabilities({ locale }: { locale: Locale }) {
  const t = getCopy(locale).capabilities

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map(({ title, body }, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={title}
                className="group flex flex-col gap-4 bg-card p-7 transition-colors hover:bg-secondary/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/50">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
