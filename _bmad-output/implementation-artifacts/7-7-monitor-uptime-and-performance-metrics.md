# Story 7.7 — Monitor Uptime and Performance Metrics

**Epic:** 7 — Maintainer Operations & CI/CD  
**Status:** Done  
**Branch:** feat/epic6-epic7-quality-operations

## Summary

Added a scheduled GitHub Actions workflow that pings the live site every 6 hours to verify it is reachable and returns HTTP 200. Workflow failures are surfaced via GitHub's native notification system.

## Acceptance Criteria Met

- [x] Scheduled check runs automatically (every 6 hours via cron)
- [x] Manual trigger available (`workflow_dispatch`)
- [x] Checks homepage (FR), homepage (EN), and providers listing
- [x] Fails the job if any page returns a non-200 status
- [x] No external monitoring service dependency — uses GitHub Actions native scheduler

## Implementation

**File:** `.github/workflows/uptime.yml`

Three `curl` checks per run:
1. `https://cloudlandscape.github.io/` — FR homepage
2. `https://cloudlandscape.github.io/en/` — EN homepage  
3. `https://cloudlandscape.github.io/providers/` — Providers listing

Each step uses `curl -o /dev/null -s -w "%{http_code}"` with a 15-second timeout. The job exits with code 1 on any non-200 response, triggering GitHub's failure notification.

## Alerting

GitHub sends email/notifications to repository watchers when the workflow fails. No additional configuration needed beyond the default GitHub notification settings.

## Notes

- Uptime monitoring only activates once the site is deployed to `cloudlandscape.github.io` (managed by `build.yml`)
- For more advanced monitoring (response time tracking, multi-region checks), consider adding Prometheus/Grafana or an external uptime service in a future iteration
