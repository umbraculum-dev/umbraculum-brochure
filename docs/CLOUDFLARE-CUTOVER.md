# Cloudflare Workers Builds cutover (operator)

**When:** After `main` on this repo is green (GHA `build` workflow).

**Worker:** `umbraculum-brochure` (name in [`wrangler.toml`](../wrangler.toml) — must match Cloudflare dashboard; custom domain `umbraculum.dev` stays attached).

## Steps

1. Cloudflare dashboard → **Workers & Pages** → **`umbraculum-brochure`**.
2. **Settings → Builds** (Git connection):
   - Connect **`umbraculum-dev/umbraculum-brochure`**
3. Build settings:

   | Field | Value |
   |-------|--------|
   | Production branch | `main` |
   | Root directory | `/` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | `NODE_VERSION` | `20` |

4. Trigger deploy; verify:
   - Preview: https://umbraculum-brochure.umbraculum-dev.workers.dev
   - Custom domain: https://umbraculum.dev (200, noindex meta still present pre-flip)

5. **Only then** merge umbraculum-dev PR that deletes `apps/website/`.

## Legacy name

Worker was renamed from `umbraculum-dev-website` (2026-06-07) when brochure moved out of the monorepo.

## Rollback

Reconnect Git to `umbraculum-dev/umbraculum-dev` with monorepo build commands only if `apps/website/` still exists on `master` (pre-extraction rollback).
