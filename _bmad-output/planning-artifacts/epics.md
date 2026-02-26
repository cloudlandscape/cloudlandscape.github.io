---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/architecture.md', '_bmad-output/planning-artifacts/ux-design-specification.md']
---

# cloudlandscape - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for cloudlandscape, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Provider Discovery & Search:**
- FR1: Users can view a list of cloud providers
- FR2: Users can filter providers by service type (Compute, Database, Storage, Kubernetes, Platform, Containers, IAM, API Gateway)
- FR3: Users can filter providers by certification (SecNumCloud, HDS, EUCS)
- FR4: Users can filter providers by country or geographic region
- FR5: Users can apply multiple filter criteria simultaneously (e.g., Kubernetes AND SecNumCloud AND France)
- FR6: Users can reset all filters to view the complete provider list
- FR7: Users can perform keyword search across provider names and descriptions
- FR8: Users receive filter results in under 2 seconds

**Provider Information Display:**
- FR9: Users can view detailed information for each cloud provider (name, description, country, headquarters, services, certifications, datacenter locations, official website)
- FR10: Users can view a provider's available services mapped to the unified taxonomy
- FR11: Users can view a provider's certifications with attestation status
- FR12: Users can view a provider's datacenter locations
- FR13: Users can view a provider's country of origin and headquarters
- FR14: Users can access direct links to provider official websites
- FR15: Users can access direct links to provider certification attestation pages

**Provider Comparison:**
- FR16: Users can select 2-4 providers for side-by-side comparison
- FR17: Users can view a comparison table with service alignment (unified taxonomy)
- FR18: Users can view a certification coverage matrix in comparison view
- FR19: Users can view geographic coverage comparison
- FR20: Users can share comparison URLs with others
- FR21: Users can export comparison data (future: Phase 2)

**Multilingual Support:**
- FR22: Users can switch between French and English language versions
- FR23: All provider listings are available in both French and English
- FR24: All UI elements and navigation are translated in both languages
- FR25: Users' language preference persists across browsing sessions via client-side storage

**Contribution Workflow:**
- FR26: Contributors can access contribution guidelines in French and English
- FR27: Contributors can fork the repository to submit provider data
- FR28: Contributors can use a YAML template to structure provider data
- FR29: Contributors can submit provider data via Pull Request
- FR30: Contributors receive automated validation feedback on their submissions
- FR31: Contributors can view validation error messages explaining required corrections
- FR32: Contributors can see their contributions published after maintainer approval

**Data Quality & Validation:**
- FR33: System validates provider YAML structure against defined schema
- FR34: System detects broken external links in provider data
- FR35: System validates certification attestation URLs are accessible
- FR36: System prevents duplicate provider entries
- FR37: System flags provider data older than 12 months for review (future: Phase 2)

**Maintainer Management:**
- FR38: Maintainers can review Pull Requests with automated validation status
- FR39: Maintainers can approve or request changes on provider data submissions
- FR40: Maintainers can merge approved Pull Requests
- FR41: Maintainers can trigger site regeneration after data updates
- FR42: Maintainers can view CI/CD pipeline status for builds and deployments
- FR43: Maintainers can rollback to previous deployment if issues are detected

**Content Management:**
- FR44: System generates static site pages from provider YAML data
- FR45: System generates homepage with project introduction and value proposition
- FR46: System generates individual provider detail pages
- FR47: System generates comparison pages with dynamic URLs
- FR48: System generates certification explainer pages (SecNumCloud, HDS, EUCS)
- FR49: System generates XML sitemap for search engine crawlers
- FR50: System generates multilingual page variants with proper hreflang tags

**Accessibility & Usability:**
- FR51: Users can navigate the entire site using keyboard only
- FR52: Screen reader users can access all content and functionality
- FR53: Users can view content with sufficient color contrast (WCAG 2.1 AA)
- FR54: Users can access skip navigation links
- FR55: Users can read content structure via semantic HTML elements without reliance on CSS styling
- FR56: Users receive clear focus indicators on interactive elements

**Responsive Design:**
- FR57: Users can access full functionality on mobile devices (320px+)
- FR58: Users can access full functionality on tablet devices (768px+)
- FR59: Users can access full functionality on desktop devices (1024px+)
- FR60: Users can access the same features and content across all supported device sizes (mobile, tablet, desktop)
- FR61: Users see optimized layouts appropriate for their screen size

**Performance & Optimization:**
- FR62: Users receive initial page load in under 1.5 seconds on 3G
- FR63: Users can interact with the page in under 3 seconds (Time to Interactive)
- FR64: Users experience no layout shifts during page load (CLS < 0.1)
- FR65: Users receive optimized images for their device and viewport
- FR66: Users can view content progressively as it loads (no blank page wait)

### Non-Functional Requirements

**Performance:**
- NFR-P1: Homepage loads in under 1.5 seconds on 3G connection (Lighthouse)
- NFR-P2: Provider listing pages load in under 2 seconds on 3G connection
- NFR-P3: Time to Interactive (TTI) is under 3 seconds on 3G connection
- NFR-P4: First Contentful Paint (FCP) occurs in under 1 second
- NFR-P5: Client-side filter operations complete in under 2 seconds for datasets up to 100 providers
- NFR-P6: Multi-criteria filter combinations (service + certification + country) respond in under 2 seconds
- NFR-P7: Comparison table generation completes in under 1 second for 2-4 providers
- NFR-P8: Total page weight remains under 500KB excluding images
- NFR-P9: JavaScript bundle size remains under 100KB gzipped
- NFR-P10: CSS bundle size remains under 50KB gzipped
- NFR-P11: Images are compressed, lazy-loaded, and served in WebP format with fallbacks
- NFR-P12: DOM complexity remains under 1500 nodes per page
- NFR-P13: No unnecessary animations or heavy graphics that consume resources
- NFR-P14: Client-side search index size remains under 200KB for 50-100 providers
- NFR-P15: Lighthouse CI scores maintain: Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 95
- NFR-P16: Real User Monitoring (RUM) tracks actual user performance metrics

**Security & Data Integrity:**
- NFR-S1: All provider data sources are validated and documented with official URLs
- NFR-S2: All external links are validated for accessibility before publication
- NFR-S3: Provider certification attestations are verified against official sources
- NFR-S4: All provider YAML submissions are validated against JSON Schema before merge
- NFR-S5: Malformed or incomplete provider data is rejected with clear error messages
- NFR-S6: Duplicate provider entries are prevented through validation checks
- NFR-S7: Site is served over HTTPS with valid SSL/TLS certificate
- NFR-S8: Security headers are configured (CSP, X-Frame-Options, X-Content-Type-Options)
- NFR-S9: No sensitive data or secrets are committed to repository
- NFR-S10: CI/CD pipeline validates all dependencies for known vulnerabilities
- NFR-S11: Build process is reproducible and auditable
- NFR-S12: Deployment artifacts are integrity-checked before publication

**Scalability & Growth:**
- NFR-SC1: System supports 10 providers at MVP launch with target to scale to 50-100 providers
- NFR-SC2: Filter performance degrades by less than 10% when dataset grows from 10 to 100 providers
- NFR-SC3: Search index size scales linearly with provider count (max 4KB per provider)
- NFR-SC4: Full site build completes in under 5 minutes for datasets up to 50 providers
- NFR-SC5: Incremental builds regenerate only affected pages (not entire site) for provider updates
- NFR-SC6: Build time increases by less than 20% when provider count doubles
- NFR-SC7: Static CDN architecture supports 100,000+ monthly page views without performance degradation
- NFR-SC8: Edge caching ensures consistent performance across geographic regions

**Accessibility (WCAG 2.1 AA / RGAA 4):**
- NFR-A1: Color contrast ratio is ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- NFR-A2: All images and icons include text alternatives (alt attributes)
- NFR-A3: Content structure is readable and navigable without CSS styling
- NFR-A4: Full keyboard navigation is supported with no mouse-only interactions
- NFR-A5: Skip navigation links are provided for screen reader users
- NFR-A6: Focus indicators are clearly visible on all interactive elements
- NFR-A7: No time limits are imposed on user interactions
- NFR-A8: Users can pause, stop, or hide any moving or auto-updating content
- NFR-A9: Navigation is consistent across all pages
- NFR-A10: Form labels and error messages are clear and explicit
- NFR-A11: Page language is declared in HTML (lang="fr" or lang="en")
- NFR-A12: Predictable behavior with no unexpected navigation changes
- NFR-A13: Valid, semantic HTML5 markup is used throughout
- NFR-A14: ARIA landmarks and roles are applied where appropriate
- NFR-A15: Content is compatible with assistive technologies (screen readers, magnifiers)
- NFR-A16: Progressive enhancement ensures core content works without JavaScript
- NFR-A17: Automated accessibility testing (axe-core, WAVE) is integrated into CI pipeline
- NFR-A18: Manual keyboard navigation testing is performed for all user flows
- NFR-A19: Screen reader testing (NVDA, JAWS, VoiceOver) validates accessibility

