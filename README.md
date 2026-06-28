# @umbraculum/brochure

> **Not the Umbraculum product app.** Self-hosted / demo UI lives in
> [umbraculum-dev/apps/web](https://github.com/umbraculum-dev/umbraculum-dev/tree/main/apps/web).
> This repo is the static **brochure** served at https://umbraculum.dev (**search-indexable** since public-alpha flip **2026-06-27**).

Static marketing brochure for **umbraculum.dev** — workspace-shaped positioning for the **public alpha** (live **2026-06-27**).

Deploy target: **Cloudflare Workers** (static assets via Wrangler; Git-connected Builds). Worker name: `umbraculum-brochure`. Preview: https://umbraculum-brochure.umbraculum-dev.workers.dev

## What this is

A **build-only** package: HTML + CSS in `public/`, copied to `dist/` on build. Umbi mascot lives at `public/img/umbi.png` (vendored; not copied from umbraculum-dev at build time).

Every page header must include the shared **`brand-row`** block (Umbi logo + title) and `<link rel="icon" href="/img/umbi.png" />` — copy from `public/index.html` or `public/support/index.html`.

New pages should also include the **site announcement** mount (`announcement.css`, `announcement.js`, `#umb-announcement-root`).

## Site announcement banner

| File | Role |
|------|------|
| [`announcement.config.json`](announcement.config.json) | **Single source of truth** — `enabled`, `id`, `variant`, `dismissible`, `html` |
| [`public/announcement.css`](public/announcement.css) | `.umb-announcement` layout + variant colors |
| [`public/announcement.js`](public/announcement.js) | Loads config at runtime; dismiss persists in `localStorage` per `id` |
| [`scripts/announcement-theme.mjs`](scripts/announcement-theme.mjs) | Maps config → Docusaurus `themeConfig.announcementBar` |
| [`src/announcement.mjs`](src/announcement.mjs) | Package export `@umbraculum/brochure/announcement` for docs-site |

**Docs site (umbraculum-dev):** depends on `@umbraculum/brochure/announcement` (git tag pin while this repo is private). To change the message on both surfaces: edit `announcement.config.json`, push + tag, bump the git pin in umbraculum-dev `docs-site/package.json`, rebuild brochure and docs-site.

## Quick start

```bash
npm run build
npm run preview
# open http://localhost:4321
```

## Deploy (maintainer)

Cloudflare **Workers Builds** — connect this repo (`umbraculum-dev/umbraculum-brochure`).

| Dashboard field | Value |
|-----------------|--------|
| Project name | `umbraculum-brochure` (must match [`wrangler.toml`](wrangler.toml) `name`) |
| Production branch | `main` |
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| `NODE_VERSION` | `20` |

Static assets: [`wrangler.toml`](wrangler.toml) (`[assets] directory = "./dist"`). **SEO gates removed 2026-06-27** — `robots.txt` allow-all; no `noindex` meta (umbraculum-dev flip-day runbook §3.1).

## Scope

- **Contains:** static brochure, links to docs + GitHub + support — **indexed** since public-alpha flip.
- **Does not contain:** product app (`apps/web`), API, or docs content (`docs-site/` in umbraculum-dev).

## Further reading (umbraculum-dev)

- [`docs/design/brochure-site-design-policy.md`](https://github.com/umbraculum-dev/umbraculum-dev/blob/main/docs/design/brochure-site-design-policy.md)
- [`docs/design/public-alpha-cloudflare-pages-runbook.md`](https://github.com/umbraculum-dev/umbraculum-dev/blob/main/docs/design/public-alpha-cloudflare-pages-runbook.md)
