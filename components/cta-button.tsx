import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const ctaVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-mono text-xs uppercase tracking-widest font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/85 shadow-[0_0_0_1px_var(--primary)] hover:shadow-[0_0_24px_-4px_var(--primary)]',
        outline:
          'border border-border bg-transparent text-foreground hover:border-primary/60 hover:text-primary',
        ghost: 'text-muted-foreground hover:text-foreground',
      },
      size: {
        sm: 'h-9 px-4',
        default: 'h-11 px-6',
        lg: 'h-12 px-8 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

type CtaButtonProps = {
  href: string
  className?: string
  children: React.ReactNode
} & VariantProps<typeof ctaVariants>

export function CtaButton({ href, className, variant, size, children }: CtaButtonProps) {
  const external = href.startsWith('http')
  const classes = cn(ctaVariants({ variant, size, className }))
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

export { ctaVariants }
