---
created: "2026-02-26T17:05:08Z"
project: "cloudlandscape"
phase: "Phase 4 - Implementation"
type: "MVP Sprint Plan"
duration: "8-10 weeks"
team_size: "1-3 people"
---

# Sprint Plan: cloudlandscape MVP

## Executive Summary

**MVP Scope:** 10 cloud providers, 5 certifications, 3 countries, complete filtering/search, comparison, multilingual (FR/EN), accessible (RGAA 4 AA), and production-ready CI/CD pipeline.

**Timeline:** 8-10 weeks (solo developer) | 4-6 weeks (team of 2-3)

**Story Count:** 68 stories across 10 epics

**Estimated Points:** 163 story points

**Velocity Baseline:** 10 pts/week (solo) | 15-20 pts/week (team)

**Critical Path:** Epic 0 → Epic 4 → Epic 1 (53 points sequentially)

**Parallel Work:** Epics 2, 3, 5, 6, 7 (110 points overlapping)

---

## Part 1: Dependency Analysis

### Epic Dependency Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRITICAL PATH                               │
├─────────────────────────────────────────────────────────────────┤

  Epic 0: Foundation        [16 pts]
         ↓
  Epic 4: Content Generation [19 pts]
         ↓
  Epic 1: Discovery          [18 pts] ─────┐
         ↓                              │
  READY FOR PUBLIC USE              │
                                    ↓
                            Epic 2: Comparison [26 pts]

├─────────────────────────────────────────────────────────────────┤
│              PARALLEL TRACKS (Independent)                      │
├─────────────────────────────────────────────────────────────────┤

  Epic 3: Multilingual/A11y  [20 pts] ──┐
  Epic 5: Responsive Design  [18 pts] ──┤ (Can run parallel with Epic 1-2)
  Epic 6: Contribution       [23 pts] ──┤
  Epic 7: Operations         [23 pts] ──┘

