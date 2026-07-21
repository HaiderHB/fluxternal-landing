import type { ReactNode } from 'react'
import { Navbar } from '@/components/hero/navbar'
import { Footer } from '@/components/site/footer'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.18) 40%, transparent 70%)',
        }}
      />

      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
