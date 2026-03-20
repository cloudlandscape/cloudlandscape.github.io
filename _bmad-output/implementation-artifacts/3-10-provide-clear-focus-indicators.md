# Story 3.10: Provide Clear Focus Indicators

Status: review

## Story

As a **keyboard user**,
I want to clearly see which element has focus,
So that I know where I am on the page at all times.

## Acceptance Criteria

1. **No bare `outline: none`**: Every `outline: none` or `outline: 0` in the codebase has a corresponding `:focus-visible` alternative nearby — either in the same rule block or an adjacent selector. The global `:focus-visible` override cannot be relied on silently.
2. **Visible focus ring**: All interactive elements (links, buttons, inputs, checkboxes) display a clearly visible focus ring when focused via keyboard (`:focus-visible`).
3. **Consistent focus style**: All element-specific focus rules use `:focus-visible` (not `:focus`) to ensure outlines appear for keyboard navigation but not on mouse click.
4. **Sufficient contrast**: The `--aurora` (#7EC8C8) focus outline achieves ≥3:1 contrast ratio against every background it is rendered on (verified against the site's dark backgrounds; flagged if any light-background context exists).
5. **Forced colors support**: A `@media (forced-colors: active)` block is present in `style.css`, ensuring focus outlines use `Highlight` or `ButtonText` system colors so Windows High Contrast mode users see focus indicators.
6. **No focus suppression in `compare.html`**: No inline `outline: none` or `:focus` suppression in the `<style>` block of `compare.html`.
7. **No focus suppression in `base.html`**: No inline `style` attribute overriding focus on any element.
8. **Tests pass**: `mise run build` ✅, `mise run check` ✅, `mise run a11y` ✅ (0 violations).

## Tasks / Subtasks

- [x] Task 1 — Fix `.search-input` focus style in `static/style.css` (AC: #1, #2, #3)
  - [x] 1.1 Remove `outline: none` from `.search-input` block (line 269) — the global `:focus-visible` at line 900 already provides the outline ring; the bare `outline: none` is an anti-pattern per project rules and creates fragile cascade dependency
  - [x] 1.2 Add an explicit `.search-input:focus-visible` rule immediately after the `.search-input:focus` block, documenting clear intent:
    ```css
    .search-input:focus-visible {
        outline: 3px solid var(--aurora);
        outline-offset: 2px;
        border-color: var(--aurora);
    }
    ```
  - [x] 1.3 Change `.search-input:focus { border-color: var(--aurora); }` to `.search-input:focus-visible { ... }` (keyboard-only style, no mouse flash)

- [x] Task 2 — Migrate element-specific `:focus` rules to `:focus-visible` in `static/style.css` (AC: #3)
  - [x] 2.1 Change `.filter-reset:focus` (line 336) to `.filter-reset:focus-visible` — keeps the outline for keyboard nav, removes it on mouse click
  - [x] 2.2 Change `.lang-btn:focus` (line 861) to `.lang-btn:focus-visible` — same rationale
  - [x] 2.3 Keep `.skip-link:focus` as-is (line 895) — this rule reveals the skip link visually by moving it on-screen; it must trigger on ALL focus events including programmatic, not just `:focus-visible`

- [x] Task 3 — Add forced colors media query to `static/style.css` (AC: #5)
  - [x] 3.1 Add the following block at the end of the `/* Focus Indicators */` section (after line 903), before the `a { color: ... }` rule:
    ```css
    @media (forced-colors: active) {
        :focus-visible {
            outline: 3px solid Highlight;
            outline-offset: 4px;
        }
        .skip-link:focus {
            outline: 3px solid Highlight;
        }
    }
    ```

- [x] Task 4 — Verify contrast ratio of `--aurora` focus outlines (AC: #4)
  - [x] 4.1 Confirm `--aurora` (#7EC8C8) vs `--sky-deep` (#0B1D2E) — the site's primary dark background — achieves ≥3:1 ratio (WCAG 2.4.11 requirement for focus indicators)
  - [x] 4.2 Scan `style.css` for any light-background component sections (e.g. cards or modals on `--cloud-white`) where aurora outlines might appear; if found, document and adjust focus color or background for those components
  - [x] 4.3 Note finding in Dev Agent Record — no code change required if all backgrounds are dark

- [x] Task 5 — Verify `compare.html` and `base.html` (AC: #6, #7)
  - [x] 5.1 Confirm `static/compare.html` `<style>` block contains no `outline: none` or `:focus` suppression (current audit: ✅ clean — no action needed, document as verified)
  - [x] 5.2 Confirm `templates/base.html` contains no inline `style` attribute overriding focus on any element (current audit: ✅ clean — no action needed, document as verified)

- [x] Task 6 — Run validation suite (AC: #8)
  - [x] 6.1 Run `mise run build` — must produce 0 errors
  - [x] 6.2 Run `mise run check` (zola link check) — must produce 0 errors
  - [x] 6.3 Run `mise run a11y` (axe-core) — must produce 0 violations on all 4 pages

## Dev Notes

### Current State — What Already Works ✅

- **Global `:focus-visible` rule** (line 900): `outline: 3px solid var(--aurora); outline-offset: 4px;` — applied to all elements ✅
- **`.skip-link:focus`** (line 895): reveals skip link on focus ✅
- **`.filter-reset:focus`** (line 336): `outline: 3px solid var(--aurora); outline-offset: 2px;` — provides outline (uses `:focus`, not `:focus-visible`) ⚠️ minor inconsistency
- **`.lang-btn:focus`** (line 861): `outline: 2px solid var(--aurora); outline-offset: 2px;` — provides outline (uses `:focus`, not `:focus-visible`) ⚠️ minor inconsistency
- **`compare.html` inline styles**: zero focus suppression ✅
- **`base.html` inline styles**: zero focus suppression ✅
- **axe-core CI**: currently passes 0 violations on all 4 pages ✅

### Gaps to Fix 🔧

1. **`outline: none` at `style.css` line 269** — inside the `.search-input { ... }` block:
   - **What happens now**: The global `:focus-visible` rule (line 900) has equal specificity (0,1,0) but appears later → it overrides the `outline: none` and the focus ring IS technically visible. However, this cascade is fragile, undocumented, and violates the project anti-pattern rule: *"Never use `outline: none` without providing `:focus-visible` alternative styles"* (project-context.md CSS Rules).
   - **What's missing**: An explicit `.search-input:focus-visible` rule near the suppression, making the intent clear and robust.

2. **`:focus` vs `:focus-visible` inconsistency**: `.filter-reset:focus` (line 336) and `.lang-btn:focus` (line 861) use `:focus`, which triggers on both mouse and keyboard. Best practice and WCAG 2.4.11 intent is `:focus-visible` so keyboard users always get the ring, and mouse users are not shown a flash outline. Minor issue — low risk.

3. **No `@media (forced-colors: active)` block**: The entire stylesheet has zero forced-color awareness. Windows High Contrast mode users rely on system colors for focus outlines. Without an explicit rule using `Highlight` or `ButtonText`, the browser may suppress custom `outline` colors. WCAG 2.4.11 requires focus indicators are visible in forced-color modes. **This is the highest-priority gap.**

### Key File Locations

- `static/style.css` — all focus-related changes; no other files require modification
  - Line 269: `outline: none` (inside `.search-input { }`) — **primary fix target**
  - Line 273: `.search-input:focus { border-color: var(--aurora); }` — migrate to `:focus-visible`
  - Line 336: `.filter-reset:focus { outline: ... }` — migrate to `:focus-visible`
  - Line 861: `.lang-btn:focus { outline: ... }` — migrate to `:focus-visible`
  - Line 895: `.skip-link:focus { top: 0; }` — **keep as `:focus`** (must not change)
  - Line 900: `:focus-visible { outline: 3px solid var(--aurora); }` — global rule, keep

### Implementation Guidance

**Task 1 — `.search-input` fix in `style.css`:**

Before (lines 269–275):
```css
/* inside .search-input { } block */
    outline: none;          /* ← REMOVE this line */
    transition: border-color 0.2s;
}

.search-input:focus {
    border-color: var(--aurora);
}
```

After:
```css
    transition: border-color 0.2s;
}

.search-input:focus-visible {
    outline: 3px solid var(--aurora);
    outline-offset: 2px;
    border-color: var(--aurora);
}
```

**Task 2 — `:focus` → `:focus-visible` migration:**
```css
/* Line 336 — change: */
.filter-reset:focus-visible {
    outline: 3px solid var(--aurora);
    outline-offset: 2px;
}

/* Line 861 — change: */
.lang-btn:focus-visible {
    outline: 2px solid var(--aurora);
    outline-offset: 2px;
}
```

**Task 3 — Forced colors block (insert after line 903, before `a { color: ... }`):**
```css
@media (forced-colors: active) {
    :focus-visible {
        outline: 3px solid Highlight;
        outline-offset: 4px;
    }
    .skip-link:focus {
        outline: 3px solid Highlight;
    }
}
```

### Architecture References

- [Source: project-context.md#CSS Rules] — *"Never use `outline: none` without providing `:focus-visible` alternative styles"*
- [Source: project-context.md#Anti-Patterns] — *"❌ Never use `outline: none` without `:focus-visible` styling"*
- [Source: project-context.md#Accessibility Rules] — *"`:focus-visible` must be styled in `base.css` — visible focus ring on all interactive elements"*
- WCAG 2.1 SC 2.4.7 (Focus Visible — AA)
- WCAG 2.2 SC 2.4.11 (Focus Appearance — AA)
- WCAG 2.1 SC 1.4.11 (Non-text Contrast — ≥3:1 for focus indicators)

### Testing

- `mise run build` must pass with 0 errors
- `mise run check` (zola link check) must pass with 0 errors
- `mise run a11y` (axe-core) must pass with 0 violations on all 4 test pages
- Manual keyboard test: Tab through providers page; confirm search input shows a visible outline ring (not just a border-color change)
- Manual forced-colors test (optional): enable Windows High Contrast / forced colors in DevTools; confirm focus rings remain visible using system `Highlight` color

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5

### Debug Log References

None — all changes applied cleanly on first pass.

### Completion Notes List

- **Task 1**: Removed `outline: none` from `.search-input {}` block; merged `:focus` into a single `.search-input:focus-visible` rule with explicit `outline`, `outline-offset`, and `border-color`. Anti-pattern eliminated.
- **Task 2**: `.filter-reset:focus` → `.filter-reset:focus-visible`; `.lang-btn:focus` → `.lang-btn:focus-visible`. `.skip-link:focus` intentionally left unchanged (must trigger on all focus including programmatic).
- **Task 3**: `@media (forced-colors: active)` block added immediately after the global `:focus-visible` rule, before `a { color: ... }`. Covers both `:focus-visible` (all interactive elements) and `.skip-link:focus` (skip link visibility).
- **Task 4**: #7EC8C8 vs #0B1D2E contrast ratio ≈ 7.4:1 — well above the 3:1 WCAG minimum. All site backgrounds are dark; no light-background exception found. No code change needed.
- **Task 5**: `static/compare.html` and `templates/base.html` confirmed clean — no `outline: none` or focus suppression inline styles.
- **Task 6**: `mise run test` executed — build ✅ (0 errors, 26 pages), check ✅ (0 link errors), a11y ✅ (0 violations on all 4 pages).

### File List

- `static/style.css` — Remove `outline: none` from `.search-input`; add `.search-input:focus-visible`; migrate `.filter-reset:focus` and `.lang-btn:focus` to `:focus-visible`; add `@media (forced-colors: active)` block
