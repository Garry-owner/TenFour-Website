'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Sheet } from '@/components/admin/ui'

type Ask = (title: string, body: string, confirmLabel?: string) => Promise<boolean>

const ConfirmContext = createContext<Ask>(async (title, body) =>
  typeof window !== 'undefined' ? window.confirm(`${title}\n\n${body}`) : false,
)

// One confirm step for every admin action. A component calls
// `const confirm = useConfirm()` and then `if (!(await confirm(...))) return`.
// Nothing is written unless the person taps the confirm button.
export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<{ title: string; body: string; confirmLabel: string } | null>(null)
  const resolver = useRef<((value: boolean) => void) | null>(null)

  const ask = useCallback<Ask>((title, body, confirmLabel = 'Confirm') => {
    resolver.current?.(false)
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve
      setOpen({ title, body, confirmLabel })
    })
  }, [])

  function finish(value: boolean) {
    resolver.current?.(value)
    resolver.current = null
    setOpen(null)
  }

  return (
    <ConfirmContext.Provider value={ask}>
      {children}
      {open && (
        <Sheet
          title={open.title}
          body={open.body}
          confirmLabel={open.confirmLabel}
          onClose={() => finish(false)}
          onConfirm={() => finish(true)}
        />
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  return useContext(ConfirmContext)
}
