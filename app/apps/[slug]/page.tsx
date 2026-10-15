import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, FileText, LifeBuoy, Mail, ShieldCheck, Smartphone, UserX } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getApp, iconPath, listApps } from '@/lib/apps'

export const dynamicParams = false

export function generateStaticParams() {
  return listApps().map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const app = getApp((await params).slug)
  if (!app) return {}
  return {
    title: `${app.name} — Fluxternal Inc.`,
    description: app.description || app.tagline || `${app.name}, published by Fluxternal Inc.`,
  }
}

const PAGE_ICONS: Record<string, typeof FileText> = {
  'privacy-policy': ShieldCheck,
  'terms-of-service': FileText,
  support: LifeBuoy,
  'delete-account': UserX,
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const app = getApp(slug)
  if (!app) notFound()
  const icon = iconPath(slug)
  const stores = [
    app.platforms.ios ? { label: 'App Store', href: app.appStoreUrl } : null,
    app.platforms.android ? { label: 'Google Play', href: app.playUrl } : null,
  ].filter((s): s is { label: string; href: string } => Boolean(s))
  const live = stores.some((s) => s.href)

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Link href="/apps" className="text-sm text-foreground/50 transition-colors hover:text-foreground">
          ← All apps
        </Link>

        <header className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-6">
            {icon ? (
              <Image src={icon} alt={`${app.name} icon`} width={96} height={96} className="size-20 rounded-[22px] md:size-24" priority />
            ) : (
              <span className="flex size-20 items-center justify-center rounded-[22px] bg-foreground/5 text-foreground md:size-24">
                <Smartphone className="size-8" aria-hidden="true" />
              </span>
            )}
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
                {app.platforms.ios && app.platforms.android ? 'iOS · Android' : app.platforms.ios ? 'iOS' : 'Android'}
              </p>
              <h1 className="mt-2 font-display text-4xl font-normal leading-tight tracking-tight text-foreground text-balance md:text-6xl">
                {app.name}
              </h1>
              {app.tagline && <p className="mt-3 text-xl text-foreground/70 text-pretty">{app.tagline}</p>}
              {app.description && <p className="mt-5 text-lg leading-8 text-hero-sub opacity-80 text-pretty">{app.description}</p>}
            </div>
          </div>
        </header>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {stores.map((store) =>
            store.href ? (
              <a
                key={store.label}
                href={store.href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'heroSecondary' }), 'rounded-full px-6 py-5 text-base')}
              >
                {store.label}
                <ArrowUpRight className="ml-1 size-4" aria-hidden="true" />
              </a>
            ) : (
              <span
                key={store.label}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-5 py-3 text-sm text-foreground/60"
              >
                <span className="size-1.5 rounded-full bg-amber-400" />
                {store.label} · coming soon
              </span>
            ),
          )}
          {app.site && (
            <a
              href={app.site}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost' }), 'rounded-full px-5 py-5 text-base text-foreground/80 hover:text-foreground')}
            >
              {live ? 'Website' : 'Join the waitlist'}
              <ArrowUpRight className="ml-1 size-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <section className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-foreground/50">Support and legal</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {app.pages.map((page) => {
              const Icon = PAGE_ICONS[page.slug] ?? FileText
              return (
                <Link
                  key={page.slug}
                  href={`/apps/${app.slug}/${page.slug}`}
                  className="liquid-glass flex items-start gap-4 rounded-3xl p-6 transition-colors hover:bg-foreground/[0.03]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-foreground">{page.heading}</span>
                    <span className="mt-1 block text-sm leading-6 text-foreground/60 text-pretty">{page.description}</span>
                  </span>
                </Link>
              )
            })}
            <a
              href={`mailto:${app.supportEmail}`}
              className="liquid-glass flex items-start gap-4 rounded-3xl p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-lg font-semibold text-foreground">Email us</span>
                <span className="mt-1 block text-sm leading-6 text-foreground/60">{app.supportEmail}</span>
              </span>
            </a>
          </div>
        </section>

        <p className="mt-16 text-xs text-foreground/40">
          {app.name} is published by {app.legalName.replace(/\.$/, '')}.
        </p>
      </div>
    </PageShell>
  )
}
