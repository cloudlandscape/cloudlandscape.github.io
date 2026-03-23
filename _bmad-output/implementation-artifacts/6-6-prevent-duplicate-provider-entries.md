# Story 6.6: Prevent Duplicate Provider Entries

Status: done

## Story

As a **maintainer**,
I want duplicate provider submissions to be automatically detected,
So that the directory doesn't contain the same provider twice.

## Acceptance Criteria

1. Duplicate provider slugs across different directories are detected
2. Build fails if duplicates are found
3. Error message identifies which files contain the duplicate

## Implementation

`docs/validate_providers.py` — `check_duplicate_slugs()` function:
- Scans all `content/providers/*/index.md` and `*/index.en.md` files
- Extracts `slug` from TOML frontmatter of each file
- Tracks slug → file mapping; flags if same slug appears in different provider directories
- (Intentionally ignores FR/EN pairs in the same directory — `index.md` + `index.en.md` share the same slug by design)
- Exits with code 1 and detailed message if duplicates found:
  ```
  ❌ DUPLICATE SLUGS FOUND:
    Slug 'scaleway' appears in:
      - content/providers/scaleway/index.md
      - content/providers/scaleway-copy/index.md
  ```
