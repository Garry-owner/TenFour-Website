import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
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
      <h2 className="text-balance font-stencil text-4xl font-black uppercase leading-[0.95] sm:text-5xl">{title}</h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
