'use client'

import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { OPENING_MESSAGE, QUICK_QUESTIONS } from '@/lib/preview/barneys-electric/content'
import { formatPhone, respond, type Lead } from '@/lib/preview/barneys-electric/chat'

type Message = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [lead, setLead] = useState<Lead>({})
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: OPENING_MESSAGE },
  ])
  const titleId = useId()
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!open || !scroller) return
    scroller.scrollTop = scroller.scrollHeight
  }, [messages, open])

  function close() {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  function push(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const result = respond(trimmed, lead)
    setLead(result.lead)
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: trimmed },
      ...result.replies.map((reply) => ({
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        text: reply,
      })),
    ])
    setDraft('')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    push(draft)
  }

  return (
    <>
      {open ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-[#E6E8EC] bg-white shadow-[0_24px_60px_-20px_rgba(15,35,64,0.45)] inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] max-h-[min(34rem,calc(100dvh-9.5rem-env(safe-area-inset-bottom)))] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:h-[34rem] lg:w-[23.5rem] lg:max-h-[calc(100dvh-3rem)]"
        >
          <header className="flex shrink-0 items-start justify-between gap-3 bg-[#0F2340] px-4 py-3 text-white">
            <div>
              <h2 id={titleId} className="text-base font-semibold">
                Barney&apos;s Assistant
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-white/75">
                Demo powered by Roger · TenFour Systems
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </header>

          <div ref={scrollerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {lead.name && lead.phone ? (
              <p className="rounded-lg bg-[#F7F7F5] px-3 py-2 text-sm leading-relaxed text-[#334155]">
                Barney has {lead.name} at {formatPhone(lead.phone)} for a callback.
              </p>
            ) : null}
            {messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.role === 'user'
                    ? 'ml-8 rounded-2xl rounded-br-md bg-[#0F2340] px-3 py-2 text-[15px] leading-relaxed text-white'
                    : 'mr-6 rounded-2xl rounded-bl-md bg-[#F3F5F8] px-3 py-2 text-[15px] leading-relaxed text-[#0F2340]'
                }
              >
                {message.text}
              </p>
            ))}
          </div>

          <div className="shrink-0 border-t border-[#E6E8EC] bg-white px-3 py-3">
            <div className="grid grid-cols-2 gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => push(question)}
                  className="min-h-11 rounded-lg border border-[#E2E6ED] bg-white px-2.5 py-2 text-left text-[13px] font-semibold leading-snug text-[#0F2340] transition hover:border-[#0F2340] hover:bg-[#F7F7F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2340]"
                >
                  {question}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
              <label htmlFor="roger-draft" className="sr-only">
                Ask a question
              </label>
              <input
                id="roger-draft"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={500}
                placeholder="Type a question"
                className="h-12 min-w-0 flex-1 rounded-lg border border-[#D5DAE1] px-3 text-base text-[#0F2340] outline-none placeholder:text-[#94A3B8] focus:border-[#0F2340] focus:ring-2 focus:ring-[#0F2340]/15"
              />
              <button
                type="submit"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#D97706] text-white transition hover:bg-[#B45309] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2340]"
                aria-label="Send message"
              >
                <Send className="size-5" />
              </button>
            </form>
          </div>
        </section>
      ) : (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="fixed z-50 inline-flex h-12 max-w-[calc(100vw-2rem)] items-center gap-2 whitespace-nowrap rounded-full bg-[#0F2340] px-4 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(15,35,64,0.7)] ring-2 ring-white right-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] hover:bg-[#18345c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706] lg:right-6 lg:bottom-6"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          Ask Barney&apos;s Assistant
        </button>
      )}
    </>
  )
}
