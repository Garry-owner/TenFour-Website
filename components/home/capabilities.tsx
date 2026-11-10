import {
  PhoneCall,
  ClipboardCheck,
  CalendarClock,
  MessageSquareText,
  BellRing,
  ShieldCheck,
} from 'lucide-react'
import { HomeHeading } from '@/components/home/home-heading'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'

const ICONS = [PhoneCall, ClipboardCheck, CalendarClock, MessageSquareText, BellRing, ShieldCheck]

export function Capabilities({ locale }: { locale: Locale }) {
  const t = getCopy(locale).capabilities

  return (
    <section className="border-b-2 border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <HomeHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-10 grid gap-[2px] border-2 border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map(({ title, body }, index) => {
            const Icon = ICONS[index]
            return (
              <div key={title} className="flex flex-col gap-4 bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center border-2 border-border bg-background text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-condensed text-2xl font-extrabold uppercase leading-tight tracking-[0.02em]">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
