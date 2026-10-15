import fs from 'fs'
import path from 'path'

/**
 * Every app's public pages live here, under /apps/<slug>:
 *
 *   content/apps/<slug>/app.json              name, tagline, store links, pages…
 *   content/apps/<slug>/<page>.html           the body of each legal page
 *   public/apps/<slug>/icon.png               the app icon
 *
 * The app repos write these with `yarn launchkit legal` (tools/launchkit in the
 * Mobile-Starter-Boilerplate family) — edit app.config.json / data-manifest.ts
 * there, not the files here. Everything is read at build time (static export).
 */

export interface AppPage {
  slug: string
  title: string
  eyebrow: string
  heading: string
  description: string
}

export interface AppRecord {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  description: string
  site: string
  supportEmail: string
  legalName: string
  effectiveDate: string
  platforms: { ios: boolean; android: boolean }
  appStoreUrl: string
  playUrl: string
  brand: { accent: string; canvas: string; ink: string }
  pages: AppPage[]
}

const CONTENT = path.join(process.cwd(), 'content', 'apps')
const PUBLIC = path.join(process.cwd(), 'public', 'apps')

export function listApps(): AppRecord[] {
  if (!fs.existsSync(CONTENT)) return []
  return fs
    .readdirSync(CONTENT)
    .filter((dir) => fs.existsSync(path.join(CONTENT, dir, 'app.json')))
    .map((dir) => JSON.parse(fs.readFileSync(path.join(CONTENT, dir, 'app.json'), 'utf8')) as AppRecord)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getApp(slug: string): AppRecord | null {
  const file = path.join(CONTENT, slug, 'app.json')
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8')) as AppRecord
}

export function getDoc(slug: string, doc: string): { app: AppRecord; page: AppPage; html: string } | null {
  const app = getApp(slug)
  const page = app?.pages.find((p) => p.slug === doc)
  const file = path.join(CONTENT, slug, `${doc}.html`)
  if (!app || !page || !fs.existsSync(file)) return null
  return { app, page, html: fs.readFileSync(file, 'utf8') }
}

/** /apps/<slug>/icon.png when the app repo shipped one. */
export function iconPath(slug: string): string | null {
  return fs.existsSync(path.join(PUBLIC, slug, 'icon.png')) ? `/apps/${slug}/icon.png` : null
}

/** "September 30, 2026" from "2026-09-30". */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
