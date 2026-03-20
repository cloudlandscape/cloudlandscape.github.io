# Story 4.4: Generate Certification Explainer Pages

Status: review

## Story

As a **user learning about certifications**,
I want dedicated pages explaining what SecNumCloud, HDS, and EUCS are,
So that I can understand certification requirements and identify which providers hold each certification.

## Acceptance Criteria

1. **Page URLs**: Certification explainer pages are accessible at `/certifications/secnumcloud/`, `/certifications/hds/`, `/certifications/eucs/` (FR default) and `/en/certifications/secnumcloud/`, `/en/certifications/hds/`, `/en/certifications/eucs/` (EN)
2. **Rich content**: Each page displays its full explanatory content — what the certification is, who issues it, key requirements, and official resources — rendered from the existing Markdown body
3. **Dynamic provider list**: Each page includes a "Providers holding this certification" section that is **dynamically populated from provider data** at build time (not hardcoded text or a filter redirect link)
4. **Bilingual**: All pages available in French (default) and English with correct language routing
5. **Provider detail linkage**: On provider detail pages (`/providers/{slug}/`), each certification badge links to the corresponding certification explainer page (e.g., clicking "SECNUMCLOUD" → `/certifications/secnumcloud/`)
6. **Data source consistency**: The providers listed on a certification page come from the same `[taxonomies] certifications` data used for filtering on the provider listing page — a single source of truth
7. **Build passes**: `mise run build` completes with 0 errors; `mise run check` reports 0 broken links

## Tasks / Subtasks

