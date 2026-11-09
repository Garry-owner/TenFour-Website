import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { Problem } from '@/components/home/problem'
import { Capabilities } from '@/components/home/capabilities'
import { HomeSteps } from '@/components/home/home-steps'
import { Proof } from '@/components/home/proof'
import { CostCalculator } from '@/components/home/cost-calculator'
import { HomeCta } from '@/components/home/home-cta'
import type { Locale } from '@/lib/locale'

// Same sections, in the same order, as the current site.
// The homepage always uses the black theme so the orange reads the same everywhere.
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <main className="dark bg-background font-barlow text-foreground">
      <Hero locale={locale} />
      <Industries locale={locale} />
      <Problem locale={locale} />
      <Capabilities locale={locale} />
      <HomeSteps locale={locale} />
      <Proof locale={locale} />
      <section className="border-b-2 border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CostCalculator />
        </div>
      </section>
      <HomeCta locale={locale} />
    </main>
  )
}
