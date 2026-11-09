import { Reveal } from '@/components/home/reveal'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

export function Proof({ locale }: { locale: Locale }) {
  const t = getCopy(locale).proof

  return (
    <section className={styles.proof}>
      <div className={cn(styles.wrap, styles.plates)}>
        {t.items.map((item) => (
          <Reveal key={item.k} className={styles.plate}>
            <i className={styles.rivet} />
            <i className={styles.rivet} />
            <i className={styles.rivet} />
            <i className={styles.rivet} />
            <span className={styles.plateKey}>{item.k}</span>
            <span className={styles.plateValue}>{item.v}</span>
            <span className={styles.plateNote}>{item.note}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
