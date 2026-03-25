# Story 7.10: Maintain High Lighthouse Scores

Status: done

## Story

As a **maintainer**,
I want automated Lighthouse audits to gate every build,
So that performance and quality scores never regress.

## Implementation

`.github/workflows/ci.yml` — `lighthouse` job (runs parallel to `axe-core`, both after `build`):
- Runs `bunx @lhci/cli@0.15.x autorun` against built `public/` directory
- Configuration in `.lighthouserc.json`:
  - Performance > 90 (warn)
  - Accessibility > 95 (error — blocks merge)
  - Best Practices > 90 (error)
  - SEO > 95 (error)
  - Additional specific audits: html-has-lang, meta-description, viewport (all required at score 1)
