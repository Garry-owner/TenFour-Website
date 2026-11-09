import Link from 'next/link'
import Image from 'next/image'
import { MessageSquareText } from 'lucide-react'
import { DispatchBoard } from '@/components/home/dispatch-board'
import { getCopy } from '@/lib/copy'
import { lp, type Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import styles from './industrial.module.css'

export function Hero({ locale }: { locale: Locale }) {
  const t = getCopy(locale).hero

  return (
    <section className={styles.hero}>
      <div className={cn(styles.wrap, styles.heroGrid)}>
        <span className={styles.badge}>
          <span className={styles.led} aria-hidden="true" />
          {t.badge}
        </span>

        <h1 className={cn(styles.stencil, styles.heroTitle)}>
          {t.titleBefore}
          <span className={styles.tape}>{t.titleEmphasis}</span>
          {t.titleAfter}
        </h1>

        <DispatchBoard />

        <p className={styles.heroBody}>{t.body}</p>

        <div className={styles.roger}>
          <Image src="/roger-avatar.png" alt={t.rogerAlt} width={48} height={48} />
          <p>{t.roger}</p>
        </div>

        <div className={styles.ctas}>
          <Link href={lp(locale, '/contact')} className={cn(styles.btn, styles.btnSolid)}>
            <MessageSquareText aria-hidden="true" />
            {t.primary}
          </Link>
          <Link href={lp(locale, '/how-it-works')} className={cn(styles.btn, styles.btnLine)}>
            {t.secondary}
          </Link>
        </div>

        <dl className={styles.stats}>
          {t.stats.map(({ k, v }) => (
            <div key={v}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
