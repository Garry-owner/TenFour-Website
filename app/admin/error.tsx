'use client'

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="admin-title text-5xl">The board hit a snag</h1>
      <p>Nothing on the public site was changed. Try the board again.</p>
      <button type="button" className="admin-btn" onClick={reset}>
        Try again
      </button>
    </div>
  )
}
