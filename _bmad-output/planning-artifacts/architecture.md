---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-02-24'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/prd-validation-report.md'
  - '_bmad-output/planning-artifacts/product-brief-cloudlandscape-20260121.md'
workflowType: 'architecture'
project_name: 'cloudlandscape'
user_name: 'nicolas'
date: '2026-02-23'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (66 FRs):**

cloudlandscape requires 66 functional capabilities organized across 10 domains: provider discovery & search (FR1-FR8), provider information display (FR9-FR15), provider comparison (FR16-FR21), multilingual support FR/EN (FR22-FR25), community contribution workflow via GitHub PRs (FR26-FR32), data quality & validation (FR33-FR37), maintainer management (FR38-FR43), static content generation (FR44-FR50), accessibility & usability (FR51-FR56), and responsive design & performance (FR57-FR66).

Architecturally, the key insight is that ALL user-facing functionality operates on static pre-generated content with client-side interactivity. There is no server-side application logic, no user authentication, no database queries at runtime. The "backend" is the CI/CD pipeline that validates YAML data and generates static pages.

**Non-Functional Requirements (62 NFRs):**

The NFRs that will most heavily drive architectural decisions:
- **Performance:** Page load <1.5s on 3G, client-side filtering <2s for up to 100 providers, JS bundle <100KB gzipped, DOM <1500 nodes (NFR-P1 through P16)
- **Accessibility:** RGAA 4 Niveau AA / WCAG 2.1 AA with automated CI testing via axe-core (NFR-A1 through A19)
- **Security:** HTTPS, security headers, supply chain validation, no secrets in repo (NFR-S1 through S12)
- **Scalability:** Linear scaling from 10 to 100 providers with <10% performance degradation, build <5 min for 50 providers (NFR-SC1 through SC8)
- **Reliability:** 99.9% uptime via static CDN, rollback <5 min, zero-downtime deploys (NFR-R1 through R12)
- **Maintainability:** Solo maintainer PR review <15 min, full CI pipeline <10 min, automated validation reduces manual effort by 80%+ (NFR-M1 through M12)

**Scale & Complexity:**

- Primary domain: Static web application (MPA/SSG) with client-side interactivity
- Complexity level: Low-Medium
- Estimated architectural components: ~6-8 (SSG engine, templates/layouts, client-side search index, CI/CD pipeline, YAML data schema, i18n system, CDN hosting, contribution workflow)

### Technical Constraints & Dependencies

- **JS Budget:** <100KB gzipped constrains search library choice (Lunr.js/Fuse.js) and excludes heavy frameworks
- **Build time:** <5 min for 50 providers — SSG must be performant (Hugo, 11ty favored in PRD)
- **CDN edge hosting** with atomic deployments and rollback <5 min
- **Zero runtime server dependencies** — everything is static
- **GitHub as contribution platform** — PR-based workflow, not web forms
- **YAML as data format** — provider data stored as YAML files in Git repository
- **Bilingual FR/EN** — every page must exist in both languages with proper hreflang

### Cross-Cutting Concerns Identified

1. **Internationalization (i18n):** Affects templates, content, routing (/fr/, /en/), SEO (hreflang), UI elements, contribution guides. Must be baked into every architectural component.
2. **Accessibility (a11y):** RGAA 4 AA compliance affects all UI components, requires semantic HTML, ARIA landmarks, keyboard navigation, color contrast. Automated testing in CI is mandatory.
3. **Performance / GreenIT:** Constrains SSG choice, JS/CSS budgets, image handling, DOM complexity. Lighthouse CI gates enforce thresholds on every build.
4. **SEO:** Structures the entire routing scheme — dedicated pages per provider, per certification, comparison pages with shareable URLs. Requires sitemap, structured data (Schema.org), meta tags.
5. **Data Validation:** JSON Schema for YAML, broken link detection, certification URL verification — runs in CI on every PR. Cross-cuts contribution workflow and data quality.
6. **Content Generation:** SSG must generate provider pages, listing pages, comparison pages, certification pages, all in both languages, from YAML source data.

## Starter Template Evaluation

### Primary Technology Domain

Static web application (MPA/SSG) — based on project requirements analysis: zero runtime server, client-side filtering, YAML data source, bilingual static pages.

### Technical Preferences (User)

- **Languages:** Python, Markdown, YAML, Golang, Bash, Rust
- **SSG preference:** Zola (Rust-based)
- **Styling:** CSS vanilla
- **Deployment:** GitHub Pages (`cloudlandscape.github.io`)
- **Learning goal:** Deepen Zola and GitHub Actions expertise
- **Integrations:** None planned

