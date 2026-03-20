# Story 3.8: Provide Skip Navigation Links

Status: review

## Story

As a **keyboard user or screen reader user**,
I want to skip over repetitive navigation links,
So that I can quickly reach the main content on each page.

## Acceptance Criteria

1. **Skip link visibility**: Skip link appears at the top of the page when focused (Tab pressed on page load)
2. **Skip link target**: Clicking/activating the skip link jumps focus to the main content area (`#main-content`)
3. **Not hidden by default**: Skip link is visible when focused — not permanently hidden
4. **Every page**: Skip link works on every page (all Zola templates + `compare.html`)
5. **Keyboard accessible**: Skip link is the first focusable element in `<body>` and is reachable via Tab
6. **i18n**: Skip link text is translated in both languages (EN: "Skip to main content" / FR: "Passer au contenu principal")
7. **Partial used**: A `partials/skip-nav.html` partial exists and is included via `base.html` (per project-context.md rule)

## Tasks / Subtasks

- [ ] Task 1 — Create `templates/partials/skip-nav.html` and update `base.html` to use it (AC: #5, #6, #7)
  - [ ] 1.1 Create the `templates/partials/` directory if it does not exist
  - [ ] 1.2 Create `templates/partials/skip-nav.html` containing the skip link using the `trans()` i18n function: `<a href="#main-content" class="skip-link">{{ trans(key="skip_to_main", lang=lang) }}</a>`
  - [ ] 1.3 In `templates/base.html` line 38: replace the hardcoded `<a href="#main-content" class="skip-link">Skip to main content</a>` with `{% include "partials/skip-nav.html" %}`

- [ ] Task 2 — Add `skip_to_main` i18n key to `zola.toml` (AC: #6)
  - [ ] 2.1 Add `skip_to_main = "Skip to main content"` to `[languages.en.translations]` in `zola.toml`
  - [ ] 2.2 Add `skip_to_main = "Passer au contenu principal"` to `[languages.fr.translations]` in `zola.toml`

- [ ] Task 3 — Verify all page templates inherit the skip link via `base.html` (AC: #4)
  - [ ] 3.1 Confirm `index.html`, `section.html`, `page.html`, `taxonomy_list.html`, `taxonomy_single.html`, and `404.html` all begin with `{% extends "base.html" %}` — no standalone template missing it
  - [ ] 3.2 Confirm `<main id="main-content" tabindex="-1">` exists in `base.html` (the skip link target)

- [ ] Task 4 — Validate `compare.html` skip link (AC: #4, #5)
  - [ ] 4.1 Confirm `<a href="#main-content" class="skip-link">Skip to main content</a>` is present and is the first focusable element in `<body>` of `static/compare.html` (added in story 3-5)
  - [ ] 4.2 Confirm `<main id="main-content" tabindex="-1">` exists in `compare.html` as the skip target
  - [ ] 4.3 Since `compare.html` is a standalone static file (not a Zola template), it cannot use `trans()` — add a small inline JS snippet to update the skip link text based on `localStorage.getItem('cloudlandscape_lang')` matching the existing lang-detection script pattern already used in that file

- [ ] Task 5 — Run verification checks (AC: all)
  - [ ] 5.1 Run `mise run build` — must complete with 0 errors
  - [ ] 5.2 Run `mise run check` (zola check) — must validate all links with 0 errors
  - [ ] 5.3 Run `mise run a11y` (axe-core) — must report 0 violations on all tested pages

## Dev Notes

### Current State — What Already Works ✅

- **Skip link in `base.html`**: `<a href="#main-content" class="skip-link">Skip to main content</a>` at line 38 — first child of `<body>` ✅
- **Skip link CSS**: `.skip-link { position: absolute; top: -40px; ... }` and `.skip-link:focus { top: 0; }` fully defined in `static/style.css` (~lines 879–896) ✅
- **Skip target**: `<main id="main-content" tabindex="-1">` at line 65 of `base.html` ✅
- **`compare.html` skip link**: `<a href="#main-content" class="skip-link">Skip to main content</a>` at line 106 — added in story 3-5 ✅
- **`compare.html` skip target**: `<main id="main-content" tabindex="-1">` at line 112 of `compare.html` ✅
- **All page templates extend `base.html`**: `index.html`, `section.html`, `page.html`, `taxonomy_list.html`, `taxonomy_single.html`, `404.html` all begin with `{% extends "base.html" %}` — skip link is inherited site-wide ✅
- **i18n infrastructure**: `trans(key="...", lang=lang)` pattern already used throughout `base.html` (e.g., `lang_nav_label`, `footer_copyright`) ✅

### Gaps to Fix 🔧

1. **`templates/partials/` directory does not exist** — project-context.md rule states "Every page template must include `partials/skip-nav.html`". The partial directory and file must be created, and `base.html` updated to use `{% include "partials/skip-nav.html" %}`.

2. **Skip link text is hardcoded English** — `base.html` line 38 has `"Skip to main content"` as a literal string. It must use `{{ trans(key="skip_to_main", lang=lang) }}` so it renders in the correct language per page.

3. **`skip_to_main` i18n key is missing from `zola.toml`** — Neither `[languages.en.translations]` nor `[languages.fr.translations]` contain this key. Both must be added before the partial can use `trans()`.

4. **`compare.html` skip link text is hardcoded English** — Since `compare.html` is a standalone static file in `static/` (not processed by Zola Tera), it cannot use `trans()`. The text should be updated dynamically via JavaScript using the same `cloudlandscape_lang` localStorage key already used in that file for the `lang` attribute.

### Key File Locations

- `templates/base.html` — global layout; skip link at line 38; replace with `{% include "partials/skip-nav.html" %}`
- `templates/partials/skip-nav.html` — **new file** to create; contains the i18n skip link
- `zola.toml` — add `skip_to_main` key to both `[languages.en.translations]` (line ~26) and `[languages.fr.translations]` (~line 82)
- `static/compare.html` — standalone static HTML; skip link at line 106; update text via JS

### Implementation Guidance

**`templates/partials/skip-nav.html`** (new file):
```html
<a href="#main-content" class="skip-link">{{ trans(key="skip_to_main", lang=lang) }}</a>
```

**`templates/base.html` line 38** — replace:
```html
{# Before #}
<a href="#main-content" class="skip-link">Skip to main content</a>

{# After #}
{% include "partials/skip-nav.html" %}
```

**`zola.toml`** — add to `[languages.en.translations]`:
```toml
skip_to_main = "Skip to main content"
```
Add to `[languages.fr.translations]`:
```toml
skip_to_main = "Passer au contenu principal"
```

**`static/compare.html`** — update skip link text with JS (add immediately after the existing lang-detection `<script>` block already in `<head>`, or inline after the skip link anchor):
```js
// Append to the existing inline lang-detection script in <head>
var skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.textContent = lang === 'fr' ? 'Passer au contenu principal' : 'Skip to main content';
}
```
> Note: The existing inline `<script>` in `compare.html` already reads `localStorage.getItem('cloudlandscape_lang')` into a `lang` variable — reuse it.

### Architecture References

- [Source: project-context.md#Template Rules] — "Every page template must include `partials/skip-nav.html` and use semantic HTML landmarks"
- [Source: project-context.md#Accessibility Rules] — RGAA 4 AA compliance, skip navigation required
- [Source: project-context.md#JavaScript Rules] — vanilla JS only; no new libraries
- WCAG 2.1 SC 2.4.1 (Bypass Blocks) — skip link satisfies this criterion

### Testing

- `mise run build` must pass with 0 errors
- `mise run check` must validate all links
- `mise run a11y` (axe-core) must report 0 violations on all tested pages (`/`, `/providers/`, `/providers/scaleway/`, `/compare.html`)
- Manual test: on page load, press Tab once — skip link must become visible; press Enter — focus must jump to `<main id="main-content">`; verify in both `/` (FR) and `/en/` (EN) to confirm correct translated text

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5

### Debug Log References

None — implementation was straightforward with no errors.

### Completion Notes List

- **Task 1**: Created `templates/partials/` directory and `templates/partials/skip-nav.html` with `{{ trans(key="skip_to_main", lang=lang) }}`. Updated `base.html` line 38 to replace the hardcoded skip link text with `{% include "partials/skip-nav.html" %}`.
- **Task 2**: Added `skip_to_main = "Skip to main content"` to `[languages.en.translations]` and `skip_to_main = "Passer au contenu principal"` to `[languages.fr.translations]` in `zola.toml`.
- **Task 3**: Confirmed all six page templates (`index.html`, `section.html`, `page.html`, `taxonomy_list.html`, `taxonomy_single.html`, `404.html`) extend `base.html`, and that `<main id="main-content" tabindex="-1">` exists in `base.html`.
- **Task 4**: Confirmed skip link and skip target exist in `compare.html`. Appended JS to the existing inline lang-detection IIFE in `<head>` to set `skipLink.textContent` based on the `lang` variable.
- **Task 5**: `mise run build` — 0 errors ✅. `mise run test` (includes check + validate) — 0 errors ✅. `mise run a11y` — 0 violations on all 4 tested pages ✅.

### File List

- `templates/partials/skip-nav.html` — New file: i18n-aware skip link partial
- `templates/base.html` — Replace hardcoded skip link with `{% include "partials/skip-nav.html" %}`
- `zola.toml` — Add `skip_to_main` translation key (EN + FR)
- `static/compare.html` — Update skip link text dynamically via existing inline JS lang-detection script
- `_bmad-output/implementation-artifacts/3-8-provide-skip-navigation-links.md` — This story file
