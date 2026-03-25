# Story 7.4: Trigger Site Regeneration After Updates

Status: done

## Story

As a **maintainer**,
I want the site to automatically regenerate after I merge a PR,
So that new provider data is published without manual intervention.

## Implementation

`.github/workflows/build.yml` triggers on every push to `main`:
- Runs `zola build` via `getzola/github-pages` action (Zola v0.22.1)
- `check_links: true` with `--skip-external-links` for link validation
- Uploads to GitHub Pages via `actions/deploy-pages@v4`
- Full pipeline runs in under 2 minutes (build: ~1s, deploy: ~30s)
- Manual re-trigger: re-run the `Build and deploy Zola website` workflow in Actions UI
