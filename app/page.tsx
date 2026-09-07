import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { Problem } from '@/components/home/problem'
import { Capabilities } from '@/components/home/capabilities'
import { Steps } from '@/components/steps'
import { Proof } from '@/components/home/proof'
import { CostCalculator } from '@/components/home/cost-calculator'
import { CtaBand } from '@/components/cta-band'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Industries />
      <Problem />
      <Capabilities />
      <Steps />
      <Proof />
      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CostCalculator />
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
