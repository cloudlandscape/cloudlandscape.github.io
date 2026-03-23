# Story 7.1: Review Pull Requests with Validation Status

Status: done

## Story

As a **maintainer**,
I want to review PRs with automated validation status,
So that I can quickly identify whether provider data is valid.

## Implementation

`.github/workflows/validate.yml` posts a PR comment with full validation output (see story 6.7).
GitHub's PR interface shows CI check status inline. Maintainer can see at a glance:
- Whether `validate` check passed ✅ or failed ❌
- Full validation output in the PR comment
- `axe-core` and `lighthouse` check results from `ci.yml`
