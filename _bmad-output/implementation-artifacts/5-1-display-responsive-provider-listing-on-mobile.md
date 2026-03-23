# Story 5.1: Display Responsive Provider Listing on Mobile

Status: done

## Story

As a **mobile user**,
I want the provider listing to display clearly on small screens,
So that I can discover providers on my phone.

## Acceptance Criteria

1. Provider cards stacked in a single column on screens < 768px
2. Touch-friendly button sizes (≥44px height) on interactive elements
3. Readable text without horizontal scrolling
4. Filter panel accessible via collapsible toggle on mobile
5. All features work the same as desktop (filtering, comparison selection)
6. No horizontal scrolling required

## Tasks / Subtasks

- [x] Task 1 — Introduce `.providers-layout` CSS grid (single column mobile-first)
  - [x] 1.1 Add `.providers-layout { display: grid; grid-template-columns: 1fr; }` base rule in `style.css`
  - [x] 1.2 Hide `.filters-toggle` by default; mobile.js shows it on `< 768px`

- [x] Task 2 — Wrap section template in layout containers (templates/section.html)
  - [x] 2.1 Wrap `<section class="filters-container">` in `<div class="providers-sidebar">`
  - [x] 2.2 Wrap result-count + provider-grid in `<div class="providers-main">`
  - [x] 2.3 Wrap sidebar + main in `<div class="providers-layout">`

- [x] Task 3 — Update mobile media query to `max-width: 767px` for clean breakpoint boundary
  - [x] 3.1 Replace all `@media (max-width: 768px)` with `@media (max-width: 767px)` in `style.css`
  - [x] 3.2 Update `mobile.js` isMobile check from `<= 768` to `< 768`

- [x] Task 4 — Verify build and accessibility
  - [x] 4.1 `mise run build` — 0 errors ✅