### Starter Options Considered

| Option | Description | Verdict |
|--------|-------------|---------|
| `zola init` (from scratch) | Minimal scaffold, full control | ⭐ Selected |
| Zola theme (adidoks, even) | Pre-built UI, faster visual start | ❌ Imposes CSS/JS, conflicts with vanilla CSS and JS budget |
| Fork existing Zola project | Reuse similar project | ❌ No comparable project found |

### Selected Starter: `zola init` (from scratch)

**Rationale:**
1. Full control over structure — essential for custom taxonomies (cloud services, certifications, countries)
2. Learning Zola — explicit user goal, no theme abstraction layer
3. CSS vanilla — no framework CSS to embed or override
4. JS budget <100KB — control every byte, no theme bloat
5. Custom taxonomies — native Zola config, not a theme hack

**Initialization Command:**

```bash
zola init cloudlandscape
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- SSG: Zola (Rust) — single binary, zero runtime dependencies
- Templates: Tera (Jinja2-like syntax, familiar to Python developers)
- Provider data: YAML/TOML frontmatter in `content/` directory
- No Node.js, no npm, no node_modules

**Styling:**
- CSS vanilla in `static/css/`
- Sass compilation available natively if needed later
- Responsive via native CSS media queries
- No Tailwind, no CSS framework

**Build & Tooling:**
- `zola build` → generates `public/` (complete static site)
- `zola serve` → dev server with hot reload
- No external JS bundler (no Webpack/Vite/esbuild)
- Minimal custom JS for client-side filtering

**Search / Filtering:**
- Elasticlunr.js index generated by Zola at build time → client-side full-text search
- Multi-criteria filtering: lightweight custom JS operating on pre-generated JSON/index data
- Budget: Elasticlunr (~8KB min) + custom filter JS → well under 100KB

**Internationalization:**
- Native Zola i18n: `config.toml` defines languages, content duplicated per language
- Structure: `content/providers/ovh.md` (FR default) + `content/providers/ovh.en.md` (EN)
- hreflang tags generated via Tera templates

**Taxonomies (key feature):**
- Native Zola custom taxonomies in `config.toml`
- `services`, `certifications`, `countries` → auto-generated pages per taxonomy term
- Each provider tagged with its taxonomies → native filtering and navigation

**Deployment:**
- GitHub Pages via GitHub Actions workflow
- `zola build` in CI → push to `gh-pages` branch
- GitHub CDN (Fastly) → global performance
- Domain: `cloudlandscape.github.io`

**Testing & CI:**
- `zola check` — validates internal/external broken links (built-in)
- GitHub Actions: build + check + deploy
- Accessibility: axe-core/pa11y in CI (separate GitHub Action on generated `public/`)
- Lighthouse CI via GitHub Action

**Note:** Project initialization with `zola init` should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data structure: One Markdown file per provider with YAML frontmatter (Zola-native)
- Provider schema: Standardized YAML frontmatter with taxonomies
- Client-side filtering: Pre-generated JSON index + vanilla JS
- Comparison: Query-param driven static page with JS rendering
- CSS methodology: Custom properties + utility-light
- CI/CD pipeline: GitHub Actions with validate-first workflow

**Important Decisions (Shape Architecture):**
- Taxonomy structure: services, certifications, countries (Zola-native)
- Search: Elasticlunr.js (Zola built-in) for full-text, inline JSON via Tera partial for faceted filtering
- i18n: Zola-native per-language content files

**Deferred Decisions (Post-MVP):**
- Provider maintainer fast-track system
- Analytics integration
- Advanced search facets (multi-tenant models, extended compliance)
- Public API

### Data Architecture

**ADR-01: Provider Data Structure — One Markdown per Provider**

- **Decision:** Each provider is a directory in `content/providers/` containing `index.md` (FR) and `index.en.md` (EN)
- **Rationale:** Idiomatic Zola approach. Taxonomies auto-generate pages per service/certification/country. Frontmatter holds structured data, body holds free-text description. Simple contribution workflow — one file to create per language.
- **Affects:** Content structure, contribution template, build pipeline, i18n

**ADR-02: Provider YAML Schema**

- **Decision:** Standardized frontmatter schema:

```yaml
title: "Scaleway"
slug: "scaleway"
description: "Cloud provider français..."
country: "France"
headquarters: "Paris, France"
website: "https://www.scaleway.com"
logo: "scaleway.png"

taxonomies:
  services: ["compute", "kubernetes", "object-storage", "database", "paas", "caas", "iam", "api-gateway"]
  certifications: ["secnumcloud", "hds"]
  countries: ["france"]

