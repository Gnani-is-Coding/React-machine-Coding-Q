# React Machine Coding — Practice Backlog

Build list for this repo. One folder per question under `app/(questions)/`.
Sorted by difficulty. ⭐ = fast-track must-do · ◆ = do next if time · 🆕 = from web research (not yet in Notion).

**Rule of the round:** 60–90 min, working > pretty. Break down UI → design state →
handle edge cases (empty / loading / error / boundary) → accessible markup.

---

## ⚡ Fast track — do these, in this order

No time for 138. These **10** cover every distinct pattern an interviewer can test.
Everything else in this file is a re-skin of one of them.

**Rules:** time-box each, **stop when the timer ends even if broken**. Then read one
reference solution, note the one thing you missed, move on. Come back and redo any
question you failed — a second attempt from memory beats five new questions.

| # | Build | Time | Pattern it teaches | Interviewer is watching for |
|---|---|---|---|---|
| 1 | **Todo List** | 60m | `useReducer` CRUD, list keys, derived filtering | Do you mutate state? Stable keys? Filter derived, not stored? |
| 2 | **Accordion + Tabs** (one build, two modes) | 60m | Controlled vs uncontrolled, single vs multi-open, compound components | Does the parent own the state? `aria-expanded` / `aria-controls`? |
| 3 | **OTP Input** | 60m | Ref arrays, focus management, paste of full code, backspace-to-previous | Paste a 6-digit code. Almost everyone breaks here. |
| 4 | **Autocomplete + debounce + `AbortController`** | 75m | Async races, request cancel, response cache, keyboard nav, highlight | Stale response overwriting a newer one. **The most-asked question.** |
| 5 | **Modal + Toast system** | 75m | Portals, focus trap, `Escape` + scroll lock, imperative API via context, timer queue | `toast.success()` from anywhere; focus returns to trigger on close. |
| 6 | **Pagination + Infinite Scroll** (same data, two UIs) | 75m | Page math, truncated `1 … 4 5 6 … 20`, `IntersectionObserver`, URL as state | Page in the URL, refresh-safe. Loading + end-of-list + error states. |
| 7 | **Nested Comments** | 75m | Recursion, immutable update deep in a tree, collapse subtree | Do you rebuild the tree immutably or reach for a mutation? |
| 8 | **Data Table** — sort + filter + paginate + row select | 90m | Composing derived state, `useMemo`, select-all across pages | Order of operations: filter → sort → paginate. Get it wrong and it's obvious. |
| 9 | **Multi-Step Wizard Form** (RHF + Zod) | 90m | Step state machine, per-step validation, back preserves data, final review | Can you go back without losing input? Validate per step, not at the end. |
| 10 | **Shopping Cart** | 75m | Reducer, derived totals, quantity edge cases, optimistic add + rollback | Totals computed, never stored. Qty 0 removes the row. |

**Total ≈ 12–13 hours.** Two weekends. That is interview-ready.

### Before each build — 10-minute JS opener
Rotate one per session, from memory: `debounce` → `throttle` → `memoize` →
`EventEmitter` → `Promise.all` polyfill → `useFetch` → `useDebounce`.
Rounds often open with one of these.

### If time is left, in this order
11. **Carousel** — index math, autoplay + pause on hover, keyboard, swipe
12. **File Explorer + tri-state checkboxes** — reuses #7's recursion, adds parent/child sync
13. **Command Palette (Cmd+K)** — capstone; reuses #4 and #5
14. **Virtualized List, 10k rows** — windowing math, prove the win with the Profiler
15. **Kanban Board, hand-rolled DnD** — cross-list move + reorder
16. **Star Rating** (20m) and **Chips Input** (30m) — cheap, occasionally asked verbatim

### Skip unless the JD names it
Rich text editor · Calendar/scheduler · Spreadsheet clone · Whiteboard · WebGL ·
Mini Virtual DOM · Mini Redux/Router. High cost, low hit rate. Be able to *talk*
through them; don't spend a weekend building them.

