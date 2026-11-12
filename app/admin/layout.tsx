import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminFrame } from '@/components/admin/frame'
import { hasSession } from '@/lib/admin/session'
import './admin.css'

export const metadata: Metadata = {
  title: 'Command center',
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const path = headerList.get('x-pathname') || ''
  const authed = await hasSession()
  const login = path === '/admin/login'
  if (!authed && !login) redirect('/admin/login')
  if (authed && login) redirect('/admin')
  const shift = (await cookies()).get('tenfour_admin_shift')?.value === 'day' ? 'day' : 'night'
  return (
    <AdminFrame authed={authed && !login} shift={shift}>
      {children}
    </AdminFrame>
  )
}
