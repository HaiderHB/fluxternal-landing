import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { iconPath, listApps } from '@/lib/apps'

export const metadata: Metadata = {
  title: 'Apps — Fluxternal Inc.',
  description: 'The mobile apps published by Fluxternal Inc., with their support and legal pages.',
}

export default function AppsPage() {
  const apps = listApps()

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">Apps</p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-tight tracking-tight text-foreground text-balance md:text-6xl">
            Apps we publish
          </h1>
          <p className="mt-5 text-lg leading-8 text-hero-sub opacity-80 text-pretty">
            Every app published by Fluxternal Inc. has its page here, with its support contact,
            privacy policy and terms of service.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {apps.map((app) => {
            const icon = iconPath(app.slug)
            return (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                className="liquid-glass group flex flex-col rounded-3xl p-8 transition-colors hover:bg-foreground/[0.03]"
              >
                <div className="flex items-start justify-between gap-4">
                  {icon ? (
                    <Image
                      src={icon}
                      alt={`${app.name} icon`}
                      width={56}
                      height={56}
                      className="size-14 rounded-2xl"
                    />
                  ) : (
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                      <Smartphone className="size-6" aria-hidden="true" />
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80">
                    {app.appStoreUrl || app.playUrl ? (
                      <>
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        Available
                      </>
                    ) : (
                      <>
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        Coming soon
                      </>
                    )}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-foreground">{app.name}</h2>
                {app.tagline && <p className="mt-1 text-sm font-medium text-foreground/60">{app.tagline}</p>}
                {app.shortDescription && (
                  <p className="mt-4 leading-7 text-hero-sub opacity-80 text-pretty">{app.shortDescription}</p>
                )}

                <ul className="mt-6 flex flex-wrap gap-2">
                  {app.platforms.ios && (
                    <li className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/70">iOS</li>
                  )}
                  {app.platforms.android && (
                    <li className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/70">Android</li>
                  )}
                </ul>
              </Link>
            )
          })}

          {apps.length === 0 && (
            <article className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 p-8 text-center md:col-span-2">
              <p className="text-lg font-medium text-foreground/70">Nothing published yet</p>
              <p className="mt-2 text-sm text-foreground/50 text-pretty">The first apps are on their way.</p>
            </article>
          )}
        </div>
      </div>
    </PageShell>
  )
}