**Reliability & Availability:**
- NFR-R1: Platform uptime is 99.5% (measured monthly)
- NFR-R2: DNS resolution completes in under 100ms from European locations
- NFR-R3: Page requests are served within 200ms from content CDN
- NFR-R4: Data consistency is maintained across all provider pages
- NFR-R5: Failed deployment can be rolled back in under 5 minutes
- NFR-R6: Content is regularly backed up (weekly minimum)

**SEO & Discoverability:**
- NFR-SEO1: All pages are indexable by search engines (no noindex)
- NFR-SEO2: XML sitemap is generated and submitted to search engines
- NFR-SEO3: Open Graph meta tags are present for social sharing
- NFR-SEO4: Structured data (Schema.org) is implemented for provider listings
- NFR-SEO5: URL structure is clean and descriptive (/providers/scaleway, /compare/?p=...)
- NFR-SEO6: Page titles and meta descriptions are unique per page
- NFR-SEO7: hreflang tags correctly indicate language/regional variants

### Additional Requirements from Architecture

**Starter Template:**
- Architecture specifies starting from scratch with `zola init` (greenfield)
- No starter template to bootstrap from

**Data Architecture (ADR-01, ADR-02):**
- Each provider is a directory in `content/providers/` with `index.md` (FR) and `index.en.md` (EN)
- Standardized YAML frontmatter schema with fields: title, description, country, headquarters, services[], certifications[], datacenter_locations[], website_url, certification_links{}
- Taxonomies auto-generate pages per service/certification/country

**Client-Side Filtering (ADR-03):**
- Shared Tera partial (`partials/providers-json-data.html`) generates provider data as inline JSON
- Vanilla JS reads inline JSON and performs in-memory multi-criteria filtering
- No external dependencies, data generated at build time
- Reusable across all pages via Tera partial inclusion

**Provider Comparison (ADR-04):**
- Static page at `/compare/` with JS that reads query parameters (`/compare/?p=scaleway,ovh`)
- JS parses inline JSON data and renders side-by-side comparison table
- Shareable URLs with no server-side logic needed

**CSS Architecture (ADR-05):**
- CSS custom properties for theming (colors, spacing, typography)
- Small set of utility classes, no CSS framework
- Files: `static/css/variables.css` (design tokens), `static/css/base.css` (reset, typography)
- Design tokens: colors (pastel palette), spacing (4px base), fonts (system-ui), breakpoints (desktop-first)

**JavaScript Architecture (ADR-06):**
- Vanilla JS modules, no framework
- Two main scripts: `filter.js` (multi-criteria filtering), `compare.js` (comparison table)
- Budget: <100KB gzipped
- Progressive enhancement: core content works without JS

**CI/CD Pipeline (ADR-07):**
- GitHub Actions workflow with validate-first approach
- Ordered jobs: validate schema, check links, build site, run Lighthouse CI, deploy
- Pull request validation with automated feedback
- Merge only after all checks pass

**Hosting & Deployment (ADR-08):**
- GitHub Pages with custom domain
- 99.9%+ uptime, global CDN via Fastly, HTTPS automatic
- Atomic deploys via branch swap
- Rollback capability (<5 minutes)

### Additional Requirements from UX Design

**Design System:**
- Pastel Professional color palette: Primary #4A6FA5 (muted blue), Secondary #6B9080 (sage green), Accent #E8A87C (warm peach)
- Typography: system-ui font family, Major Third scale (1.25 ratio), base 16px
- Spacing: 4px base unit
- Sharp corners (no border-radius)
- Dark mode: post-MVP

**Component Implementation:**
- Filter tags must be `<button>` with `aria-pressed` attribute
- Filter panel: `<fieldset>` + `<legend>` per group for screen readers
- Result count: `aria-live="polite"` for dynamic updates
- Compare table: semantic `<table>` with proper `<th scope>`, sticky first column on mobile
- Compare button: sticky when 2+ providers selected, disabled at 5+

**Interaction Patterns:**
- Filter: 1 click to apply, instant result update, URL updates with query params
- Compare: checkbox on cards → sticky button → navigate to `/compare/?p=slug1,slug2`
- Copy URL: inline feedback "Copied ✓" for 2 seconds (no toast/modal)
- Zero-results: guidance message suggesting filter removal

**Responsive Strategy:**
- Desktop-primary (max-width media queries, not mobile-first)
- Three breakpoints: desktop (1024px+), tablet (768-1023px), mobile (320-767px)
- Direction A (sidebar+cards) for desktop listing
- Direction E (comparison table) for comparison page
- Direction F (compact) for mobile

**Accessibility Implementation:**
- RGAA 4 AA compliance mandatory
- Automated testing: axe-core, Lighthouse, WAVE
- Manual testing: keyboard navigation, screen readers (NVDA, JAWS, VoiceOver)
- Skip navigation links, ARIA landmarks, semantic HTML
- No reliance on CSS for structure, progressive enhancement

**User Journeys (from UX):**
- Jérôme (Architect ESN): Discovery → Filtering (HDS + Kubernetes + France) → Comparison → Decision
- Sarah (Tech Lead): Exploration → Learning → Deep-dive → Comparison with team
- Marc (First Contributor): Research → Submission → Feedback loop → Publication

---

## Requirements Analysis Summary

✅ **Total Functional Requirements:** 66 FRs  
✅ **Total Non-Functional Requirements:** 62 NFRs (organized by category: Performance, Security, Scalability, Accessibility, Reliability, SEO)  
✅ **Architectural Decisions:** 8 ADRs providing technical guidance (data structure, filtering, comparison, CSS, JS, CI/CD, hosting)  
✅ **Design System:** Complete with color palette, typography, spacing, components, patterns  
✅ **User Journeys:** 3 detailed personas with concrete discovery workflows  

**Key Technical Constraints:**
- No framework: Vanilla JS only, CSS custom properties
- Budget: JS <100KB, CSS <50KB, total page <500KB
- Performance: Filter <2s, page load <1.5s on 3G, TTI <3s
- Accessibility: RGAA 4 AA (WCAG 2.1 AA) mandatory
- Data-driven: Provider data from YAML, client-side filtering via inline JSON
- Deployment: GitHub Pages, GitHub Actions CI/CD

**Key UX Decisions:**
- Desktop-first responsive approach
- Pastel professional color palette (no rounded corners)
- 3 design directions selected: A+E+F hybrid
- Component-based architecture with clear semantics
- Instant feedback patterns (no loading states, <2s response)

---

## Epic List

### Epic 1: Provider Discovery Foundation
Users can discover and explore the complete cloud provider landscape with real-time filtering and <2 second response times.

**Epic Goal:** Architects can find relevant cloud providers in <10 minutes using multi-criteria filtering (services, certifications, geography), addressing the core problem of provider discoverability.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8  
**NFRs covered:** NFR-P5, NFR-P6, NFR-SC2 (filter performance, scaling)  
**Key Value:** Solves the primary discovery problem with instant feedback

### Epic 2: Provider Intelligence & Comparison
Users can view detailed provider information and perform side-by-side comparisons to verify services and make informed decisions.

**Epic Goal:** Architects can access comprehensive provider details (services, certifications, locations, websites) and compare 2-4 providers with <1 second table generation.

**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20  
**NFRs covered:** NFR-P7 (comparison performance), NFR-S1, NFR-S2, NFR-S3 (data integrity), NFR-SEO4  
**Key Value:** Enables confident, verifiable decision-making with trustworthy data

### Epic 3: Multilingual & Accessible Platform
Users can access the platform in their preferred language with complete keyboard navigation and screen reader support.

**Epic Goal:** French and English speakers can navigate the entire platform; keyboard-only users and screen reader users get full access with RGAA 4 AA compliance.

**FRs covered:** FR22, FR23, FR24, FR25, FR51, FR52, FR53, FR54, FR55, FR56  
**NFRs covered:** NFR-A1 through NFR-A19 (full accessibility suite)  
**Key Value:** Ensures no user is excluded; builds trust through inclusive design

### Epic 4: Content Generation & Static Site Architecture
System generates all site pages from provider YAML data with proper SEO, fast builds, and scalable infrastructure.

**Epic Goal:** Maintainers can publish provider data once; system automatically generates all listing, detail, comparison, and certification pages with SEO optimization.

**FRs covered:** FR44, FR45, FR46, FR47, FR48, FR49, FR50  
**NFRs covered:** NFR-SC4, NFR-SC5, NFR-SC6 (build performance & scaling), NFR-SEO1 through NFR-SEO7, NFR-P1, NFR-P2  
**Key Value:** Foundation for scalable, discoverable content; enables growth to 100+ providers

### Epic 5: Responsive & Progressive Design
Platform delivers optimized user experiences across mobile (320px), tablet (768px), and desktop (1024px+) devices with progressive enhancement.

