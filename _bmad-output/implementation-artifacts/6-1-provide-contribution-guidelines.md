# Story 6.1: Provide Contribution Guidelines

Status: done

## Story

As a **contributor**,
I want to access clear contribution guidelines in French and English,
So that I know how to add or update cloud provider information.

## Acceptance Criteria

1. Contribution guidelines accessible in both French and English
2. Guidelines explain how to fork, add a provider, and submit a PR
3. Required and optional fields are documented
4. Service taxonomy values are listed
5. Examples provided with real frontmatter format

## Implementation

`CONTRIBUTING.md` exists at repository root with:
- Bilingual content (English + French in same file)
- Step-by-step guide: fork → create files → fill template → validate → submit PR
- Complete required/optional fields table
- All 8 service taxonomy slugs documented
- Full example TOML frontmatter block
- Validation workflow explanation (what happens after PR submission)
- Instructions for updating existing provider data

## Files

- `CONTRIBUTING.md` — 251 lines, bilingual contribution guide at repository root
