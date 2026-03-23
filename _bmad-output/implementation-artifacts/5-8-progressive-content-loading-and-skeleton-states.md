# Story 5.8: Progressive Content Loading and Skeleton States

Status: done

## Story

As a **user on slow connections**,
I want to see content progressively as it loads,
So that I feel the page is responsive even if it takes a moment.

## Acceptance Criteria

1. Core content visible first (critical path rendering)
2. Text and headers load before images
3. Provider cards populate progressively
4. No blank page "waiting" state
5. FCP under 1 second (NFR-P4)
6. TTI under 3 seconds (NFR-P3)

## Current State (Already Achieved via Static Site Architecture)

The site achieves progressive loading by design:
- ✅ **Static HTML** — all provider cards are in the initial HTML response; visible on first byte
- ✅ **No blocking JS** — all `<script>` tags use `defer`; no JS required to see content
- ✅ **No blocking fonts** — `rel="preload"` + deferred stylesheet + `display=swap`
- ✅ **No raster images** — zero image-caused render blocking
- ✅ Single CSS file (`/style.css`) — one request, browser caches immediately

## Tasks / Subtasks

- [x] Task 1 — Add CSS skeleton shimmer animation for filter feedback (AC: #3)
  - [x] 1.1 Add `@keyframes skeleton-shimmer` to `style.css` — 90deg linear-gradient sweep
  - [x] 1.2 Add `.provider-grid.is-filtering .provider-card` rule — opacity 0.6, pointer-events none
  - [x] 1.3 Add `.provider-grid.is-filtering .provider-card::after` — animated shimmer overlay
  - [x] 1.4 Respect `@media (prefers-reduced-motion: reduce)` — disable animation for users who prefer it

- [x] Task 2 — Wire skeleton state into `filter.js` (AC: #3)
  - [x] 2.1 Add `const grid = document.querySelector('.provider-grid')` in `initFilters`
  - [x] 2.2 For search input, checkbox, and reset: add `grid.classList.add('is-filtering')` before filter,
        remove in `requestAnimationFrame` callback after filter runs
  - [x] 2.3 Initial page load: skip shimmer (content is already visible from static HTML)
  - [x] 2.4 Guard: if `grid` is null, fall back to synchronous filter (no shimmer)

- [x] Task 3 — Verify build
  - [x] 3.1 `mise run build` — 0 errors ✅
  - [x] 3.2 CSS budget: 27KB / 50KB ✅; JS budget: well under 100KB ✅

## Dev Notes

- The shimmer is a CSS-only animation (no JS for the animation itself, only JS for class toggling)
- `requestAnimationFrame` ensures the browser paints the `.is-filtering` state before running filter logic
- The animation runs at most 0.8s (one `skeleton-shimmer` iteration) — brief enough not to annoy
- On initial load, no shimmer is shown because the first filter pass runs before first paint
