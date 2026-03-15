# Story 3.5: Keyboard Navigation for All Features

Status: done

## Story

As a **user with motor disabilities or keyboard preference**,
I want to navigate the entire site using only keyboard,
So that I can access all features without a mouse.

## Acceptance Criteria

1. **Tab order**: All links, buttons, and inputs are reachable via Tab/Shift+Tab in a logical order
2. **Activation**: All buttons and links are activatable with Enter; checkboxes with Space
3. **Filter panel keyboard**: Escape closes the filter panel; focus returns to the toggle button on close; focus moves to first filter on open (mobile)
4. **No keyboard traps**: User can always Tab away from any element
5. **No hover-only features**: All functionality accessible without mouse
6. **Language switcher**: Language switch UI buttons are present and keyboard-accessible in nav
7. **Comparison page (compare.html)**: Skip link present; `<nav>` has `aria-label`; `<main>` landmark present; `lang` attribute dynamic
8. **Focus visible**: All interactive elements show clear focus indicators (`:focus-visible` already defined)

## Tasks / Subtasks

- [x] Task 1 — Language switcher buttons in `templates/base.html` (AC: #6)
  - [x] 1.1 Add `<div class="language-switcher">` with FR/EN `<button class="lang-btn">` elements inside `<nav>` in `base.html`
  - [x] 1.2 Set `aria-current="true"` on active lang button; `aria-label="Switch to English"` / `"Passer en français"` on each button
  - [x] 1.3 Wire buttons to call `switchLanguage()` from `lang.js` via inline `onclick` or event listener
  - [x] 1.4 Mark active lang via `.lang-btn.active` class based on current `{{ lang }}` variable in Tera

- [x] Task 2 — Filter panel keyboard improvements in `static/mobile.js` (AC: #3)
  - [x] 2.1 Add `keydown` listener on `document`: Escape key closes filter panel if open, returns focus to toggle button
  - [x] 2.2 On panel open (mobile): move focus to first `<input class="filter-checkbox">` inside `#filters-content`
  - [x] 2.3 On panel close: return focus to `.filters-toggle` button
  - [x] 2.4 Ensure `aria-expanded` state is correctly toggled on the button (already done, verify)

- [x] Task 3 — Fix `static/compare.html` accessibility (AC: #7)
  - [x] 3.1 Add `<a href="#main-content" class="skip-link">Skip to main content</a>` as first child of `<body>`
  - [x] 3.2 Add `aria-label="Main navigation"` to `<nav>` element
  - [x] 3.3 Wrap main content in `<main id="main-content" tabindex="-1">` landmark
  - [x] 3.4 Change `<html lang="fr">` to read lang from localStorage (`cloudlandscape_lang`) via inline `<script>` in `<head>` to set correct lang attribute dynamically

- [x] Task 4 — Audit and verify full tab order on provider listing page (AC: #1, #4, #5)
  - [x] 4.1 Verify tab order: skip link → nav logo → providers link → lang buttons → search input → filter toggle → filter checkboxes → reset button → provider cards (title link → add to comparison)
  - [x] 4.2 Confirm no `tabindex` values above 0 exist anywhere (would break natural order) — confirmed: none found
  - [x] 4.3 Verify filter reset button is reachable by Tab when filter panel is open

- [x] Task 5 — Verify tests pass (AC: all)
  - [x] 5.1 Run `mise run build` — ✅ 26 pages, 0 errors
  - [x] 5.2 Run `mise run check` (zola check) — ✅ 26 pages, 0 errors
  - [x] 5.3 Run `mise run a11y` (axe-core) — ✅ 0 violations on 4 pages (/, /providers/, /providers/scaleway/, /compare.html)

## Dev Notes

### Current State — What Already Works ✅

- **Skip link**: `<a href="#main-content" class="skip-link">` in `base.html` — CSS positions it off-screen, reveals on `:focus` ✅
- **Skip link CSS**: `.skip-link:focus { top: 0; }` in `style.css` ✅
- **Focus indicators**: `:focus-visible { outline: 3px solid var(--aurora); outline-offset: 4px; }` in `style.css` ✅
- **Filter form elements**: Native `<input type="checkbox">` + `<label>` = keyboard-accessible by default ✅
- **Filter toggle**: `aria-expanded` is updated by `mobile.js` ✅
- **Reset button**: Native `<button>` = keyboard-accessible ✅
- **Result count**: `aria-live="polite"` on `.result-count` ✅
- **Nav landmark**: `<nav aria-label="Main navigation">` in `base.html` ✅
- **Main landmark**: `<main id="main-content" tabindex="-1" role="main">` in `base.html` ✅
- **Provider title links**: `<h2><a href="...">` = keyboard-accessible ✅
- **Add to comparison buttons**: `<button>` with `aria-label` ✅

### Gaps to Fix 🔧

1. **Language switcher UI missing**: `style.css` defines `.lang-btn` and `.language-switcher` but no HTML in `base.html` — `lang.js`'s `switchLanguage()` is never triggered. Must add buttons to nav.

2. **Filter panel — Escape key**: No Escape key handler in `mobile.js` or `filter.js`. Required by WCAG 2.1 SC 1.4.13 for components that open on interaction.

3. **Filter panel — focus management**: Opening the panel should trap/guide focus on mobile; closing should return focus.

4. **compare.html** is in `static/` (not Zola template), so it doesn't inherit `base.html`. Missing: skip link, proper `<main>` landmark, `<nav aria-label>`.

### Key File Locations

- `templates/base.html` — global nav layout, skip link, lang attribute
- `static/mobile.js` — filter toggle logic (lines ~30-45 for toggle click handler)
- `static/lang.js` — `switchLanguage(lang)` function (line ~37) — already implemented, just needs to be called from buttons
- `static/compare.html` — standalone static HTML (not Zola template)
- `static/style.css` — `.language-switcher`, `.lang-btn`, `.skip-link`, `:focus-visible` already defined

### Implementation Guidance

**Task 1 (lang buttons) in `base.html`:**
```html
<div class="language-switcher" role="navigation" aria-label="Language selection">
  <button class="lang-btn{% if lang == 'fr' %} active{% endif %}"
          onclick="switchLanguage('fr')"
          aria-label="Passer en français"
          {% if lang == 'fr' %}aria-current="true"{% endif %}>FR</button>
  <button class="lang-btn{% if lang == 'en' %} active{% endif %}"
          onclick="switchLanguage('en')"
          aria-label="Switch to English"
          {% if lang == 'en' %}aria-current="true"{% endif %}>EN</button>
</div>
```
Place inside the existing `<nav aria-label="Main navigation">` after the Providers link.

**Task 2 (Escape key) in `mobile.js`:**
```js
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const isOpen = content.classList.contains('open');
        if (isOpen) {
            content.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggleText.textContent = toggle.dataset.showText || 'Show Filters';
            toggle.focus(); // return focus
        }
    }
});
```
Move focus to first checkbox on open:
```js
// Inside the click handler, after toggling open:
if (isOpen) {
    const firstCheckbox = content.querySelector('.filter-checkbox');
    if (firstCheckbox) firstCheckbox.focus();
}
```

**Task 3 (compare.html lang):**
Add before `</head>`:
```html
<script>
  (function(){
    var lang = localStorage.getItem('cloudlandscape_lang') || 'fr';
    document.documentElement.lang = lang;
  })();
</script>
```

### Architecture References

- [Source: project-context.md#Critical Implementation Rules — Accessibility]
- [Source: project-context.md#JavaScript Rules] — vanilla JS only, no framework
- [Source: project-context.md#CSS Rules] — `.lang-btn`, `.language-switcher` already in `style.css`
- WCAG 2.1 SC 2.1.1 (Keyboard), SC 2.1.2 (No Keyboard Trap), SC 2.4.3 (Focus Order)

### Testing

- `zola build` must pass with no errors
- Manual test: Tab through entire providers page without mouse; confirm all elements reachable
- Accessibility CI: `accessibility.yml` runs axe-core on the deployed site (GitHub Actions)
- No new JS dependencies allowed (vanilla JS only)
- JS must stay under 100KB gzipped budget

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

### Completion Notes List

- ✅ Task 1: Language switcher FR/EN buttons added to `base.html` nav using `trans()` i18n native Zola. New keys added to both `[languages.en.translations]` and `[languages.fr.translations]` in `zola.toml`.
- ✅ Task 2: Escape key closes filter panel + focus management (move focus to first checkbox on open, return focus to toggle on close) added in `mobile.js`.
- ✅ Task 3: `compare.html` — skip link added, `<nav aria-label>`, `<main id="main-content" tabindex="-1">`, dynamic `lang` attribute via inline `<script>`.
- ✅ Task 4: No `tabindex > 0` found; natural tab order verified.
- ✅ Task 5: `mise run build` ✅, `mise run check` ✅, `mise run a11y` ✅ (0 axe-core violations on 4 pages).

### File List

- `templates/base.html` — Added language switcher nav buttons with i18n
- `static/mobile.js` — Added Escape key handler + focus management for filter panel
- `static/compare.html` — Added skip link, nav aria-label, main landmark, dynamic lang script
- `zola.toml` — Added `lang_nav_label`, `lang_switch_fr`, `lang_switch_en` translation keys (EN + FR)
- `_bmad-output/implementation-artifacts/3-5-keyboard-navigation-for-all-features.md` — This story file
