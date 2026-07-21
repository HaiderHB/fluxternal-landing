'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="relative z-10">
      <nav className="flex items-center justify-between px-8 py-5">
        {/* Left: logo */}
        <Link
          href="/"
          className="flex items-baseline gap-2"
          aria-label="Fluxternal Inc. home"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
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
          </span>
        </Link>

        {/* Center: nav items */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm transition-colors hover:text-foreground',
                    isActive ? 'text-foreground' : 'text-foreground/70',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right: primary CTA */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: 'heroSecondary' }),
            'rounded-full px-4 py-2',
          )}
        >
          Contact Us
        </Link>
      </nav>

      {/* Divider */}
      <div className="mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </header>
  )
}