---

## ⚪ JS Warm-ups — utilities & polyfills 🆕

Asked as a 10-min opener before the UI build. Do them once, from memory.

- [ ] 🆕 `debounce` / `throttle` (with leading + trailing options)
- [ ] 🆕 `memoize` (custom cache key resolver)
- [ ] 🆕 Deep clone + deep equal
- [ ] 🆕 `curry` / partial application / `pipe`
- [ ] 🆕 Polyfills: `Array.prototype.map` / `flat` / `reduce`, `Function.prototype.bind`
- [ ] 🆕 Polyfills: `Promise.all` / `allSettled` / `any` / `race`
- [ ] 🆕 Custom `Promise` class (then/catch/finally, chaining)
- [ ] 🆕 `EventEmitter` (on / off / once / emit)
- [ ] 🆕 LRU cache
- [ ] 🆕 Retry with exponential backoff
- [ ] 🆕 Concurrency-limited task scheduler (run N promises at a time)
- [ ] 🆕 Custom hooks: `useFetch`, `useDebounce`, `usePrevious`, `useLocalStorage`, `useIntersectionObserver`

---

## 🟢 Easy — warm-ups

- [ ] Todo List ⭐
- [ ] Tabs ⭐
- [ ] Accordion ⭐
- [ ] Star Rating ◆
- [ ] Progress Bar
- [ ] Stopwatch / Timer
- [ ] OTP Input ⭐
- [ ] Stepper
- [ ] Password Generator
- [ ] Tic Tac Toe
- [ ] Memory Game
- [ ] Pomodoro Timer
- [ ] 🆕 Countdown Timer (target date, pause/resume, tab-switch safe)
- [ ] 🆕 Toggle / Switch component (controlled + uncontrolled)
- [ ] 🆕 Traffic Light (state machine)
- [ ] 🆕 Digital Clock + Analog Clock (SVG hands)
- [ ] 🆕 Like Button with optimistic update + rollback on failure
- [ ] 🆕 Tooltip / Popover (positioning, click-outside, portal)
- [ ] 🆕 Contact Form — controlled inputs + validation + submit states
- [ ] 🆕 Controlled vs uncontrolled input demo (know the trade-off out loud)
- [ ] 🆕 Calculator (operator precedence, chained ops, clear/backspace)
- [ ] 🆕 Weather App (API + search + units toggle + error states)
- [ ] 🆕 Responsive Grid / holy-grail layout — pure CSS, no framework
- [ ] 🆕 Context Menu (right-click, viewport-aware position, nested items)
- [ ] 🆕 Skip-Ads button (YouTube style — timed unlock)

---

## 🟡 Medium

