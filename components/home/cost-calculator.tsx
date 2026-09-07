'use client'

import { useState } from 'react'
import styles from './cost-calculator.module.css'

const TRADES = [
  { name: 'Roofing', value: 9000 },
  { name: 'HVAC', value: 8000 },
  { name: 'Plumbing', value: 350 },
  { name: 'Electrical', value: 350 },
  { name: 'Restoration', value: 3900 },
  { name: 'Garage Doors', value: 350 },
  { name: 'Landscaping', value: 1500 },
  { name: 'Pest Control', value: 180 },
  { name: 'Solar', value: 22000 },
  { name: 'Foundation Repair', value: 6000 },
  { name: 'Fencing', value: 3200 },
  { name: 'Tree Service', value: 850 },
  { name: 'General Contracting', value: 5000 },
]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export function CostCalculator() {
  const [calls, setCalls] = useState(6)
  const [value, setValue] = useState(9000)
  const [rate, setRate] = useState(30)

  const monthly = calls * 4.33 * (rate / 100) * value
  const yearly = monthly * 12

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Free tool</p>
      <h3 className={styles.heading}>What are missed calls costing you?</h3>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="trade">
          Trade
        </label>
        <select
          id="trade"
          className={styles.select}
          onChange={(e) => setValue(Number(e.target.value))}
          defaultValue={9000}
        >
          {TRADES.map((t) => (
            <option key={t.name} value={t.value}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label className={styles.label} htmlFor="calls">
            Missed calls per week
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
            Average job value
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
            Estimated close rate
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
          <p className={styles.resultLabel}>Estimated / month</p>
          <p className={styles.resultValue}>{fmt(monthly)}</p>
        </div>
        <div>
          <p className={styles.resultLabel}>Estimated / year</p>
          <p className={styles.resultValue}>{fmt(yearly)}</p>
        </div>
      </div>

      <p className={styles.formula}>
        formula: (missed calls per week &times; 4.33 weeks) &times; close rate &times; average job value.
      </p>

      <p className={styles.sources}>
        Job value estimates based on 2026 national and Texas-regional pricing data from Angi, HomeAdvisor, and
        Consumer Affairs. Your actual job values may differ, adjust the sliders to match your business.
      </p>
    </div>
  )
}
