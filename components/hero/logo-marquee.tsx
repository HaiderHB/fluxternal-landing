const divisions = [
  'Motion AI',
  'Fluxternal Labs',
  'Fluxternal Studios',
  'Fluxternal Ventures',
]

function DivisionBadge({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span className="liquid-glass flex size-6 items-center justify-center rounded-lg text-xs font-semibold text-foreground">
        {name.charAt(0)}
      </span>
      <span className="text-base font-semibold text-foreground">{name}</span>
    </div>
  )
}

export function LogoMarquee() {
  return (
    <div className="relative z-10 w-full pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 md:flex-row">
        {/* Left: static label */}
        <p className="shrink-0 text-sm text-foreground/50 text-center md:text-left">
          Our growing family
          <br />
          of divisions
        </p>

        {/* Right: infinite marquee */}
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-hero-marquee gap-16">
            {[...divisions, ...divisions].map((name, index) => (
              <DivisionBadge key={`${name}-${index}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
