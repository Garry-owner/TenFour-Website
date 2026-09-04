'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { CtaButton } from '@/components/cta-button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
            </span>
            Live
          </span>
          <CtaButton href="/contact" size="sm">
            Book a Demo
          </CtaButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-3 font-mono text-sm uppercase tracking-widest',
                  pathname === item.href ? 'bg-secondary text-primary' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
            <CtaButton href="/contact" className="mt-2 w-full">
              Book a Demo
            </CtaButton>
          </nav>
        </div>
      )}
    </header>
  )
}
