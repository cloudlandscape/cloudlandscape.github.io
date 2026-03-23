# Story 7.2: Approve Provider Submissions and Request Changes

Status: done

## Story

As a **maintainer**,
I want to approve or request changes on provider data submissions,
So that I control what gets published.

## Implementation

GitHub-native PR review system:
- Maintainer reviews PR via GitHub UI (Files Changed tab)
- Approves with "Approve" review or requests changes
- Branch protection on `main` requires at least 1 approval + all CI checks passing before merge
- No custom tooling needed — GitHub's review system handles this completely
