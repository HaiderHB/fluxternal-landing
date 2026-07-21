import type { Metadata } from 'next'
import { Mail, MapPin, Building2 } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Contact — Fluxternal Inc.',
  description:
    'Get in touch with Fluxternal Inc. for partnerships, ventures, and inquiries.',
}

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'haider@fluxternal.com',
  },
  {
    icon: Building2,
    label: 'Legal entity',
    value: '1001682236 ONTARIO INC.',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ontario, Canada',
  },
]

export default function ContactPage() {
  return (
    <PageShell>
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <div className="w-full max-w-2xl px-6 py-20 md:py-28">
          {/* intro + details */}
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
              Contact Us
            </p>
            <h1 className="mt-4 font-display text-4xl font-normal leading-tight tracking-tight text-foreground text-balance md:text-6xl">
              Let&apos;s build together
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-hero-sub opacity-80 text-pretty">
              Whether you&apos;re interested in a partnership, one of our
              ventures, or joining the team, we&apos;d love to hear from you.
            </p>

            <ul className="mt-10 flex flex-col items-center gap-6">
              {details.map((item) => (
                <li key={item.label} className="flex flex-col items-center gap-4 text-center">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/50">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
