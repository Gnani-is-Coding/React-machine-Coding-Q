# Next.js v15 — Deep Learning Todo (via CRA → Next migration)

A structured, in-depth learning path for Next.js v15, framed as migrating this
Create React App project to the App Router. Ordered so each topic builds on the
last. Work one vertical slice (a single route, end-to-end) before moving on —
depth beats coverage.

---

## Phase 0 — Foundations & mental model
- [ ] **Why Next.js exists** — the gap CRA leaves: no SSR, no routing, no bundler control. SSR vs SSG vs ISR vs CSR as a spectrum, not four separate things.
- [ ] **App Router vs Pages Router** — learn App Router (the v15 default). Know Pages Router exists so old tutorials don't confuse you.
- [ ] **React Server Components (RSC) model** — *the* concept that makes Next v15 click. Code runs on the server by default and never ships to the browser. Everything else is a consequence of this.
- [ ] **Turbopack** — the new default dev bundler (replaces the Webpack CRA hides). What it does and its current limits.

## Phase 1 — Project setup & migration mechanics
- [ ] **`create-next-app` & project structure** — scaffold a fresh Next 15 app; compare its layout to this CRA `src/`.
- [ ] **Migrating CRA → Next** — move components in, drop `react-scripts`, `index.html` → `app/layout.tsx`, `public/` handling, env var rename (`REACT_APP_*` → `NEXT_PUBLIC_*`).
- [ ] **`next.config.js`** — the config CRA abstracted away. The knobs you'll actually touch.
- [ ] **TypeScript, ESLint & path aliases** — Next's built-in setup vs the CRA config.

## Phase 2 — Routing (the App Router core)
- [ ] **File-based routing** — folders = routes, `page.tsx` = the page. Contrast with the current client-side router.
- [ ] **`layout.tsx` & nested layouts** — shared UI that persists across navigation (app shell / nav).
- [ ] **Dynamic routes** — `[id]`, `[...slug]`, `[[...optional]]`. Map the interview-question detail pages onto this.
- [ ] **Route groups `(group)`, `loading.tsx`, `error.tsx`, `not-found.tsx`** — built-in loading/error boundaries per segment.
- [ ] **`<Link>`, `useRouter`, `usePathname`, `useSearchParams`** — navigation and prefetching.
- [ ] **⚠️ v15 breaking change: `params` & `searchParams` are async (Promises)** — you must `await` them. Trips up everyone migrating.

## Phase 3 — Server vs Client Components (spend the most time here)
- [ ] **Server Components (default)** — data fetching, secrets, heavy deps stay server-side.
- [ ] **`"use client"` directive** — when and where to opt in (state, effects, event handlers, browser APIs).
- [ ] **The composition rule** — Server Components render Client Components, not vice-versa; passing `children` through. The pattern people get wrong.
- [ ] **Migrating existing components** — most CRA components become Client Components at first; then push the boundary *down* the tree for performance.

## Phase 4 — Data fetching & mutations
- [ ] **`async`/`await` directly in Server Components** — no `useEffect`+`fetch` dance.
- [ ] **Extended `fetch()` & caching** — `cache`, `revalidate`, `no-store`. **v15 default changed: fetches and route handlers are no longer cached by default.**
- [ ] **`revalidatePath` / `revalidateTag`** — on-demand cache invalidation.
- [ ] **Server Actions (`"use server"`)** — mutations/forms without building an API route.
- [ ] **Route Handlers (`app/api/.../route.ts`)** — when you still need a real REST/JSON endpoint.
- [ ] **Streaming & `<Suspense>`** — stream slow data in without blocking the page.

## Phase 5 — Rendering strategies & performance
- [ ] **Static vs Dynamic rendering** — how Next decides, and how to force each.
- [ ] **`generateStaticParams`** — pre-render dynamic pages (SSG) at build time.
- [ ] **ISR (Incremental Static Regeneration)** — static speed + fresh data.
- [ ] **PPR (Partial Prerendering)** — v15's flagship experimental feature; static shell + dynamic holes. Concept-level is enough.
- [ ] **`next/image`, `next/font`, `next/script`** — built-in optimization you configured by hand in CRA.
- [ ] **Metadata API & SEO** — `metadata` export / `generateMetadata` (something CRA basically can't do).

## Phase 6 — State, styling, and the ecosystem
- [ ] **Styling options** — CSS Modules, Tailwind, CSS-in-JS caveats with RSC.
- [ ] **Client state (Context/Zustand/Redux) in the RSC world** — where providers live (`"use client"` boundary in layout).
- [ ] **Data libraries** — where TanStack Query still fits vs native fetching.
- [ ] **Middleware (`middleware.ts`)** — auth, redirects, edge logic before the request hits a route.
- [ ] **Auth basics** — cookies, sessions, `next/headers`, and an intro to Auth.js.

## Phase 7 — Ship it
- [ ] **Build & deploy** — `next build`, output modes, deploying to Vercel (and the self-host story).
- [ ] **Env & runtime config** — server-only vs `NEXT_PUBLIC_`, Edge vs Node runtimes.
- [ ] **Testing** — how testing shifts for Server Components; Playwright for E2E.
- [ ] **Retro** — what this CRA app did that Next does better, worse, or differently.

---

## State Management — decision tree (for machine-coding questions)

Four kinds of state; pick the tool per problem, not per habit:

| State type | Reach for | Notes |
|---|---|---|
| **Local UI** | `useState` / `useReducer` | Default. `useReducer` for complex transitions (cart, form, board). |
| **Global client** | **Zustand** (fast) / **RTK** (if asked or large) | Never legacy Redux `connect`. |
| **Server data** | **TanStack Query** / SWR | In App Router, fetch in Server Components; use RQ only for client-side (infinite scroll, live search). |
| **URL state** | `useSearchParams` / nuqs | Filters & pagination belong in the URL, not a store. |
| **Forms** | React Hook Form + Zod | Interview favorite. |

**Per-question decision order:**
1. Local? → `useState` / `useReducer`
2. Shared, small, need it fast? → **Zustand**
3. "Use Redux" / large stateful app? → **RTK**
4. Really fetched data? → **TanStack Query** (not a store)

- **Learn deeply:** `useReducer`, Zustand, RTK, TanStack Query, React Hook Form + Zod
- **Aware-of:** Jotai, SWR, Valtio
- **Skip:** legacy Redux (`connect`/`mapStateToProps`), Recoil

> Biggest interview signal: **not** reaching for a library when React already solves it.

---

**Priority:** Phases 2–4 are 70% of the value. Server/Client Components and the
caching model are where real understanding lives. Migrate one route end-to-end
(route → layout → server fetch → a client island) before moving on.
