import Link from 'next/link'
import { Reveal } from '@/components/home/reveal'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

// The closing band on the homepage. Other pages keep the shared CtaBand.
export function HomeCta({ locale }: { locale: Locale }) {
  const t = getCopy(locale).cta

  return (
    <section className={styles.cta}>
      <div className={cn(styles.wrap, styles.ctaInner)}>
        <Reveal>
          <h2 className={cn(styles.stencil, styles.ctaTitle)}>{t.title}</h2>
        </Reveal>
        <Reveal className={styles.ctaSide} fromRight>
          <p>{t.subtitle}</p>
          <div className={styles.ctaButtons}>
            <Link href={lp(locale, '/contact')} className={cn(styles.btn, styles.btnSolid)}>
              {t.book}
            </Link>
            <Link href={lp(locale, '/pricing')} className={cn(styles.btn, styles.btnLine)}>
              {t.pricing}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
