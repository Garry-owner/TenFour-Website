import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { Problem } from '@/components/home/problem'
import { Capabilities } from '@/components/home/capabilities'
import { HomeRoute } from '@/components/home/home-route'
import { Proof } from '@/components/home/proof'
import { CostCalculator } from '@/components/home/cost-calculator'
import { HomeCta } from '@/components/home/home-cta'
import { Reveal } from '@/components/home/reveal'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from '@/components/home/industrial.module.css'

// The homepage keeps its work truck look in both light and dark mode,
// so it always uses the dark theme tokens inside.
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <main className={cn('dark', styles.home)}>
      <Hero locale={locale} />
      <div className={styles.hazard} aria-hidden="true" />
      <Industries locale={locale} />
      <Problem locale={locale} />
      <div className={styles.hazard} aria-hidden="true" />
      <Capabilities locale={locale} />
      <HomeRoute locale={locale} />
      <Proof locale={locale} />
      <section className={styles.calc}>
        <div className={styles.wrap}>
          <Reveal>
            <CostCalculator />
          </Reveal>
        </div>
      </section>
      <div className={styles.hazard} aria-hidden="true" />
      <HomeCta locale={locale} />
      <div className={styles.hazard} aria-hidden="true" />
    </main>
  )
}
