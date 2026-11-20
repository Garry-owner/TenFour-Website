'use client'

import { useEffect } from 'react'

export function ForceLight() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark')
    const previousScheme = root.style.colorScheme
    const previousBackground = document.body.style.backgroundColor
    root.style.colorScheme = 'light'
    document.body.style.backgroundColor = '#ffffff'
    return () => {
      root.style.colorScheme = previousScheme
      document.body.style.backgroundColor = previousBackground
    }
  }, [])

  return null
}
