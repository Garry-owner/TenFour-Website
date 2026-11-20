import type { Viewport } from 'next'
import { ForceLight } from '@/components/preview/barneys-electric/force-light'

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-white text-[#334155] antialiased"
      style={{
        colorScheme: 'light',
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';",
        }}
      />
      <style>{`
        body > header,
        body > footer,
        body > a[href="#main-content"] {
          display: none !important;
        }
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