**Epic Goal:** Users on any device (mobile, tablet, desktop) get appropriate layouts and can use core features without JavaScript.

**FRs covered:** FR57, FR58, FR59, FR60, FR61  
**NFRs covered:** NFR-P8, NFR-P9, NFR-P10, NFR-P11, NFR-P12, NFR-P13, NFR-P14, NFR-A16, NFR-P15 (Lighthouse scores)  
**Key Value:** Accessible on all devices; excellent performance across connection speeds

### Epic 6: Data Quality & Community Contribution Workflow
Contributors can submit provider data with validation; maintainers can review, request changes, and publish with confidence.

**Epic Goal:** Community can expand provider coverage through streamlined contribution workflow; automated validation ensures data quality and correctness.

**FRs covered:** FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR36, FR37  
**NFRs covered:** NFR-S4, NFR-S5, NFR-S6 (input validation), NFR-SC1 (supports 10→100 providers)  
**Key Value:** Enables sustainable growth through community; maintains data integrity

### Epic 7: Maintainer Operations & Reliability
Maintainers can manage releases, monitor pipeline status, and rollback safely with 99.5% uptime and <5 minute rollback windows.

**Epic Goal:** Maintainers have confidence in their release process; users experience reliable, always-available platform with atomic deployments.

**FRs covered:** FR38, FR39, FR40, FR41, FR42, FR43  
**NFRs covered:** NFR-R1 through NFR-R6 (reliability, uptime, rollback), NFR-S7, NFR-S8, NFR-S9, NFR-S10, NFR-S11, NFR-S12 (security & supply chain)  
**Key Value:** Operational excellence and maintainer confidence; sustainable platform

---

## FR Coverage Map

| FR | Epic | Details |
|---|---|---|
| FR1 | Epic 1 | View provider list |
| FR2 | Epic 1 | Filter by service type |
| FR3 | Epic 1 | Filter by certification |
| FR4 | Epic 1 | Filter by country/region |
| FR5 | Epic 1 | Multi-criteria filtering |
| FR6 | Epic 1 | Reset filters |
| FR7 | Epic 1 | Keyword search |
| FR8 | Epic 1 | <2s filter response |
| FR9 | Epic 2 | View provider details |
| FR10 | Epic 2 | View services/taxonomy |
| FR11 | Epic 2 | View certifications |
| FR12 | Epic 2 | View datacenter locations |
| FR13 | Epic 2 | View country/headquarters |
| FR14 | Epic 2 | Direct links to websites |
| FR15 | Epic 2 | Direct links to attestations |
| FR16 | Epic 2 | Select 2-4 for comparison |
| FR17 | Epic 2 | Comparison table |
| FR18 | Epic 2 | Certification matrix |
| FR19 | Epic 2 | Geographic coverage |
| FR20 | Epic 2 | Share comparison URLs |
| FR21 | Epic 2 | Export data (Phase 2) |
| FR22 | Epic 3 | Language switch (FR/EN) |
| FR23 | Epic 3 | Bilingual provider listings |
| FR24 | Epic 3 | Bilingual UI/navigation |
| FR25 | Epic 3 | Language persistence |
| FR26 | Epic 6 | Contribution guidelines |
| FR27 | Epic 6 | Fork repository |
| FR28 | Epic 6 | YAML template |
| FR29 | Epic 6 | Submit via PR |
| FR30 | Epic 6 | Validation feedback |
| FR31 | Epic 6 | Error messages |
| FR32 | Epic 6 | See contribution published |
| FR33 | Epic 6 | Validate YAML schema |
| FR34 | Epic 6 | Detect broken links |
| FR35 | Epic 6 | Validate attestation URLs |
| FR36 | Epic 6 | Prevent duplicates |
| FR37 | Epic 6 | Flag stale data (Phase 2) |
| FR38 | Epic 7 | Review PRs with validation |
| FR39 | Epic 7 | Approve/request changes |
| FR40 | Epic 7 | Merge approved PRs |
| FR41 | Epic 7 | Trigger site regeneration |
| FR42 | Epic 7 | View CI/CD status |
| FR43 | Epic 7 | Rollback deployment |
| FR44 | Epic 4 | Generate pages from YAML |
| FR45 | Epic 4 | Generate homepage |
| FR46 | Epic 4 | Generate detail pages |
| FR47 | Epic 4 | Generate comparison pages |
| FR48 | Epic 4 | Generate certification pages |
| FR49 | Epic 4 | Generate XML sitemap |
| FR50 | Epic 4 | Generate hreflang tags |
| FR51 | Epic 3 | Keyboard navigation |
| FR52 | Epic 3 | Screen reader access |
| FR53 | Epic 3 | Color contrast (AA) |
| FR54 | Epic 3 | Skip links |
| FR55 | Epic 3 | Semantic HTML structure |
| FR56 | Epic 3 | Focus indicators |
| FR57 | Epic 5 | Mobile (320px+) |
| FR58 | Epic 5 | Tablet (768px+) |
| FR59 | Epic 5 | Desktop (1024px+) |
| FR60 | Epic 5 | Feature parity across sizes |
| FR61 | Epic 5 | Optimized layouts |
| FR62 | Epic 5 | Page load <1.5s on 3G |
| FR63 | Epic 5 | TTI <3s |
| FR64 | Epic 5 | CLS <0.1 |
| FR65 | Epic 5 | Optimized images |
| FR66 | Epic 5 | Progressive content loading |

✅ **All 66 FRs mapped to 7 MVP epics**

---

## Epic Architecture & Dependencies

**Recommended Implementation Order:**
1. **Epic 1** (Foundation) - Core discovery
2. **Epic 4** (Parallel) - Infrastructure & content generation
3. **Epic 2** (Built on 1+4) - Comparison features
4. **Epic 6** (Parallel) - Community workflows
5. **Epic 3** (Enhances all) - i18n & accessibility
6. **Epic 7** (Parallel) - Ops infrastructure
7. **Epic 5** (Refinement) - Responsive tuning & polish

**Standalone Capability:**
- Each epic delivers complete value in its domain
- Epic 3 (accessibility) enhances all other epics but doesn't block them
- Epic 5 (responsive) applies across all epics
- No epic strictly requires a future epic to function

---

**Next Step:** Proceed to Step 3 (Create Stories) to decompose these 7 epics into detailed user stories with acceptance criteria.

---

## Epic 0: Foundation & Setup

**Epic Goal:** Establish the core Zola project infrastructure, configuration, and initial data needed for all downstream features.

**Business Value:** Without a properly initialized Zola project with taxonomies, i18n, and CI/CD pipeline, no other features can be built.

**Dependencies:** None (this is the critical path blocker).

### Story 0.1: Initialize Zola Project

As a **developer**,
I want to set up the initial Zola project structure,
So that I have a foundation for content generation.

**Acceptance Criteria:**

**Given** I run `zola init cloudlandscape`
**When** the initialization completes
**Then**:
  - Zola v0.18+ is installed locally
  - config.toml exists with default settings
  - templates/ directory structure is created
  - static/ directory is ready for CSS/JS
  - content/ directory exists
  - `zola serve` runs without errors

---

### Story 0.2: Configure Zola for Taxonomies & i18n

As a **developer**,
I want to configure taxonomies and internationalization in config.toml,
So that the site supports services, certifications, countries, and FR/EN languages.

**Acceptance Criteria:**

**Given** config.toml is editable
**When** I configure settings
**Then**:
  - [taxonomies] section defines: services, certifications, countries
  - Each taxonomy has render: true
  - [languages] section defines: fr (default), en (secondary)
  - Language-specific content paths are configured
  - `zola check` validates configuration without errors

---

### Story 0.3: Set Up GitHub Actions CI/CD Pipeline

As a **DevOps engineer**,
I want to set up initial GitHub Actions workflows,
So that the site builds and deploys automatically.

**Acceptance Criteria:**

**Given** .github/workflows/ directory exists
**When** GitHub Actions runs on push to main
**Then**:
  - build.yml workflow exists
  - Zola build completes without errors
  - `zola check` validates internal/external links
  - Generated site is deployed to GitHub Pages
  - Build status is visible on pull requests
  - Deployment succeeds to cloudlandscape.github.io

---

### Story 0.4: Seed Initial Provider Dataset

As a **product owner**,
I want to add 10 initial providers with full data,
So that the MVP has realistic test data for feature development.

**Acceptance Criteria:**

**Given** content/providers/ directory exists
**When** I add provider YAML files
**Then**:
  - 10 providers exist with diverse geographic distribution (2-3 FR, 2-3 US, 2-3 EU, rest global)
  - Each has: title, country, headquarters, website, services, certifications, datacenters
  - Both index.md (FR) and index.en.md (EN) versions exist for all providers
  - All providers have complete YAML frontmatter per schema
  - `zola build` includes all providers without errors
  - Provider listing page displays all 10 providers
  - Each provider has a unique detail page

