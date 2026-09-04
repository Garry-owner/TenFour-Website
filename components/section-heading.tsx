import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary',
        className,
      )}
    >
      <span className="h-px w-6 bg-primary/60" aria-hidden />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={cn(
            'text-pretty text-base leading-relaxed text-muted-foreground',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
