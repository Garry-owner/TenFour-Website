import { Reveal } from '@/components/home/reveal'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

export function Industries({ locale }: { locale: Locale }) {
  const t = getCopy(locale).industries

  return (
    <section className={styles.trades} aria-labelledby="trades-eyebrow">
      <Reveal className={cn(styles.wrap, styles.tradesTop)}>
        <span className={styles.eyebrow} id="trades-eyebrow">
          {t.eyebrow}
        </span>
        <p>{t.description}</p>
      </Reveal>
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          <ul>
            {t.items.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
          <ul className={styles.tickerCopy} aria-hidden="true">
            {t.items.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
