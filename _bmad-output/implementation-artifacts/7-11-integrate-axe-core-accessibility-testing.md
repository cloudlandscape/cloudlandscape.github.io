# Story 7.11: Integrate axe-core Accessibility Testing

Status: done

## Story

As a **maintainer**,
I want automated accessibility testing on every build,
So that RGAA 4 AA compliance is continuously verified.

## Implementation

`.github/workflows/ci.yml` — `axe-core` job (parallel to `lighthouse`, after `build`):
- Installs Chrome via `bunx browser-driver-manager@2.0.1`
- Serves `public/` on `localhost:8000` with `python3 -m http.server`
- Runs `bunx @axe-core/cli@4.11.1 --exit` against 4 pages:
  - `/` (home)
  - `/providers/` (provider listing)
  - `/providers/scaleway/` (provider detail)
  - `/compare.html?providers=aws,google-cloud,microsoft-azure` (comparison)
- `--exit` flag: fails workflow on any accessibility violation
- Zero violations required — this is a hard CI gate

All Epic 3 accessibility work (keyboard nav, screen reader support, skip links, semantic HTML, focus indicators) is continuously verified by this job on every PR.
