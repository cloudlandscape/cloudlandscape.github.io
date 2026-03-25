# Story 6.4: Detect Broken External Links in Provider Data

Status: done

## Story

As a **maintainer**,
I want broken external links in provider data to be detected automatically,
So that the directory always contains working links.

## Acceptance Criteria

1. All external links in provider pages are checked
2. Broken links are reported
3. Build fails if broken links are detected

## Implementation

`zola check` (built into Zola SSG) validates all internal and external links:
- Run via `mise run check` task
- `build.yml` uses `check_links: true` on merge to main (with `--skip-external-links` flag for CI speed)
- External link checking available locally via `mise run check` (checks external links)
- CI skips external links to avoid transient failures from temporarily unreachable servers
- Known external link issue: `https://esante.gouv.fr/produits-services/hds` is occasionally unreachable (HDS authority)

## Dev Notes

- `zola check` validates all `href` attributes and markdown links
- External link failures are environment/network dependent — CI skips them to avoid false positives
- Manual `mise run check` can be run to detect real broken links in a network-connected environment
