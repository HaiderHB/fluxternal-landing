import Link from 'next/link'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-8 py-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-medium text-foreground">Fluxternal Inc.</p>
          <p className="mt-1 text-xs text-foreground/50">
            Operating as 1001682236 ONTARIO INC.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex items-center gap-6">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} Fluxternal Inc.
        </p>
      </div>
    </footer>
  )
}