---

## Epic 1: Provider Discovery Foundation

**Epic Goal:** Architects can find relevant cloud providers in <10 minutes using multi-criteria filtering (services, certifications, geography) with instant feedback.

### Story 1.1: Display Complete Provider List

As an **architect or decision-maker**,
I want to view a complete list of all available cloud providers,
So that I can see the full market landscape before applying filters.

**Acceptance Criteria:**

**Given** I visit the cloudlandscape homepage
**When** the page loads
**Then** I see a list of all 10 MVP providers (or more) with basic information (name, logo, primary services)
**And** the list loads in under 1.5 seconds on 3G connection
**And** each provider card is clearly visible and clickable
**And** the page structure is semantic HTML (no reliance on CSS for structure)

---

### Story 1.2: Filter Providers by Service Type

As an **architect**,
I want to filter providers by service type (Compute, Database, Storage, Kubernetes, etc.),
So that I can find providers offering specific services I need.

**Acceptance Criteria:**

**Given** I'm on the provider listing page
**When** I click on a service filter option (e.g., "Kubernetes")
**Then** the provider list instantly updates to show only providers offering that service
**And** the filter response time is under 2 seconds
**And** the active filter is visually indicated
**And** the URL updates with the selected filter (e.g., `?service=kubernetes`)
**And** multiple service filters can be combined with OR logic

---

### Story 1.3: Filter Providers by Certification

As an **architect seeking compliant providers**,
I want to filter providers by certification (SecNumCloud, HDS, EUCS),
So that I can find providers meeting security and sovereignty requirements.

**Acceptance Criteria:**

**Given** I'm on the provider listing page
**When** I click on a certification filter (e.g., "HDS")
**Then** the provider list instantly updates to show only HDS-certified providers
**And** the filter response time is under 2 seconds
**And** providers with multiple certifications display all relevant badges
**And** the URL updates with the selected certification filter
**And** multiple certification filters can be combined with OR logic

---

### Story 1.4: Filter Providers by Geographic Location

As an **architect with sovereignty or data residency requirements**,
I want to filter providers by country/region of origin,
So that I can find providers meeting geographic or sovereignty criteria.

**Acceptance Criteria:**

**Given** I'm on the provider listing page
**When** I click on a country filter (e.g., "France")
**Then** the provider list instantly updates to show only providers headquartered in that country
**And** the filter response time is under 2 seconds
**And** datacenters locations are distinct from headquarters location
**And** the URL updates with the selected country filter
**And** multiple country filters can be combined with OR logic

---

### Story 1.5: Combine Multiple Filters (Service + Certification + Location)

As an **architect with specific requirements**,
I want to apply multiple filters simultaneously (e.g., Kubernetes AND HDS AND France),
So that I can narrow down providers matching all my criteria at once.

**Acceptance Criteria:**

**Given** I'm on the provider listing page with filters visible
**When** I select "Kubernetes" service AND "HDS" certification AND "France" country
**Then** the provider list updates to show only providers matching ALL criteria
**And** the combined filter response time is under 2 seconds (NFR-P6)
**And** each filter category is visually distinct and independently toggleable
**And** the URL contains all applied filters (e.g., `?service=kubernetes&cert=hds&country=france`)
**And** I can see which filters are currently active
**And** the result count updates dynamically showing how many providers match all criteria

---

### Story 1.6: Reset Filters to Show All Providers

As an **architect wanting to start over**,
I want to quickly reset all filters and view the complete provider list again,
So that I can change my search approach without manually clearing each filter.

**Acceptance Criteria:**

**Given** I have applied one or more filters
**When** I click the "Reset Filters" button
**Then** all filter selections are cleared
**And** the provider list returns to showing all providers
**And** the URL is updated to remove all query parameters
**And** the reset operation completes instantly
**And** focus is moved to the filter panel for accessibility

---

### Story 1.7: Search Providers by Keyword

As an **architect searching for a specific provider**,
I want to perform keyword search across provider names and descriptions,
So that I can quickly locate a provider by name or identify providers matching a description.

**Acceptance Criteria:**

**Given** I'm on the provider listing page
**When** I type a keyword (e.g., "scaleway") in the search field
**Then** the provider list filters to show only providers matching the keyword in name or description
**And** the search response time is under 2 seconds
**And** matching keywords are highlighted in the result
**And** the search is case-insensitive
**And** the search works in combination with filter selections (search filters the already-filtered results)
**And** clearing the search field restores the previous filter results

---

### Story 1.8: See Result Count and Filter State

As an **architect assessing my filter effectiveness**,
I want to see how many providers match my current filter selection,
So that I can understand the search results and adjust filters if needed.

**Acceptance Criteria:**

**Given** I have applied filters to the provider list
**When** the list updates
**Then** a result count is displayed (e.g., "4 providers match your criteria")
**And** the count updates dynamically as filters change
**And** the result count is announced to screen readers using `aria-live="polite"`
**And** if no providers match the filters, a message suggests removing filters
**And** if all filters are removed, the count shows the total provider count

---

## Epic 2: Provider Intelligence & Comparison

**Epic Goal:** Architects can access comprehensive provider details and compare 2-4 providers with <1 second table generation to verify services and make confident decisions.

### Story 2.1: Display Provider Detail Page

As an **architect**,
I want to click on a provider and see its complete information,
So that I can learn all relevant details before deciding to include it in comparison.

**Acceptance Criteria:**

**Given** I click on a provider in the listing
**When** the provider detail page loads
**Then** I see the provider's complete information including:
  - Name and logo
  - Description and value proposition
  - Country of origin and headquarters location
  - Website link
  - Complete list of services with unified taxonomy
  - All certifications with links to attestation pages
  - Datacenters and geographic coverage
**And** the detail page loads in under 2 seconds
**And** all external links (website, attestations) are clearly marked
**And** the page is accessible with keyboard navigation
**And** the back button returns to the previous filter state
**And** the URL reflects the provider slug (`/providers/scaleway`)

---

### Story 2.2: View Unified Service Taxonomy

As an **architect**,
I want to see each provider's services mapped to a unified taxonomy,
So that I can compare services across providers using consistent terminology.

**Acceptance Criteria:**

**Given** I'm viewing a provider detail page
**When** I look at the services section
**Then** each service is displayed with:
  - Unified taxonomy category (Compute, Database, Storage, Kubernetes, Platform, Containers, IAM, API Gateway)
  - Provider-specific service name(s)
  - Brief description
  - Relevant subcategories (e.g., Database → PostgreSQL, MySQL, NoSQL)
**And** services are grouped by category for clarity
**And** no two providers use the same taxonomy inconsistently
**And** the taxonomy is documented somewhere accessible (future: in documentation)

---

### Story 2.3: View Certifications and Verify Attestations

As an **architect responsible for compliance**,
I want to see all certifications held by a provider and access proof documents,
So that I can verify compliance claims against official attestations.

**Acceptance Criteria:**

**Given** I'm viewing a provider detail page
**When** I look at the certifications section
**Then** each certification displays:
  - Certification name (SecNumCloud, HDS, EUCS, etc.)
  - Certification status/date
  - Direct link to official attestation document
  - Issuing authority or verification body
**And** broken or inaccessible attestation links are flagged
**And** links open in new tab for easy reference checking
**And** certification badges are visually distinct
**And** certification information is sourced from official providers

---

### Story 2.4: View Provider Datacenters and Geographic Coverage

As an **architect with geographic or data residency requirements**,
I want to see where a provider's datacenters are located,
So that I can verify data residency compliance and latency considerations.

**Acceptance Criteria:**

**Given** I'm viewing a provider detail page
**When** I look at the datacenters/coverage section
**Then** I see:
  - List of datacenters with their geographic locations
  - Countries where datacenters are available
  - Data residency commitments (if applicable)
  - Links to provider's geographic availability pages (if available)
**And** datacenters are clearly distinguished from the provider's headquarters location
**And** the information is current and verified
**And** the layout is clear and scannable

---

### Story 2.5: Access Direct Links to Provider Websites and Attestations

As an **architect wanting to verify information independently**,
I want direct links to provider's official website and certification documents,
So that I can independently verify claims and access detailed documentation.

**Acceptance Criteria:**

**Given** I'm viewing a provider detail page
**When** I look at the links section
**Then** I see:
  - Direct link to provider's official website
  - Direct links to each certification attestation page
  - All external links are clearly marked as such
  - Links open in a new tab
**And** broken links are detected and flagged in the maintenance process
**And** links are verified to be accessible before publication
**And** no affiliate or tracked links are used

---

### Story 2.6: Select Providers for Comparison

As an **architect evaluating multiple options**,
I want to select 2-4 providers and compare them side-by-side,
So that I can evaluate which provider best meets my needs.

**Acceptance Criteria:**

