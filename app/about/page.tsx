import type { Metadata } from 'next'
import { MapPin, Radio, Wrench, Gauge } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'About. TenFour Systems',
  description:
    'TenFour Systems is a Terrell, Texas company on a mission to make sure no home-service business ever loses a job to a missed call again.',
}

const VALUES = [
  {
    icon: Radio,
    title: 'Always on the air',
    body: '"Ten-four" means message received. That is the promise: every call gets received, acknowledged, and handled.',
  },
  {
    icon: Wrench,
    title: '35 plus years in IT',
    body: 'Decades building and running technical systems, plus a background in commercial insurance, mean this is built by someone who understands both the automation and the risk.',
  },
  {
    icon: Gauge,
    title: 'Speed wins jobs',
    body: 'The first business to answer usually wins the work. TenFour makes sure that business is always yours.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="No job lost to a missed call. Ever."
        description="TenFour Systems was built for the owner who's up on the roof, under the sink, or asleep after a 14 hour day, and can't get to the phone."
      />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Our Story"
            title="I work the second shift so you don't have to"
            description="Home service owners are the hardest working people I know. But there are only so many hours in a day, and the calls never stop coming."
          />
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              I started TenFour Systems after watching great local contractors lose real money to
              something completely fixable: a phone that rang when nobody could pick it up. A leak at
              midnight, a storm on a Saturday, a customer who simply calls the next name on the list.
            </p>
            <p>
              With over 35 years in IT, plus a background in commercial insurance, I built a system
              that never clocks out. The moment a call goes unanswered, it texts that caller back in
              your business name, qualifies them over text, and gets them ready to book, then hands
              you the lead with everything you need to show up ready.
            </p>
            <p>
              I&apos;m proud to be based in Terrell, Texas, serving home-service businesses that
              refuse to let a ringing phone go to waste.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What I Believe"
            title="The principles behind the dispatcher"
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Proudly based in Terrell, Texas
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's make sure you never miss another one."
        subtitle="See how fast Roger catches a missed call and texts your next customer back. Book a demo today."
      />
    </main>
  )
}
