import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <h1
        className="font-display font-normal leading-[1.02] tracking-[-0.024em] text-foreground"
        style={{ fontSize: 'clamp(56px, 12vw, 168px)' }}
      >
        Flux
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)',
          }}
        >
          ternal
        </span>
      </h1>

      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
        1001682236 ONTARIO INC.
      </p>

      <p className="mt-6 max-w-xl text-lg leading-8 text-hero-sub opacity-80 text-pretty">
        A parent corporation building and scaling a family of ambitious
        technology ventures.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: 'heroSecondary' }),
            'px-7 py-6 text-base',
          )}
        >
          View Our Projects
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'px-7 py-6 text-base text-foreground/80 hover:text-foreground',
          )}
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