**Given** I'm viewing providers (on listing or detail page)
**When** I click "Add to Comparison" on a provider card
**Then** the provider is selected for comparison
**And** a comparison counter shows how many providers are selected
**And** I can select between 2 and 4 providers
**And** when 4 providers are selected, additional "Add" buttons are disabled
**And** I can remove a provider from the selection
**And** a "Compare Now" or "Go to Comparison" button appears when 2+ providers are selected
**And** my selection persists as I browse other providers

---

### Story 2.7: View Comparison Table with Service Alignment

As an **architect comparing providers**,
I want to see a side-by-side table showing which services each provider offers,
So that I can quickly identify service gaps and overlaps.

**Acceptance Criteria:**

**Given** I have selected 2-4 providers and clicked "Compare"
**When** the comparison page loads
**Then** I see a table with:
  - Provider names as column headers
  - Service categories as rows
  - Service availability marked clearly (✓ for offered, ✗ for not offered)
  - Provider-specific service names shown
**And** the table loads in under 1 second (NFR-P7)
**And** the first column (services) is sticky for horizontal scroll on narrow viewports
**And** the table is responsive and readable on all device sizes
**And** the table is semantic HTML and accessible to screen readers
**And** data is sourced from the same provider detail information

---

### Story 2.8: View Certification Coverage Matrix

As an **architect assessing compliance**,
I want to see which providers hold which certifications,
So that I can identify which providers meet all my compliance requirements.

**Acceptance Criteria:**

**Given** I'm on the comparison page
**When** I look at the certification section
**Then** I see a matrix showing:
  - Providers as columns
  - Certifications (SecNumCloud, HDS, EUCS) as rows
  - Certification status for each provider (✓ for held, ✗ for not held)
  - Links to attestations in the matrix
**And** the certification matrix is clearly visually distinct from the services table
**And** the matrix is accessible and navigable with keyboard
**And** empty cells (certifications not held) are clearly marked

---

### Story 2.9: View Geographic Coverage Comparison

As an **architect comparing geographic reach**,
I want to see where each provider offers datacenters,
So that I can compare geographic coverage and data residency options.

**Acceptance Criteria:**

**Given** I'm on the comparison page
**When** I look at the geographic coverage section
**Then** I see for each provider:
  - List of countries with datacenters
  - Count of available locations
  - Data residency commitments
**And** the layout allows easy comparison across providers
**And** datacenters are clearly distinguished from headquarters location
**And** information is synchronized with provider detail pages

---

### Story 2.10: Share Comparison URL

As an **architect sharing findings with colleagues**,
I want to get a shareable URL of my comparison,
So that my teammates can view the exact same comparison without recreating it.

**Acceptance Criteria:**

**Given** I have selected providers for comparison
**When** I look at the comparison page URL
**Then** the URL contains the provider slugs (e.g., `/compare/?p=scaleway,ovh,outscale`)
**And** I can copy the URL and share it
**And** when someone opens the shared URL, they see the exact same comparison
**And** the copy-to-clipboard feedback shows "Copied ✓" for 2 seconds
**And** the URL is short and readable
**And** the shared URL works without any account or cookies
**And** the URL is shareable on social media and email

---

## Epic 3: Multilingual & Accessible Platform

**Epic Goal:** French and English speakers can navigate the entire platform; keyboard-only users and screen reader users get full RGAA 4 AA access.

### Story 3.1: Switch Language Between French and English

As an **international user**,
I want to easily switch between French and English versions of the site,
So that I can use cloudlandscape in my preferred language.

**Acceptance Criteria:**

**Given** I'm on any page of cloudlandscape
**When** I click the language switcher
**Then** I can select between "Français" and "English"
**And** the page content immediately switches to the selected language
**And** my language preference is saved in local storage
**And** subsequent page visits remember my language choice
**And** the language switcher is clearly visible and labeled
**And** the language switcher is keyboard accessible
**And** the language switcher works with screen readers
**And** page URL remains the same (language is stored client-side, not in URL)

---

### Story 3.2: Display All Provider Listings in Both Languages

As an **francophone or English speaker**,
I want to see all provider information in my chosen language,
So that I can understand all details without translation.

**Acceptance Criteria:**

**Given** I have selected French or English
**When** I view any provider listing or detail page
**Then** all content displays in my chosen language including:
  - Provider names (translated if applicable)
  - Descriptions
  - Service taxonomies
  - Certification names
  - Geographic descriptions
**And** provider data is authored in both languages at the source
**And** no untranslated placeholder text is visible
**And** service and certification terminology is consistent across languages
**And** external links (to provider websites) are appropriate for the region if available

---

### Story 3.3: Display UI Navigation and Elements in Both Languages

As an **francophone or English user**,
I want all navigation, buttons, and UI labels in my chosen language,
So that I can fully understand how to navigate the site.

**Acceptance Criteria:**

**Given** I have selected French or English
**When** I use any UI element
**Then** all of the following display in my chosen language:
  - Navigation menu items
  - Filter labels and options
  - Button labels ("Search", "Compare", "Add to Comparison", etc.)
  - Form labels and placeholders
  - Error messages and feedback
  - Page titles and headings
  - Result counts and empty states
**And** translations are professional and accurate
**And** UI text length accommodates both French and English (no truncation)
**And** right-to-left language support is not needed (FR + EN only)

---

### Story 3.4: Persist User Language Preference

As an **repeat user**,
I want my language preference to be remembered across browsing sessions,
So that I don't have to switch languages every time I visit.

**Acceptance Criteria:**

**Given** I have selected a language preference
**When** I close my browser and return to cloudlandscape later
**Then** the site loads in my previously selected language
**And** the preference is stored in browser local storage (not server-side)
**And** the preference persists across multiple browsing sessions
**And** if local storage is cleared, the browser's default language is used
**And** if a user has no preference stored, the browser language is detected and used as default

---

### Story 3.5: Keyboard Navigation for All Features

As a **user with motor disabilities or keyboard preference**,
I want to navigate the entire site using only keyboard,
So that I can access all features without a mouse.

**Acceptance Criteria:**

**Given** I'm on any page
**When** I use only the keyboard
**Then** I can:
  - Navigate through all links and buttons using Tab/Shift+Tab
  - Activate buttons and submit forms using Enter
  - Use arrow keys to navigate within filter groups and comparisons
  - Access all interactive elements in a logical tab order
  - Use Escape to close any opened dropdown or modal (if applicable)
**And** the tab order is visible with clear focus indicators
**And** no keyboard trap exists (I can always navigate away from any element)
**And** no functionality is available only via mouse/hover
**And** menu interactions are keyboard accessible

---

### Story 3.6: Screen Reader Support for All Content

As a **blind or low-vision user relying on screen readers**,
I want all content and functionality to be announced correctly,
So that I can independently navigate and use the site.

**Acceptance Criteria:**

**Given** I'm using a screen reader (NVDA, JAWS, VoiceOver)
**When** I navigate the site
**Then** I can:
  - Hear all page headings announced with proper hierarchy (h1, h2, h3)
  - Understand page landmarks (navigation, main, contentinfo)
  - Hear form labels before input fields
  - Understand filter selections and active filters
  - Hear result counts updating dynamically
  - Understand button purposes ("Add to Comparison", etc.)
  - Access link destinations
  - Understand comparison table structure
**And** ARIA labels are used where needed to clarify element purposes
**And** live region updates (like result count) are announced using `aria-live="polite"`
**And** dynamic content changes are announced without page refresh

---

### Story 3.7: Sufficient Color Contrast (WCAG 2.1 AA)

As a **user with low vision**,
I want all text to have sufficient contrast against backgrounds,
So that I can read the content clearly.

**Acceptance Criteria:**

**Given** I'm viewing any page
**When** I look at any text
**Then** the contrast ratio is:
  - ≥ 4.5:1 for normal text (body copy, labels)
  - ≥ 3:1 for large text (headings, buttons)
  - ≥ 3:1 for UI components and graphical objects
**And** contrast is tested with WAVE, axe-core, or Lighthouse
**And** the pastel color palette meets these minimums
**And** forced color mode (Windows High Contrast) displays correctly
**And** color is not the only way to convey information (icons also use patterns)

---

### Story 3.8: Provide Skip Navigation Links

As a **keyboard user or screen reader user**,
I want to skip over repetitive navigation links,
So that I can quickly reach the main content on each page.

**Acceptance Criteria:**

**Given** I arrive on any page
**When** I press Tab on page load (before any other navigation)
**Then** a "Skip to Main Content" link appears at the top
**And** clicking or activating it jumps focus to the main content area
**And** the skip link is visible when focused (not hidden by default)
**And** the skip link works on every page
**And** the skip link is keyboard accessible

---

### Story 3.9: Use Semantic HTML Structure

As a **assistive technology user**,
I want the page structure to be semantic without relying on CSS,
So that I can understand page hierarchy and purpose.

