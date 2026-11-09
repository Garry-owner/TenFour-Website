import { Reveal } from '@/components/home/reveal'
import { getCopy } from '@/lib/copy'
import type { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

// How it works on the homepage, drawn as a road with mile markers.
// The shared Steps component used on the How It Works page is unchanged.
export function HomeRoute({ locale }: { locale: Locale }) {
  const t = getCopy(locale).steps

  return (
    <section className={styles.route}>
      <div className={styles.wrap}>
        <Reveal className={styles.routeHead}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 className={cn(styles.stencil, styles.routeTitle)}>{t.title}</h2>
          <p className={styles.lede}>{t.description}</p>
        </Reveal>
        <ol className={styles.road}>
          {t.items.map((step, index) => (
            <li key={step.title}>
              <Reveal className={styles.stop} fromRight={index % 2 === 1}>
                <div className={styles.marker}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.stopBody}>
                  <h3 className={styles.stopTitle}>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
