import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const ctaVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-none font-condensed text-base font-extrabold uppercase tracking-[0.06em] transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'border-2 border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        outline:
          'border-2 border-primary bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground',
        ghost: 'text-muted-foreground hover:text-foreground',
      },
      size: {
        sm: 'h-9 px-4',
        default: 'h-11 px-6',
        lg: 'h-13 px-7 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

type CtaButtonProps = {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
} & VariantProps<typeof ctaVariants>

export function CtaButton({ href, className, variant, size, children, onClick }: CtaButtonProps) {
  const external = href.startsWith('http')
  const classes = cn(ctaVariants({ variant, size, className }))
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  )
}

export { ctaVariants }
