# Story 6.2: Provide YAML Template for Provider Submissions

Status: done

## Story

As a **contributor**,
I want a YAML template to structure my provider data,
So that I can submit correctly formatted provider information.

## Acceptance Criteria

1. Template covers all required and optional fields
2. Inline comments explain each field's purpose and valid values
3. Template is referenced from CONTRIBUTING.md
4. Template uses correct TOML frontmatter syntax (Zola uses `+++` delimiters)

## Implementation

`docs/provider-template.yaml` exists with:
- All required fields: `title`, `slug`, `description`, `[taxonomies]`, `[extra]`
- All optional fields: `certifications`, `founded`, `[extra.certification_links]`
- Inline comments explaining every field
- Valid values for `services` and `certifications` taxonomies
- Example body text below the `+++` closing delimiter
- Referenced from `CONTRIBUTING.md` step 2

## Files

- `docs/provider-template.yaml` — annotated TOML template for new provider submissions