└─────────────────────────────────────────────────────────────────┘
```

### Critical Path Analysis

**On Critical Path (Must Complete Sequentially):**
- Epic 0: Foundation & Setup (16 points)
- Epic 4: Content Generation (19 points)
- Epic 1: Provider Discovery (18 points)
- **Total: 53 points**

**Parallel (Can Overlap with Critical Path):**
- Epic 2: Comparison (26 points) - starts after Epic 1
- Epic 3: Multilingual/A11y (20 points) - incremental, runs alongside
- Epic 5: Responsive Design (18 points) - starts after Epic 1
- Epic 6: Contribution Workflow (23 points) - independent
- Epic 7: Operations (23 points) - starts after Epic 4
- **Total: 110 points**

**Impact:** Critical path is only 53 points, with 110 points running in parallel = Total time is critical path + overlapping parallel work ≈ 8-10 weeks with proper parallelization.

---

## Part 2: Story Point Estimation

### Epic 0: Foundation & Setup (4 stories, 16 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 0.1 | Initialize Zola Project | 3 | Binary install + basic setup |
| 0.2 | Configure Zola (Taxonomies & i18n) | 3 | Config file editing, testing |
| 0.3 | GitHub Actions CI/CD Pipeline | 5 | Workflow design, integration complexity |
| 0.4 | Seed Initial Provider Dataset | 5 | 10 providers × 2 languages + validation |
| **Total** | | **16** | |

### Epic 1: Provider Discovery (8 stories, 18 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 1.1 | Display Provider List | 2 | Basic template, loop data |
| 1.2 | Filter by Service Type | 2 | Single filter implementation |
| 1.3 | Filter by Certification | 3 | Additional filter complexity |
| 1.4 | Filter by Location | 2 | Taxonomy filter |
| 1.5 | Multi-Filter Combination | 3 | Complex logic, state management |
| 1.6 | Reset Filters | 1 | Simple reset function |
| 1.7 | Keyword Search | 3 | Elasticlunr integration, indexing |
| 1.8 | Result Count & State Display | 2 | UI feedback, state display |
| **Total** | | **18** | |

### Epic 2: Comparison (10 stories, 26 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 2.1 | Provider Detail Page | 3 | Single provider full page layout |
| 2.2 | View Service Taxonomy | 2 | Service list display |
| 2.3 | View Certifications | 2 | Certification display with links |
| 2.4 | Datacenter Locations | 2 | Geographic display |
| 2.5 | External Links | 2 | Website & attestation links |
| 2.6 | Select Providers for Comparison | 3 | Selection UI, validation (2-4 providers) |
| 2.7 | Comparison Table | 4 | Complex table layout, alignment |
| 2.8 | Certification Matrix | 3 | Matrix comparison view |
| 2.9 | Geographic Coverage | 3 | Map/list comparison |
| 2.10 | Share Comparison URL | 2 | Query param handling, URL generation |
| **Total** | | **26** | |

### Epic 3: Multilingual & Accessibility (10 stories, 20 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 3.1 | Language Switch UI | 2 | Button/selector, localStorage |
| 3.2 | Provider Content FR/EN | 2 | Seed data already bilingual, testing |
| 3.3 | UI Translation | 2 | All strings in both languages |
| 3.4 | Persist Language Preference | 1 | localStorage implementation |
| 3.5 | Keyboard Navigation | 2 | Tab order, focus management |
| 3.6 | Screen Reader Support | 2 | ARIA labels, semantic HTML |
| 3.7 | Color Contrast | 2 | CSS review, audit |
| 3.8 | Skip Navigation Links | 2 | Hidden link, focus management |
| 3.9 | Semantic HTML Structure | 2 | Markup review, refactor if needed |
| 3.10 | Focus Indicators | 3 | CSS :focus-visible styling |
| **Total** | | **20** | |

### Epic 4: Content Generation (7 stories, 19 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 4.1 | Provider Listing Page | 3 | Template, loops, JSON partial |
| 4.2 | Provider Detail Pages | 3 | Dynamic page generation per provider |
| 4.3 | Comparison Pages | 4 | Dynamic URLs, query param handling |
| 4.4 | Certification Explainers | 2 | Static pages with descriptions |
| 4.5 | XML Sitemap | 2 | Zola sitemap generation |
| 4.6 | Hreflang Tags | 2 | Multilingual link structure |
| 4.7 | Performance Optimization | 3 | Benchmarking, optimization |
| **Total** | | **19** | |

### Epic 5: Responsive Design (8 stories, 18 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 5.1 | Mobile Listing (320px+) | 3 | Mobile layout, testing |
| 5.2 | Tablet Listing (768px+) | 3 | Tablet breakpoint |
| 5.3 | Desktop Listing (1024px+) | 2 | Desktop optimization |
| 5.4 | Responsive Comparison Table | 3 | Adaptive table layout |
| 5.5 | Progressive Enhancement | 2 | JS-free functionality |
| 5.6 | Image Optimization | 1 | Responsive images, sizing |
| 5.7 | Layout Shift Prevention (CLS) | 2 | Performance optimization |
| 5.8 | Progressive Content Loading | 2 | Skeleton states if needed |
| **Total** | | **18** | |

### Epic 6: Data Quality & Contribution (10 stories, 23 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 6.1 | Contribution Guidelines | 2 | Markdown documentation |
| 6.2 | YAML Template | 2 | Template file, documentation |
| 6.3 | Schema Validation | 3 | JSON schema creation, validation script |
| 6.4 | Broken Link Detection | 3 | CI check for external links |
| 6.5 | Validate Attestation URLs | 2 | Specific URL validation |
| 6.6 | Prevent Duplicates | 2 | Validation logic |
| 6.7 | Show Validation Feedback | 2 | PR status checks, messaging |
| 6.8 | Error Messages | 2 | Clear, actionable error text |
| 6.9 | Show Published Contribution | 2 | PR notification, link to live page |
| 6.10 | Schema Validation in CI | 3 | Python script, GitHub Actions |
| **Total** | | **23** | |

### Epic 7: Operations & Reliability (11 stories, 23 points)

| Story | Title | Points | Rationale |
|-------|-------|--------|-----------|
| 7.1 | Review PRs with Status | 2 | Status badges, checks visibility |
| 7.2 | Approve/Request Changes | 2 | PR workflow, comments |
| 7.3 | Merge Approved PRs | 2 | Merge automation, deployment trigger |
| 7.4 | Trigger Site Regeneration | 2 | Build trigger post-merge |
| 7.5 | Monitor CI/CD Status | 2 | Dashboard, notifications |
| 7.6 | Rollback Failed Deployments | 2 | Rollback procedure, testing |
| 7.7 | Monitor Uptime & Performance | 2 | Monitoring setup, alerts |
| 7.8 | Security Headers | 2 | Header configuration, validation |
| 7.9 | Supply Chain Security | 2 | Dependency scanning, verification |
| 7.10 | Lighthouse Scores | 2 | Lighthouse CI gates, thresholds |
| 7.11 | axe-core Accessibility Testing | 3 | axe-core integration, automation |
| **Total** | | **23** | |

**Grand Total: 163 story points across 68 stories**

---

## Part 3: Velocity & Timeline Estimation

### Velocity Baselines

**Solo Developer (Assumed Most Common)**
- Week 1 (Sprint 1): 8-10 points (learning curve, setup)
- Weeks 2-3: 10-13 points per week
- Average: 10 points per week
- Rationale: Zola is new, some context switching cost

**Team of 2**
- 15-20 points per week
- Rationale: Better parallelization, pair programming on complex features

**Team of 3+**
- 20-30 points per week
- Rationale: Full parallelization of independent epics

### Timeline Projections

**Solo Developer (10 pt/week average):**
- Sequential work: 163 ÷ 10 = 16.3 weeks ≈ 4 months
- With parallelization: 8-10 weeks (critical path + overlaps)
- **Recommended: 10 weeks with sprint buffer**

**Team of 2 (15 pt/week):**
- Sequential: 163 ÷ 15 = 10.9 weeks ≈ 2.5 months
- With parallelization: 6-7 weeks
- **Recommended: 7 weeks**

**Team of 3 (20 pt/week):**
- Sequential: 163 ÷ 20 = 8.15 weeks
- With parallelization: 5-6 weeks
- **Recommended: 6 weeks**

---

## Part 4: Recommended Sprint Structure (8-10 Weeks)

### Sprint 1: Foundation & Setup (Week 1)
**Goal:** Project initialized, Zola running locally, first build working, 10 providers seeded.

**Capacity:** 16 points | **Velocity Target:** 10-12 points

**Stories:**
- 0.1: Initialize Zola Project (3 pts)
- 0.2: Configure Zola Taxonomies & i18n (3 pts)
- 0.3: GitHub Actions CI/CD Pipeline (5 pts)
- 0.4: Seed Initial Provider Dataset (5 pts)

**Definition of Done:**
- [ ] Zola serves locally with `zola serve`
- [ ] config.toml has all taxonomies and languages configured
- [ ] GitHub Actions workflow builds and deploys automatically
- [ ] 10 providers in content/providers/ with both index.md and index.en.md
- [ ] Site builds without errors
- [ ] GitHub Pages deployment working
- [ ] All code committed with proper messages

**Dependencies:** None (critical path start)

**Outcomes:**
- ✅ Zola project structure ready
- ✅ CI/CD pipeline functional
- ✅ Foundation for all downstream work

---

### Sprint 2: Content Generation & Structure (Weeks 2-3)
**Goal:** Provider pages generating, JSON structure ready, templates established.

**Capacity:** 19 points | **Velocity Target:** 10-13 points

**Stories:**
- 4.1: Generate Provider Listing Page (3 pts)
- 4.2: Generate Provider Detail Pages (3 pts)
- 4.3: Generate Comparison Pages (4 pts)
- 4.4: Generate Certification Explainers (2 pts)
- 4.5: Generate XML Sitemap (2 pts)
- 4.6: Generate Multilingual Links (hreflang) (2 pts)
- 4.7: Optimize Build Performance (3 pts)

**Definition of Done:**
- [ ] Provider listing page displays all 10 providers
- [ ] Each provider has a working detail page
- [ ] Comparison page template working (test with 2-3 providers)
- [ ] Certification explainer pages exist
- [ ] sitemap.xml generates correctly
- [ ] hreflang tags in all pages
- [ ] Build performance meets <5 min for 50 providers
- [ ] providers-json-data.html partial ready for filters
- [ ] All pages accessible via GitHub Pages

**Dependencies:** Sprint 1 complete (Epic 0)

**Outcomes:**
- ✅ HTML structure ready
- ✅ JSON data partial ready for client-side filtering
- ✅ Core templates established
- ✅ Ready for feature implementation

---

### Sprint 3: Provider Discovery (Week 4)
**Goal:** MVP filtering & search complete, provider discovery feature production-ready.

**Capacity:** 18 points | **Velocity Target:** 13-16 points

**Stories:**
- 1.1: Display Complete Provider List (2 pts)
- 1.2: Filter by Service Type (2 pts)
- 1.3: Filter by Certification (3 pts)
- 1.4: Filter by Geographic Location (2 pts)
- 1.5: Multi-Filter Combination (3 pts)
- 1.6: Reset Filters (1 pt)
- 1.7: Keyword Search (3 pts)
- 1.8: Result Count & Filter State (2 pts)

**Definition of Done:**
- [ ] Provider list displays with all 10 providers
- [ ] Each filter type works independently
- [ ] Multi-filter AND logic works correctly
- [ ] Reset button clears all filters
- [ ] Keyword search uses Elasticlunr index
- [ ] Results update in <2 seconds
- [ ] Filter state visible to user (active filters shown)
- [ ] Result count updated dynamically
- [ ] All filters tested with 10 providers

**Dependencies:** Sprint 2 complete (Epic 4)

**Outcomes:**
- ✅ Discovery feature MVP complete
- ✅ Can publish basic version with filtering
- ✅ User can find providers by service/certification/location

**Parallel Work Starts:**
- Epic 6 stories can begin (documentation, templates)
- Epic 3 stories can begin (i18n setup)

---

### Sprint 4: Multilingual & Accessibility Polish (Week 5)
**Goal:** FR/EN switching working, WCAG AA compliant, keyboard navigation working.

**Capacity:** 20 points | **Velocity Target:** 12-14 points

**Stories (Epic 3):**
- 3.1: Language Switch UI (2 pts)
- 3.2: Display All Listings in Both Languages (2 pts)
- 3.3: Translate All UI Elements (2 pts)
- 3.4: Persist Language Preference (1 pt)
- 3.5: Keyboard Navigation (2 pts)
- 3.6: Screen Reader Support (2 pts)
- 3.7: Color Contrast WCAG AA (2 pts)
- 3.8: Skip Navigation Links (2 pts)
- 3.9: Semantic HTML Structure (2 pts)
- 3.10: Focus Indicators (:focus-visible) (3 pts)

**Stories (Epic 5 - Start):**
- 5.1: Mobile Responsive Listing (3 pts)
- 5.2: Tablet Responsive Listing (3 pts)

**Definition of Done:**
- [ ] Language toggle works (FR ↔ EN)
- [ ] All pages available in both languages
- [ ] All UI strings translated (buttons, labels, messages)
- [ ] Language preference saved in localStorage
- [ ] Tab key navigates through all interactive elements
- [ ] Screen reader announces all content correctly
- [ ] All text contrast ratios ≥4.5:1
- [ ] Skip nav link is first focusable element
- [ ] HTML uses semantic elements (`<main>`, `<nav>`, `<footer>`, `<section>`)
- [ ] Focus ring visible and styled
- [ ] Mobile layout (320-767px) works well
- [ ] Tablet layout (768-1023px) works well
- [ ] axe-core audit shows zero critical violations

**Dependencies:** Sprint 3 complete (Epic 1)

**Parallel Work:** Epic 6 (Contribution) continues

**Outcomes:**
- ✅ Bilingual support complete
- ✅ WCAG AA compliance achieved
- ✅ Mobile/tablet layouts ready

---

### Sprint 5: Comparison Feature & Responsive Polish (Weeks 6-7)
**Goal:** Comparison feature complete, all responsive breakpoints working, site feature-complete.

**Capacity:** 26 points (Epic 2) + 10 points (Epic 5) = 36 points | **Velocity Target:** 15-18 points/week

**Stories (Epic 2):**
- 2.1: Display Provider Detail Page (3 pts)
- 2.2: View Unified Service Taxonomy (2 pts)
- 2.3: View Certifications & Verify (2 pts)
- 2.4: View Datacenter Locations (2 pts)
- 2.5: Access Direct Links (2 pts)
- 2.6: Select Providers for Comparison (3 pts)
- 2.7: View Comparison Table (4 pts)
- 2.8: View Certification Matrix (3 pts)
- 2.9: View Geographic Coverage (3 pts)
- 2.10: Share Comparison URL (2 pts)

**Stories (Epic 5 - Continue):**
- 5.3: Desktop Responsive (1024px+) (2 pts)
- 5.4: Responsive Comparison Table (3 pts)
- 5.5: Progressive Enhancement (2 pts)
- 5.6: Image Optimization (1 pt)
- 5.7: Layout Shift Prevention (CLS) (2 pts)

**Definition of Done:**
- [ ] Provider detail page shows all information
- [ ] Services displayed with icons/colors
- [ ] Certifications show with validation links
- [ ] Datacenter locations listed
- [ ] All external links working
- [ ] Can select 2-4 providers for comparison
- [ ] Comparison table displays services in rows, providers in columns
- [ ] Service alignment is accurate
- [ ] Certification matrix shows coverage
- [ ] Geographic coverage comparison visible
- [ ] Comparison URL shareable and reproducible (query params working)
- [ ] Desktop layout optimized (1024px+)
- [ ] Comparison table responsive on mobile
- [ ] Site works without JavaScript (progressive enhancement)
- [ ] Images sized for viewports
- [ ] CLS < 0.1 on all pages
- [ ] Lighthouse scores: Perf >90, Accessibility >95, BP >90, SEO >95

**Dependencies:** Sprint 4 complete (Epic 3)

**Outcomes:**
- ✅ All core user features complete
- ✅ Full responsive design complete
- ✅ Site feature-complete for MVP

**Parallel Work:** Epic 6 (Contribution workflow) continues

---

### Sprint 6: Contribution Workflow & Documentation (Weeks 7-8)
**Goal:** Contribution workflow documented, validation automation in place, maintainers can manage PRs.

**Capacity:** 23 points | **Velocity Target:** 14-16 points

**Stories (Epic 6):**
- 6.1: Provide Contribution Guidelines (2 pts)
- 6.2: Provide YAML Template (2 pts)
- 6.3: Validate Provider YAML Schema (3 pts)
- 6.4: Detect Broken External Links (3 pts)
- 6.5: Validate Certification URLs (2 pts)
- 6.6: Prevent Duplicate Providers (2 pts)
- 6.7: Show Validation Feedback in PR (2 pts)
- 6.8: Provide Clear Error Messages (2 pts)
- 6.9: Show Contributor Published Contribution (2 pts)
- 6.10: Validate Schema in CI (3 pts)

**Definition of Done:**
- [ ] CONTRIBUTING.md created in both FR/EN
- [ ] Guidelines cover new provider + update workflows
- [ ] YAML template provided with examples
- [ ] JSON schema created (schemas/provider.schema.json)
- [ ] Python validation script created (scripts/validate-providers.py)
- [ ] Validation runs on every PR
- [ ] Schema validation errors block PR merge
- [ ] Link validation detects broken external links
- [ ] Certification URLs verified accessible
- [ ] Duplicate provider detection works
- [ ] PR status shows all validation results
- [ ] Error messages are clear and actionable
- [ ] Contributor can see published data on live site
- [ ] Validation script can run locally
- [ ] Contributors can test their data before submitting

**Dependencies:** Sprint 5 complete (Epics 2 & 5)

**Outcomes:**
- ✅ Contribution workflow documented & automated
- ✅ Quality gates in place
- ✅ Maintainers can review PRs confidently

---

### Sprint 7: Operations, CI/CD, & Production Readiness (Weeks 8-9)
**Goal:** Production-ready CI/CD, monitoring, security, performance gates, rollback procedure tested.

**Capacity:** 23 points | **Velocity Target:** 14-16 points

**Stories (Epic 7):**
- 7.1: Review PRs with Validation Status (2 pts)
- 7.2: Approve/Request Changes (2 pts)
- 7.3: Merge Approved PRs (2 pts)
- 7.4: Trigger Site Regeneration (2 pts)
- 7.5: Monitor CI/CD Pipeline Status (2 pts)
- 7.6: Rollback Failed Deployments (2 pts)
- 7.7: Monitor Uptime & Performance Metrics (2 pts)
- 7.8: Ensure Security Headers (2 pts)
- 7.9: Validate Supply Chain Security (2 pts)
- 7.10: Maintain High Lighthouse Scores (2 pts)
- 7.11: Integrate axe-core Accessibility Testing (3 pts)

**Definition of Done:**
- [ ] PR status checks visible before merge
- [ ] All validation passes before merge
- [ ] Merge automatically triggers build
- [ ] Build completes & deploys without manual steps
- [ ] Build failures notify maintainers
- [ ] Can manually rollback to previous deployment
- [ ] Rollback procedure tested & documented
- [ ] GitHub Pages uptime monitored
- [ ] Performance metrics tracked
- [ ] Security headers configured:
  - [ ] Content-Security-Policy
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Strict-Transport-Security (HSTS)
- [ ] No secrets in repository
- [ ] Zola binary integrity verified
- [ ] Lighthouse CI gates enforce:
  - [ ] Performance > 90
  - [ ] Accessibility > 95
  - [ ] Best Practices > 90
  - [ ] SEO > 95
- [ ] axe-core runs on every build
- [ ] Zero critical/serious a11y violations
- [ ] Violations link to documentation
- [ ] Accessibility results tracked over time

**Dependencies:** Sprint 6 complete (Epic 6)

**Outcomes:**
- ✅ Production-ready pipeline
- ✅ Maintainers have confidence in releases
- ✅ Security & reliability gates in place
- ✅ Monitoring & alerting setup
- ✅ MVP complete, production-ready

---

## Part 5: Sprint Cadence & Scheduling

### Calendar (Starting 2026-02-28)

| Sprint | Dates | Week | Epics | Points | Focus |
|--------|-------|------|-------|--------|-------|
| 1 | 2/28-3/6 | Week 1 | 0 | 16 | Foundation |
| 2 | 3/7-3/20 | Weeks 2-3 | 4 | 19 | Structure |
| 3 | 3/21-3/27 | Week 4 | 1 | 18 | Discovery |
| 4 | 3/28-4/3 | Week 5 | 3, 5 | 20 | A11y & Mobile |
| 5 | 4/4-4/17 | Weeks 6-7 | 2, 5 | 26 | Comparison |
| 6 | 4/18-4/24 | Week 7 | 6 | 23 | Contribution |
| 7 | 4/25-5/1 | Weeks 8-9 | 7 | 23 | Operations |
| — | 5/2+ | Week 10+ | — | — | Post-MVP |

**MVP Launch:** End of Week 9 (2026-05-01)

### Definition of Done (Applies to All Sprints)

**Story Level:**
- [ ] Code written with meaningful comments
- [ ] Acceptance criteria all met
- [ ] Self-reviewed for quality
- [ ] Unit/integration tested if applicable
- [ ] No obvious bugs or edge case failures
- [ ] Committed with meaningful commit message

**Sprint Level:**
- [ ] All sprint stories code-complete
- [ ] No blockers remaining
- [ ] Build succeeds without warnings
- [ ] `zola check` passes (no broken links)
- [ ] Deployed to GitHub Pages successfully
- [ ] Accessibility check (axe-core) passes
- [ ] Lighthouse scores meet gates
- [ ] User-visible features tested manually
- [ ] Team reviews & approves sprint work

**Release (MVP):**
- [ ] All 68 stories complete
- [ ] All 66 FRs validated as working
- [ ] All 62 NFRs measured and met
- [ ] 10 providers seeded & searchable
- [ ] Performance targets met:
  - [ ] Page load <1.5s (Lighthouse >90)
  - [ ] Filters <2s
  - [ ] Build <5 min for 50 providers
- [ ] Accessibility target met (RGAA 4 AA, axe-core clean)
- [ ] Security targets met (headers, no secrets)
- [ ] Contribution workflow tested with 3+ real PRs
- [ ] Documentation complete (guides, templates)
- [ ] Rollback procedure tested
- [ ] Post-launch monitoring ready

---

## Part 6: Resource Allocation & Roles

### Solo Developer Model (Recommended for MVP)

**Responsibilities:**
- All coding (templates, CSS, JS, YAML)
- Code review & QA
- Deployment & monitoring
- Documentation

**Time Allocation:**
- 60% coding/building
- 20% testing/QA
- 15% documentation
- 5% operations/troubleshooting

**Weekly Rhythm:**
- Monday: Sprint planning, backlog refinement
- Tue-Thu: Feature implementation
- Friday: Code review, testing, deployment

---

### Team of 2 Model

**Developer 1 (Frontend):**
- Templates (Tera HTML)
- CSS styling
- JavaScript (filter.js, compare.js)
- Responsive design

**Developer 2 (Backend/DevOps):**
- Zola configuration
- CI/CD pipeline
- Content generation
- Performance optimization
- Data validation scripts

**Overlapping:**
- Testing & QA
- Documentation
- Deployment

---

### Team of 3+ Model

**Developer 1 (Frontend):**
- Templates & HTML
- CSS & styling
- Client-side JS

**Developer 2 (Backend):**
- Zola config & content generation
- CI/CD automation
- Performance tuning

**Developer 3 (QA/DevOps):**
- Testing & QA
- Accessibility audit
- Documentation
- Release management
- Monitoring setup

---

## Part 7: Risk Management & Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Zola learning curve | High | Medium | Sprint 0 buffer (Week 1), tutorials before start |
| Build performance regression | Medium | Medium | Benchmark early (Sprint 2), monitor continuously |
| CSS budget overrun | Low | Medium | Measure before merge, use custom properties |
| JS bundle bloat | Low | Medium | Measure (Lighthouse), minimal dependencies |
| i18n routing complexity | Medium | Low | Test FR/EN paths early (Sprint 2) |
| Elasticlunr scaling to 100 providers | Low | Low | Proven library, test with full dataset Sprint 3 |

### Organizational Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Scope creep | High | High | Strict MVP definition, defer Phase 2 features |
| Contributor confusion | Medium | Medium | Clear documentation (Sprint 6), examples |
| Solo dev burnout | Medium | High | Realistic timeline (8-10 weeks), breaks |
| PR review bottleneck | Medium | Medium | Automated validation, clear guidelines |

### Mitigation Strategies

- **Weekly Check-in:** Assess velocity, identify blockers
- **Two-Week Buffer:** Built into 8-10 week timeline for unknowns
- **Automated Quality Gates:** CI catches issues early, reduces manual review
- **Clear Documentation:** Reduces contributor confusion, maintainer support load
- **Parallel Work:** Prevents sequential bottlenecks, keeps momentum

---

## Part 8: Success Criteria & Launch Readiness

### MVP Success Criteria

**Functional (All Stories Complete):**
- ✅ All 68 stories passing acceptance criteria
- ✅ All 66 functional requirements validated
- ✅ 10 providers searchable by service/certification/location
- ✅ Multi-filter AND logic working
- ✅ Search returns results in <2 sec
- ✅ Comparison feature (2-4 providers)
- ✅ Contribution workflow tested with real PRs

**Non-Functional:**
- ✅ Performance: Page load <1.5s (Lighthouse >90)
- ✅ Accessibility: RGAA 4 AA (axe-core zero critical)
- ✅ Build: <5 min for 50 providers
- ✅ Budgets: JS <100KB, CSS <50KB gzipped
- ✅ Uptime: 99.9% via GitHub Pages
- ✅ Security: Headers configured, no secrets in repo

**Quality:**
- ✅ Zero critical bugs in production
- ✅ Contribution workflow documented
- ✅ Rollback procedure tested
- ✅ Monitoring & alerting in place
- ✅ All code documented with meaningful comments

### Launch Readiness Checklist

**Code:**
- [ ] All 68 stories passing AC
- [ ] No failing CI checks
- [ ] `zola check` passes
- [ ] axe-core clean
- [ ] Lighthouse scores acceptable

**Operations:**
- [ ] GitHub Pages deployed & working
- [ ] CI/CD pipeline green
- [ ] Monitoring setup
- [ ] Rollback tested
- [ ] Maintainer trained

**Documentation:**
- [ ] CONTRIBUTING.md complete
- [ ] YAML template provided
- [ ] Architecture documented
- [ ] Deployment procedure documented
- [ ] Troubleshooting guide created

**Data:**
- [ ] 10 providers seeded
- [ ] All FR/EN translations complete
- [ ] All external links verified
- [ ] Schema validation passing

---

## Part 9: Post-MVP & Phase 2 Planning

### Immediate Post-MVP (Week 10+)

- User feedback collection
- Performance optimization
- Bug fixes from real usage
- Contributor feedback incorporation

### Phase 2 Features (Deferred)

**Advanced Search:**
- Multi-tenant model search
- Extended compliance filters
- Provider comparison templates

**Scalability:**
- Separate JSON file if provider count exceeds 200
- Public API (GraphQL or REST)
- Pagination for large result sets

**User Analytics:**
- Search term tracking
- Popular filter combinations
- User engagement metrics

**Maintenance:**
- Provider data freshness checks
- Automated attestation verification
- Broken link monitoring

---

## Summary

**Timeline:** 8-10 weeks for MVP (solo) | 4-6 weeks (team of 2-3)

**Sprints:** 7 focused sprints, each with clear deliverables

**Critical Path:** Epic 0 → Epic 4 → Epic 1 (53 points) with 110 points parallel

**Team:** 1-3 people (solo developer recommended for MVP)

**Launch Target:** Week 10 (2026-05-01)

**Success Criteria:** All stories complete, all FRs validated, all performance gates met

**Risk Level:** Low (proven tech stack, clear requirements, automated gates)

---

**Document Generated:** 2026-02-26  
**Status:** ✅ READY FOR SPRINT 1  
**Next Step:** Begin Sprint 1 (2026-02-28)

