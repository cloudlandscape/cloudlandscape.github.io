# Story 6.3: Validate Provider YAML Against Schema

Status: done

## Story

As a **contributor**,
I want my provider YAML automatically validated against a schema,
So that I know immediately if my data is correctly structured.

## Acceptance Criteria

1. Provider TOML frontmatter is validated against a JSON schema
2. Required fields are checked
3. Slug format validated (kebab-case)
4. Service enum values validated
5. Website URL format validated
6. Certification attestation URLs validated
7. Clear error messages for each violation

## Implementation

`docs/validate_providers.py` + `docs/provider-schema.json`:
- Python script extracts TOML frontmatter and validates against JSON Schema
- Uses `tomli` / `toml` library for TOML parsing
- Checks: required fields, slug pattern `^[a-z0-9]+(-[a-z0-9]+)*$`, valid service enums, URL format
- Supports `tomli` (primary) with `toml` fallback
- Returns exit code 0 on success, 1 on any error
- Run locally: `uv run docs/validate_providers.py`
- Run in CI: `mise run validate`

## Files

- `docs/validate_providers.py` — validation script
- `docs/provider-schema.json` — JSON Schema for provider frontmatter
- `docs/requirements.txt` — Python dependencies (tomli)
