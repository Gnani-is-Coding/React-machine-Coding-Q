# Next.js v15 — Deep Learning Todo (via CRA → Next migration)

A structured, in-depth learning path for Next.js v15, framed as migrating this
Create React App project to the App Router. Ordered so each topic builds on the
last. Work one vertical slice (a single route, end-to-end) before moving on —
depth beats coverage.

> Practice question backlog lives in [MACHINE-CODING-TODO.md](./MACHINE-CODING-TODO.md).

---

## Phase 0 — Foundations & mental model ✅

> **Phase 0 takeaways:** Server Components run once on the server → zero JS shipped.
> Client APIs (`useState`, `onClick`) need `"use client"`, which ships + hydrates that
> subtree, so push the boundary *down* to the smallest interactive leaf. Meta/SEO works
> in Next because HTML is generated per-route on the *server* (in the first byte crawlers
> read); CRA's meta is client-side/post-JS, so bots miss it.

## Phase 1 — Project setup & migration mechanics ✅

## Phase 2 — Routing (the App Router core)
- [x] **Dynamic routes** — `[id]`, `[...slug]`, `[[...optional]]`. Map the interview-question detail pages onto this.
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

---

## 📌 Resume here (next session)

**Current state**
- Branch: `feat/migrate-to-nextjs-15` · Next **15.5.20** (pinned) · React 19.2.4 · Tailwind v4 · bun · Node **24.8.0** (nvm default)
- Phase 0 ✅ done & committed (`f6a521f`). Dev server boots green (`bun run dev` → http://localhost:3000).
- Old CRA project preserved in **`(deprecated)/`** — 5 machine-coding components: `Home`, `InfiniteScroll`, `AutoCompleteSearchResults`, `Timer`, `JiraBoard`. CRA routing was `react-router-dom` in `(deprecated)/src/App.js`.

**Where we stopped:** Phase 1, about to do the **first migration — the Timer** (chosen because it's fully interactive → teaches the `"use client"` boundary + file-routing).

**Key lesson to apply:** App Router has **no react-router-dom**. The folder tree *is* the router.

| CRA | App Router |
|---|---|
| `index.js` (`createRoot` + `<BrowserRouter>`) | `app/layout.tsx` (exists) |
| `App.js` `<Routes>` | the `app/` folder tree |
| `<Route path="/timer" Component={Timer}/>` | `app/timer/page.tsx` |
| `Timer` (hooks + onClick) | same code **+ `"use client"`**, `.jsx`→`.tsx` |

**Next action:** create `app/timer/page.tsx` (target code below), run `bun run dev`, visit `/timer`.
Decision left open: type it myself (best retention) vs. have Claude scaffold it.

```tsx
"use client";                    // interactive → opt into the browser
import { useEffect, useRef, useState } from "react";

export default function TimerPage() {          // default export = the route
  const [timeVal, setTimeVal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);  // typed for TS

  useEffect(() => {
    if (isRunning) {
      timerId.current = setTimeout(() => setTimeVal((t) => t + 1), 1000);
    }
    return () => { if (timerId.current) clearTimeout(timerId.current); };
  }, [isRunning, timeVal]);

  return (
    <div>
      <p>Timer value: {timeVal}</p>
      {!isRunning && <button onClick={() => setIsRunning(true)}>Start</button>}
      {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
    </div>
  );
}
```

**Then:** migrate the remaining 4 routes (each a folder under `app/`), keeping non-interactive shells as Server Components and pushing `"use client"` down to interactive leaves. Continue Phase 1 → Phase 2.
