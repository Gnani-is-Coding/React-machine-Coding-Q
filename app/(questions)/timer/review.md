# Stopwatch — review of attempt

Reviewed 2026-08-24 against `question.md`. Branch `feat/migrate-to-nextjs-15`.

## Self-score: 1 / 5

| Check | Result |
|---|---|
| Accurate after 5 min continuous run | ✗ |
| Accurate after 2 min hidden tab | ✗ |
| Lap deltas derived, not stored | ✗ |
| No leaked loop on unmount, no double-start | ✗ |
| Server page + client leaf | ✓ |

## Blocker: does not typecheck

`npx tsc --noEmit` — 3 errors, all rooted at `Clock.tsx:19`:

```
Clock.tsx(19,22): error TS2554: Expected 1 arguments, but got 0.
Clock.tsx(35,45): error TS2769: No overload matches this call.
Clock.tsx(44,45): error TS2769: No overload matches this call.
```

`useRef()` with no arg infers `MutableRefObject<undefined>`. Every `clearInterval(timerRef.current)` is a type error. Interviewer runs the build first. Fix before anything else.

## Three root causes generate most findings

**1. Counting ticks instead of reading a clock.** `Clock.tsx:22` — `setTime(prev => prev += 1)` on a 10ms interval. Time becomes "how many times my callback got to run". Every constraint in the *Accuracy constraints* section is about this exact thing:

- Constraint 1 (no drift): `setInterval` never fires at exactly 10ms. Errors accumulate one direction. 5 min run will be visibly short.
- Constraint 2 (hidden tab): browsers clamp hidden-tab timers to ~1/sec. 2 min hidden = counter advances ~120 instead of ~12000. Off by 100x.
- Constraint 4 (smooth without burning main thread): 100 `setState` per second, full subtree re-render each. Display only needs to change as fast as a screen refreshes.
- Refresh survival: restoring a *count* cannot know how long the page was closed. A stored origin can.

Every one of those is the same single defect. Change what you store and all four move together.

**2. Storing derived data.** `Clock.tsx:53` — `{ [format(time)]: time }`. Lap record is `Record<string, number>` where the key is the *formatted display string* of the value next to it. Spec: "Lap records are stored as absolute marks. Deltas are computed." Downstream cost is visible at `Lap.tsx:13` and `Lap.tsx:24` — `Object.entries(...)` then index `[1]` to get back the number you already had. Also missing Should-requirement: fastest/slowest lap marked. Not accidental that it is missing — the chosen shape makes it awkward.

**3. Interval owned by event handlers, not by an effect.** Created at `Clock.tsx:29` and `Clock.tsx:39`. Consequences:

- No cleanup on unmount anywhere. Navigate away while running: interval keeps firing, `setTime` on an unmounted component. Spec edge case "Unmount while running" — fails.
- `handleResume` (`Clock.tsx:38-41`) has no `isRunning` guard. `handleStart` has one at `:27`. Double-click Resume = two intervals = double speed. Spec edge case "double-click Start" — fails on that path.
- Two functions doing the identical thing (`:29` and `:39`) is the tell. Ask why Resume needs to exist at all when Start already does not zero the time.

## Findings by file

### `Clock.tsx`

- `:16` — comment says `// in ms`, but 1 is added per 10ms. Unit is centiseconds. Comment lies about the model, and lying comments are worse than none.
- `:22` — `prevVal => prevVal += 1` mutates the parameter and returns the assignment's value. Works by accident. Updater must be pure.
- `:26`, `:28`, `:64` — `console.log` in shipped code.
- `:56-68` mount effect — reading `localStorage` in an effect instead of during render is **correct**, avoids hydration mismatch. But `:65` calls `handleStart()`, which reads `isRunning` from the mount-render closure. It happens to be `false` so it passes the guard. Correct by luck. Then `:66` `setRunning(storedflag)` is redundant — `handleStart` already set it.
- `:59` — `x === "true" ? true : false`.
- `:58` — `Number(getlocalStorageItem(...))` on an arbitrary stored string. Storage is an external input at a trust boundary. Tampered or stale value gives `NaN`, and `if (storeVal)` then silently swallows both `NaN` and legitimate `0`.
- `:70-75` — persistence effect, deps `[time, isRunning]`, write in the cleanup. Fires on every tick. ~100 synchronous `localStorage.setItem` per second, on the main thread, each one blocking. This alone would end an interview round. The cleanup-as-writer trick also means the value written is one render behind.
- `:77-83` `format` — several problems:
  - `Math.round` in all three places. At t=99 (0.99s): `sec` rounds to `1`, `millisec` is `99`. Display reads `0:1:99` — a time the stopwatch has not reached. Spec: "the display must never show a time the stopwatch has not reached." Truncation, not rounding.
  - No zero padding. Spec wants `MM:SS.CS`; output is `0:5:3`.
  - Separator: spec is a `.` before centiseconds, code uses `:`.
  - `:80` comment says "cap to 60 mins" but `% 60` *wraps* to 0. Spec asks for a decision on hours-vs-overflow, defended. Wrapping silently is the failure mode it names.
  - Recomputed inline at `:87` on every one of the 100 renders/sec.
