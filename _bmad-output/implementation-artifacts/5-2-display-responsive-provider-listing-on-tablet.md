# Story 5.2: Display Responsive Provider Listing on Tablet

Status: done

## Story

As a **tablet user**,
I want a tablet-optimized layout leveraging the larger screen,
So that I can see more information without excessive scrolling.

## Acceptance Criteria

1. Two-column layout with filters sidebar on the left (768px–1023px)
2. Provider cards in a 2-column grid
3. Filter panel visible without a menu toggle (unlike mobile)
4. Touch-friendly interaction targets (≥44px)
5. All features work identically to mobile/desktop

## Tasks / Subtasks

- [x] Task 1 — Add `@media (min-width: 768px)` sidebar layout in `style.css`
  - [x] 1.1 `.providers-layout { grid-template-columns: 240px 1fr; gap: 2rem; align-items: start; }`
  - [x] 1.2 `.providers-sidebar { position: sticky; top: 1rem; }` — sticky filter panel
  - [x] 1.3 `.filters-container { margin: 0; }` — layout handles spacing
  - [x] 1.4 `.provider-grid { grid-template-columns: repeat(2, 1fr); }` — 2-column grid

- [x] Task 2 — Verify build
  - [x] 2.1 `mise run build` — 0 errors ✅