**Acceptance Criteria:**

**Given** I view any page with CSS disabled
**When** I read the page
**Then** I can still:
  - Identify main headings (h1)
  - See the page hierarchy (h2, h3)
  - Distinguish navigation from main content
  - Understand the purpose of each section
  - Access all content in logical order
**And** semantic elements are used correctly:
  - `<nav>` for navigation
  - `<main>` for main content
  - `<footer>` for footer
  - `<fieldset>` for filter groups
  - `<button>` for buttons (not `<div>`)
  - `<table>` for comparison data (not divs)
**And** no empty headings or decorative headings exist
**And** CSS classes do not replace semantic meaning

---

### Story 3.10: Provide Clear Focus Indicators

As a **keyboard user**,
I want to clearly see which element has focus,
So that I know where I am on the page.

**Acceptance Criteria:**

**Given** I'm navigating with keyboard
**When** I Tab through elements
**Then** each element shows a clear focus indicator when focused:
  - Visible outline (not removed by `outline: none`)
  - Sufficient contrast (≥ 3:1 with background)
  - Clearly indicates the focused element
  - Outline is at least 2px visible
**And** focus styles are consistent throughout the site
**And** focus indicators are not positioned off-screen
**And** forced color mode respects focus indicators

---

## Epic 4: Content Generation & Static Site Architecture

**Epic Goal:** Maintainers can publish provider data once; system automatically generates all listing, detail, comparison, and certification pages with SEO optimization.

### Story 4.1: Generate Provider Listing Page from YAML Data

As a **maintainer**,
I want the provider listing page to automatically generate from provider YAML data,
So that I only need to maintain data in one place.

**Acceptance Criteria:**

**Given** provider data is stored in YAML frontmatter (one provider per directory)
**When** the site builds
**Then** the listing page automatically renders all providers with:
  - Provider name and logo
  - Brief description
  - Primary services
  - Certifications
**And** the listing includes all data from provider YAML files
**And** no manual HTML editing of the listing is needed
**And** the build process completes in under 5 minutes (NFR-SC4)
**And** the Zola static site generator is used (ADR-08)
**And** data is served inline as JSON via Tera partial (ADR-03)

---

### Story 4.2: Generate Individual Provider Detail Pages

As a **architect viewing provider information**,
I want each provider to have a dedicated detail page,
So that I can learn everything about a specific provider.

**Acceptance Criteria:**

**Given** a provider directory with index.md (French) and index.en.md (English)
**When** the site builds
**Then** two detail pages are generated:
  - `/providers/[provider-slug]/` (French version)
  - `/providers/[provider-slug]/` with English language parameter (EN version)
**And** each detail page includes:
  - All provider information from YAML (services, certifications, locations, links)
  - Formatted description
  - Related links and resources
**And** the page URL is predictable (`/providers/scaleway`, `/providers/ovh`)
**And** no manual HTML editing is needed
**And** pages are generated for all providers automatically

---

### Story 4.3: Generate Comparison Pages with Dynamic URLs

As an **architect**,
I want to access comparison pages via URLs like `/compare/?p=scaleway,ovh,outscale`,
So that I can share specific comparisons with others.

**Acceptance Criteria:**

**Given** a static comparison page template exists
**When** I access `/compare/?p=scaleway,ovh`
**Then** the page loads with those two providers pre-selected
**And** client-side JavaScript parses the URL parameters
**And** the comparison table renders using the data from the same JSON source (ADR-03)
**And** the URL structure is clean and shareable
**And** adding or removing providers from the URL updates the comparison
**And** no server-side logic is needed (fully static generation)

---

### Story 4.4: Generate Certification Explainer Pages

As a **user learning about certifications**,
I want dedicated pages explaining what SecNumCloud, HDS, and EUCS are,
So that I can understand certification requirements.

**Acceptance Criteria:**

**Given** certification data is in a structured format
**When** the site builds
**Then** three pages are generated automatically:
  - `/certifications/secnumcloud/`
  - `/certifications/hds/`
  - `/certifications/eucs/`
**And** each page explains:
  - What the certification is
  - Who issues it
  - What it requires
  - Which providers hold it (dynamically populated)
**And** the pages are available in French and English
**And** pages are linked from provider detail pages
**And** providers are listed using the same data source

---

### Story 4.5: Generate XML Sitemap for Search Engines

As a **search engine crawler**,
I want an XML sitemap listing all pages,
So that I can discover and index all content efficiently.

**Acceptance Criteria:**

**Given** the site contains multiple pages (listing, providers, comparison, static pages)
**When** I access `/sitemap.xml`
**Then** the sitemap includes:
  - Homepage
  - Provider listing page
  - All individual provider pages (one per provider per language)
  - Static pages (about, contribute, certifications)
**And** each entry includes:
  - URL
  - Last modified date
  - Change frequency
  - Priority
**And** the sitemap is automatically generated during build (no manual maintenance)
**And** the sitemap is submitted to Google Search Console
**And** hreflang tags indicate language versions (see Story 4.6)

---

### Story 4.6: Generate Multilingual Links with Hreflang Tags

As a **search engine indexing multilingual content**,
I want hreflang tags indicating language variants,
So that users see the correct language version in search results.

**Acceptance Criteria:**

**Given** pages exist in both French and English
**When** I inspect page HTML
**Then** hreflang tags are present with:
  - `<link rel="alternate" hreflang="fr" href="..." />` for French
  - `<link rel="alternate" hreflang="en" href="..." />` for English
  - `<link rel="alternate" hreflang="x-default" href="..." />` for default
**And** hreflang tags are in the `<head>` section
**And** all language variants are listed (not duplicated)
**And** hreflang is auto-generated and consistent across all pages
**And** hreflang is validated in XML sitemap also

---

### Story 4.7: Optimize Build Performance for Incremental Changes

As a **maintainer making provider updates**,
I want incremental builds to regenerate only affected pages,
So that the site rebuilds quickly when I update one provider.

**Acceptance Criteria:**

**Given** I update one provider's YAML data
**When** the site builds
**Then** only the affected pages are regenerated:
  - That provider's detail page
  - The provider listing page (affected by changes)
  - The comparison page (if provider data changed)
**And** unchanged pages are not regenerated
**And** build time for single provider update is <10 seconds
**And** full build from scratch remains <5 minutes (NFR-SC4)
**And** full build time for 50 providers is <5 minutes
**And** build performance scales linearly (10 providers ~40s, 50 providers ~3m 30s, 100 providers <5m)
**And** no rebuild time regression when adding providers

---

## Epic 5: Responsive & Progressive Design

**Epic Goal:** Users on any device (mobile, tablet, desktop) get appropriate layouts and can use core features without JavaScript.

### Story 5.1: Display Responsive Provider Listing on Mobile

As a **mobile user**,
I want the provider listing to display clearly on small screens,
So that I can discover providers on my phone.

**Acceptance Criteria:**

**Given** I view the provider listing on a mobile device (320px+)
**When** the page loads
**Then** I see:
  - Provider cards stacked vertically (single column)
  - Touch-friendly button sizes (≥44px height)
  - Readable text without horizontal scrolling
  - Filter panel accessible via a hamburger menu or collapsible section
**And** all features work the same as desktop (filtering, comparison selection)
**And** the layout adapts smoothly between portrait and landscape
**And** images are sized appropriately for mobile screens
**And** the page loads in under 2 seconds on 3G (NFR-P2)
**And** no horizontal scrolling is required

---

### Story 5.2: Display Responsive Provider Listing on Tablet

As a **tablet user**,
I want a tablet-optimized layout leveraging the larger screen,
So that I can see more information without excessive scrolling.

**Acceptance Criteria:**

**Given** I view the provider listing on a tablet (768px+)
**When** the page loads
**Then** I see:
  - Two-column layout with filters on the left (sidebar)
  - Provider cards in a 2-column grid
  - Touch-friendly interaction targets
  - More information visible without excessive scrolling
**And** filter panel is visible without a menu (unlike mobile)
**And** all features work identically to mobile/desktop
**And** text remains readable without zooming
**And** the page load time is under 2 seconds

---

### Story 5.3: Display Responsive Provider Listing on Desktop

As a **desktop user**,
I want a desktop layout optimized for larger screens and mouse interaction,
So that I can efficiently discover and compare providers.

**Acceptance Criteria:**

**Given** I view the provider listing on desktop (1024px+)
**When** the page loads
**Then** I see:
  - Sidebar with all filters visible
  - Provider cards in a multi-column grid
  - Optimal use of screen real estate
  - All features immediately accessible
**And** the design is not cramped or hard to read
**And** mouse hover effects enhance usability
**And** focus indicators are visible for keyboard users
**And** the page load time is under 1.5 seconds on 3G (NFR-P1)

---

### Story 5.4: Responsive Provider Comparison Table

As a **user comparing providers on any device**,
I want the comparison table to display clearly on small screens,
So that I can view comparisons on mobile without frustration.

