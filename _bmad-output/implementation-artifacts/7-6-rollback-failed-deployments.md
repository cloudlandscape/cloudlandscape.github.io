# Story 7.6: Rollback Failed Deployments

Status: done

## Story

As a **maintainer**,
I want to quickly rollback to a previous version if issues are detected,
So that I can minimize downtime.

## Implementation

GitHub Pages + GitHub Actions rollback process:
1. Go to Actions → "Build and deploy Zola website" → find last successful run
2. Click "Re-run all jobs" on that run — this re-deploys the previous build
3. Rollback completes in ~2 minutes (no code revert needed)

Alternative (git-based rollback):
```bash
git revert HEAD~1 --no-edit
git push origin main
```
This triggers a fresh deploy of the reverted content.

GitHub Pages automatically serves the last successfully deployed artifact — partial deploys do not occur.
