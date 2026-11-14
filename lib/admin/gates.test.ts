import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mergeGates } from './gates.ts'

test('Base can never get review requests, even if saved that way', () => {
  const gates = mergeGates({ base: { reviews: true }, pro: { reviews: true }, elite: { reviews: true } })
  assert.equal(gates.base.reviews, false)
  assert.equal(gates.pro.reviews, true)
  assert.equal(gates.elite.reviews, true)
})

test('Every plan keeps the basic client portal and caller list', () => {
  const gates = mergeGates({
    base: { portal: false, leads: false },
    pro: { portal: false, leads: false },
    elite: { portal: false, leads: false },
  })
  for (const plan of ['base', 'pro', 'elite'] as const) {
    assert.equal(gates[plan].portal, true)
    assert.equal(gates[plan].leads, true)
  }
})

test('Empty settings still follow the plan rules', () => {
  const gates = mergeGates(null)
  assert.equal(gates.base.reviews, false)
  assert.equal(gates.base.portal, true)
})