**Acceptance Criteria:**

**Given** I view the comparison page on different screen sizes
**When** I load the table
**Then** on mobile (< 768px):
  - The first column (service names) is sticky while scrolling horizontally
  - Provider columns scroll horizontally
  - The table remains readable
**And** on tablet (768-1024px):
  - The full table is visible with minor scrolling
**And** on desktop (> 1024px):
  - The entire table is visible without scrolling
**And** data remains accurate and complete on all sizes
**And** the sticky first column functions correctly with keyboard navigation

---

### Story 5.5: Progressive Enhancement - Filter Works Without JavaScript

As a **user with JavaScript disabled or in low-connectivity scenarios**,
I want filtering to work with HTML form submission,
So that I can access content even without JavaScript.

**Acceptance Criteria:**

**Given** JavaScript is disabled or not yet loaded
**When** I apply filters using HTML form submission
**Then** the page reloads with the filters applied
**And** the URL contains the filter parameters (e.g., `?service=kubernetes&cert=hds`)
**And** the provider list displays the filtered results
**And** all content is accessible and readable
**And** comparison URLs (`/compare/?p=...`) work and show relevant data
**And** when JavaScript loads, it enhances to instant client-side filtering
**And** the user experience gracefully degrades without JS

---

### Story 5.6: Images Optimized for Different Viewports

As a **user on a slow connection**,
I want images to be appropriately sized for my device,
So that pages load quickly and use minimal data.

**Acceptance Criteria:**

**Given** pages contain images (logos, provider images)
**When** the page loads
**Then** images are:
  - Served in WebP format with JPEG fallbacks
  - Lazy-loaded (not loaded until visible)
  - Sized appropriately for the viewport
  - Compressed to minimize file size
  - Responsive (different sizes for mobile vs desktop)
**And** images do not block page render (async loading)
**And** images have proper alt text (for accessibility)
**And** total page weight is under 500KB excluding images (NFR-P8)

---

### Story 5.7: No Layout Shift During Page Load (CLS < 0.1)

As a **user reading content**,
I want the page layout to remain stable as content loads,
So that I'm not annoyed by jumping text and elements.

**Acceptance Criteria:**

**Given** a page is loading
**When** content and images load
**Then** the Cumulative Layout Shift (CLS) score is < 0.1
**And** text does not jump as fonts load
**And** images don't cause reflow as they load
**And** no unexpected elements appear after initial content
**And** CLS is measured using Lighthouse or Web Vitals
**And** the site meets CLS < 0.1 threshold consistently

---

### Story 5.8: Progressive Content Loading and Skeleton States

As a **user on slow connections**,
I want to see content progressively as it loads,
So that I feel the page is responsive even if it takes a moment.

**Acceptance Criteria:**

**Given** I'm on a slow 3G connection
**When** a page starts loading
**Then** I see:
  - Core content first (critical path rendering)
  - Text and headers before images
  - Provider cards populate progressively
  - No blank page "waiting" state
**And** content is readable before all assets load
**And** First Contentful Paint (FCP) is under 1 second (NFR-P4)
**And** Time to Interactive (TTI) is under 3 seconds (NFR-P3)

---

## Epic 6: Data Quality & Community Contribution Workflow

**Epic Goal:** Community can expand provider coverage through streamlined contribution workflow; automated validation ensures data quality.

### Story 6.1: Provide Contribution Guidelines

As a **potential contributor**,
I want clear, accessible guidelines for contributing provider data,
So that I can understand the process before contributing.

**Acceptance Criteria:**

**Given** I want to contribute to the provider database
**When** I look for guidelines
**Then** I find a comprehensive "How to Contribute" page that includes:
  - Step-by-step instructions for fork, edit, PR workflow
  - Explanation of provider data structure and schema
  - Two clear workflows:
    - **Creating a NEW provider:** Create new file in content/providers/
    - **Updating an EXISTING provider:** Modify existing file in content/providers/
  - Example provider YAML and examples of updates
  - Links to resources (certifications, service taxonomy, country codes)
  - Validation rules and requirements
  - Troubleshooting FAQs
**And** guidelines are available in both French and English
**And** guidelines are clear and beginner-friendly
**And** guidelines link to actual template, schema, and example files
**And** contact information for questions is provided
**And** both new and update workflows use the same YAML schema and validation rules

---

### Story 6.2: Provide YAML Template for Provider Submissions

As a **contributor**,
I want a clear YAML template for structuring provider data,
So that I can create properly formatted submissions.

**Acceptance Criteria:**

**Given** I want to add a new provider
**When** I view the contribution guidelines
**Then** I see a YAML template with:
  - All required fields (title, description, country, etc.)
  - All optional fields
  - Example values for each field
  - Comments explaining what each field means
  - Links to resources for each field (e.g., service taxonomy, certifications)
**And** the template is copy-paste ready
**And** the template matches the actual schema used by the site
**And** the template is documented and explained
**And** validation schema (JSON Schema) is provided for tool support

---

### Story 6.3: Validate Provider YAML Against Schema

As a **the CI/CD system**,
I want to validate provider YAML files against a defined schema,
So that malformed or incomplete data is rejected before merge.

**Acceptance Criteria:**

**Given** a contributor submits a Pull Request with provider data
**When** the CI/CD pipeline runs
**Then** the validation step:
  - Loads the JSON Schema for provider data
  - Validates each provider YAML file against the schema
  - Rejects files with missing required fields
  - Rejects files with invalid field values
  - Provides clear error messages about what's wrong
**And** validation blocks merge until errors are fixed
**And** validation runs on every commit to a PR
**And** validation messages are user-friendly for non-technical contributors

---

### Story 6.4: Detect Broken External Links in Provider Data

As a **the CI/CD system**,
I want to check that all external links in provider data are accessible,
So that users don't encounter broken links when verifying information.

**Acceptance Criteria:**

**Given** provider data contains URLs (website, certification attestations)
**When** the CI/CD pipeline runs
**Then** the link validation step:
  - Fetches each URL and verifies it's accessible (HTTP 200)
  - Detects and reports broken links (404, 5xx, timeout)
  - Checks certificate attestation URLs specifically (high priority)
  - Blocks PR merge if critical links are broken
**And** validation messages indicate which link is broken and why
**And** validation allows warnings for temporary failures (with retry)
**And** link checking can be skipped for known problematic hosts (with reason)

---

### Story 6.5: Validate Certification Attestation URLs

As a **the CI/CD system**,
I want to verify that certification attestation links are current and accessible,
So that users can always find official proof of compliance.

**Acceptance Criteria:**

**Given** a provider claims to hold a certification (SecNumCloud, HDS, EUCS)
**When** the data is submitted
**Then** the validation step:
  - Identifies certification claims in the data
  - Fetches the corresponding attestation URL
  - Verifies the URL is accessible and returns valid content
  - Checks that the URL belongs to the official certifying authority
  - Reports any missing or inaccessible attestation URLs
**And** validation blocks merge if attestation links are invalid
**And** validation accepts URLs from multiple certification authorities
**And** validation includes known/expected URL patterns per certification

---

### Story 6.6: Prevent Duplicate Provider Entries

As a **the system**,
I want to ensure no duplicate providers exist,
So that the database remains clean and unambiguous.

**Acceptance Criteria:**

**Given** a contributor submits a new provider or edits an existing one
**When** the validation runs
**Then** the system:
  - Checks the provider slug against all existing providers
  - Detects if a provider with the same name already exists (case-insensitive)
  - Rejects duplicate entries with a clear error message
  - Suggests merging with existing entry if appropriate
**And** the check is case-insensitive (Scaleway == scaleway)
**And** the check includes variations (e.g., Ovh, OVH, ovh)
**And** maintainers can manually override if needed for special cases

---

### Story 6.7: Show Validation Feedback in PR

As a **contributor**,
I want clear feedback on my PR about what's wrong (if anything),
So that I can fix issues and resubmit quickly.

**Acceptance Criteria:**

**Given** I submit a PR with provider data
**When** the CI/CD checks complete
**Then** GitHub shows:
  - ✅ Check passed (all validations successful)
  - ❌ Check failed with detailed error messages
  - Error messages explain:
    - Which file/field has the problem
    - What the problem is
    - How to fix it
  - A link to the contribution guidelines (if relevant)
**And** feedback appears immediately in the PR interface
**And** feedback is human-readable for non-technical contributors
**And** feedback includes suggestions for fixes when possible

---

### Story 6.8: Provide Clear Error Messages for Contributions

As a **contributor**,
I want error messages that help me understand and fix issues,
So that I can successfully submit my provider data.

**Acceptance Criteria:**

