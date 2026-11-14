'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sheet, sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import { useConfirm } from '@/components/admin/confirm'
import { heatMap } from '@/lib/admin/insights'
import { TRADE_SCRIPTS, fillScript } from '@/lib/admin/templates'
import { formatCentral, formatPhone, monthlyLabel, moneyGrouped, planName, setupLabel } from '@/lib/admin/format'
import type { DeskPayload } from '@/lib/admin/load-desk'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CONFIRM_TEXT: Record<string, { title: string; body: string }> = {
  billing: { title: 'Save job value', body: 'This saves the average job value used for money caught.' },
  settings: { title: 'Save client settings', body: 'This saves the booking link, hours, alert phone, alert email, and alert language on the board. Nothing is sent.' },
  texts: { title: 'Save Roger texts', body: 'This saves the greeting and questions on the board. Roger is not texting live yet.' },
  onboard: { title: 'Update onboarding', body: 'This updates the onboarding checklist.' },
  referral: { title: 'Save this', body: 'This saves it on the client record. Nothing is sent.' },
  holiday: { title: 'Add closed date', body: 'Roger will use the closed message on that date once he is live.' },
  'portal-code': { title: 'Save portal code', body: 'This replaces any old portal code. You will not see the code again.' },
}

export function ClientDesk({ data }: { data: DeskPayload }) {
  const toast = useToast()
  const confirmBox = useConfirm()
  const router = useRouter()
  const client = data.client
  const roger = data.roger
  const [confirm, setConfirm] = useState<{ title: string; body: string; run: () => Promise<void> } | null>(null)
  const [busy, setBusy] = useState(false)
  const [greeting, setGreeting] = useState(roger?.textBack || '')
  const [questions, setQuestions] = useState(roger?.questions || '')
  const [booking, setBooking] = useState(roger?.bookingLink || client.bookingLink)
  const [hours, setHours] = useState(client.hours)
  const [alertPhone, setAlertPhone] = useState(roger?.leadPhone || client.ownerCell)
  const [alertEmail, setAlertEmail] = useState(roger?.leadEmail || client.email)
  const [language, setLanguage] = useState(roger?.alertLanguage || 'en')
  const [pauseDate, setPauseDate] = useState(roger?.pausedUntil || '')
  const [job, setJob] = useState(client.avgJobCents ? String(client.avgJobCents / 100) : '')
  const [refer, setRefer] = useState(client.referredBy)
  const [credit, setCredit] = useState(client.referralCredit)
  const [reviewUrl, setReviewUrl] = useState(client.reviewUrl)
  const [closed, setClosed] = useState(roger?.closedMessage || '')
  const [note, setNote] = useState('')
  const [due, setDue] = useState('')
  const [blockPhone, setBlockPhone] = useState('')
  const [holiday, setHoliday] = useState('')
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 8) + '01')
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10))
  const [thread, setThread] = useState<string | null>(null)
  const [takeover, setTakeover] = useState('')
  const heat = useMemo(() => heatMap(data.calls), [data.calls])
  const missed = data.calls.filter((call) => call.outcome === 'Missed').slice(0, 4)
  const monthCaught = data.calls.filter((call) => call.outcome === 'Missed').length

  // Sends after a confirm has already been shown (the ask sheet below).
  async function send(action: string, extra: Record<string, unknown>, ok: string) {
    if (client.example) {
      toast('This is example data. Nothing was saved.', false)
      return
    }
    const result = await sendJson('/api/admin/desk', 'POST', { action, clientId: client.id, ...extra, confirm: true })
    toast(result.ok ? result.message || ok : result.message, result.ok)
    if (result.ok) router.refresh()
  }

  // Every save on this screen asks first, then sends.
  async function run(action: string, extra: Record<string, unknown>, ok: string) {
    if (client.example) {
      toast('This is example data. Nothing was saved.', false)
      return
    }
    const step = CONFIRM_TEXT[action] || { title: 'Save this change', body: 'This saves the change on the private board. Nothing is sent.' }
    if (!(await confirmBox(step.title, `${step.body} Client: ${client.businessName}.`))) return
    await send(action, extra, ok)
  }

  function ask(title: string, body: string, runAction: () => Promise<void>) {
    setConfirm({ title, body, run: runAction })
  }

  const preview = `${greeting || 'The greeting shows here.'}\n\n${questions || 'Questions show here.'}${booking ? `\n\nBook here: ${booking}` : ''}`

  return (
    <div className="flex flex-col gap-4" data-safe-keep="true">
      <section className="admin-panel flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="admin-muted">Quick card</p>
            <h2 className="text-xl font-semibold">{client.businessName}</h2>
          </div>
          {client.example && <span className="admin-pill">Example data</span>}
        </div>
        <p className="admin-muted">Plan, pay, the Roger number, hours, and the latest callers. One screen.</p>
        <p><span className="admin-pii">{planName(client.plan)}</span> · Setup {setupLabel(client.founding, client.setupPaid)} · {monthlyLabel(client.monthlyStatus)}</p>
        <p>Roger number <span className="admin-pii">{formatPhone(client.phone)}</span></p>
        <p className="admin-break">{booking || 'No booking link yet'}</p>
        <p>{hours || 'No hours yet'}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <p className="admin-muted">Last leads</p>
            {data.leads.length === 0 ? <p>No leads match this number.</p> : data.leads.slice(0, 3).map((lead) => (
              <p key={lead.id} className="admin-pii">{lead.firstName} {lead.lastName}</p>
            ))}
          </div>
          <div>
            <p className="admin-muted">Missed calls</p>
            {missed.length === 0 ? <p>None on this log.</p> : missed.map((call) => (
              <p key={call.callSid} className="admin-pii">{formatPhone(call.caller)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <h2>This plan includes</h2>
        <p className="admin-muted">Change what each plan gets under More, then Plan features.</p>
        {data.gatesNote && <p className="admin-muted">{data.gatesNote}</p>}
        <p>{data.includes.length ? data.includes.join(', ') : 'Nothing is turned on for this plan.'}</p>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Billing</h2>
        <p className="admin-muted">Plan, the next charge date, and whether they are past due.</p>
        <p>{planName(client.plan)} · Next charge {data.nextCharge}</p>
        <p>{client.monthlyStatus === 'past_due' ? 'Past due' : 'Not past due'}</p>
        <p>Money caught {data.money.ready ? moneyGrouped(data.money.dollars) : 'needs an average job value'} from {data.money.booked} booked</p>
        <label className="admin-muted">Average job value
          <input className="admin-field" inputMode="decimal" value={job} onChange={(event) => setJob(event.target.value)} />
        </label>
        <button type="button" className="admin-btn" onClick={() => run('billing', { avgJobCents: Math.round(Number(job || 0) * 100) }, 'Saved.')}>Save job value</button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>{roger?.enabled === false ? 'Roger is paused' : 'Roger is on'}</h2>
        <p className="admin-muted">Pause for a holiday or vacation. Add a date if he should turn back on by himself.</p>
        <input className="admin-field" type="date" value={pauseDate} onChange={(event) => setPauseDate(event.target.value)} />
        <button
          type="button"
          className="admin-btn"
          onClick={() => ask(roger?.enabled === false ? 'Resume Roger' : 'Pause Roger', 'This saves the pause on the board. Roger is not texting live yet.', () => send('pause', { confirm: true, enabled: roger?.enabled === false, pausedUntil: pauseDate }, 'Saved.'))}
        >
          {roger?.enabled === false ? 'Resume Roger' : 'Pause Roger'}
        </button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Client settings</h2>
        <p className="admin-muted">Booking link, hours, where alerts go, and the owner's language.</p>
        <input className="admin-field" value={booking} onChange={(event) => setBooking(event.target.value)} placeholder="Booking link" />
        <input className="admin-field" value={hours} onChange={(event) => setHours(event.target.value)} placeholder="Business hours" />
        <input className="admin-field" value={alertPhone} onChange={(event) => setAlertPhone(event.target.value)} placeholder="Alert phone" />
        <input className="admin-field" value={alertEmail} onChange={(event) => setAlertEmail(event.target.value)} placeholder="Alert email" />
        <select className="admin-field" value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="en">English alerts</option>
          <option value="es">Spanish alerts</option>
        </select>
        <button
          type="button"
          className="admin-btn"
          onClick={() => run('settings', {
            enabled: roger?.enabled !== false,
            textBack: greeting,
            questions,
            leadPhone: alertPhone,
            leadEmail: alertEmail,
            bookingLink: booking,
            alertLanguage: language,
            hours,
            closedMessage: closed,
          }, 'Saved.')}
        >
          Save settings
        </button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Roger's texts</h2>
        <p className="admin-muted">Greeting and questions. The preview updates before you save.</p>
        <textarea className="admin-area" value={greeting} onChange={(event) => setGreeting(event.target.value)} />
        <textarea className="admin-area" value={questions} onChange={(event) => setQuestions(event.target.value)} />
        <p className="admin-muted">Preview</p>
        <pre className="admin-note whitespace-pre-wrap">{preview}</pre>
        <button
          type="button"
          className="admin-btn"
          onClick={() => run('texts', {
            enabled: roger?.enabled !== false,
            textBack: greeting,
            questions,
            leadPhone: alertPhone,
            leadEmail: alertEmail,
            bookingLink: booking,
            alertLanguage: language,
          }, 'Saved.')}
        >
          Save texts
        </button>
        <label className="admin-muted">Copy a starter script
          <select
            className="admin-field"
            defaultValue=""
            onChange={(event) => {
              const script = TRADE_SCRIPTS.find((item) => item.trade === event.target.value)
              if (!script) return
              setGreeting(fillScript(script.greeting, client.businessName, booking))
              setQuestions(fillScript(script.questions, client.businessName, booking))
            }}
          >
            <option value="">Pick a trade</option>
            {TRADE_SCRIPTS.map((item) => <option key={item.trade}>{item.trade}</option>)}
          </select>
        </label>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Onboarding</h2>
        <p className="admin-muted">Check a step when it is done. Flag stuck if they are waiting on you.</p>
        {([
          ['onboardForm', 'Form done'],
          ['onboardNumber', 'Number set up'],
          ['onboardA2p', 'Carrier approval / A2P'],
          ['onboardTest', 'Test passed'],
          ['onboardLive', 'Live'],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(client[key])}
              onChange={(event) => run('onboard', { [key]: event.target.checked }, 'Saved.')}
            />
            {label}
          </label>
        ))}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={client.onboardStuck} onChange={(event) => run('onboard', { onboardStuck: event.target.checked }, 'Saved.')} />
          Stuck
        </label>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Texts with callers</h2>
        <p className="admin-muted">Original language on the left, English on the right. Takeover sends only when texting is wired.</p>
        {data.messages.length === 0 ? <p>No text threads yet.</p> : data.messages.map((message) => (
          <button key={message.id} type="button" className="admin-card text-left" onClick={() => setThread(message.caller)}>
            <span className="admin-pii">{formatPhone(message.caller)}</span>
            <span>{message.body}</span>
            <span className="admin-muted">{message.bodyEn}</span>
          </button>
        ))}
        {thread && (
          <div className="flex flex-col gap-2">
            <p>Thread <span className="admin-pii">{formatPhone(thread)}</span>{data.holds.includes(thread) ? ' · Roger paused on this thread' : ''}</p>
            <textarea className="admin-area" value={takeover} onChange={(event) => setTakeover(event.target.value)} placeholder="Your text to the caller" />
            <button
              type="button"
              className="admin-btn"
              disabled={!data.wired.sms}
              onClick={() => ask('Send your text', `This texts ${formatPhone(thread)} from ${formatPhone(client.phone)} and pauses Roger on that thread.`, () => send('takeover', { confirm: true, caller: thread, from: client.phone, body: takeover }, 'Sent.'))}
            >
              Take over this thread
            </button>
            {!data.wired.sms && <p className="admin-muted">Texting is not connected. Nothing will be sent.</p>}
          </div>
        )}
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Blocked numbers and STOP</h2>
        <p className="admin-muted">STOP replies are not connected yet, so that list stays empty until the feed is on. A block stays on this board only.</p>
        {data.optOuts.length === 0 ? <p>No STOP opt-outs.</p> : data.optOuts.map((row) => <p key={row.phone} className="admin-pii">{formatPhone(row.phone)}</p>)}
        {data.blocks.map((row) => <p key={row.id} className="admin-pii">{formatPhone(row.phone)} {row.reason}</p>)}
        <input className="admin-field" value={blockPhone} onChange={(event) => setBlockPhone(event.target.value)} placeholder="Number to block" />
        <button type="button" className="admin-btn" onClick={() => ask('Block this number', 'This blocks it on the board. Twilio is not changed.', () => send('block', { confirm: true, phone: blockPhone, reason: 'Spam' }, 'Blocked.'))}>Block number</button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Reminder</h2>
        <p className="admin-muted">A note with a due date shows on Home when it is due.</p>
        <textarea className="admin-area" value={note} onChange={(event) => setNote(event.target.value)} />
        <input className="admin-field" type="date" value={due} onChange={(event) => setDue(event.target.value)} />
        <button
          type="button"
          className="admin-btn"
          onClick={async () => {
            if (client.example) return toast('This is example data. Nothing was saved.', false)
            if (!(await confirmBox('Save reminder', `This saves the reminder on ${client.businessName}. It shows on Home when it is due. Nothing is sent.`))) return
            const result = await sendJson('/api/admin/notes', 'POST', { body: note, clientId: client.id, clientLabel: client.businessName, dueOn: due })
            toast(result.ok ? 'Reminder saved.' : result.message, result.ok)
            if (result.ok) router.refresh()
          }}
        >
          Save reminder
        </button>
        {data.notes.slice(0, 3).map((item) => <p key={item.id}>{item.body}{item.dueOn ? ` due ${item.dueOn}` : ''}</p>)}
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>This month</h2>
        <p className="admin-muted">One tap builds the month note. Nothing is sent.</p>
        <p>Roger caught {monthCaught} missed calls for you this month.</p>
        <Link className="admin-link" href={`/admin/report/client?client=${client.id}&from=${from}&to=${to}`}>Open the full preview</Link>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Custom dates</h2>
        <p className="admin-muted">Pick a start and end in Central time, then generate the branded report.</p>
        <input className="admin-field" type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
        <input className="admin-field" type="date" value={to} onChange={(event) => setTo(event.target.value)} />
        <Link className="admin-btn" href={`/admin/report/client?client=${client.id}&from=${from}&to=${to}`}>Generate</Link>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>After hours</h2>
        <p className="admin-muted">Missed calls by day and hour, Central time. {heat.busiest}. Overnight count {heat.overnight}.</p>
        <div className="admin-heat" aria-hidden="true">
          {heat.grid.map((row, day) => (
            <div key={DAYS[day]} className="admin-heat-row">
              <span>{DAYS[day]}</span>
              {row.map((count, hour) => <i key={hour} data-n={count > 0 ? '1' : '0'} title={`${DAYS[day]} ${hour + 6}`} />)}
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel">
        <h2>Text cost</h2>
        <p className="admin-muted">Example cents until Twilio usage is connected. This screen does not bill anyone.</p>
        <p>{data.cost.texts} texts · ${(data.cost.cents / 100).toFixed(2)} vs {moneyGrouped(data.cost.planCents / 100)} plan · {data.cost.profitable ? 'Looks profitable' : 'Cost is over the plan'}</p>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Referral</h2>
        <p className="admin-muted">Who sent this client, and any credit you promised.</p>
        <input className="admin-field" value={refer} onChange={(event) => setRefer(event.target.value)} placeholder="Referred by" />
        <input className="admin-field" value={credit} onChange={(event) => setCredit(event.target.value)} placeholder="Credit" />
        <button type="button" className="admin-btn" onClick={() => run('referral', { referredBy: refer, referralCredit: credit }, 'Saved.')}>Save referral</button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Closed dates</h2>
        <p className="admin-muted">A date Roger should use the closed message.</p>
        <textarea className="admin-area" value={closed} onChange={(event) => setClosed(event.target.value)} />
        <input className="admin-field" type="date" value={holiday} onChange={(event) => setHoliday(event.target.value)} />
        <button type="button" className="admin-btn" onClick={() => run('holiday', { scope: client.id, onDate: holiday, label: 'Closed' }, 'Saved.')}>Add closed date</button>
        {data.holidays.map((row) => <p key={row.id}>{row.onDate} {row.label}{row.global ? ' (everyone)' : ''}</p>)}
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Lead result</h2>
        <p className="admin-muted">Mark the latest missed caller booked or lost. That feeds money caught.</p>
        {missed[0] ? (
          <div className="flex gap-2">
            <button type="button" className="admin-btn" onClick={() => ask('Mark booked', 'This records a booked job for money caught.', () => send('outcome', { caller: missed[0].caller, outcome: 'booked' }, 'Saved.'))}>Booked</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => ask('Mark lost', 'This records the lead as lost.', () => send('outcome', { caller: missed[0].caller, outcome: 'lost' }, 'Saved.'))}>Lost</button>
          </div>
        ) : <p>No missed caller to mark.</p>}
        <input className="admin-field" value={reviewUrl} onChange={(event) => setReviewUrl(event.target.value)} placeholder="Google review link" />
        <button type="button" className="admin-btn" onClick={() => run('referral', { reviewUrl }, 'Saved.')}>Save review link</button>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          disabled={!data.reviewAllowed || !data.wired.sms || !missed[0] || !reviewUrl}
          onClick={() => missed[0] && ask('Send review link', `This texts ${formatPhone(missed[0].caller)} the review link.`, () => send('review-request', { confirm: true, caller: missed[0].caller, from: client.phone, reviewUrl }, 'Sent.'))}
        >
          Ask for a review
        </button>
        {!data.reviewAllowed && <p className="admin-muted">Review requests are for Pro and Elite only.</p>}
        {data.reviewAllowed && !reviewUrl && <p className="admin-muted">Save a Google review link first.</p>}
        {data.reviewAllowed && !data.wired.sms && <p className="admin-muted">Texting is not connected. Nothing will be sent.</p>}
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Send a test</h2>
        <p className="admin-muted">A fake missed call, clearly marked as a test. The button stays off until ROGER_TEST_URL is set.</p>
        <button type="button" className="admin-btn" disabled={!data.wired.test} onClick={() => ask('Send a test', 'This fires a fake missed call marked as a test.', () => send('test', { confirm: true }, 'Sent.'))}>Send a test</button>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Resend a lead</h2>
        <p className="admin-muted">Sends the latest missed caller to the client again. Nothing goes out until resend is connected.</p>
        <button type="button" className="admin-btn" disabled={!data.wired.resend || !missed[0]} onClick={() => ask('Resend this lead', 'Confirm to send it again.', () => send('resend', { confirm: true, caller: missed[0]?.caller }, 'Sent.'))}>Resend lead</button>
        {!data.wired.resend && <p className="admin-muted">Resend is not connected. Nothing will be sent.</p>}
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Download</h2>
        <p className="admin-muted">A CSV of this client's calls or matching leads.</p>
        <a className="admin-link" href={`/api/admin/export?client=${client.id}&kind=calls`}>Download calls</a>
        <a className="admin-link" href={`/api/admin/export?client=${client.id}&kind=leads`}>Download leads</a>
      </section>

      <section className="admin-panel flex flex-col gap-2">
        <h2>Portal login</h2>
        <p className="admin-muted">Set a code the client uses at /portal. You will not see the code again.</p>
        <PortalCode onSave={(portalCode) => run('portal-code', { portalCode }, 'Code saved.')} enabled={client.portalEnabled} />
      </section>

      <section className="admin-panel">
        <h2>Change history</h2>
        <p className="admin-muted">What you changed on this client.</p>
        {data.history.length === 0 ? <p>No changes yet.</p> : data.history.map((row) => (
          <p key={row.id}><span className="admin-muted">{row.actor} · {formatCentral(row.at)}</span><br />{row.summary}</p>
        ))}
        <Link className="admin-link" href="/admin/activity">All history</Link>
      </section>

      <p className="admin-muted">Pipeline for every lead is under More. This client's callers are the missed calls above.</p>

      {confirm && (
        <Sheet
          title={confirm.title}
          body={confirm.body}
          confirmLabel="Confirm"
          busy={busy}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            setBusy(true)
            await confirm.run()
            setBusy(false)
            setConfirm(null)
          }}
        />
      )}
    </div>
  )
}

function PortalCode({ onSave, enabled }: { onSave: (code: string) => void; enabled: boolean }) {
  const [code, setCode] = useState('')
  return (
    <div className="flex flex-col gap-2">
      <p>{enabled ? 'A code is already set.' : 'No code yet.'}</p>
      <input className="admin-field" value={code} onChange={(event) => setCode(event.target.value)} placeholder="New portal code" />
      <button type="button" className="admin-btn" onClick={() => onSave(code)}>Save portal code</button>
    </div>
  )
}