extra:
  datacenter_locations: ["Paris", "Amsterdam"]
  certification_links:
    secnumcloud: "https://..."
    hds: "https://..."
  founded: 2014
```

- **Rationale:** Leverages Zola taxonomy system for automatic page generation and filtering. `extra` section for data that doesn't need taxonomy pages. Certification links enable source verification (NFR-S1, S3).
- **Validation:** JSON Schema validation in CI ensures all PRs conform to this structure
- **Affects:** Contribution workflow, CI validation, template rendering, filtering

**ADR-03: Client-Side Filtering — JSON Inline via Tera Partial**

- **Decision:** A shared Tera partial (`partials/providers-json-data.html`) generates provider data as inline JSON within a `<script type="application/json">` tag. This partial is included in both the provider listing template and the comparison template. Vanilla JS reads this inline JSON and performs in-memory multi-criteria filtering (service AND/OR certification AND/OR country).
- **Rationale:** Zero external dependency — no Python script, no separate build step, no file to keep synchronized. The data is generated directly from Zola's content pages at build time, guaranteeing perfect synchronization. Reusable across pages via Tera partial inclusion (`{% include "partials/providers-json-data.html" %}`).
- **Implementation:** `templates/partials/providers-json-data.html` uses `get_section(path="providers/_index.md")` to iterate over all provider pages and serialize their frontmatter (slug, title, services, certifications, countries, datacenter_locations, certification_links) as JSON.
- **Performance:** <2s filtering for 100 providers (NFR-P5, P6) — in-memory array filtering on parsed JSON is sub-millisecond. Inline JSON avoids an extra HTTP request compared to a separate JSON file.
- **Affects:** Build templates, JS bundle, search UX

**ADR-04: Provider Comparison — Query Parameter Driven**

- **Decision:** Static page at `/compare/` with JS that reads query parameters (`/compare/?p=scaleway,ovh,outscale`). JS parses the inline JSON data (from the shared `providers-json-data.html` partial) and renders a side-by-side comparison table with service alignment and certification matrix.
- **Rationale:** Shareable URLs (FR20). No server-side logic needed. Same inline JSON data (via shared Tera partial) powers both filtering and comparison — no data duplication.
- **Affects:** Routing, JS bundle, URL structure, SEO (comparison pages)

### Authentication & Security

**No authentication required** — fully public static site with no user accounts.

**Security decisions:**
- HTTPS enforced via GitHub Pages (automatic)
- Security headers configured via `_headers` file or meta tags (CSP, X-Frame-Options, X-Content-Type-Options)
- No secrets in repository — GitHub Actions secrets for deploy tokens only
- Supply chain: `zola check` validates links, JSON Schema validates data, CI gates enforce quality

### API & Communication Patterns

**No API layer** — static site with no backend.

**Communication patterns:**
- Build-time data flow: YAML files → Zola build → HTML pages + JSON index
- Client-side data flow: JSON index → JS filtering/comparison → DOM updates
- Contribution flow: GitHub PR → CI validation → Maintainer review → Merge → Rebuild

### Frontend Architecture

**ADR-05: CSS Methodology — Custom Properties + Utility-Light**

- **Decision:** CSS custom properties (variables) for theming (colors, spacing, typography) with a small set of utility classes for common patterns. No BEM, no CSS framework.
- **Structure:**
  - `static/css/variables.css` — Design tokens (colors, spacing, fonts, breakpoints)
  - `static/css/base.css` — Reset, typography, base elements
  - `static/css/layout.css` — Grid, containers, responsive layout
  - `static/css/components.css` — Provider cards, filters, comparison table, navigation
  - `static/css/utilities.css` — Minimal utility classes (visually-hidden, flex helpers)
- **Rationale:** Modern CSS approach. Custom properties enable consistent theming and easy dark mode later. Utility-light avoids Tailwind bloat while keeping common patterns DRY. Total CSS budget fits well under 50KB (NFR-P10).
- **Affects:** All UI components, accessibility (color contrast via variables), responsive design

**ADR-06: JavaScript Architecture — Minimal Vanilla JS**

- **Decision:** Vanilla JS modules, no framework. Two main scripts:
  - **filter.js** — Parses inline JSON from `#providers-data`, handles multi-criteria filtering, renders results
  - **compare.js** — Reads URL params, parses inline JSON from `#providers-data`, renders comparison table
- **Rationale:** JS budget <100KB gzipped (NFR-P9). No framework overhead. Progressive enhancement — core content works without JS (NFR-A16), filtering/comparison enhance with JS.
- **Affects:** Performance, accessibility, bundle size

### Infrastructure & Deployment

