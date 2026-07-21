import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Projects — Fluxternal Inc.',
  description:
    'Explore the ventures being built and scaled under Fluxternal Inc.',
}

const projects = [
  {
    name: 'Motion AI App',
    tagline: 'AI motion graphic generator',
    status: 'In Progress',
    description:
      'An AI-powered studio that turns simple prompts into polished motion graphics and animated visuals, cutting production time from hours to seconds.',
    tags: ['Generative AI', 'Motion Graphics', 'Creative Tools'],
  },
]

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <header className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
            Our Work
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-tight tracking-tight text-foreground text-balance md:text-6xl">
            Ventures in motion
          </h1>
          <p className="mt-5 text-lg leading-8 text-hero-sub opacity-80 text-pretty">
            Fluxternal Inc. builds and scales a portfolio of technology
            products. Here&apos;s what we&apos;re working on right now.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="liquid-glass flex flex-col rounded-3xl p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80">
                  <span className="size-1.5 rounded-full bg-amber-400" />
                  {project.status}
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-foreground">
                {project.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-foreground/60">
                {project.tagline}
              </p>
              <p className="mt-4 leading-7 text-hero-sub opacity-80 text-pretty">
                {project.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* More to come placeholder */}
          <article className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 p-8 text-center">
            <p className="text-lg font-medium text-foreground/70">
              More ventures on the way
            </p>
            <p className="mt-2 text-sm text-foreground/50 text-pretty">
              We&apos;re actively incubating new products across our divisions.
            </p>
          </article>
        </div>
      </div>
    </PageShell>
  )
}
