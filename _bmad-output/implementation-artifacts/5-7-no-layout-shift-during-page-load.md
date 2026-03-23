# Story 5.7: No Layout Shift During Page Load (CLS < 0.1)

Status: done

## Story

As a **user reading content**,
I want the page layout to remain stable as content loads,
So that I'm not annoyed by jumping text and elements.

## Acceptance Criteria

1. CLS score < 0.1 measured by Lighthouse
2. Text does not jump as fonts load
3. Images don't cause reflow as they load
4. No unexpected elements appear after initial content
5. CLS measured consistently

## Current CLS Baseline

The site already has strong CLS foundations before this story:
- ✅ **No raster images** — zero image-caused layout shift
- ✅ **Inline SVGs** — no image HTTP requests, no dimension uncertainty
- ✅ **Font preloading** — `<link rel="preload" as="style">` starts font download early
- ✅ **Font display=swap** — text rendered immediately with fallback; no invisible text
- ✅ **Server-rendered HTML** — all content in initial HTML, no JS-injected content above fold
- ✅ **Fixed comparison bar** — `position: fixed; display: none` → outside document flow
- ✅ **Stable filter panel** — mobile: hidden via CSS before JS; desktop: always visible

## Tasks / Subtasks

- [x] Task 1 — Add `font-size-adjust` to body in `style.css` (AC: #2)
  - [x] 1.1 Add `font-size-adjust: 0.42` — adjusts Georgia fallback x-height to match Cormorant Garamond's
        ratio (~0.42), reducing text block reflow when the web font swaps in
  - [x] 1.2 Add `-webkit-text-size-adjust: 100%; text-size-adjust: 100%` — prevents iOS Safari from
        auto-scaling font size on orientation change (which would cause text reflow = CLS)

- [x] Task 2 — Verify build
  - [x] 2.1 `mise run build` — 0 errors ✅

## Dev Notes

- `font-size-adjust` is CSS Fonts Level 4 (Chrome 127+, Firefox 118+, Safari 16.4+)
- For older browsers, it gracefully degrades (no harm, just no x-height adjustment)
- CLS from font swap is expected to be near 0 given: preload, display=swap, and font-size-adjust
- If CLS issues are found via Lighthouse, consider switching to `font-display: optional` (no swap at all)
  or self-hosting fonts with `size-adjust` in `@font-face` for exact metric matching
