import Link from 'next/link'
import { runSearch } from '@/lib/admin/search'

export const dynamic = 'force-dynamic'

const KIND_LABEL: Record<string, string> = {
  client: 'Client',
  lead: 'Lead',
  caller: 'Caller',
  note: 'Note',
  history: 'Change history',
  message: 'Text',
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const ready = q.trim().length >= 2
  const hits = ready ? (await runSearch(q)).hits.slice(0, 60) : []
  return (
    <div className="admin-rise flex flex-col gap-4">
      <p className="admin-kicker">Search</p>
      <h1 className="admin-title">{q || 'Find someone'}</h1>
      <form action="/admin/search">
        <input className="admin-field" name="q" defaultValue={q} placeholder="Name, phone, email, business, note, text" />
      </form>
      {!ready && <p>Type at least two characters.</p>}
      <ul className="flex flex-col gap-2">
        {hits.map((hit) => {
          const label = KIND_LABEL[hit.kind] || hit.kind
          const example = hit.detail === 'Example' || hit.detail.endsWith(' · Example')
          return (
            <li key={`${hit.kind}-${hit.id}`}>
              <Link className="admin-card" href={hit.href}>
                <span className="admin-kicker">{example ? `Example ${label.toLowerCase()}` : label}</span>
                <span className="admin-title text-3xl">{hit.title}</span>
                {hit.detail && hit.detail !== 'Example' && <span>{hit.detail.replace(/ · Example$/, '')}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
      {ready && hits.length === 0 && <p>No match.</p>}
    </div>
  )
}
