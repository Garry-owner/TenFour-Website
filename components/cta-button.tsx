import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const ctaVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-none font-condensed text-base font-extrabold uppercase tracking-[0.06em] transition-[transform,box-shadow,background-color,border-color,color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'border-2 border-[#ff6b1a] bg-[#ff6b1a] text-[#0f1011] shadow-[4px_4px_0_0_#1c140f] hover:bg-[#ff812e] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#1c140f] motion-safe:active:translate-x-0 motion-safe:active:translate-y-0 active:shadow-[2px_2px_0_0_#1c140f] dark:shadow-[4px_4px_0_0_#f6f3ee] dark:hover:shadow-[6px_6px_0_0_#f6f3ee] dark:active:shadow-[2px_2px_0_0_#f6f3ee]',
        outline:
          'border-2 border-foreground/50 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
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
