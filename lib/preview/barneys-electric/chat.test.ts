import assert from 'node:assert/strict'
import test from 'node:test'
import { QUICK_QUESTIONS } from './content'
import { respond } from './chat'

const BLOCKED = [/you(?:'|’)re booked/i, /\bi (?:have )?scheduled\b/i, /appointment is (?:set|confirmed)/i, /\bi can book\b/i]

for (const question of QUICK_QUESTIONS) {
  test(`quick question stays inside the facts: ${question}`, () => {
    const { replies } = respond(question, {})
    const text = replies.join(' ')
    assert.ok(text.length > 40)
    assert.match(text, /do not (?:book|dispatch)/i)
    for (const pattern of BLOCKED) assert.doesNotMatch(text, pattern)
  })
}

test('free estimates mention the daytime number', () => {
  const { replies } = respond('Do you give free estimates?', {})
  assert.match(replies.join(' '), /\(972\) 771-9464/)
})

test('emergency help mentions the 24-hour number', () => {
  const { replies } = respond('24-hour emergency help', {})
  assert.match(replies.join(' '), /\(214\) 282-5842/)
})

test('a name and phone are passed along without booking', () => {
  const { replies, lead } = respond('Linda Garcia 469-555-0148', {})
  assert.equal(lead.name, 'Linda Garcia')
  assert.equal(lead.phone, '4695550148')
  assert.match(replies.join(' '), /do not book/i)
  assert.match(replies.join(' '), /\(469\) 555-0148/)
})

test('a lone first name is not enough until a number is expected', () => {
  const first = respond('Linda', {})
  assert.equal(first.lead.name, undefined)
  const second = respond('Linda', { phone: '4695550148' })
  assert.equal(second.lead.name, 'Linda')
  assert.match(second.replies.join(' '), /call you back/i)
})
