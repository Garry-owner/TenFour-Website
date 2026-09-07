import Link from 'next/link'
import Image from 'next/image'
import { CtaButton } from '@/components/cta-button'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 h-20 w-20 overflow-hidden rounded-full border border-border">
        <Image src="/roger-avatar.png" alt="Roger" width={80} height={80} />
      </div>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">404</p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Looks like this page went missing.
      </h1>
      <p className="mb-8 max-w-md text-pretty text-muted-foreground">
        Kind of like a call nobody caught. Unlike this page, Roger would have texted you back
        already.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <CtaButton href="/" size="lg">
          Back to home
        </CtaButton>
        <CtaButton href="/contact" variant="outline" size="lg">
          Book a Demo
        </CtaButton>
      </div>
    </main>
  )
}
