# Story 7.5: Monitor CI/CD Pipeline Status

Status: done

## Story

As a **maintainer**,
I want to see the status of builds and deployments,
So that I can quickly identify and resolve issues.

## Implementation

Multiple monitoring surfaces:
1. **GitHub Actions UI** — full pipeline logs, duration, per-step status
2. **README badges** — CI status badges link to latest workflow run:
   - CodeQL: `ci/codeql.yml`
   - Web tests (build + axe-core + lighthouse): `ci/ci.yml`
3. **GitHub email notifications** — configured per-user for failed workflow runs
4. **Deployment URL** — GitHub Pages environment in repo shows current live URL + deployment history

All four `ci.yml` jobs (build, axe-core, lighthouse) and `validate.yml` must pass before merge is allowed.
