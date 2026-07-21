import { BackgroundVideo } from '@/components/hero/background-video'
import { Navbar } from '@/components/hero/navbar'
import { HeroContent } from '@/components/hero/hero-content'
import { LogoMarquee } from '@/components/hero/logo-marquee'

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Looping background video */}
      <BackgroundVideo />

      {/* Foreground content */}
      <section className="relative z-10 flex min-h-screen flex-col overflow-visible">
        {/* Centered blurred glow shape behind content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-950 opacity-90 blur-[82px]"
        />

        <Navbar />
        <HeroContent />
        <LogoMarquee />
      </section>
    </div>
  )
}
