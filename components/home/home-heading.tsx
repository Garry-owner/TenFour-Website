import { cn } from '@/lib/utils'

// Homepage headings: same structure as the shared SectionHeading,
// with the stencil headline and highway mono label from the brand.
export function HomeEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-dispatch text-xs font-bold uppercase tracking-[0.2em] text-primary',
        className,
      )}
    >
      <span className="h-1 w-6 bg-primary" aria-hidden />
      {children}
    </span>
  )
}

export function HomeHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center')}>
      {eyebrow && <HomeEyebrow>{eyebrow}</HomeEyebrow>}
      <h2 className="text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-pretty text-lg leading-relaxed text-muted-foreground',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
