import { Reveal } from '@/components/home/reveal'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

export function Problem({ locale }: { locale: Locale }) {
  const t = getCopy(locale).problem

  return (
    <section className={styles.problem}>
      <div className={styles.wrap}>
        <Reveal className={styles.problemHead}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={cn(styles.stencil, styles.problemTitle)}>{t.title}</h2>
          <p className={styles.lede}>{t.description}</p>
        </Reveal>

        <div className={styles.ledger}>
          {t.cards.map(({ stat, label, body }, index) => (
            <Reveal key={label} className={styles.ledgerRow} fromRight={index === 1}>
              <div className={styles.big}>{stat}</div>
              <div>
                <p className={styles.ledgerLabel}>{label}</p>
                <p className={styles.ledgerBody}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className={styles.note}>{t.note}</p>
      </div>
    </section>
  )
}
