# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Static export to out/
npm run lint     # ESLint
npm start        # Production server (requires Node.js, not used on Hostinger)
```

Images must be pre-optimized before build:
```bash
node scripts/optimize-images.mjs   # Converts PNG/JPG → WebP in public/assets/
```

Deployment: upload `out/` to `public_html` on Hostinger.

---

## Architecture

**Next.js 16 static export** (`output: 'export'` in `next.config.ts`) — the site builds to plain HTML in `out/` and runs on Hostinger with no Node.js runtime. This has critical implications:

- **No Server Actions** (`'use server'` does not work). All DB operations are client-side via Supabase services in `src/services/`.
- **No runtime dynamic routes**. `/soluciones/[slug]` and `/productos/[id]` use `generateStaticParams` to pre-render at build time.
- **`next/image` is `unoptimized: true`**. Hostinger doesn't support Next.js image optimization.

### Data Layer

All database access goes through `src/services/`. There are two Supabase clients:

| File | Client | Used for |
|------|--------|---------|
| `src/lib/supabase.ts` | `anon` key | Public reads, authenticated client ops |
| `src/lib/supabaseAdmin.ts` | `service_role` key | Admin write operations only |

Services call Supabase directly from the browser. Security is enforced via **Supabase RLS policies** — not backend validation. Adding a new write operation requires a corresponding RLS policy in Supabase.

Admin operations (write/delete) live in `src/services/admin/` and use the service role client.

### Authentication & Roles

- Supabase Auth handles sessions.
- Roles are stored in the custom `user_profiles` table (`admin` | `client`).
- `AdminGuard.tsx` protects all `/admin/*` routes by checking the role.
- Lead-to-client conversion generates a temporary password and forces a change on first login.

### Email / Forms

Public forms (contact, job applications) go through a **PHP Bridge** at `axelion.cl/api-bienek/email.php`. This bypasses CORS for SMTP. The bridge validates a **Cloudflare Turnstile** token before processing. The `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` env vars must be set.

### State Management

Three React Contexts, all in `src/context/`:

- `AuthContext` — user session + role, cached in localStorage, verified against Supabase on mount.
- `CartContext` — cart state, persisted in localStorage.
- `LanguageContext` — ES/EN toggle. Translation strings are in `src/data/translations.ts`.

### Static vs. Dynamic Data

| Source | Used for |
|--------|---------|
| `src/data/*.ts` files | Blog articles, sector descriptions, static content |
| Supabase DB | Products, clients, orders, leads, tags |

Some legacy `mockProducts.ts`-style files may still exist in `src/data/` — they are candidates for removal once confirmed unused.

---

## Key Constraints

- **Supabase Free Plan**: 500 MB DB, 1 GB storage. Compress images aggressively before uploading (Canvas API in admin). Project auto-pauses after 1 week of inactivity.
- **Image uploads in Admin**: Compressed via Canvas before reaching Supabase Storage. Do not bypass this step.
- **i18n is partial**: The `LanguageContext` / `translations.ts` system covers the UI shell. Dynamic DB content (product names, descriptions) is not yet translated.

---

## Supabase Schema Reference

Key tables: `products`, `user_profiles`, `leads`, `orders`, `order_items`, `sectors`, `families`, `brands`, `badges`.

Migrations live in `supabase/migrations/`. The canonical schema is `supabase/schema.sql`.

When modifying the DB schema, apply via `supabase/migrations/` and update RLS policies accordingly.

---

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_PHP_BRIDGE_URL       # axelion.cl/api-bienek/email.php
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

---

## Project Documentation

- `docs/brain/PROJECT_CONTEXT.md` — single source of truth for the full stack, security model, and UX flows.
- `docs/brain/task.md` — sprint backlog and completed features.
- `docs/brain/changelog.md` — detailed change history.

## End-of-Session Requirement

At the end of every working session, update `docs/brain/changelog.md` with a summary of what was done. Include: date, branch, changes made, and any decisions or context that would be useful in a future session. This is mandatory — it is the primary way future Claude instances will understand what has already been done and why.
