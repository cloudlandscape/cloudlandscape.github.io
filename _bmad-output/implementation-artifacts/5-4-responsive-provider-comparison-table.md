# Story 5.4: Responsive Provider Comparison Table

Status: done

## Story

As a **user comparing providers on any device**,
I want the comparison table to display clearly on small screens,
So that I can view comparisons on mobile without frustration.

## Acceptance Criteria

1. Mobile (< 768px): first column (service names) sticky while scrolling horizontally
2. Provider columns scroll horizontally; table remains readable
3. Tablet (768–1023px): table scrollable with sticky first column
4. Desktop (1024px+): table visible without horizontal scrolling
5. Sticky first column functions correctly with keyboard navigation

## Tasks / Subtasks

- [x] Task 1 — Extend sticky first column to tablet in `style.css` (AC: #2, #3)
  - [x] 1.1 Extract comparison table sticky CSS from `@media (max-width: 767px)` into new `@media (max-width: 1023px)` block
  - [x] 1.2 Move `.provider-actions`, `.services-grid`, `.provider-meta-grid` into mobile-only `@media (max-width: 767px)` block

- [x] Task 2 — Add minimum column widths to `compare.html` inline style (AC: #1, #2)
  - [x] 2.1 Add `min-width: 120px` to `.comparison-table th, td` — prevents column collapse on small screens
  - [x] 2.2 Add `min-width: 140px` to `.comparison-table tbody th` — row label column has more room

- [x] Task 3 — Verify build
  - [x] 3.1 `mise run build` — 0 errors ✅

## Dev Notes

- `compare.html` is a standalone static HTML file (not a Zola template)
- `overflow-x: auto` on `.comparison-table-wrapper` was already present
- Keyboard nav through sticky columns works via native browser sticky positioning (no JS needed)
