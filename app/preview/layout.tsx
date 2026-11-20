import type { Viewport } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import { ForceLight } from '@/components/preview/barneys-electric/force-light'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${sourceSans.className} min-h-screen bg-white text-[#334155] antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <style>{`
        html, body {
          background: #ffffff !important;
          color-scheme: light !important;
        }
        html.dark {
          color-scheme: light !important;
          --background: #ffffff;
          --foreground: #334155;
          --border: #e6e8ec;
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
      <ForceLight />
      {children}
    </div>
  )
}
