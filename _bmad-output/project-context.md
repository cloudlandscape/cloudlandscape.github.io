---
project_name: 'cloudlandscape'
user_name: 'nicolas'
date: '2026-02-24'
sections_completed: ['technology_stack', 'zola_rules', 'data_architecture', 'javascript', 'css', 'tera_templates', 'accessibility', 'git_cicd', 'anti_patterns']
existing_patterns_found: 12
status: 'complete'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

_Architecture reference: `_bmad-output/planning-artifacts/architecture.md`_

---

## Technology Stack & Versions

- **SSG:** Zola (Rust) — single binary, no npm/node_modules
- **Templates:** Tera (Jinja2-like syntax)
- **Styling:** CSS vanilla with custom properties (no framework)
- **JavaScript:** Vanilla JS, ES modules, no framework, no bundler
- **Data format:** YAML frontmatter in Markdown files
- **i18n:** Zola native (FR default, EN secondary)
- **Search:** Elasticlunr.js (Zola built-in)
- **CI validation:** Python (JSON Schema validation)
- **Hosting:** GitHub Pages via GitHub Actions
- **Architecture doc:** `_bmad-output/planning-artifacts/architecture.md`

## Critical Implementation Rules

### Zola-Specific Rules

- Content pages use `index.md` (FR) and `index.en.md` (EN) — never other naming
- Section pages use `_index.md` / `_index.en.md` — the underscore is mandatory for Zola sections
- Taxonomies are defined in `config.toml` and referenced via `taxonomies:` in frontmatter — never invent taxonomy names outside config
- Use `get_section(path="providers/_index.md")` in Tera to access provider pages from other templates — always use the FR path
- `{{ value | json_encode() }}` is the Tera filter for JSON serialization — use it for inline JSON data
- `zola check` validates links — run it before every deploy, never skip
- `zola serve` for local dev — hot reload is automatic, no additional tooling needed

### Data Architecture Rules

- Provider data lives ONLY in `content/providers/{slug}/index.md` frontmatter — never in separate data files
- All YAML frontmatter keys use `snake_case` — never camelCase
- Taxonomy values use `kebab-case` slugs — e.g., `object-storage`, not `objectStorage` or `Object Storage`
- Client-side data is served via inline JSON in `<script id="providers-data" type="application/json">` using the shared partial `partials/providers-json-data.html` — never create a separate JSON endpoint or file
- The `providers-json-data.html` partial must be included in BOTH `providers/section.html` AND `compare/section.html`

### JavaScript Rules

- Vanilla JS only — no frameworks, no jQuery, no libraries (except Elasticlunr built into Zola)
- Total JS budget: <100KB gzipped — measure before every merge
- Two JS files only: `filter.js` (provider filtering) and `compare.js` (comparison page)
- Parse inline JSON via: `JSON.parse(document.getElementById('providers-data').textContent)`
- Use `camelCase` for variables/functions, `UPPER_SNAKE_CASE` for constants
- CSS state classes use `.is-*` prefix: `.is-loading`, `.is-error`, `.is-empty`, `.is-active`
- Dynamic content containers MUST have `aria-live="polite"` — never update DOM without it
- Progressive enhancement: all content must be readable WITHOUT JavaScript enabled

### CSS Rules

- CSS vanilla only — no Tailwind, no SCSS (Zola supports Sass but we don't use it)
- CSS custom properties for ALL design tokens — colors, spacing, fonts in `variables.css`
- File structure: `variables.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`
- Class naming: `kebab-case` with component prefix — `.provider-card`, `.filter-panel`, `.compare-table`
- Custom properties: `--color-*`, `--spacing-*`, `--font-*` namespaces
- Total CSS budget: <50KB — measure before every merge
- Never use `outline: none` without providing `:focus-visible` alternative styles
- Responsive breakpoints: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)

### Tera Template Rules

- Reusable components go in `templates/partials/` — never duplicate template logic
- Use `{# Comment explaining WHY #}` — never comment the obvious
- Variables follow Tera convention: `snake_case` — e.g., `{{ page.extra.datacenter_locations }}`
- Every page template must include `partials/skip-nav.html` and use semantic HTML landmarks (`<main>`, `<nav>`, `<footer>`)
- Every page must set `lang="fr"` or `lang="en"` on `<html>` — critical for accessibility and SEO
- SEO partial `partials/seo-head.html` must be in every page's `<head>` — handles meta, hreflang, Schema.org

### Accessibility Rules (RGAA 4 AA — Non-Negotiable)

- Every `<input>` must have an associated `<label>` — never use placeholder as sole label
- Every `<img>` must have `alt` — provider logos: `alt="Logo {provider_name}"`
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- All interactive elements must be keyboard-navigable
- Skip navigation link must be the first focusable element in `<body>`
- `:focus-visible` must be styled in `base.css` — visible focus ring on all interactive elements
- `aria-live="polite"` on filter results container and any dynamically updated content
- axe-core runs in CI — zero critical/serious violations allowed

### Git & CI/CD Rules

- Commit format: `type(scope): description` — types: `feat`, `fix`, `data`, `docs`, `style`, `ci`, `chore`
- Scopes: `providers`, `templates`, `css`, `js`, `ci`, `i18n`
- Provider data commits: `data(providers): add {provider-name}`
- CI pipeline order: `validate` → `build` → `check` → `accessibility` → `lighthouse` → `deploy`
- Deploy only on push to `main` — never on PRs
- `validate` job runs `scripts/validate-providers.py` against `schemas/provider.schema.json`
- Lighthouse CI gates: Performance >90, Accessibility >95, Best Practices >90, SEO >95

### Anti-Patterns (NEVER DO)

- ❌ Never add npm/node_modules — this is a zero-Node project
- ❌ Never create a separate `providers.json` file — use inline JSON via Tera partial
- ❌ Never use a CSS framework or preprocessor — CSS vanilla only
- ❌ Never add JS libraries/frameworks — vanilla JS only
- ❌ Never hardcode provider data in templates — always read from content pages
- ❌ Never skip accessibility attributes (alt, aria-live, labels, lang)
- ❌ Never use `outline: none` without `:focus-visible` styling
- ❌ Never commit directly to `main` — always use PRs with CI validation
- ❌ Never create content files outside the `content/` directory structure
- ❌ Never invent new taxonomy names without adding them to `config.toml` first

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Reference `_bmad-output/planning-artifacts/architecture.md` for detailed ADRs and project structure

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack or patterns change
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-02-24
