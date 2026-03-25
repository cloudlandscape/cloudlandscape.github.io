# Story 7.8 — Ensure Security Headers Are Configured

**Epic:** 7 — Maintainer Operations & CI/CD  
**Status:** Done  
**Branch:** feat/epic6-epic7-quality-operations

## Summary

Hardened the site against common web attacks by adding Content Security Policy (CSP) and Referrer-Policy headers. Since GitHub Pages does not support custom HTTP response headers, these are implemented via `<meta http-equiv>` tags in HTML.

## Acceptance Criteria Met

- [x] CSP meta tag present in all pages (via `base.html` + `compare.html`)
- [x] Referrer-Policy meta tag present in all pages
- [x] No inline scripts in any HTML (extracted to external `.js` files)
- [x] No inline styles in any HTML (extracted to `style.css`)
- [x] No `onclick` or other inline event handlers in HTML
- [x] Build passes (`mise run build`)
- [x] Link check passes (`mise run check`)

## Implementation Details

### CSP Policy

**Zola pages** (`base.html` — `connect-src 'none'` since no fetch calls):
```
default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'
```

**Compare page** (`compare.html` — `connect-src 'self'` for provider data fetching):
```
default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'
```

### Files Changed

| File | Change |
|------|--------|
| `templates/base.html` | Added CSP + Referrer-Policy meta; changed font `<link onload>` → external `font-loader.js`; changed lang buttons from `onclick` → `data-lang` attribute |
| `static/lang.js` | Removed duplicate `createLanguageSwitcher()` function; `init()` now attaches listeners to existing `[data-lang]` buttons |
| `static/font-loader.js` | **New** — activates Google Fonts preload link without inline `onload` handler |
| `static/lang-detect.js` | **New** — sets `html[lang]` from localStorage on `compare.html` (was inline `<script>`) |
| `static/compare-view.js` | **New** — compare page business logic extracted from inline `<script>` in `compare.html` |
| `static/compare.html` | Added CSP + Referrer-Policy meta; replaced inline `<script>` + `<style>` with external files |
| `static/compare.js` | Removed `style="display:none"` from innerHTML template string; applied via `element.style` after DOM insertion |
| `static/style.css` | Added all compare page styles (previously inline in `compare.html`) |

### Key Decisions

- `lang-detect.js` is loaded **synchronously** (no `defer`) to set `html[lang]` before first paint, preventing language flash.
- `font-loader.js` is loaded synchronously in `<head>` to attach the `onload` handler before the preload link fires.
- `compare.html` uses `connect-src 'self'` (not `'none'`) because the comparison feature fetches provider pages at runtime.
- The duplicate `createLanguageSwitcher()` bug in `lang.js` was discovered and fixed as part of removing inline handlers — it was silently creating a second `.language-switcher` element in the nav.
