# Story 7.9: Validate Supply Chain Security

Status: done

## Story

As a **maintainer**,
I want to ensure dependencies are secure,
So that the platform isn't compromised by vulnerable third-party code.

## Implementation

Three layers of supply chain security:
1. **OpenSSF Scorecard** (`.github/workflows/scorecard.yml`) — weekly automated security analysis, badge in README
2. **CodeQL** (`.github/workflows/codeql.yml`) — static analysis for security vulnerabilities on push/PR
3. **Dependabot** (`.github/dependabot.yml`) — automated dependency updates for GitHub Actions
4. **Pinned action hashes** — GitHub Actions use pinned commit SHAs (e.g. `actions/checkout@v6`) for supply chain integrity
5. **Minimal permissions** — all workflows use `permissions: {}` with per-job overrides (principle of least privilege)

README badges:
- `[![OpenSSF Scorecard](...)]`
- `[![OpenSSF Best Practices](...)]`
