# Story 5.5: Progressive Enhancement — Filter Works Without JavaScript

Status: done

## Story

As a **user with JavaScript disabled or in low-connectivity scenarios**,
I want filtering to work with browsable links,
So that I can access filtered content even without JavaScript.

## Acceptance Criteria

1. With JS disabled, a `<noscript>` filter navigation is shown with links to taxonomy pages
2. Links are language-aware (FR: `/services/compute/`, EN: `/en/services/compute/`)
3. All providers are still visible in the listing without JS
4. Taxonomy pages (Zola-native) provide the actual filtered views
5. With JS enabled, the interactive filter panel works as before
6. No hardcoded English in the noscript block — uses `trans()` for labels

## Tasks / Subtasks

- [x] Task 1 — Replace noscript warning message with taxonomy browse links (AC: #1, #2, #6)
  - [x] 1.1 Replace `<div class="noscript-message">` with `<nav class="noscript-filter-nav">` containing links to all taxonomy pages
  - [x] 1.2 Use `{% if section.lang == "en" %}{% set base = "/en" %}{% endif %}` for language-aware URLs
  - [x] 1.3 Add inline `<style>` inside noscript for `.noscript-filter-nav` layout
  - [x] 1.4 Group links by taxonomy using `.noscript-filter-group` with translated legend headings

- [x] Task 2 — Add `noscript_filter_title` i18n key to `zola.toml` (AC: #6)
  - [x] 2.1 Add `noscript_filter_title = "Browse by category:"` to `[languages.en.translations]`
  - [x] 2.2 Add `noscript_filter_title = "Parcourir par catégorie :"` to `[languages.fr.translations]`

- [x] Task 3 — Verify build
  - [x] 3.1 `mise run build` — 0 errors ✅
  - [x] 3.2 Verified rendered HTML contains noscript block with correct FR and EN paths

## Dev Notes

- Zola's native taxonomy pages already act as filtered views (e.g., `/services/compute/` lists all compute providers)
- The noscript approach is zero-JS, zero-server — purely static links to pre-built taxonomy pages
- When JS is enabled, `mobile.js` adds the `.open` class to filters-content; noscript block is never parsed by the browser