**ADR-07: CI/CD Pipeline — GitHub Actions with Validate-First Workflow**

- **Decision:** GitHub Actions workflow with ordered jobs:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:       # JSON Schema validation of provider YAML (fast-fail)
  build:          # zola build (depends on validate)
  check:          # zola check — broken links (depends on build)
  accessibility:  # axe-core/pa11y on public/ (depends on build)
  lighthouse:     # Lighthouse CI scores (depends on build)
  deploy:         # GitHub Pages — only on push to main (depends on all)
```

- **Rationale:** Validate-first catches data errors before expensive build step. Fast feedback for contributors — schema errors reported in seconds. Build/check/accessibility/lighthouse can run in parallel after build completes. Deploy only on main push, not on PRs.
- **Pipeline target:** <10 min total (NFR-M6)
- **Affects:** Contribution workflow, data quality, deployment reliability

**ADR-08: Hosting — GitHub Pages**

- **Decision:** GitHub Pages with custom domain `cloudlandscape.github.io`, deployed via `gh-pages` branch from GitHub Actions.
- **Rationale:** Free, reliable (99.9%+ uptime), global CDN via Fastly, HTTPS automatic, zero ops burden for solo maintainer. Atomic deploys via branch swap. Rollback = revert commit + re-deploy (<5 min, NFR-R5).
- **Affects:** Deployment workflow, domain configuration, CDN caching

### Decision Impact Analysis

**Implementation Sequence:**
1. `zola init` + `config.toml` with taxonomies and i18n setup
2. Provider YAML schema definition + JSON Schema for validation
3. Base templates (Tera) + CSS custom properties foundation
4. First provider data files (2-3 providers for testing)
5. Provider listing page with JSON index generation
6. Client-side filtering JS
7. Comparison page JS
8. GitHub Actions CI/CD pipeline
9. Remaining providers (up to 10 MVP)
10. Accessibility + Lighthouse audit and fixes

**Cross-Component Dependencies:**
- JSON inline generation (Tera partial at build) → consumed by filter.js AND compare.js
- Provider YAML schema → validated by CI AND rendered by templates AND indexed in JSON
- CSS variables → shared across all components (cards, filters, comparison, nav)
- Taxonomies config → drives provider tagging, auto-generated pages, AND filter options
- i18n config → affects content structure, routing, templates, AND SEO tags

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Files & Directories:**

| Element | Convention | Example |
|---------|-----------|---------|
| Content directories | `kebab-case` | `content/providers/ovh-cloud/` |
| Markdown files | `index.md` / `index.en.md` | Zola convention |
| CSS files | `kebab-case.css` | `static/css/components.css` |
| JS files | `kebab-case.js` | `static/js/filter.js` |
| Images/logos | `kebab-case` | `static/images/providers/ovh-cloud.png` |
| Tera templates | `kebab-case.html` | `templates/provider-detail.html` |
| Provider slugs | `kebab-case` | `scaleway`, `ovh-cloud` |
| Taxonomy slugs | `kebab-case` | `object-storage`, `secnumcloud` |

**Code Naming:**

| Element | Convention | Example |
|---------|-----------|---------|
| JS variables | `camelCase` | `providerData`, `filterResults` |
| JS functions | `camelCase` | `applyFilters()`, `renderComparison()` |
| JS constants | `UPPER_SNAKE_CASE` | `MAX_COMPARE_PROVIDERS`, `API_INDEX_PATH` |
| CSS classes | `kebab-case` with component prefix | `.provider-card`, `.filter-panel`, `.compare-table` |
| CSS custom properties | `--kebab-case` with namespace | `--color-primary`, `--spacing-md`, `--font-heading` |
| Tera variables | `snake_case` (Tera convention) | `{{ page.extra.datacenter_locations }}` |
| YAML frontmatter keys | `snake_case` | `datacenter_locations`, `certification_links` |
| JSON keys | `snake_case` | Consistent with YAML source |

### Structure Patterns

**Template Organization:**

```
templates/
├── base.html                # Main layout (head, nav, footer)
├── index.html               # Homepage
├── providers/
│   ├── list.html            # Provider listing (with filters)
│   └── detail.html          # Provider detail (section template)
├── compare.html             # Comparison page
├── certifications/
│   ├── list.html            # Certification listing
│   └── detail.html          # Certification detail (taxonomy template)
├── partials/
│   ├── nav.html             # Navigation
│   ├── footer.html          # Footer
│   ├── provider-card.html   # Reusable provider card
│   ├── filter-panel.html    # Filter panel
│   └── seo-head.html        # Meta tags, hreflang, structured data
└── shortcodes/              # Zola shortcodes for Markdown content
```

- **Rule:** Reusable components go in `partials/`
- **Rule:** One template per page type, never duplicate logic

### Format Patterns

**JSON Data Format (providers.json):**

```json
{
  "providers": [
    {
      "slug": "scaleway",
      "title": "Scaleway",
      "description": "...",
      "country": "France",
      "headquarters": "Paris, France",
      "website": "https://www.scaleway.com",
      "logo": "/images/providers/scaleway.png",
      "services": ["compute", "kubernetes", "object-storage"],
      "certifications": ["secnumcloud", "hds"],
      "countries": ["france"],
      "datacenter_locations": ["Paris", "Amsterdam"],
      "certification_links": { "secnumcloud": "https://...", "hds": "https://..." }
    }
  ],
  "taxonomies": {
    "services": ["compute", "kubernetes", "object-storage", "database", "paas", "caas", "iam", "api-gateway"],
    "certifications": ["secnumcloud", "hds", "eucs"],
    "countries": ["france", "germany", "netherlands"]
  },
  "generated_at": "2026-02-23T18:00:00Z"
}
```

- **Rule:** Always `snake_case` for JSON keys (consistent with YAML)
- **Rule:** Slugs are the reference identifiers (not display names)
- **Rule:** Lists are sorted alphabetically

### Process Patterns

**JS State Classes:**
- `.is-loading`, `.is-error`, `.is-empty`, `.is-active` — always with `is-` prefix
- Never generic: `.loading`, `.error`, `.hidden`

**Error/Loading Pattern:**
```javascript
function showLoading(container) { container.classList.add('is-loading'); }
function hideLoading(container) { container.classList.remove('is-loading'); }
function showError(container, message) { /* render .error-message element */ }
```

### Accessibility Patterns (Mandatory)

| Pattern | Rule |
|---------|------|
| ARIA landmarks | `<main>`, `<nav>`, `<aside>`, `<footer>` — always present |
| Form labels | Every `<input>` has an associated `<label>`, never placeholder alone |
| Focus visible | `:focus-visible` styled in `base.css`, never `outline: none` |
| Skip nav | First link in `<body>` = "Aller au contenu principal" / "Skip to main content" |
| Dynamic results | `aria-live="polite"` on filtered results container |
| Images | `alt` mandatory, provider logos = `alt="Logo {provider_name}"` |
| Language | `lang="fr"` or `lang="en"` on `<html>` per version |

### Documentation & Comments

- **Tera:** `{# Comment explaining WHY, not WHAT #}`
- **CSS:** `/* Section: Provider Cards */` as section headers
- **JS:** JSDoc for public functions, inline comments for complex logic only
- **No comments** for self-evident code

### Git Commit Conventions

```
type(scope): short description

Types: feat, fix, data, docs, style, ci, chore
Scopes: providers, templates, css, js, ci, i18n

Examples:
  data(providers): add Scaleway provider
  feat(filter): implement multi-criteria filtering
  ci(actions): add YAML schema validation step
  docs(contributing): add FR contribution guide
  fix(a11y): add missing aria-live on filter results
```

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow naming conventions exactly as specified above
- Use `partials/` for reusable template components
- Include `aria-live="polite"` on any dynamically updated content container
- Use CSS state classes with `is-` prefix
- Write commit messages following the type(scope) convention
- Never use `outline: none` without providing alternative focus styles
- Always include `alt` attributes on images
- Use `snake_case` for all YAML/JSON keys

## Project Structure & Boundaries

### Complete Project Directory Structure

```
cloudlandscape/
├── config.toml                          # Zola config: site, taxonomies, i18n, search
├── README.md                            # Project documentation
├── CONTRIBUTING.md                      # Contribution guide (bilingual FR/EN)
├── LICENSE                              # Open-source license
├── .gitignore                           # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml                   # CI/CD: validate → build → check → a11y → lighthouse → deploy
│
├── schemas/
│   └── provider.schema.json             # JSON Schema for provider YAML validation
│
├── scripts/
│   └── validate-providers.py            # Python script for CI YAML validation against schema
│
├── content/
│   ├── _index.md                        # Homepage content (FR)
│   ├── _index.en.md                     # Homepage content (EN)
│   ├── providers/
│   │   ├── _index.md                    # Provider listing section (FR)
│   │   ├── _index.en.md                 # Provider listing section (EN)
│   │   ├── scaleway/
│   │   │   ├── index.md                 # Provider data + description (FR)
│   │   │   └── index.en.md              # Provider data + description (EN)
│   │   ├── ovh-cloud/
│   │   │   ├── index.md                 # (FR)
│   │   │   └── index.en.md              # (EN)
│   │   └── ...                          # Other providers (same pattern)
│   ├── certifications/
│   │   ├── _index.md                    # Certification listing (FR)
│   │   ├── _index.en.md                 # Certification listing (EN)
│   │   ├── secnumcloud.md               # SecNumCloud explainer (FR)
│   │   ├── secnumcloud.en.md            # SecNumCloud explainer (EN)
│   │   ├── hds.md                       # HDS explainer (FR)
│   │   ├── hds.en.md                    # HDS explainer (EN)
│   │   ├── eucs.md                      # EUCS explainer (FR)
│   │   └── eucs.en.md                   # EUCS explainer (EN)
│   ├── compare/
│   │   ├── _index.md                    # Comparison page shell (FR)
│   │   └── _index.en.md                 # Comparison page shell (EN)
│   └── about/
│       ├── _index.md                    # About page (FR)
│       └── _index.en.md                 # About page (EN)
│
├── templates/
│   ├── base.html                        # Main layout: <head>, <nav>, <main>, <footer>
│   ├── index.html                       # Homepage template
│   ├── section.html                     # Default section template
│   ├── page.html                        # Default page template
│   ├── providers/
│   │   ├── section.html                 # Provider listing with filters
│   │   └── page.html                    # Provider detail page
│   ├── certifications/
│   │   ├── section.html                 # Certification listing
│   │   └── page.html                    # Certification detail page
│   ├── compare/
│   │   └── section.html                 # Comparison page (JS-driven)
│   ├── taxonomy_list.html               # Taxonomy term listing (services, countries)
│   ├── taxonomy_single.html             # Single taxonomy term page
│   └── partials/
│       ├── nav.html                     # Navigation (responsive, bilingual)
│       ├── footer.html                  # Footer with links
│       ├── provider-card.html           # Reusable provider card component
│       ├── filter-panel.html            # Multi-criteria filter UI
│       ├── providers-json-data.html   # Inline JSON data for client-side JS (shared by filter + compare)
│       ├── comparison-table.html        # Side-by-side comparison layout
│       ├── certification-badge.html     # Certification badge component
│       ├── seo-head.html                # Meta, hreflang, Schema.org JSON-LD
│       ├── language-switcher.html       # FR/EN language toggle
│       └── skip-nav.html               # Accessibility skip navigation
│
├── static/
│   ├── css/
│   │   ├── variables.css                # Design tokens: colors, spacing, fonts, breakpoints
│   │   ├── base.css                     # Reset, typography, base elements, focus styles
│   │   ├── layout.css                   # Grid, containers, responsive media queries
│   │   ├── components.css               # Provider cards, filters, badges, nav, footer
│   │   └── utilities.css                # Minimal utilities: .visually-hidden, flex helpers
│   ├── js/
│   │   ├── filter.js                    # Parse inline JSON, multi-criteria filtering, render results
│   │   └── compare.js                   # Read URL params, parse inline JSON, render comparison
│   ├── images/
│   │   ├── providers/                   # Provider logos (kebab-case.png)
│   │   ├── certifications/              # Certification icons
│   │   └── site/                        # Site assets (favicon, og-image, etc.)
│   ├── favicon.ico
│   └── robots.txt
│
└── public/                              # Generated output (git-ignored, built by Zola)
```

### Architectural Boundaries

**Data Boundaries:**
- **Source of truth:** YAML frontmatter files in `content/providers/`
- **Runtime index:** `providers.json` generated at build time (Tera template)
- **No runtime-modifiable data** — all changes go through Git

**Component Boundaries:**
- **Tera templates** → static HTML generation (build-time only)
- **Client JS** → filtering + comparison only (runtime)
- **CSS** → presentation only, no logic
- **No inter-component JS communication** — each script is self-contained on its page

**Integration Boundaries:**
- **GitHub** → sole external integration (PRs, Actions, Pages)
- **No third-party APIs** at runtime
- **No external services** (analytics, search-as-a-service, etc.)

### Requirements to Structure Mapping

| FR Category | Files Involved |
|-------------|---------------|
| Discovery & Search (FR1-FR8) | `templates/providers/section.html`, `partials/filter-panel.html`, `static/js/filter.js`, `providers.json` |
| Provider Display (FR9-FR15) | `templates/providers/page.html`, `partials/provider-card.html`, `content/providers/*/` |
| Comparison (FR16-FR21) | `templates/compare/section.html`, `partials/comparison-table.html`, `static/js/compare.js` |
| Multilingual (FR22-FR25) | `config.toml`, `partials/language-switcher.html`, `partials/seo-head.html`, all `*.en.md` |
| Contribution (FR26-FR32) | `CONTRIBUTING.md`, `schemas/provider.schema.json`, `.github/workflows/deploy.yml` |
| Data Validation (FR33-FR37) | `schemas/provider.schema.json`, `scripts/validate-providers.py`, CI pipeline |
| Maintainer Mgmt (FR38-FR43) | `.github/workflows/deploy.yml`, CI pipeline |
| Content Generation (FR44-FR50) | All `templates/`, `config.toml` (taxonomies), `partials/seo-head.html` |
| Accessibility (FR51-FR56) | `base.css` (focus), `partials/skip-nav.html`, all templates (ARIA), CI a11y check |
| Responsive (FR57-FR61) | `layout.css`, `variables.css` (breakpoints), all templates |
| Performance (FR62-FR66) | `variables.css` (minimal), `js/` (budget), CI Lighthouse |

### Data Flow

```
[Provider YAML frontmatter] → [zola build] → [HTML pages with inline JSON + taxonomy pages]
                                                       ↓
                                              [GitHub Pages CDN]
                                                       ↓
                                              [Browser loads page]
                                                       ↓
                                    [JS parses inline #providers-data → filter/compare]
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices work together without conflicts. Zola (SSG) + CSS vanilla + vanilla JS + GitHub Pages form a minimal, cohesive stack with zero inter-dependency issues. The JSON inline approach via Tera partial eliminated the only external build dependency (Python script for index generation), keeping the build pipeline 100% Zola.

**Pattern Consistency:**
Naming conventions (kebab-case files, camelCase JS, snake_case YAML/JSON, CSS custom properties) are internally consistent and align with each technology's conventions. No cross-pattern conflicts identified.

**Structure Alignment:**
Project directory structure directly supports all architectural decisions. Templates, partials, static assets, and content organization map cleanly to the chosen patterns. The `providers-json-data.html` partial bridges the build-time/runtime boundary cleanly.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage (66/66):**

| FR Group | Architecture Support | Status |
|----------|---------------------|--------|
| FR1-FR8 Discovery & Search | Tera list template + inline JSON + filter.js | ✅ |
| FR9-FR15 Provider Display | Tera detail template + provider-card partial | ✅ |
| FR16-FR21 Comparison | compare.js + inline JSON + URL params | ✅ |
| FR22-FR25 Multilingual | Zola native i18n + language-switcher partial | ✅ |
| FR26-FR32 Contribution | CONTRIBUTING.md + YAML template + CI validation | ✅ |
| FR33-FR37 Data Validation | JSON Schema + validate-providers.py + CI | ✅ |
| FR38-FR43 Maintainer Mgmt | GitHub Actions pipeline + zola check | ✅ |
| FR44-FR50 Content Generation | Zola build + Tera templates + sitemap + hreflang | ✅ |
| FR51-FR56 Accessibility | base.css focus + skip-nav + ARIA + CI axe-core | ✅ |
| FR57-FR61 Responsive | layout.css + variables.css breakpoints + media queries | ✅ |
| FR62-FR66 Performance | JS/CSS budgets + Lighthouse CI gates + SSG optimization | ✅ |

**Non-Functional Requirements Coverage (62/62):**

| NFR Group | Architecture Support | Status |
|-----------|---------------------|--------|
| Performance (P1-P16) | Zola SSG, JS <100KB, CSS <50KB, DOM <1500, Lighthouse CI | ✅ |
| Security (S1-S12) | GitHub Pages HTTPS, CSP headers, CI validation, no secrets | ✅ |
| Scalability (SC1-SC8) | Static CDN, linear inline JSON scaling, build <5min target | ✅ |
| Accessibility (A1-A19) | RGAA 4 AA patterns, axe-core CI, ARIA landmarks, skip-nav | ✅ |
| Reliability (R1-R12) | GitHub Pages 99.9%, git rollback, atomic CDN deploys | ✅ |
| Maintainability (M1-M12) | CI automation, schema validation, PR review process | ✅ |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All 8 ADRs documented with rationale and affected components
- Technology stack fully specified (Zola, CSS vanilla, vanilla JS, GitHub Pages)
- No version pinning needed — Zola is a single binary, no dependency tree

**Structure Completeness:**
- Complete directory tree with all files and directories defined
- Every FR category mapped to specific files
- Integration boundaries clearly documented

**Pattern Completeness:**
- Naming conventions cover all elements (files, CSS, JS, YAML, JSON, Git)
- Accessibility patterns mandatory and documented
- State management patterns (`.is-*` classes) specified
- Comment and documentation conventions defined

### Gap Analysis Results

**Critical Gaps: 0**

**Important Gaps: 0** (resolved during Advanced Elicitation — JSON generation approach simplified to Tera partial)

**Nice-to-Have Gaps: 2**
1. Exact `config.toml` Zola configuration not specified — intentionally deferred to implementation as it's configuration detail, not architectural decision
2. CSS color theme not specified — intentionally deferred as this is design, not architecture

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low-Medium)
- [x] Technical constraints identified (JS budget, build time, CDN)
- [x] Cross-cutting concerns mapped (i18n, a11y, performance, SEO, validation, GreenIT)

**✅ Architectural Decisions**
- [x] 8 ADRs documented with rationale
- [x] Technology stack fully specified (Zola + CSS vanilla + vanilla JS + GitHub Pages)
- [x] Integration patterns defined (Tera partials, inline JSON, GitHub PR workflow)
- [x] Performance considerations addressed (budgets, Lighthouse CI gates)

**✅ Implementation Patterns**
- [x] Naming conventions established (files, CSS, JS, YAML, JSON, Git commits)
- [x] Structure patterns defined (templates, partials, content organization)
- [x] Accessibility patterns specified (ARIA, focus, skip-nav, aria-live)
- [x] Process patterns documented (state classes, error handling, comments)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established (build-time vs runtime, templates vs JS vs CSS)
- [x] Data flow mapped (YAML → build → HTML+inline JSON → CDN → browser → JS)
- [x] Requirements to structure mapping complete (all 66 FRs → specific files)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — validated architecture with zero critical gaps, full requirements coverage, and comprehensive implementation patterns.

**Key Strengths:**
- Radical simplicity — SSG-only architecture with zero runtime dependencies
- 100% Zola build pipeline — no external tools for content generation
- Native Zola features (taxonomies, i18n, search, Sass) directly solve core requirements
- Progressive enhancement guaranteed — static HTML works without JS
- Comprehensive patterns prevent AI agent implementation conflicts

**Areas for Future Enhancement:**
- If dataset exceeds ~200 providers, evaluate if inline JSON becomes too heavy in HTML (~4KB/provider = ~800KB, still manageable but worth monitoring)
- Consider separate JSON file if public API is requested (Phase 3)
- Dark theme ready via CSS custom properties architecture (variables.css)
- Incremental builds when provider count grows significantly

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all 8 ADRs exactly as documented
- Use implementation patterns consistently (naming, structure, accessibility)
- Respect project structure and component boundaries
- Use `partials/providers-json-data.html` for ALL client-side data needs — never create a separate JSON endpoint
- Every template must include `partials/skip-nav.html` and proper ARIA landmarks
- All commits must follow `type(scope): description` convention

**First Implementation Priority:**
```bash
zola init cloudlandscape
```
Then configure `config.toml` with taxonomies (services, certifications, countries), i18n (fr, en), and search (Elasticlunr).

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-02-24
**Document Location:** `_bmad-output/planning-artifacts/architecture.md`

### Final Architecture Deliverables

**📋 Complete Architecture Document**
- 8 Architectural Decision Records (ADRs) with rationale
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Full FR (66) and NFR (62) requirements coverage mapping
- Validation confirming coherence and completeness

**🏗️ Architecture at a Glance**
- **SSG:** Zola (Rust) — single binary, zero runtime dependencies
- **Templates:** Tera (Jinja2-like)
- **Styling:** CSS vanilla with custom properties
- **JS:** Vanilla, <100KB budget, filter.js + compare.js
- **Data:** YAML frontmatter in Git, inline JSON via Tera partial
- **i18n:** Native Zola FR/EN
- **Search:** Elasticlunr.js (built-in) + inline JSON filtering
- **Deploy:** GitHub Pages via GitHub Actions
- **CI:** validate → build → check → accessibility → lighthouse → deploy

### Development Sequence

1. Initialize project: `zola init cloudlandscape`
2. Configure `config.toml` (taxonomies, i18n, search)
3. Create base templates (`base.html`, partials)
4. Set up CSS foundation (`variables.css`, `base.css`, `layout.css`)
5. Add first 2-3 providers (content/providers/)
6. Build provider listing + `providers-json-data.html` partial
7. Implement client-side filtering (`filter.js`)
8. Build comparison page (`compare.js`)
9. Set up GitHub Actions CI/CD pipeline
10. Add remaining providers (up to 10 MVP)
11. Accessibility + Lighthouse audit and fixes

### Architecture Status: READY FOR IMPLEMENTATION ✅

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
