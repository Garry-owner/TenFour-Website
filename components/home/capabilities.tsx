import { Reveal } from '@/components/home/reveal'
import { WorkOrder } from '@/components/home/work-order'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

export function Capabilities({ locale }: { locale: Locale }) {
  const t = getCopy(locale).capabilities

  return (
    <section className={styles.system}>
      <div className={cn(styles.wrap, styles.systemGrid)}>
        <Reveal className={styles.systemIntro}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={cn(styles.stencil, styles.systemTitle)}>{t.title}</h2>
          <p>{t.description}</p>
        </Reveal>
        <Reveal fromRight>
          <div className={styles.clipboard}>
            <div className={styles.clip} aria-hidden="true" />
            <div className={styles.sheet}>
              <WorkOrder items={t.items} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
