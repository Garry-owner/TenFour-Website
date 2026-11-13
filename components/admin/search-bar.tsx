'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SearchHit } from '@/lib/admin/types'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setHits([])
      return
    }
    const timer = window.setTimeout(() => {
      fetch(`/api/admin/search?q=${encodeURIComponent(query)}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { hits?: SearchHit[] } | null) => setHits(data?.hits || []))
        .catch(() => setHits([]))
    }, 180)
    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <div className="admin-search">
      <label className="sr-only" htmlFor="board-search">
        Search leads and clients
      </label>
      <input
        id="board-search"
        className="admin-field"
        value={query}
        placeholder="Search name, phone, email, business"
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && query.trim().length >= 2 && (
        <div className="admin-search-results" role="listbox">
          {hits.length === 0 ? (
            <p className="admin-kicker">No match</p>
          ) : (
            hits.map((hit) => (
              <Link key={`${hit.kind}-${hit.id}`} href={hit.href} onClick={() => setOpen(false)}>
                <span className="admin-title text-2xl">{hit.title}</span>
                <span className="admin-kicker">{hit.kind}</span>
                <span className="admin-break text-sm">{hit.detail}</span>
              </Link>
            ))
          )}
          <Link className="admin-kicker" href={`/admin/search?q=${encodeURIComponent(query)}`}>
            Full search
          </Link>
        </div>
      )}
    </div>
  )
}
