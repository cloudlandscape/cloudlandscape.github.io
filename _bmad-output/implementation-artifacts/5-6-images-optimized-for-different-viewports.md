# Story 5.6: Images Optimized for Different Viewports

Status: done

## Story

As a **user on a slow connection**,
I want images to be appropriately sized for my device,
So that pages load quickly and use minimal data.

## Acceptance Criteria

1. Images are lazy-loaded (not loaded until visible)
2. Images have explicit `width` and `height` attributes to prevent CLS
3. Images are sized appropriately for the viewport
4. Total page weight under 500KB excluding images (NFR-P8)
5. Images have proper alt text for accessibility

## Current State

**No raster images exist in the project.** All visual elements use inline SVG:
- Site logo: inline SVG in `base.html` `<nav>` — no `<img>` needed ✅
- Provider favicon/icon: inline SVG `data:` URI in `<link rel="icon">` — no `<img>` ✅
- Provider logos: **not yet implemented** — provider frontmatter has no `logo` field

**What is already optimal:**
- `img { max-width: 100%; height: auto; display: block; }` in `style.css` — prevents layout shift ✅
- Google Fonts: loaded with `rel="preload"` + `display=swap` → non-blocking, no FOIT ✅
- `<link rel="preconnect">` to fonts.googleapis.com — reduces DNS lookup time ✅

## Tasks / Subtasks

- [x] Task 1 — Audit and document current image usage (AC: all)
  - [x] 1.1 Confirmed: no raster images (png/jpg/webp/gif) in the project
  - [x] 1.2 Confirmed: all visual elements use inline SVG — zero image HTTP requests ✅
  - [x] 1.3 Confirmed: font loading is already optimized (preload + display=swap)

- [x] Task 2 — Enhance `img` CSS comment for future provider logos (AC: #1, #2)
  - [x] 2.1 Add guidance comment to `img` base rule in `style.css`:
        `/* Use loading="lazy" and explicit width/height attributes on all <img> elements */`

## Dev Notes

### Guidelines for Future Provider Logos

When provider logos are added, each `<img>` must include:
```html
<img
  src="/logos/{slug}.webp"
  alt="Logo {provider_name}"
  width="120"
  height="40"
  loading="lazy"
  decoding="async"
/>
```

- Use WebP format with JPEG `<picture>` fallback
- Set explicit `width` and `height` to prevent CLS
- `loading="lazy"` defers off-screen images
- `alt` must follow format: `"Logo {provider_name}"`
