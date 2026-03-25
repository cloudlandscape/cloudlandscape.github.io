# Story 7.3: Merge Approved Pull Requests

Status: done

## Story

As a **maintainer**,
I want to merge approved PRs,
So that new provider data is incorporated into the site.

## Implementation

GitHub-native merge functionality:
- "Merge pull request" button available once all required checks pass
- `build.yml` automatically triggers on push to `main`, generating and deploying the updated site
- Merge commit follows project convention: `Feat: ...` / `data(providers): add {name}`
