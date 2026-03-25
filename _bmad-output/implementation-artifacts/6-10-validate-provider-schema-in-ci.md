# Story 6.10: Validate Provider Schema in CI

Status: done

## Story

As a **maintainer**,
I want provider schema validation to run automatically in CI,
So that no invalid provider data can be merged.

## Acceptance Criteria

1. Schema validation runs on every PR touching provider data
2. CI blocks merge if validation fails
3. Validation covers: schema correctness, slug format, service enums, URL format, duplicate slugs

## Implementation

`.github/workflows/validate.yml`:
- Triggers on `push` and `pull_request` for paths:
  - `content/providers/**`
  - `docs/provider-schema.json`
  - `docs/validate_providers.py`
- Uses `astral-sh/setup-uv@v7` to install Python dependencies
- Runs `uv run docs/validate_providers.py`
- Fails workflow if validation errors found (prevents merge in branch protection rules)
- Posts result as PR comment (see story 6.7)

Branch protection on `main` requires CI status checks to pass before merge, making this a hard gate.