- [ ] Task 1 — Create `templates/certifications/page.html` — dedicated certification explainer template (AC: #2, #3, #4, #6)
  - [ ] 1.1 Create new file `templates/certifications/page.html` extending `base.html` (Zola resolves `templates/{section}/page.html` automatically for pages in `content/certifications/`)
  - [ ] 1.2 Render the certification's Markdown body: `{{ page.content | safe }}` inside a `<article class="cert-explainer">` with proper heading hierarchy
  - [ ] 1.3 Dynamically list certified providers using `get_taxonomy_term(taxonomy="certifications", term=page.slug, lang=lang)` — iterate over `term.pages` to render provider links
  - [ ] 1.4 Render each certified provider as a linked card showing provider title and country (`page.extra.country`) — reuse `.provider-card` CSS pattern or a lighter `.cert-provider-item` variant
  - [ ] 1.5 Add a "← Back to all providers" link pointing to the providers listing in the correct language (`/providers/` or `/en/providers/`)
  - [ ] 1.6 Add `aria-labelledby` on the providers list section, `aria-label` on the `<nav>` back-link zone; verify h1→h2 heading hierarchy

- [ ] Task 2 — Update `content/certifications/` content files — remove hardcoded provider filter links (AC: #3, #6)
  - [ ] 2.1 In `secnumcloud.md`: remove the "Consultez la [liste des providers](/providers/) et filtrez…" paragraph (line ~37) — providers are now listed dynamically by the template
  - [ ] 2.2 In `secnumcloud.en.md`: remove the equivalent hardcoded filter redirect paragraph (line ~37)
  - [ ] 2.3 In `hds.md`: remove the "Consultez notre [liste de providers](/providers/) et filtrez…" paragraph (line ~44)
  - [ ] 2.4 In `hds.en.md`: remove the equivalent hardcoded filter redirect paragraph (line ~44)
  - [ ] 2.5 In `eucs.md`: remove the "Consultez notre [liste de providers](/providers/) pour identifier…" paragraph (line ~52)
  - [ ] 2.6 In `eucs.en.md`: remove the equivalent hardcoded filter redirect paragraph (line ~52)

- [ ] Task 3 — Update `templates/page.html` — link certification badges to explainer pages (AC: #5)
  - [ ] 3.1 In the `{% for cert in page.taxonomies.certifications %}` loop (around line 75), wrap `<strong class="cert-name">{{ cert | upper }}</strong>` in an anchor tag: `<a href="/certifications/{{ cert }}/" class="cert-name-link">{{ cert | upper }}</a>` for FR, `/en/certifications/{{ cert }}/` for EN
  - [ ] 3.2 Make the link language-aware: check `page.lang` (or `lang`) and prepend `/en/` only when rendering the EN version of a provider page
  - [ ] 3.3 Ensure the existing `view_attestation` external link is preserved alongside the new explainer link — the two serve different purposes (attestation doc vs. explainer page)

- [ ] Task 4 — Add CSS for certification explainer page layout (AC: #2, #3)
  - [ ] 4.1 Add `.cert-explainer` article container styles in `static/style.css` — max-width aligned with `.provider-detail`, comfortable reading width
  - [ ] 4.2 Add `.cert-providers-section` section styles — heading, intro text, and responsive grid for provider items
  - [ ] 4.3 Add `.cert-provider-item` styles — lightweight card (name + country), with hover/focus state consistent with existing `.provider-card`
  - [ ] 4.4 Add `.cert-name-link` styles in `static/style.css` — underline or subtle badge link style so clicking a cert badge feels natural; ensure `:focus-visible` outline consistent with site standard (`var(--aurora)`)

- [ ] Task 5 — Add i18n translation keys for certification page UI strings (AC: #4)
  - [ ] 5.1 In `zola.toml` under `[languages.fr.translations]`: add `certified_providers_heading = "Fournisseurs certifiés"`, `certified_providers_intro = "Ces fournisseurs détiennent cette certification selon les données de l'annuaire."`, `back_to_providers_from_cert = "← Retour aux fournisseurs"`, `cert_learn_more = "En savoir plus sur"`
  - [ ] 5.2 In `zola.toml` under `[languages.en.translations]`: add `certified_providers_heading = "Certified Providers"`, `certified_providers_intro = "These providers hold this certification according to the directory data."`, `back_to_providers_from_cert = "← Back to all providers"`, `cert_learn_more = "Learn more about"`
  - [ ] 5.3 Use `trans(key="certified_providers_heading", lang=lang)` (and other new keys) in `templates/certifications/page.html`

- [ ] Task 6 — Build verification (AC: #7)
  - [ ] 6.1 Run `mise run build` — must complete with 0 errors; verify cert pages appear in the output (e.g., `public/certifications/secnumcloud/index.html`, `public/en/certifications/hds/index.html`)
  - [ ] 6.2 Run `mise run check` — must report 0 broken links; the new `/certifications/{slug}/` links in `page.html` must resolve
  - [ ] 6.3 Manual spot-check: open a provider page (e.g., `/providers/3ds-outscale/`) and verify the SecNumCloud badge links to `/certifications/secnumcloud/`; open `/certifications/secnumcloud/` and verify 3DS Outscale appears in the certified providers list

## Dev Notes

### Codebase Audit Findings

#### 1. Zola Taxonomy Configuration — `zola.toml`

`certifications` is declared as a Zola taxonomy with `render = true` in **both** `[languages.fr]` and `[languages.en]`. This means Zola would normally auto-generate taxonomy term pages at `/certifications/{term}/` (rendered by `taxonomy_single.html`). However, because **content files already exist** at `content/certifications/secnumcloud.md` etc., these content pages take precedence at those URLs and are rendered by the page template lookup chain, not by `taxonomy_single.html`.

**Language routing** follows Zola convention: `/certifications/secnumcloud/` = FR (default), `/en/certifications/secnumcloud/` = EN.

#### 2. Content Files — Already Complete ✅

All six certification content files exist in `content/certifications/` with rich Markdown body content:

| File | Status |
|------|--------|
| `_index.md` | ✅ exists (minimal, `title = "Certifications"`, `sort_by = "title"`) |
| `_index.en.md` | ✅ exists (minimal, same) |
| `secnumcloud.md` | ✅ exists — FR rich content (What, Objectives, Requirements, Levels, Resources) |
| `secnumcloud.en.md` | ✅ exists — EN rich content (translated equivalent) |
| `hds.md` | ✅ exists — FR rich content (What, Who, Activities, Requirements, Validity, Resources) |
| `hds.en.md` | ✅ exists — EN rich content (translated equivalent) |
| `eucs.md` | ✅ exists — FR rich content (What, Objectives, Levels, Evaluation, Regulatory context, Status) |
| `eucs.en.md` | ✅ exists — EN rich content (translated equivalent) |

**No new content files need to be created.** The existing content is comprehensive. The only change needed in content files is removing the hardcoded filter-redirect paragraphs (Task 2) since dynamic listing replaces them.

#### 3. Template Gap — `taxonomy_single.html` is Bare

`templates/taxonomy_single.html` is only 17 lines. It renders the term name as `<h1>` and a `<ul>` of provider links — **no Markdown body, no styling, no semantic structure**. However, this template is NOT used for the certification explainer pages (content files take priority), so it does not need to be updated for this story. It could be improved as a separate concern.

#### 4. Template Gap — Certification Pages Currently Use `page.html`

Without a `templates/certifications/page.html` file, Zola falls back to `templates/page.html` for `content/certifications/*.md`. The `page.html` template was designed for provider pages and:
- ✅ Renders `page.content` (the Markdown body) — the explainer text IS displayed today
- ❌ Does NOT display a dynamic list of providers holding the certification (body text currently has hardcoded filter links instead)
- ❌ Does NOT have a "Certified Providers" section derived from taxonomy data
- ❌ Renders provider-specific sections (services, certifications, datacenter) which will simply not appear (guarded by `if page.taxonomies.services`, etc.) — harmless but wasteful
- ❌ The "Back to providers" button (`if page.extra.country`) does not appear (no `extra.country` on cert pages) — no navigation away from the page

#### 5. Provider Detail Page — No Links to Cert Explainer Pages

In `templates/page.html` (lines 70–90), the certifications section renders each cert as a badge:
```html
<strong class="cert-name">{{ cert | upper }}</strong>
```
There is **no link** to the certification explainer page. Clicking a cert badge does nothing — it is just text. Task 3 adds this link.

#### 6. Provider Frontmatter — Taxonomy Format Confirmed

Confirmed in `content/providers/3ds-outscale/index.md`:
```toml
[taxonomies]
certifications = ["secnumcloud"]
```
The taxonomy slug values (`secnumcloud`, `hds`, `eucs`) match the content file names (`secnumcloud.md`, `hds.md`, `eucs.md`) and can be used directly to build URLs and to call `get_taxonomy_term()`.

#### 7. CSS — No Cert Explainer Styles Exist

`static/style.css` contains only `.certifications-list` and `.certification-badge` — these are for the **provider detail page** certifications section, not for the certification explainer page layout. New CSS classes are needed (Task 4).

### Key Implementation Details

#### Zola Section Template Lookup

Zola resolves templates in this priority order for a page in `content/certifications/`:
1. `templates/certifications/page.html` ← **create this file** (Task 1)
2. `templates/page.html` ← current fallback (provider template — incorrect)

Creating `templates/certifications/page.html` is all that is needed to override the fallback. No frontmatter `template =` directive is required in the content files.

#### Dynamic Provider List via `get_taxonomy_term()`

In `templates/certifications/page.html`, use Zola's built-in template function to retrieve providers:

```jinja2
{% set cert_term = get_taxonomy_term(taxonomy="certifications", term=page.slug, lang=lang) %}
{% if cert_term and cert_term.pages %}
<section class="cert-providers-section" aria-labelledby="certified-providers-heading">
    <h2 id="certified-providers-heading">
        {{ trans(key="certified_providers_heading", lang=lang) }}
    </h2>
    <p class="section-intro">{{ trans(key="certified_providers_intro", lang=lang) }}</p>
    <ul class="cert-providers-grid" role="list">
        {% for provider in cert_term.pages %}
        <li class="cert-provider-item">
            <a href="{{ provider.permalink }}" class="cert-provider-link">
                <span class="provider-name">{{ provider.title }}</span>
                {% if provider.extra.country %}
                <span class="provider-country">{{ provider.extra.country }}</span>
                {% endif %}
            </a>
        </li>
        {% endfor %}
    </ul>
</section>
{% endif %}
```

`page.slug` will be `secnumcloud`, `hds`, or `eucs` — these match the taxonomy term values used in provider frontmatter. `lang` is the page's language (`fr` or `en`), ensuring providers in the correct language are listed.

> ⚠️ **Verify** that `get_taxonomy_term()` is available in the Zola version used by this project. Run `zola --version`. If the function is not available (Zola < 0.17), use the alternative approach of iterating all pages in the `providers` section and filtering by checking whether `page.slug` appears in `taxonomies.certifications`:
> ```jinja2
> {% set providers_section = get_section(path="providers/_index.md") %}
> {% for provider in providers_section.pages %}
>   {% if provider.taxonomies.certifications and page.slug in provider.taxonomies.certifications %}
>     ...
>   {% endif %}
> {% endfor %}
> ```

#### Language-Aware Cert Links in `page.html`

When adding the link from a cert badge to its explainer page (Task 3), the URL must be language-aware. Use the `page.lang` variable already available in `page.html`:

```jinja2
{% if page.lang == "en" %}
  {% set cert_base = "/en/certifications/" %}
{% else %}
  {% set cert_base = "/certifications/" %}
{% endif %}
...
<a href="{{ cert_base }}{{ cert }}/" class="cert-name-link">{{ cert | upper }}</a>
```

#### Full Template Skeleton for `templates/certifications/page.html`

```jinja2
{% extends "base.html" %}

{% block title %}{{ page.title }} - {{ config.title }}{% endblock %}

{% block content %}
<article class="cert-explainer">
    <header class="cert-header">
        <h1>{{ page.title }}</h1>
        {% if page.description %}
        <p class="cert-tagline">{{ page.description }}</p>
        {% endif %}
    </header>

    <div class="cert-body">
        {{ page.content | safe }}
    </div>

    {# Dynamic provider list from taxonomy data #}
    {% set cert_term = get_taxonomy_term(taxonomy="certifications", term=page.slug, lang=lang) %}
    {% if cert_term and cert_term.pages %}
    <section class="cert-providers-section" aria-labelledby="certified-providers-heading">
        <h2 id="certified-providers-heading">
            {{ trans(key="certified_providers_heading", lang=lang) }}
        </h2>
        <p class="section-intro">{{ trans(key="certified_providers_intro", lang=lang) }}</p>
        <ul class="cert-providers-grid" role="list">
            {% for provider in cert_term.pages %}
            <li class="cert-provider-item">
                <a href="{{ provider.permalink }}" class="cert-provider-link">
                    <strong class="provider-name">{{ provider.title }}</strong>
                    {% if provider.extra.country %}
                    <span class="provider-country">{{ provider.extra.country }}</span>
                    {% endif %}
                </a>
            </li>
            {% endfor %}
        </ul>
    </section>
    {% endif %}

    <nav class="cert-nav" aria-label="{{ trans(key="back_to_providers_from_cert", lang=lang) }}">
        {% if lang == "en" %}
        <a href="/en/providers/" class="btn btn-secondary">
        {% else %}
        <a href="/providers/" class="btn btn-secondary">
        {% endif %}
            {{ trans(key="back_to_providers_from_cert", lang=lang) }}
        </a>
    </nav>
</article>
{% endblock %}
```

### Key File Locations

| File | Action |
|------|--------|
| `templates/certifications/page.html` | **CREATE** — dedicated cert explainer template |
| `templates/page.html` | **EDIT** — add cert-to-explainer links in certifications loop (~line 79) |
| `static/style.css` | **EDIT** — add `.cert-explainer`, `.cert-providers-section`, `.cert-provider-item`, `.cert-name-link` |
| `zola.toml` | **EDIT** — add 4 new i18n keys in both `[languages.fr.translations]` and `[languages.en.translations]` |
| `content/certifications/secnumcloud.md` | **EDIT** — remove hardcoded filter-redirect paragraph |
| `content/certifications/secnumcloud.en.md` | **EDIT** — remove hardcoded filter-redirect paragraph |
| `content/certifications/hds.md` | **EDIT** — remove hardcoded filter-redirect paragraph |
| `content/certifications/hds.en.md` | **EDIT** — remove hardcoded filter-redirect paragraph |
| `content/certifications/eucs.md` | **EDIT** — remove hardcoded filter-redirect paragraph |
| `content/certifications/eucs.en.md` | **EDIT** — remove hardcoded filter-redirect paragraph |

### Architecture References

- [Source: architecture.md#ADR-01] — Zola section-specific template lookup (`templates/{section}/page.html`)
- [Source: architecture.md#Taxonomies] — `certifications` taxonomy drives `[taxonomies] certifications = [...]` in provider frontmatter, auto-generates term data accessible via `get_taxonomy_term()`
- [Source: architecture.md#ADR-05] — CSS custom properties; new classes must use `var(--color-*)` tokens
- [Source: architecture.md#ADR-06] — No JS required for this story (pure Zola/Tera static generation)
- [Source: project-context.md#Critical Implementation Rules] — All pages must build in both FR and EN; `mise run build` + `mise run check` must pass

### Testing

- `mise run build` — 0 errors; verify cert pages in `public/certifications/*/index.html` and `public/en/certifications/*/index.html`
- `mise run check` — 0 broken links; new `/certifications/{slug}/` hrefs in `page.html` must resolve
- Manual: provider page cert badge → cert explainer page → dynamic providers list shows correct providers
- Manual: verify FR and EN versions render correctly with translated UI strings
- No axe-core violations expected (semantic HTML, `aria-labelledby` on sections, proper heading hierarchy)

## Dev Agent Record

### Agent Model Used
Claude Sonnet 4.5

### Debug Log References
- Discovered that `templates/certifications/page.html` does NOT override taxonomy_single.html for taxonomy term URLs — Zola serves `/certifications/{slug}/` from the taxonomy engine, not the content section
- Correct override file is `templates/certifications/single.html` (Zola taxonomy template lookup: `templates/{taxonomy}/single.html` → `templates/taxonomy_single.html`)
- Used `get_page(path="certifications/" ~ term.slug ~ ".md")` inside each `{% block %}` separately due to Tera block scoping — top-level assignments are not accessible in child blocks
- `templates/certifications/page.html` kept harmlessly (not used by Zola routing but no conflicts)

### Completion Notes List
- [x] Task 1: Created `templates/certifications/single.html` (not page.html — taxonomy override) using `get_page()` to load Markdown body + `term.pages` for dynamic provider list
- [x] Task 2: Removed hardcoded filter-redirect paragraphs from all 6 certification content files
- [x] Task 3: Updated `templates/page.html` cert badge loop with language-aware links to explainer pages
- [x] Task 4: Added `.cert-explainer`, `.cert-header`, `.cert-body`, `.cert-providers-section`, `.cert-providers-grid`, `.cert-provider-item`, `.cert-provider-link`, `.cert-name-link` to style.css
- [x] Task 5: Added 4 i18n keys in both `[languages.fr.translations]` and `[languages.en.translations]` in zola.toml
- [x] Task 6: `mise run build` 0 errors, `mise run check` 0 broken links, `mise run a11y` 0 violations

### File List
- `templates/certifications/single.html` — CREATED (taxonomy term override, renders cert content + dynamic providers)
- `templates/certifications/page.html` — CREATED (unused, harmless fallback)
- `templates/page.html` — EDITED (cert badge links now language-aware hrefs to cert explainer pages)
- `static/style.css` — EDITED (cert explainer CSS classes added)
- `zola.toml` — EDITED (4 i18n keys added to FR and EN translations)
- `content/certifications/secnumcloud.md` — EDITED (removed hardcoded filter paragraph)
- `content/certifications/secnumcloud.en.md` — EDITED (removed hardcoded filter paragraph)
- `content/certifications/hds.md` — EDITED (removed hardcoded filter paragraph)
- `content/certifications/hds.en.md` — EDITED (removed hardcoded filter paragraph)
- `content/certifications/eucs.md` — EDITED (removed hardcoded filter paragraph)
- `content/certifications/eucs.en.md` — EDITED (removed hardcoded filter paragraph)
