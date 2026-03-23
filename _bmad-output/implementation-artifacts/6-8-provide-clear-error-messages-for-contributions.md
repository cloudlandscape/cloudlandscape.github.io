# Story 6.8: Provide Clear Error Messages for Contributions

Status: done

## Story

As a **contributor**,
I want clear error messages when validation fails,
So that I know exactly what to fix in my provider data.

## Acceptance Criteria

1. Error messages identify which field is invalid
2. Error messages explain what the valid format or value should be
3. All errors in a file are reported at once (not just the first)
4. Exit code is non-zero when any validation fails

## Implementation

`docs/validate_providers.py` collects all errors per file before reporting:
- Missing field: `"Missing required field: {field}"`
- Invalid slug: `"Invalid slug format: {slug}. Use lowercase letters, numbers, and hyphens only."`
- Invalid service: `"Invalid service: {service}. Valid services: compute, kubernetes, ..."`
- Invalid website URL: `"Invalid or unreachable website URL: {url}"`
- Invalid cert URL: `"Invalid certification URL for {cert}: {url}"`
- Parse error: `"Parse error: {exception message}"`
- No frontmatter: `"No TOML frontmatter found"`

All errors for a file are joined with `"; "` and printed to stderr. Exit code 1 if any error.
