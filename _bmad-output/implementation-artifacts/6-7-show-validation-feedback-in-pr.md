# Story 6.7: Show Validation Feedback in PR

Status: done

## Story

As a **contributor**,
I want to see automated validation feedback on my Pull Request,
So that I know immediately if my provider data has issues.

## Acceptance Criteria

1. Automated validation runs on every PR touching provider data
2. Result is posted as a PR comment with pass/fail status
3. Full validation output included in comment
4. Comment shows clear error messages if validation fails

## Implementation

`.github/workflows/validate.yml` runs on push/PR to `content/providers/**`:
1. Runs `uv run docs/validate_providers.py` and captures output to `validation_output.txt`
2. Posts a PR comment via `actions/github-script@v8`:
   - `✅ Provider Data Validation passed` — all green
   - `❌ Provider Data Validation failed` with full output and "please fix" message
3. Fails the workflow (`exit 1`) if validation errors found

## Files

- `.github/workflows/validate.yml` — CI workflow with PR comment posting