**Given** my provider data has errors
**When** I check the validation feedback
**Then** I see messages like:
  - ❌ "Field 'services' is required but missing" → indicates what's missing
  - ❌ "URL 'https://example.com' is not accessible" → specific URL error
  - ❌ "Certification 'SecNumCloud' attestation link is broken" → actionable issue
  - ✓ Suggestion: "Similar provider 'Scaleway' already exists. Did you mean to update it?"
**And** error messages are clear and non-technical
**And** error messages include the file path and line number
**And** error messages provide actionable next steps

---

### Story 6.9: Show Contributor Their Published Contribution

As a **contributor**,
I want to see my submitted provider data published on the site,
So that I can verify my contribution is visible to users.

**Acceptance Criteria:**

**Given** my provider PR has been reviewed and merged
**When** the site deploys (automatically after merge)
**Then** my provider appears on:
  - The provider listing page
  - In search/filter results
  - With my contribution acknowledged (if desired)
**And** I receive a notification that my PR was merged
**And** I can share the provider page with others
**And** I can see my contribution in the git history if I want
**And** the provider is live within minutes of merge

---

### Story 6.10: Validate Provider Schema in CI

As a **CI system**,
I want to validate all provider YAML against a JSON schema,
So that invalid data is caught before merge.

**Acceptance Criteria:**

**Given** a Pull Request adds or modifies provider data
**When** GitHub Actions runs on the PR
**Then**:
  - JSON schema exists at schemas/provider.schema.json
  - Python validation script runs: scripts/validate-providers.py
  - PR blocks merge if validation fails
  - Error message specifies which field is invalid and why
  - Error message includes the schema requirement
  - Validation checks all required fields
  - Validation checks field types (string, array, etc.)
  - Validation checks allowed values (taxonomy keys, country codes, etc.)
  - Contributors can run validation locally before pushing
**And** PR shows green checkmark when validation passes

---

## Epic 7: Maintainer Operations & Reliability

**Epic Goal:** Maintainers have confidence in their release process; users experience reliable, always-available platform with atomic deployments.

### Story 7.1: Review Pull Requests with Validation Status

As a **maintainer**,
I want to see the validation status of each PR before reviewing,
So that I know the data is clean before making a decision.

**Acceptance Criteria:**

**Given** a Pull Request is submitted with provider data
**When** I view the PR
**Then** I see:
  - Green/red status badges for each validation check
  - ✅ YAML schema validation passed/failed
  - ✅ Link checking passed/failed
  - ✅ Certification attestation validation passed/failed
  - ✅ Duplication detection passed/failed
  - Links to detailed error logs if checks failed
**And** I can filter/sort PRs by validation status
**And** PRs with validation failures are clearly marked
**And** the interface makes it easy to identify data quality issues
**And** I can download/view the actual provider data for review

---

### Story 7.2: Approve Provider Submissions and Request Changes

As a **maintainer**,
I want to approve good submissions and request changes when needed,
So that I can ensure data quality before publication.

**Acceptance Criteria:**

**Given** I'm reviewing a PR
**When** the data looks good
**Then** I can:
  - Click "Approve" to approve the PR
  - Leave a comment explaining why approved
  - Request specific changes by commenting on code
  - Reject with specific feedback if data doesn't meet standards
**And** the approval workflow integrates with GitHub's PR review system
**And** I can automate approvals for data quality (e.g., if all checks pass)
**And** rejected PRs can be re-opened and resubmitted
**And** I have notes/templates for common feedback

---

### Story 7.3: Merge Approved Pull Requests

As a **maintainer**,
I want to merge approved PRs,
So that new provider data is incorporated into the site.

**Acceptance Criteria:**

**Given** a PR is approved and all checks pass
**When** I click "Merge"
**Then**:
  - The PR is merged into the main branch
  - GitHub Actions automatically starts the deploy pipeline
  - I receive confirmation that the merge succeeded
**And** merge can be done via GitHub UI (no need for command line)
**And** conflicts are detected and prevent merging if unresolved
**And** merge commits follow the project's commit conventions

---

### Story 7.4: Trigger Site Regeneration After Updates

As a **maintainer**,
I want the site to automatically regenerate after I merge a PR,
So that new provider data is published without manual intervention.

**Acceptance Criteria:**

**Given** I merge a provider PR
**When** the merge completes
**Then**:
  - GitHub Actions automatically triggers the build pipeline
  - The Zola site generator builds all pages
  - New provider pages are generated
  - Listing pages are updated
  - Build completes in under 5 minutes (NFR-SC4)
  - Build succeeds or fails with clear error messages
**And** I can view the build log in GitHub Actions
**And** I can manually trigger a rebuild if needed
**And** incremental builds regenerate only affected pages

---

### Story 7.5: Monitor CI/CD Pipeline Status

As a **maintainer**,
I want to see the status of builds and deployments,
So that I can quickly identify and resolve issues.

**Acceptance Criteria:**

**Given** I'm managing the site
**When** I check the CI/CD pipeline
**Then** I can see:
  - Status of the latest build (success/failure)
  - Status of the latest deployment
  - Duration of each pipeline stage
  - Which commit triggered the pipeline
  - Detailed logs for any failures
**And** I receive notifications of failed builds
**And** I can view the deployment history
**And** I can see which version is currently deployed

---

### Story 7.6: Rollback Failed Deployments

As a **maintainer**,
I want to quickly rollback to a previous version if issues are detected,
So that I can minimize downtime.

**Acceptance Criteria:**

**Given** a deployment has caused issues
**When** I need to rollback
**Then** I can:
  - View the deployment history in GitHub Actions
  - Re-run a previous successful deployment
  - Rollback completes in under 5 minutes (NFR-R5)
**And** the previous version is live again
**And** I receive confirmation of successful rollback
**And** git history is clean (no revert commits needed, just re-deploy)
**And** I can investigate the issue with the failed version while running the previous version

---

### Story 7.7: Monitor Uptime and Performance Metrics

As a **maintainer**,
I want to monitor site availability and performance,
So that I can ensure the platform meets SLAs.

**Acceptance Criteria:**

**Given** the site is deployed
**When** I check monitoring
**Then** I can see:
  - Current uptime status (live/down)
  - Uptime percentage (target: 99.5% per NFR-R1)
  - Page load times from real users
  - Error rates and error logs
  - DNS resolution times
  - CDN performance
**And** I receive alerts if uptime drops below 99%
**And** I can view historical metrics
**And** metrics include regional breakdowns (if needed)

---

### Story 7.8: Ensure Security Headers are Configured

As a **the system**,
I want security headers to protect users,
So that the site is secure against common attacks.

**Acceptance Criteria:**

**Given** a page is served
**When** I inspect the HTTP headers
**Then** the following security headers are present:
  - `Content-Security-Policy` (CSP) to prevent XSS
  - `X-Frame-Options: DENY` to prevent clickjacking
  - `X-Content-Type-Options: nosniff` to prevent MIME type sniffing
  - `Strict-Transport-Security` (HSTS) for HTTPS enforcement
  - `Referrer-Policy` to control referrer information
**And** headers are correctly configured (not too permissive)
**And** CSP allows only necessary resources
**And** HSTS is set to at least 1 year

---

### Story 7.9: Validate Supply Chain Security

As a **the system**,
I want to ensure dependencies are secure,
So that the platform isn't compromised by vulnerable third-party code.

**Acceptance Criteria:**

**Given** the build pipeline runs
**When** dependencies are checked
**Then**:
  - Zola binary integrity is verified
  - No vulnerable versions of Zola are used
  - Build artifacts are integrity-checked
  - No secrets (API keys, credentials) are committed
**And** build fails if vulnerabilities are detected
**And** dependency scanning runs on every build
**And** alerts are sent for new vulnerabilities in dependencies

---

### Story 7.10: Maintain High Lighthouse Scores

As a **the system**,
I want to continuously measure and maintain performance/accessibility,
So that the platform stays optimized.

**Acceptance Criteria:**

**Given** the site is deployed
**When** Lighthouse CI runs
**Then** scores are:
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 90
  - SEO > 95
**And** Lighthouse CI blocks deployment if scores drop below thresholds
**And** I receive reports of score changes
**And** I can investigate and fix issues before deployment
**And** scores are tracked historically to identify trends

---

### Story 7.11: Integrate axe-core Accessibility Testing

As a **QA system**,
I want to run automated accessibility testing on generated HTML,
So that accessibility violations are caught before deployment.

**Acceptance Criteria:**

**Given** the site is built
**When** axe-core GitHub Action runs in CI
**Then**:
  - axe-core scans all generated pages
  - Zero critical violations are allowed
  - Zero serious violations are allowed
  - Warnings are reported but don't block deployment
  - All violations are categorized (critical, serious, moderate, minor)
  - Violations link to help documentation
  - Accessibility report is visible in PR checks
  - Results are tracked over time to identify trends
  - Tests include WCAG 2.1 AA compliance checks
  - Tests check for common issues: contrast, missing alt text, aria attributes, keyboard nav
**And** PR shows green checkmark when no critical violations found

---

