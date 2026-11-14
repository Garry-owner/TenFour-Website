import assert from 'node:assert/strict'
import { test } from 'node:test'
import { normalizeMonthly, scenarioTogglePlan, searchHit } from './policies.ts'

test('scenario 6998096 cannot be turned on or off', () => {
  const on = scenarioTogglePlan(6998096, true, 'token')
  const off = scenarioTogglePlan(6998096, false, 'token')
  assert.equal(on.ok, false)
  assert.equal(off.ok, false)
  if (!on.ok) assert.match(on.message, /6998096/)
})

test('a missing Make token does not build a write URL', () => {
  const plan = scenarioTogglePlan(3767837, false, undefined)
  assert.equal(plan.ok, false)
  if (!plan.ok) assert.match(plan.message, /MAKE_API_TOKEN/)
})

test('a real toggle targets Make start or stop and nowhere else', () => {
  const plan = scenarioTogglePlan(3767837, true, 'token')
  assert.equal(plan.ok, true)
  if (plan.ok) {
    assert.equal(plan.method, 'POST')
    assert.equal(plan.url, 'https://us2.make.com/api/v2/scenarios/3767837/start')
  }
})

test('old monthly labels fold into the current set', () => {
  assert.equal(normalizeMonthly('current'), 'active')
  assert.equal(normalizeMonthly('not_started'), 'active')
  assert.equal(normalizeMonthly('canceled'), 'cancelled')
})

test('search matches a phone fragment', () => {
  assert.equal(searchHit('555-0142', ['Mara', '(214) 555-0142']), true)
  assert.equal(searchHit('a', ['Mara']), false)
})
