'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogoMark } from '@/components/brand-logo'
import { sendJson } from '@/components/admin/ui'

export default function PortalLoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  return (
    <form
      className="admin-login-card flex flex-col gap-3"
      onSubmit={async (event) => {
        event.preventDefault()
        const result = await sendJson('/api/portal/login', 'POST', { phone, code })
        if (result.ok) {
          router.replace('/portal/home')
          router.refresh()
          return
        }
        setMessage(result.message)
      }}
    >
      <LogoMark className="h-10 w-10" />
      <h1 className="admin-title">Your board</h1>
      <p className="admin-muted">This login is only for your business. It is not the TenFour admin.</p>
      <input className="admin-field" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your business phone" inputMode="tel" />
      <input className="admin-field" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Your code" type="password" />
      <button className="admin-btn" type="submit">Open</button>
      {message && <p className="admin-note"><span>{message}</span></p>}
    </form>
  )
}
