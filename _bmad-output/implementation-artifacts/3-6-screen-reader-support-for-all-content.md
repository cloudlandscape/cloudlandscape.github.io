# Story 3.6: Screen Reader Support for All Content

Status: review

## Story

As a **blind or low-vision user relying on screen readers**,
I want all content and functionality to be announced correctly,
So that I can independently navigate and use the site.

## Acceptance Criteria

1. **Heading hierarchy**: All page headings announced with proper h1→h2→h3 hierarchy
2. **Landmarks**: Navigation, main, and contentinfo (footer) landmarks present on every page
3. **Form labels**: Every input has an associated `<label>` before the field
4. **Filter state**: Active filter checkbox state readable; result count live-region announces updates
5. **Result count**: `aria-live="polite"` on result count — screen reader hears updates
6. **Button purposes**: All buttons have descriptive `aria-label` ("Add Scaleway to Comparison", etc.)
7. **Link destinations**: All links have meaningful text or `aria-label`
8. **Comparison table**: Semantic `<caption>`, `scope` attributes on all `<th>` cells; ✓/✗ symbols have text alternatives readable by screen readers
9. **Dynamic content**: `#comparison-content` has `aria-live="polite"` — screen reader hears when table loads
10. **Certifications section** on provider detail page: `<section>` has `aria-labelledby` pointing to its heading

## Tasks / Subtasks

- [x] Task 1 — Add `<footer>` landmark to `base.html` (AC: #2)
  - [x] 1.1 Add `<footer>` element with role="contentinfo" (implicit on footer) after `<main>` in `base.html`
  - [x] 1.2 Footer content: minimal — copyright + link to home, wrapped in `<p>` inside `<footer>`

- [x] Task 2 — Fix comparison table accessibility in `compare.html` (AC: #8, #9)
  - [x] 2.1 Add `aria-live="polite"` and `aria-busy="false"` to `<div id="comparison-content">`; set `aria-busy="true"` while loading, revert to `"false"` after render
  - [x] 2.2 Add `<caption>` to the comparison table in the `renderComparison()` function in compare.html
  - [x] 2.3 Add `scope="col"` to all column header `<th>` in the thead row
  - [x] 2.4 Add `scope="row"` to all row header `<th>` (Feature, Country, service names, cert names, Datacenters)
  - [x] 2.5 Add `scope="colgroup"` to section header rows (Services, Certifications, Geographic Coverage colspan rows)
  - [x] 2.6 Replace `✓`/`✗` symbols with `<span aria-hidden="true">✓</span><span class="sr-only">Yes</span>` and equivalent for No

- [x] Task 3 — Fix certifications section in `page.html` (AC: #10)
  - [x] 3.1 Add `id="certifications-heading"` to `<h2>Certifications & Compliance</h2>`
  - [x] 3.2 Add `aria-labelledby="certifications-heading"` to the certifications `<section>` element

- [x] Task 4 — Verify and validate (AC: all)
  - [x] 4.1 Run `mise run build` — ✅ 26 pages, 0 errors
  - [x] 4.2 Run `mise run check` (zola check) — ✅ 26 pages, 0 errors
  - [x] 4.3 Run `mise run a11y` (axe-core) — ✅ 0 violations on all 4 pages

## Dev Notes

### Current State — What Already Works ✅

- **Heading hierarchy**: h1 on every page; h2 on provider cards; h1→h2→h3 on taxonomy pages ✅
- **`<nav aria-label>`**: Main navigation landmark on all pages ✅
- **`<main id="main-content">`**: Main landmark on all pages (base.html + compare.html) ✅
- **Form labels**: `<label for="search-input">` + `<label><input>` wrap pattern on all checkboxes ✅
- **`aria-live="polite"`**: On `.result-count` in section.html ✅
- **`<fieldset>` + `<legend>`**: All 3 filter groups wrapped ✅
- **Button aria-labels**: "Add X to Comparison" buttons have `aria-label="Add {{ page.title }} to comparison"` ✅
- **External link notice**: `aria-label="(opens in new tab)"` on external link icon ✅
- **`aria-hidden`**: Decorative SVG logo in base.html ✅
- **`aria-labelledby`**: Provider info, services, and datacenter sections in page.html ✅

### Gaps to Fix 🔧

1. **No `<footer>` landmark** — base.html ends with `<script>` tags, no `contentinfo` landmark. Required by WCAG 4.1.2 and RGAA criterion 12.6.

2. **compare.html table missing semantics**:
   - No `<caption>` on comparison table — screen readers announce table with no context
   - No `scope` attributes on any `<th>` — column/row relationships unknown to AT
   - Section divider rows (`<th colspan="">Services</th>`) have no `scope="colgroup"` 
   - ✓/✗ symbols (`✓`, `✗`) are rendered without accessible text alternatives — SR announces them as Unicode characters, not meaningful Yes/No

3. **`#comparison-content` has no `aria-live`** — when JS renders the table (or the "no providers selected" message), screen readers receive no notification.

4. **Certifications section in page.html**: `<section class="provider-certifications">` has no `aria-labelledby` — unlike the services, datacenter, and about sections which all have it.

### Key File Locations

- `templates/base.html` — global layout; add footer before closing `</body>`
- `static/compare.html` — standalone static file; modify `#comparison-content` div + `renderComparison()` JS function
- `templates/page.html` — provider detail template; fix certifications section (~line 72)
- `static/style.css` — may need `.sr-only` utility class (check if already present)

### `.sr-only` CSS Pattern

Must verify `.sr-only` exists in `style.css`. If not, add:
```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

### Table Accessibility Pattern

For the comparison table generated by `renderComparison()` in `compare.html`:
```html
<table class="comparison-table">
  <caption>Provider feature comparison</caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col"><a href="/providers/scaleway/">Scaleway</a></th>
      <!-- ... -->
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Country</th><td>France</td>...</tr>
    <tr><th colspan="N" scope="colgroup">Services</th></tr>
    <tr><th scope="row">Compute</th><td>...</td></tr>
    <!-- ... -->
  </tbody>
</table>
```

For ✓/✗ cells:
```html
<td><span aria-hidden="true">✓</span><span class="sr-only">Yes</span></td>
<td><span aria-hidden="true">✗</span><span class="sr-only">No</span></td>
```

### Architecture References

- [Source: project-context.md#Accessibility Rules] — RGAA 4 AA, axe-core CI
- [Source: project-context.md#JavaScript Rules] — vanilla JS only, `aria-live="polite"` on dynamic containers
- WCAG 2.1 SC 1.3.1 (Info and Relationships), SC 4.1.2 (Name, Role, Value)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4.6

### Debug Log References

### Completion Notes List

### File List

- `templates/base.html` — Add `<footer>` landmark
- `static/compare.html` — Add `aria-live` to content div; fix table semantics (caption, scope, sr-only for ✓/✗)
- `templates/page.html` — Add `aria-labelledby` to certifications section
- `static/style.css` — Add `.sr-only` utility class if not present