- [ ] Pagination (classic + truncated) ⭐
- [ ] Infinite Scroll ⭐
- [ ] Autocomplete / Search with Debounce ⭐
- [ ] Multi-select Search
- [ ] Carousel ◆
- [ ] Nested Comments (tree traversal) ⭐
- [ ] Posts & Comments
- [ ] File Explorer (tree, VS Code style) ◆
- [ ] Selectable Grid
- [ ] Job Board
- [ ] Quiz App
- [ ] Shopping Cart / Add to Cart ⭐
- [ ] Ecommerce Filters
- [ ] Toast / Notification System ⭐
- [ ] Reusable Modal / Dialog System ⭐
- [ ] Reusable Table/Grid (sorting + filtering)
- [ ] Multi-Step Wizard Form ⭐
- [ ] Responsive Image Gallery
- [ ] Video Player
- [ ] Instagram Stories
- [ ] Reddit Client
- [ ] Feature Flag / Toggle System
- [ ] Nested Checkboxes (tri-state / select-all) ◆
- [ ] Chip / Tags Input ◆
- [ ] Dependent Dropdowns (country → state)
- [ ] 🆕 Transfer List (dual listbox, move one / move all)
- [ ] 🆕 Responsive Nav Bar with nested dropdown menus (keyboard + a11y)
- [ ] 🆕 Email Inbox view (list ↔ detail, read/unread, bulk select)
- [ ] 🆕 Cinema Hall Seat Booking UI (seat map, hold, price total)
- [ ] 🆕 Messaging / Chat list UI (no realtime — that's the Hard one)
- [ ] 🆕 Giphy / Unsplash search — API + grid + autoplay on hover
- [ ] 🆕 Wordle
- [ ] 🆕 Connect Four
- [ ] 🆕 Snake Game
- [ ] 🆕 Sudoku board (input + validation)
- [ ] 🆕 Tabs via compound components (`<Tabs><Tab/></Tabs>` + context)
- [ ] 🆕 Custom Date Picker (no library)
- [ ] 🆕 Custom Marquee — horizontal + vertical scroll modes
- [ ] 🆕 Horizontal scroll section driven by vertical page scroll
- [ ] 🆕 Render Props — build the same widget with render props vs hooks
- [ ] 🆕 Throttled API calls with `AbortController` (no debounce), plus retry in `catch`
- [ ] 🆕 Bulk API from the frontend — serialize N requests, progress + partial failure
- [ ] 🆕 Drag-to-reorder list — hand-rolled, no dnd library
- [ ] 🆕 Lightbox (open from grid, prev/next, keyboard + swipe, focus trap)
- [ ] 🆕 Image lazy loading with blur placeholder (IntersectionObserver)
- [ ] 🆕 Snake & Ladder board
- [ ] 🆕 Checkout page (address → payment → review, cart totals, coupons)
- [ ] 🆕 Employee / CRUD admin table (create, inline edit, delete, search)
- [ ] 🆕 Keyboard shortcut manager (register, scope, conflict handling)
- [ ] 🆕 Scroll-spy sticky nav (active section on scroll)
- [ ] 🆕 Touch gestures — swipe to dismiss / pull to refresh
- [ ] 🆕 i18n — locale switch, pluralization, RTL flip

---

## 🔴 Hard

- [ ] Config-Driven / Dynamic Form Builder (nested fields + validation)
- [ ] Kanban Board (drag & drop) ◆
- [ ] Real-time Chat UI
- [ ] Calendar / Scheduler
- [ ] Rich Text Editor
- [ ] Virtualized List (render 10k+ items efficiently) ◆
- [ ] Drag-and-Drop File Uploader
- [ ] Dashboard with Charts, Filters & Dynamic Widgets
- [ ] Data Table (sort + filter + pagination + row selection combined) ⭐
- [ ] Command Palette (Cmd/Ctrl+K) ◆
- [ ] 🆕 Multi-file multipart upload to S3 with real-time per-file progress
- [ ] 🆕 Custom Error Boundary + Sentry `captureException` wrapper class
- [ ] 🆕 Custom product tour / spotlight (target by element id, no JoyRide)
- [ ] 🆕 Undo / Redo system (command stack over any editor above)
- [ ] 🆕 Spreadsheet / Excel clone (cell refs, formulas, keyboard nav)
- [ ] 🆕 Whiteboard / drawing canvas (shapes, pan, zoom)
- [ ] 🆕 Image cropper / editor
- [ ] 🆕 Advanced typeahead — request cache, abort in-flight, keyboard nav, highlight
- [ ] 🆕 Mini state manager (build Redux: store, dispatch, subscribe, middleware)
- [ ] 🆕 Mini router (build react-router: history, `<Route>`, params)
- [ ] 🆕 Virtualized data table (virtualization + sort + sticky header)
- [ ] 🆕 Live poll / presence UI over WebSockets
- [ ] 🆕 Charts from scratch in SVG (line + bar + tooltip + axis, no chart lib)
- [ ] 🆕 Web Worker offload — heavy compute off the main thread, measure it
- [ ] 🆕 Offline-first / PWA — service worker, cache strategy, sync on reconnect
- [ ] 🆕 Mini Virtual DOM (createElement, diff, patch)

---

## 🧠 System Design / Senior Rounds (discussion)

- Structure a large-scale React project
- Design a reusable component library
- Architect scalable state management
- API caching & retry strategies
- Optimistic UI updates
- Handle error boundaries & fallback UIs
- Prevent unnecessary re-renders
- 🆕 Rendering strategy: CSR vs SSR vs SSG vs ISR vs PPR — pick per page and defend it
- 🆕 Micro-frontends: when they help, when they cost more than they save
- 🆕 Frontend observability — OpenTelemetry, log shipping, source maps in prod
- 🆕 Code splitting & bundle budgets (Webpack/Turbopack, lazy routes)
- 🆕 Accessibility & i18n as architecture, not a late pass
- 🆕 Browser security: CSP, CORS, cross-domain embedding, XSS/CSRF on the client

---

## 🧰 Personal build list (from my own notes)

- [ ] Onboarding form
- [ ] Cookie helpers (the customized ones)
- [ ] React Hook Form — a set of reusable form components
- [ ] `Syncer()` from test-taking/active — rebuild standalone
- [ ] reCAPTCHA integration
- [ ] SEO-optimised `<head>` for a site
- [ ] Intersection Observer — active-element-in-view, with and without it
- [ ] `getBoundingClientRect`, `scrollY`, scroll progress — one demo page for all of them
- [ ] Rebuild a question in Vite + Tailwind + TS + Redux (Redux practice run)
- [ ] Rebuild a question in vanilla HTML/CSS/JS, no boilerplate
- [ ] Publish the shared components as a private UI library, consume it here

---

## 🔗 Practice links

- [ ] Insta Stories — roadmap.sh/projects/stories-feature
- [ ] Quiz App — roadmap.sh/projects/quiz-app
- [ ] Pomodoro — roadmap.sh/projects/pomodoro-timer
- [ ] Reddit Client — roadmap.sh/projects/reddit-client
- [ ] OTP — frontendpro.dev
- [ ] Calendar View — frontendpro.dev
- [ ] Multi Select Search — frontendpro.dev
- [ ] Video Player App — frontendpro.dev
- [ ] Payment Landing Page — frontendpro.dev
- [ ] 🆕 GreatFrontEnd — user interface questions
- [ ] 🆕 BigFrontEnd.dev — JS utilities & polyfills
- [ ] 🆕 frontendgeek.com/frontend-interview/machine-coding-interview

---

## 📦 GitHub repos worth mining

- [sanchit0496/reactjs-machine-coding-challenges](https://github.com/sanchit0496/reactjs-machine-coding-challenges) — 40 solved components, closest match to this repo's shape
- [Abhay5855/Mission-frontend](https://github.com/Abhay5855/Mission-frontend) — JS + React + machine coding + patterns in one place
- [anuj-webdev/frontend-machine-coding-interview-questions-reactjs](https://github.com/anuj-webdev/frontend-machine-coding-interview-questions-reactjs) — 30 questions split beginner / intermediate / advanced
- [sameerkali/React_coding_round_practice](https://github.com/sameerkali/React_coding_round_practice) — coding round + system design mix
- [greatfrontend/top-reactjs-interview-questions](https://github.com/greatfrontend/top-reactjs-interview-questions) — theory round companion
- [NarendraKoya999/Frontend-Machine-Coding-Interview-Questions](https://github.com/NarendraKoya999/Frontend-Machine-Coding-Interview-Questions) — huge but noisy; skim, don't follow
- Topic pages: [machine-coding-questions-frontend](https://github.com/topics/machine-coding-questions-frontend) · [machine-coding-interview](https://github.com/topics/machine-coding-interview)

> Read a repo's solution **only after** your own attempt is on the clock and done.
