import type { Metadata } from 'next'
import '../admin/admin.css'

export const metadata: Metadata = {
  title: 'Your TenFour board',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-deck admin-night"><main className="admin-main">{children}</main></div>
}
