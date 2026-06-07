# Cloudflare Workers Builds cutover (operator)

**When:** After `main` on this repo is green (GHA `build` workflow).

**Worker:** `umbraculum-dev-website` (name in [`wrangler.toml`](../wrangler.toml) — do not rename; custom domain `umbraculum.dev` stays attached).

## Steps

1. Cloudflare dashboard → **Workers & Pages** → **`umbraculum-dev-website`**.
2. **Settings → Builds** (Git connection):
   - Disconnect **`umbraculum-dev/umbraculum-dev`**
   - Connect **`umbraculum-dev/umbraculum-brochure`** (authorize private repo)
3. Build settings:

   | Field | Value |
   |-------|--------|
   | Production branch | `main` |
   | Root directory | `/` |
   | Build command | `npm ci && npm run build` (or `npm run build` if no lockfile) |
   | Deploy command | `npx wrangler deploy` |
   | `NODE_VERSION` | `20` |

4. Trigger deploy; verify:
   - Preview: https://umbraculum-dev-website.umbraculum-dev.workers.dev
   - Custom domain: https://umbraculum.dev (200, noindex meta still present pre-flip)

5. **Only then** merge umbraculum-dev PR that deletes `apps/website/`.

## Rollback

Reconnect Git to `umbraculum-dev/umbraculum-dev` with build `npm run build -w @umbraculum/website` and deploy `npx wrangler deploy --config apps/website/wrangler.toml` (requires `apps/website/` still on monorepo `master`).
