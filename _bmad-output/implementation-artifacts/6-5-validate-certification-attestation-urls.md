# Story 6.5: Validate Certification Attestation URLs

Status: done

## Story

As a **contributor**,
I want certification attestation URLs to be validated,
So that links to official certification pages are always working.

## Acceptance Criteria

1. Certification attestation URLs in provider data are validated
2. Invalid URL format is rejected
3. Error message specifies which certification has an invalid URL

## Implementation

`docs/validate_providers.py` checks `[extra.certification_links]` entries:
- Uses `validate_url()` helper which checks scheme (`http`/`https`) and netloc presence
- Error: `"Invalid certification URL for {cert}: {url}"`
- Runs on every push/PR touching `content/providers/**` via `validate.yml`

```python
if 'extra' in data and 'certification_links' in data['extra']:
    cert_links = data['extra']['certification_links']
    for cert, url in cert_links.items():
        if not validate_url(url):
            errors.append(f"Invalid certification URL for {cert}: {url}")
```

## Dev Notes

- URL validation checks format only (scheme + netloc), not live HTTP reachability
- Full reachability check would cause transient CI failures (see story 6.4)
- `certification_links` is optional — providers without attestation pages skip this check
