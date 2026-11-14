'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'

export function ThemeToggle() {
  const locale = useLocale()
  const label = getCopy(locale).chrome.theme
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!mounted) {
    return <div className="h-11 w-11" />
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center border-2 border-border bg-card text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      aria-label={label}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
