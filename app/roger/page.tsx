import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Meet Roger. TenFour Systems',
  description: "The name behind TenFour's AI dispatcher, and where it comes from.",
}

export default function RogerPage() {
  return (
    <main>
      <PageHero
        eyebrow="Meet Roger"
        title="The one who never misses a call"
        description="Roger is TenFour's AI dispatcher, on the job 24/7."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-border">
            <Image src="/roger-avatar.png" alt="Roger" width={96} height={96} />
          </div>
          <div className="space-y-4 text-pretty text-muted-foreground">
            <p>
              The name comes from an old radio callsign, ten-four, message received. That&apos;s
              Roger&apos;s whole job. He doesn&apos;t sleep, doesn&apos;t take lunch, and
              doesn&apos;t let a call go unanswered.
            </p>
            <p>
              The moment a call to your business goes unanswered, Roger texts that caller back
              within seconds, before they can call the next name on their list. He asks the right
              questions for your trade, gets the details you need, and hands you a ready lead,
              all before the phone would&apos;ve rung a fourth time.
            </p>
            <p>
              Roger doesn&apos;t answer live calls today, that&apos;s honest, and it&apos;s by
              design. What he does is faster than voicemail and cheaper than a full-time
              dispatcher, and he never has an off day.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="See Roger catch a missed call"
        subtitle="Book a demo and watch exactly how it works."
      />
    </main>
  )
}
