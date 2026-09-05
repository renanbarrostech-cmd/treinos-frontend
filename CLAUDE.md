# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FIT.AI (`bootcamp-treinos-frontend`) — a Next.js 16 (App Router) frontend for a workout-tracking app, built as part of the "bootcamp de treinos FSC". It talks to a separate "Treinos API DevBarros" backend (OpenAPI/Swagger) for data and to Better Auth for authentication (Google OAuth).

## Commands

```bash
pnpm dev      # start dev server (do NOT run this yourself to "check" changes — see rules below)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint
npx orval     # regenerate API client code from the backend's swagger.json (needs NEXT_PUBLIC_API_URL)
```

There is no test suite configured in this repo.

`npx orval` requires `NEXT_PUBLIC_API_URL` (see `.env`) to point at a running backend that serves `/swagger.json`.

## Architecture

### API layer: Orval + TanStack Query

API client code is **generated, never hand-written**. `orval.config.ts` defines a single `fetch` client that reads the backend's OpenAPI spec and writes fully-typed functions/types to `app/_lib/api/fetch-generated/index.ts`, using `app/_lib/fetch.ts` (`customFetch`) as the fetch mutator. `customFetch` attaches the request's cookies (via `next/headers`) and calls the backend with `credentials: "include"`, which is what makes server-side calls carry the user's session.

The `.claude/rules/api.md` project rules describe a second, client-side react-query generator (`lib/api/rc-generated`) — it exists in `orval.config.ts` but is currently **commented out**, so `lib/api/generated` / `rc-generated` do not exist yet. Before using client-side data-fetching hooks, check whether that block needs to be uncommented and `npx orval` re-run; if the needed hook still isn't generated after that, stop and tell the user rather than hand-writing a fetch call.

Data-fetching pattern (see `.claude/rules/api.md` for full detail and examples):
- Prefer Server Components. Fetch server-side with the functions from `app/_lib/api/fetch-generated`, and pass the result down as `initialData` to a TanStack Query hook in a Client Component when interactivity is needed.
- Client Components that need to fetch/mutate must use the generated TanStack Query hooks (once `rc-generated` exists) — never call `fetch`/axios directly.
- Mutations: always use the sync `mutate` variant (not `mutateAsync` unless awaiting is required) and handle both `onSuccess`/`onError` explicitly, including backend error codes from `error.response?.data.code`.
- `authClient` calls (Better Auth) must never be wrapped in try/catch — destructure `{ error }` from the result and handle it directly.

### Authentication

Better Auth (`better-auth` + `better-auth/react`), client created in `app/_lib/auth-client.ts` (`authClient`), pointed at `NEXT_PUBLIC_API_URL` (the backend owns the auth server, not this app).

- No middleware-based auth. Every protected Server Component page calls `authClient.getSession({ fetchOptions: { headers: await headers() } })` itself and `redirect("/auth")` if there's no user (see `app/page.tsx`).
- `/auth` does the inverse: if a session exists, `redirect("/")` (see `app/auth/page.tsx`).
- Sign-in is Google OAuth via `authClient.signIn.social({ provider: "google", callbackURL: ... })`, triggered from a small Client Component (`app/auth/_components/sign-in-with-google.tsx`).

### UI / styling

- shadcn/ui (`components.json`: style `new-york`, base color `neutral`, RSC enabled) — components live in `components/ui`. Always check whether a needed component already exists / can be installed via shadcn before hand-rolling one.
- Tailwind v4, theme-driven via CSS variables in `app/globals.css` (`--background`, `--primary`, `--brand`, `--streak`, `--online`, etc., mapped through `@theme inline`). Never hardcode Tailwind colors (`bg-black`, `text-white`, hex/oklch literals) in components — use the semantic theme tokens, adding a new CSS variable in `globals.css` if one is genuinely missing.
- Fonts are wired as CSS variables in `app/layout.tsx`: `--font-inter` (sans/body), `--font-inter-tight` (heading, exposed as `font-heading`), `--font-geist-mono`.
- One component per file, kebab-case filenames, feature-local components live under a route's `_components` folder (e.g. `app/auth/_components/`).

### Project conventions worth knowing

- Figma is the source of truth for UI work in this repo (see `task/*.md`) — screens are expected to be pixel-faithful to the linked Figma frames.
- `task/*.md` files describe individual feature tickets (e.g. login screen, home screen) with explicit technical requirements — check for a relevant one before starting UI work.
- Use `dayjs` for all date handling (already a dependency), not native `Date` formatting.
- Never run `pnpm dev` to verify changes — verify by reading/type-checking instead.
