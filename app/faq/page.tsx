import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'FAQ. TenFour Systems',
  description: 'Common questions about how TenFour and Roger actually work.',
}

const FAQS = [
  {
    q: 'Does Roger replace my receptionist?',
    a: "Not entirely. Roger catches the calls nobody could get to, missed calls, after-hours, mid-job, and turns them into qualified, ready-to-book leads over text. It's built for the calls that would have gone to voicemail, not to replace a front desk you already have covered.",
  },
  {
    q: 'Does Roger answer the phone live?',
    a: "No, and we're upfront about that. Roger works entirely over text. The moment a call to your business goes unanswered, Roger texts that customer back within seconds, asks the right questions for your trade, and hands you a ready lead. There's no live voice conversation today.",
  },
  {
    q: "What happens after hours or on weekends?",
    a: "The same thing that happens during the day. Roger doesn't have hours, he watches for missed calls 24/7/365, including nights, weekends, and holidays.",
  },
  {
    q: 'Do I need to change my phone number?',
    a: 'No. Roger works alongside your existing business number using a standard phone feature called conditional call forwarding, only unanswered calls get forwarded to Roger. Your number stays exactly the same, and answered calls work exactly like they do today.',
  },
  {
    q: 'How fast does Roger actually respond?',
    a: 'Within seconds of a call going unanswered, well before most callers give up and dial the next business on their list.',
  },
  {
    q: 'What if a customer wants pricing right away?',
    a: "Roger never gives firm pricing or arrival times over text. He qualifies the lead, service type, location, urgency, and gets them ready to book, then hands that lead straight to you with full details so you can follow up with real numbers.",
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. TenFour runs month to month.',
  },
]

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Questions people actually ask"
        description="Straight answers about how Roger works, no hype."
      />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6">
          {FAQS.map((item) => (
            <div key={item.q} className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">{item.q}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        subtitle="Book a demo and we'll walk through exactly how it would work for your business."
      />
    </main>
  )
}
