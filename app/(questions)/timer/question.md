# Stopwatch

**Difficulty:** Easy · **Time box:** 45 min · **Fast-track:** no (warm-up)

Build a stopwatch. Working > pretty.

---

## Clarify first

Two different questions share the name "Timer". Settle this before writing anything:

- **Stopwatch** — counts up from 0. Start / Stop / Reset / Lap.
- **Countdown** — counts down from a user-set target, fires at zero.

This spec is the **stopwatch**.

---

## Requirements

### Must
- Display elapsed time as `MM:SS.CS` — minutes, seconds, centiseconds.
- **Start** — begins counting.
- **Stop** — pauses. Value is retained on screen.
- **Start after Stop** — resumes from the retained value. Does not restart from 0.
- **Reset** — returns to 0. Disabled when the value is already 0.

### Should
- **Lap** — records the current time into a list, stopwatch keeps running. Disabled when not running.
- Lap list shows both the absolute time and the delta from the previous lap.
- Fastest and slowest lap visually marked.

### Stretch
- Survives a page refresh mid-run.
- Keyboard: `Space` start/stop, `R` reset, `L` lap.

---

## Accuracy constraints

These are the question. A stopwatch that only looks right while you watch it fails.

1. **No drift.** After 5 minutes of continuous running, the display must match a wall clock. Not "close" — match.
2. **Background-tab safe.** Hide the tab for 2 minutes, come back. The displayed time must be correct on the first frame after return. Browsers throttle and clamp timers in hidden tabs; your reading of elapsed time must not depend on how often your code got to run.
3. **Clock-change safe.** A system clock adjustment (NTP sync, manual change, DST) must not make the stopwatch jump or go backwards.
4. **Smooth at centisecond resolution** without burning the main thread.

---

## State rules

- **Derived, never stored:** the formatted display string, lap deltas, fastest/slowest lap, total. If it can be computed from state, it is not state.
- Lap records are stored as absolute marks. Deltas are computed.
- Local state only. No store, no context, no data library. Reaching for one here is a negative signal.

---

## Edge cases

- Double-click **Start** — must not run two loops at once (would double the tick rate).
- **Reset while running** — pick a behaviour (zero-and-keep-running, or zero-and-stop) and be able to defend it. Silence is the failure, not the choice.
- Unmount while running — no leaked loop, no state update after unmount.
- Past 60 minutes — decide whether the display grows an hours field or lets minutes exceed 60.
- Rounding — the display must never show a time the stopwatch has not reached.
- Buttons reflect state: Reset disabled at 0, Lap disabled when stopped.

---

## Accessibility

- Semantic time element for the readout.
- The running display must **not** be announced continuously by a screen reader. Announce on stop and on lap only.
- Lap list is an ordered list.
- Every control has a real accessible name, not just an icon.

---

## Next.js angle (repo-specific)

- The route page stays a **Server Component**. Only the interactive stopwatch is a Client Component, living in `components/`.
- The `"use client"` boundary sits as low in the tree as it can. Pushing it up to the page is the mistake this exercise exists to catch.
- Nothing browser-only may be touched during render.

---

## Self-score

Five checks. Five out of five passes the round.

- [ ] Accurate after 5 min continuous run
- [ ] Accurate after 2 min in a hidden tab
- [ ] Lap deltas derived, not stored
- [ ] No leaked loop on unmount, no double-start
- [ ] Server page + client leaf, boundary as low as possible

Stop at 45 minutes even if incomplete. Note what was missing, then read one reference solution.