- `:85-98` render — accessibility section unaddressed: no semantic `<time>` element; readout has no live-region control, so a screen reader announces a changing number 100x/sec (spec: announce on stop and lap only).
- `:89-90` — Start and Stop both always enabled. Start when running does nothing (guard), Stop when stopped does nothing. Spec: "Buttons reflect state."
- `:93` — `time == 0`, loose equality.

### `Lap.tsx`

- `:2` — `ILaps` imported, never used.
- `:10-16` `delta` — bare `return` for index 0 gives implicit `number | undefined`. No explicit return type.
- `:13-15`, `:24` — `Object.entries(...)` destructure then `arr[1]`. Pure consequence of root cause 2. Unreadable, and the data shape's fault, not this file's.
- `:27` — `<li>` with no `key`. React warns on every render.
- `:18` — `<ul>`. Spec: ordered list.
- `:20`, `:29` — `<h1>` for a section label, and a second `<h1>` per list item. Multiple h1s, heading used for styling.
- `:29` — delta rendered as a raw number, not formatted like the main readout.
- Fastest / slowest lap marking: missing entirely.

### `Button.tsx`

- `:25` — third time flagged. Class string hardcodes `bg-blue-600` and `hover:bg-blue-700` **before** interpolating `${bgColor}`. Two `bg-*` utilities in one class list have equal specificity, so the winner depends on stylesheet order, not string order. The DANGER button's color is undefined behavior, and its hover is blue regardless. The `switch` at `:14-23` computes a value that may or may not apply.
- `:25` — `${disable && '...'}` writes the literal string `false` into `className` when `disable` is falsy. And `disabled:` is a Tailwind variant — it already self-gates, the guard does nothing. No visual disabled state at all (no opacity change), so a disabled button looks identical to an enabled one.
- `:6` — `type: string`. Should be a string literal union; `type="PRIMRY"` compiles today.
- `:7` — `icon?: any`. No `any`.
- `:3` — `type` alias for an object shape; house rule is `interface`.
- No `type="button"`. Inside a form, every one of these submits it.
- Prop named `action` — collides with the form-action meaning in this Next.js version. Rename.

### `page.tsx`

- `:8` — raw `<img>` for `/assets/clock.gif`. Next's lint rule flags it; also an animated gif next to a stopwatch is a second, unsynchronized clock on screen.
- `:1` and all files — `import React from 'react'` unneeded under the current JSX transform.

### `utils/`

- `getlocalStorageItem` touches `localStorage` with no guard. Throws in Safari private mode and anywhere storage is disabled — takes the whole client component down. `setLocalStorageItem` has no quota handling. Boundary rule: validate and fail safe at the edge.

## What is right

- **Server page + client leaf.** `page.tsx` stays a Server Component, `'use client'` sits on `Clock.tsx` only. This is the actual Next.js point of the exercise, and it landed.
- Component split is sensible (Clock / Lap / Button).
- No state library. Correct read of the spec.
- Reading storage in an effect, not during render.
- Disabled states attempted on Reset and Lap.

## Fix order

1. Green build — the ref type.
2. Root cause 1. One decision about what lives in state; it moves drift, hidden-tab, refresh, and render cost at once.
3. Root cause 3 — one owner for the loop, cleaned up on unmount.
4. Root cause 2 — store marks, derive everything else. `Lap.tsx` collapses and fastest/slowest becomes trivial.
5. `format` truncation + padding.
6. Persistence write frequency.
7. `Button.tsx`.
8. Accessibility pass.

## Open question

You said you know how to fix background-tab throttling and offered your approach. Specifically: **does your fix also make restore-after-the-tab-was-closed work?** The right mechanism gets both from one change. A fix that only handles the hidden tab is the shallower one.
