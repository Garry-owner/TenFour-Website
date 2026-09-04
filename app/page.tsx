import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { Problem } from '@/components/home/problem'
import { Capabilities } from '@/components/home/capabilities'
import { Steps } from '@/components/steps'
import { Proof } from '@/components/home/proof'
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
      <CtaBand />
    </main>
  )
}
