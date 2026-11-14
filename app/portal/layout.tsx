import type { Metadata } from 'next'
import { ConfirmProvider } from '@/components/admin/confirm'
import { ToastProvider } from '@/components/admin/toast'
import '../admin/admin.css'

export const metadata: Metadata = {
  title: 'Your TenFour board',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-deck admin-night">
      <ToastProvider>
        <ConfirmProvider>
          <main className="admin-main">{children}</main>
        </ConfirmProvider>
      </ToastProvider>
    </div>
  )
}
