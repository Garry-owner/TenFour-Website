'use client'

import { createContext, useContext, useState } from 'react'

const ToastContext = createContext<(message: string, ok?: boolean) => void>(() => {})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)
  function push(message: string, ok = true) {
    setToast({ message, ok })
    window.setTimeout(() => setToast(null), 4200)
  }
  return (
    <ToastContext.Provider value={push}>
      {children}
      {toast && (
        <div className={`admin-toast ${toast.ok ? 'admin-toast-ok' : 'admin-toast-bad'}`} role="status">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
