'use client'

import { useState } from 'react'
import { PLAN_FEATURES, lockedGate } from '@/lib/admin/gates'
import { sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import { useConfirm } from '@/components/admin/confirm'
import type { PlanFeature, PlanGates } from '@/lib/admin/types'

export function PlanGatesForm({ gates, live }: { gates: PlanGates; live: boolean }) {
  const [value, setValue] = useState(gates)
  const toast = useToast()
  const confirm = useConfirm()
  const plans = ['base', 'pro', 'elite'] as const
  return (
    <form
      className="admin-rise flex flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault()
        if (!(await confirm('Save plan features', 'This changes what Base, Pro, and Elite clients get on the board and in the client portal.'))) return
        const result = await sendJson('/api/admin/desk', 'POST', { action: 'gates', gates: value, confirm: true })
        toast(result.ok ? 'Plan features saved.' : result.message, result.ok)
      }}
    >
      <h1 className="admin-title">Plan features</h1>
      <p className="admin-muted">Turn features on or off for Base, Pro, and Elite. Client records show what their plan includes. Grey boxes are fixed: every plan gets the client login and caller list, and review requests are Pro and Elite only. {!live && 'The private store is not ready, so this will not save.'}</p>
      {PLAN_FEATURES.map((feature) => (
        <section key={feature.id} className="admin-panel flex flex-col gap-2">
          <h2>{feature.label}</h2>
          <p className="admin-muted">{feature.detail}</p>
          <div className="flex gap-3">
            {plans.map((plan) => (
              <label key={plan} className="flex items-center gap-1" title={lockedGate(plan, feature.id) === null ? undefined : 'Set by your plan rules'}>
                <input
                  type="checkbox"
                  disabled={lockedGate(plan, feature.id) !== null}
                  checked={lockedGate(plan, feature.id) ?? value[plan][feature.id]}
                  onChange={(event) => setValue({
                    ...value,
                    [plan]: { ...value[plan], [feature.id]: event.target.checked } as Record<PlanFeature, boolean>,
                  })}
                />
                {plan}
              </label>
            ))}
          </div>
        </section>
      ))}
      <button className="admin-btn" type="submit">Save plan features</button>
    </form>
  )
}
