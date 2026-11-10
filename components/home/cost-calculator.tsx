'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { CtaButton } from '@/components/cta-button'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'
import styles from './cost-calculator.module.css'

const TRADES = [
  { id: 'Roofing', value: 9000 },
  { id: 'HVAC', value: 8000 },
  { id: 'Plumbing', value: 350 },
  { id: 'Electrical', value: 350 },
  { id: 'Restoration', value: 3900 },
  { id: 'Garage Doors', value: 350 },
  { id: 'Landscaping', value: 1500 },
  { id: 'Pest Control', value: 180 },
  { id: 'Solar', value: 22000 },
  { id: 'Foundation Repair', value: 6000 },
  { id: 'Fencing', value: 3200 },
  { id: 'Tree Service', value: 850 },
  { id: 'General Contracting', value: 5000 },
]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export function CostCalculator() {
  const locale = useLocale()
  const copy = getCopy(locale)
  const t = copy.calculator
  const [calls, setCalls] = useState(3)
  const [value, setValue] = useState(1500)
  const [rate, setRate] = useState(20)

  const monthly = calls * 4.33 * (rate / 100) * value
  const yearly = monthly * 12

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h3 className={styles.heading}>{t.heading}</h3>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="trade">
          {t.trade}
        </label>
        <select
          id="trade"
          className={styles.select}
          defaultValue=""
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setValue(newValue)
            const trade = TRADES.find((item) => item.value === newValue)
            track('calculator_trade_selected', { trade: trade?.id ?? 'unknown' })
          }}
        >
          <option value="" disabled>
            {t.choose}
          </option>
          {TRADES.map((item, index) => (
            <option key={item.id} value={item.value}>
              {t.trades[index]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label className={styles.label} htmlFor="calls">
            {t.calls}
          </label>
          <span className={styles.readout}>{calls}</span>
        </div>
        <input
          id="calls"
          type="range"
          min={1}
          max={30}
          step={1}
          value={calls}
          onChange={(e) => setCalls(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label className={styles.label} htmlFor="value">
            {t.value}
          </label>
          <span className={styles.readout}>{fmt(value)}</span>
        </div>
        <input
          id="value"
          type="range"
          min={100}
          max={30000}
          step={50}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label className={styles.label} htmlFor="rate">
            {t.rate}
          </label>
          <span className={styles.readout}>{rate}%</span>
        </div>
        <input
          id="rate"
          type="range"
          min={10}
          max={60}
          step={5}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.results}>
        <div>
          <p className={styles.resultLabel}>{t.month}</p>
          <p className={styles.resultValue}>{fmt(monthly)}</p>
        </div>
        <div>
          <p className={styles.resultLabel}>{t.year}</p>
          <p className={styles.resultValue}>{fmt(yearly)}</p>
        </div>
      </div>

      <CtaButton
        href={lp(locale, '/contact')}
        size="lg"
        className="mt-5 w-full sm:w-auto"
        onClick={() => track('calculator_waitlist_click')}
      >
        {copy.cta.book}
      </CtaButton>

      <p className={styles.formula}>
        {t.formula}
      </p>

      <p className={styles.formula}>{t.estimate}</p>

      <p className={styles.sources}>
        {t.sources}
      </p>
    </div>
  )
}
