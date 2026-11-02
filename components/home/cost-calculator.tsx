"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import type { Locale } from "@/lib/locale"
import { TRADES } from "@/lib/trades"
import styles from "./cost-calculator.module.css"

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    trade: string
    calls: string
    value: string
    rate: string
    month: string
    year: string
    formula: string
    sources: string
  }
> = {
  en: {
    eyebrow: "Free tool",
    heading: "What are missed calls costing you?",
    trade: "Trade",
    calls: "Missed calls per week",
    value: "Average job value",
    rate: "Estimated close rate",
    month: "Estimated / month",
    year: "Estimated / year",
    formula:
      "formula: (missed calls per week × 4.33 weeks) × close rate × average job value.",
    sources:
      "Job value estimates based on 2026 national and Texas-regional pricing data from Angi, HomeAdvisor, and Consumer Affairs. Your actual job values may differ, adjust the sliders to match your business.",
  },
  es: {
    eyebrow: "Herramienta gratis",
    heading: "¿Cuánto te cuestan las llamadas perdidas?",
    trade: "Oficio",
    calls: "Llamadas perdidas por semana",
    value: "Valor promedio del trabajo",
    rate: "Tasa de cierre estimada",
    month: "Estimado / mes",
    year: "Estimado / año",
    formula:
      "fórmula: (llamadas perdidas por semana × 4.33 semanas) × tasa de cierre × valor promedio del trabajo.",
    sources:
      "Los valores estimados de los trabajos se basan en datos de precios nacionales y de la región de Texas de 2026, de Angi, HomeAdvisor y Consumer Affairs. Los valores reales de tus trabajos pueden ser distintos. Ajusta los deslizadores para que coincidan con tu negocio.",
  },
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export function CostCalculator({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]
  const [calls, setCalls] = useState(6)
  const [value, setValue] = useState(9000)
  const [rate, setRate] = useState(30)

  const monthly = calls * 4.33 * (rate / 100) * value
  const yearly = monthly * 12

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h3 className={styles.heading}>{copy.heading}</h3>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="trade">
          {copy.trade}
        </label>
        <select
          id="trade"
          className={styles.select}
          defaultValue={9000}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setValue(newValue)
            const trade = TRADES.find((t) => t.value === newValue)
            track("calculator_trade_selected", { trade: trade?.id ?? "unknown" })
          }}
        >
          {TRADES.map((t) => (
            <option key={t.id} value={t.value}>
              {t[locale]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label className={styles.label} htmlFor="calls">
            {copy.calls}
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
            {copy.value}
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
            {copy.rate}
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
          <p className={styles.resultLabel}>{copy.month}</p>
          <p className={styles.resultValue}>{fmt(monthly)}</p>
        </div>
        <div>
          <p className={styles.resultLabel}>{copy.year}</p>
          <p className={styles.resultValue}>{fmt(yearly)}</p>
        </div>
      </div>

      <p className={styles.formula}>{copy.formula}</p>

      <p className={styles.sources}>{copy.sources}</p>
    </div>
  )
}
