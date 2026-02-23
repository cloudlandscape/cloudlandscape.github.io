---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['_bmad-output/planning-artifacts/product-brief-cloudlandscape-20260121.md']
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'medium'
  projectContext: 'greenfield'
---

# Product Requirements Document - cloudlandscape

**Author:** nicolas  
**Date:** 2026-02-23  
**Version:** 1.0

## Executive Summary

cloudlandscape is an open, neutral reference platform for discovering cloud providers worldwide, designed to give IT professionals (architects, developers, decision-makers, Ops, SRE) a clear, objective view of the market beyond the dominant AWS/GCP/Azure trio.

**Problem:** Architects seeking cloud alternatives face fragmented discoverability. No centralized, neutral, maintained source exists to objectively compare the global cloud ecosystem. Identifying providers meeting sovereignty, security, or geographic criteria requires hours of scattered research across biased blog posts and inconsistent marketing terminology.

**Solution:** cloudlandscape reveals the complete cloud provider ecosystem—particularly European and international providers offering robust solutions but suffering from critical visibility gaps. The platform provides unified service taxonomy (S3 = Object Storage = Blob Storage), multi-criteria filtering (service type, certifications, geography), and side-by-side provider comparison.

**Differentiator:** Open-source community model with zero commercial conflict of interest, offering neutrality impossible for actors embedded in cloud revenue flows. Sovereignty and certification dimension is central, enabling organizations to make informed choices about data territoriality.

**Target Users:** Primary—Architects discovering compliant providers. Secondary—Students learning cloud ecosystem, Contributors submitting provider data, Provider representatives requesting updates, Maintainers ensuring data quality.

**MVP Scope:** 10 European providers (focus France), basic service taxonomy (Compute, DB, Storage, KaaS, PaaS, CaaS, IAM, API), certification trio (SecNumCloud, HDS, EUCS), static bilingual site (FR/EN), client-side filtering <2 seconds.

## Success Criteria

### User Success

**Primary Metric:** Architects discover compliant cloud providers in <10 minutes (vs 2+ hours manual research)

**Measured by:**
- Task completion time from search initiation to provider short-list
- User confidence level in discovery completeness (survey: "Did you find all relevant providers?")
- Reduction in "am I missing a provider?" anxiety

**Target:** 90%+ of architects complete discovery task in <10 minutes with high confidence

### Business Success

**Primary Metric:** Achieve >20 unique visitors/month within 30 days of MVP launch

**Measured by:**
- Organic search traffic (Google Analytics)
- Referral traffic (community shares, architecture forums)
- Return visitor rate (bookmark adoption)

**Target:** Month 1: 20+ visitors | Month 3: 50+ visitors | Month 6: 100+ visitors

**Growth Model:** Organic SEO + word-of-mouth in architecture communities + contributor network effects

### Technical Success

**Performance Metrics:**
- Client-side filter response <2 seconds (95th percentile)
- Page load <1.5 seconds on 3G
- Lighthouse scores: Performance >90, Accessibility >95, SEO >95

**Quality Metrics:**
- Data accuracy verified via official certification attestation links
- Zero broken links in provider data at publication
- CI/CD validation passes on 100% of PRs before merge

**Sustainability Metrics:**
- Solo maintainer reviews PRs in <15 minutes average
- Full site build completes in <5 minutes
- RGAA 4 AA accessibility compliance maintained

**Measured by:** Lighthouse CI, automated accessibility testing (axe-core), PR review time tracking, build duration monitoring

## User Journeys

### Journey 1: Jérôme l'Architecte ESN - Happy Path

**Opening Scene:**
C'est lundi matin. Jérôme reçoit un appel d'un nouveau client - une startup française dans la santé qui veut héberger une plateforme de téléconsultation. Exigences: **HDS + souveraineté française** + Kubernetes + base de données managée. Budget limité. Le client attend une proposition d'architecture pour jeudi.

Jérôme sait déjà que AWS/GCP/Azure sont exclus à cause du HDS. Il commence ses recherches habituelles: Google, sites d'OVH et Scaleway, demande à ses collègues. Après 2h, il a une liste partielle mais stresse - **"Est-ce que je rate des acteurs pertinents?"**

**Rising Action:**
Un collègue mentionne cloudlandscape. Jérôme tape l'URL. **Premier contact: 10 secondes pour comprendre l'interface.** Il entre ses critères:
- Service: Kubernetes
- Certification: HDS
- Pays: France

**<2 secondes:** Liste filtrée apparaît avec 4 acteurs: Scaleway, OVH, Outscale, Claranet.

**Climax - Moment "aha!":**
Jérôme découvre **Claranet** qu'il ne connaissait pas! Il clique, voit le tableau comparatif des 4 providers avec services alignés (tous ont Kubernetes + DB managée + Object Storage). Il vérifie les certifications - tous HDS + SecNumCloud.

**Total: 8 minutes.** Jérôme a sa short-list exhaustive avec confiance.

**Resolution:**
Jeudi, Jérôme présente 4 options au client avec tableau comparatif des services et certifications. Le client choisit Claranet (meilleur rapport budget/services). Jérôme est **légitime** - il a fait le tour du marché, pas une recommandation par défaut.

**Nouvelle réalité:** Jérôme bookmarque cloudlandscape. Sur son prochain projet, il commence par là. Gain: 95%+ de temps, 100% de confiance.

### Journey 2: Sarah l'Étudiante en DevOps - Learning Path

**Opening Scene:**
Sarah est en Master 2 DevOps. Elle veut monter un lab Kubernetes + CI/CD pour son portfolio GitHub et apprendre "pour de vrai". Elle a utilisé AWS dans ses cours (free tier) mais se demande: **"AWS c'est le seul choix? Comment je compare avec GCP, Azure... et les autres?"**

Elle cherche sur Google "cloud providers comparison" - résultats: articles sponsorisés AWS vs Azure vs GCP. **Frustration:** "Il n'y a vraiment QUE ces 3 là?" Elle sait qu'il existe d'autres acteurs mais impossible de les comparer facilement.

**Rising Action:**
Un prof mentionne cloudlandscape dans un cours sur la souveraineté numérique. Sarah visite le site. **Interface claire en 5 secondes.**

Elle explore par curiosité:
- Filtre: Services = Kubernetes
- **Découvre 8 providers européens** qu'elle ne connaissait pas: OVH, Scaleway, Exoscale, UpCloud...
- Clique sur chacun, voit les services alignés (KaaS, Compute, Storage)

**Climax - Double "aha!":**

**Aha! #1 - Lab reproductible:**
Sarah réalise: "Je peux monter mon lab sur Scaleway (moins cher que AWS pour expérimenter) ET le reproduire sur AWS pour comparer les deux approaches!" Elle découvre que les services sont équivalents mais avec des philosophies différentes.

**Aha! #2 - Carrière:**
En explorant les providers, elle voit les liens vers leurs programmes de certification. Elle découvre que **Scaleway et OVH** proposent des certifications **gratuites** pour étudiants! AWS c'est payant.

Elle décide: Lab principal sur Scaleway (économique + certif gratuite) + duplication partielle sur AWS (pour le CV).

**Resolution:**
2 mois plus tard:
- Lab Kubernetes multi-provider fonctionnel (Scaleway + AWS)
- Certification Scaleway obtenue (gratuite)
- Portfolio GitHub impressionnant avec comparatif des deux plateformes
- **Nouvelle réalité:** Sarah comprend l'écosystème cloud au-delà du trio US. Elle partage cloudlandscape avec ses camarades de promo.

### Journey 3: Marc le Dev Communauté - First Contribution

**Opening Scene:**
Marc est développeur freelance spécialisé infrastructure. Il utilise cloudlandscape depuis 3 mois pour recommander des providers à ses clients. Un jour, un client lui demande d'évaluer **Hetzner Cloud** (provider allemand populaire).

Marc va sur cloudlandscape, cherche "Hetzner" - **rien!** Il vérifie sur le site d'Hetzner: ils ont Kubernetes, Compute, Storage, datacenters EU. **"Pourquoi ils ne sont pas référencés? Ils sont pertinents!"**

**Rising Action:**
Marc voit le lien "Contribute" sur cloudlandscape. Il clique - **guide de contribution** clair en français et anglais:

1. Fork le repo GitHub
2. Ajoute les données du provider dans `providers/hetzner.yaml` (template fourni)
3. Remplis: nom, nationalité, datacenters, services (taxonomie), certifications, lien officiel
4. Soumets une Pull Request

Marc passe **45 minutes** à :
- Rechercher les infos sur le site Hetzner (datacenters, certifications ISO)
- Mapper leurs services à la taxonomie cloudlandscape (Cloud Server = Compute, Object Storage = Object Storage, etc.)
- Remplir le YAML
- Soumettre la PR avec description

**Climax - Moment "aha!":**
**3 jours plus tard:** Marc reçoit une notification GitHub. Nicolas (mainteneur) a reviewé sa PR:
- ✅ Commentaire positif: "Merci Marc! Hetzner est effectivement pertinent"
- ⚠️ Petite correction demandée: Ajout de la certification ISO 27001 manquante
- 🎯 Validation rapide après correction

**PR mergée!** Marc voit Hetzner apparaître sur cloudlandscape le lendemain (site regénéré).

**Resolution:**
Marc est fier - **sa contribution aide des centaines d'architectes!** Il partage sur LinkedIn: "J'ai contribué à @cloudlandscape, l'outil open-source pour découvrir les cloud providers EU."

**Nouvelle réalité:** 
- Marc devient contributeur régulier (met à jour des certifications, ajoute des nouveaux services)
- Gain: Sentiment d'appartenance communautaire + visibilité professionnelle
- 2 mois plus tard, il ajoute **Exoscale** et **UpCloud**

### Journey 4: Lucie de Scaleway - Provider Requesting Inclusion

**Opening Scene:**
Lucie est Product Marketing Manager chez Scaleway. Elle remarque dans Google Analytics une **source de trafic inhabituelle: "cloudlandscape.io"** - 50 visiteurs/mois qui arrivent sur leur page Kubernetes.

Elle visite cloudlandscape. **Surprise:** Scaleway est déjà référencé! Elle voit le tableau comparatif avec OVH, Outscale, Claranet. Les données sont **correctes mais incomplètes** - il manque leur nouvelle certification **EUCS** (obtenue il y a 2 mois) et leur nouveau service **Managed PostgreSQL**.

**Rising Action:**
Lucie pense: **"Si on update nos infos, on pourrait avoir plus de visibilité!"** Elle voit deux options dans le guide:
1. Soumettre une PR elle-même (comme Marc)
2. Contacter le mainteneur pour mise à jour officielle

Elle choisit l'option 2 (plus officiel pour représenter Scaleway). Elle envoie un email à Nicolas avec:
- Certification EUCS (preuve: lien officiel ANSSI)
- Nouveau service Managed PostgreSQL (lien doc)
- Demande: Mise à jour des données Scaleway

**Climax - Moment "aha!":**
Nicolas répond sous **24h:**
"Bonjour Lucie, merci! Parfait timing - EUCS est une certification clé pour cloudlandscape. Je mets à jour sous 48h. Si Scaleway veut maintenir ses données à jour, vous pouvez devenir 'provider maintainer' - accès direct pour updates futures."

Lucie accepte! Elle crée un process interne: **chaque nouvelle certification ou service chez Scaleway = update sur cloudlandscape.**

**Resolution:**
3 mois plus tard:
- Trafic de cloudlandscape vers Scaleway: **x3** (50 → 150 visiteurs/mois)
- Scaleway recommande cloudlandscape dans leur blog: "Trouvez le bon cloud provider européen"
- **Nouvelle réalité:** Scaleway voit cloudlandscape comme un **canal de découvrabilité neutre** - pas de conflit d'intérêt, juste de la visibilité qualifiée

### Journey 5: Nicolas le Mainteneur - Quality Gatekeeper

**Opening Scene:**
C'est samedi matin. Nicolas prend son café et ouvre GitHub. **3 notifications:**
1. PR #47: "Add Linode Cloud" by @dev_enthusiast
2. PR #48: "Update OVH certifications" by @lucie_scaleway  
3. PR #49: "Refactor search filters" by @frontend_wizard

**Rising Action - PR #47 (Nouveau Provider):**

Nicolas clique sur PR #47. Il voit que le contributeur a utilisé le **template YAML** (bon signe!):

```yaml
name: Linode
country: USA
datacenters: [USA, EU, APAC]
services:
  - compute: true
  - kubernetes: true
certifications:
  - ISO27001: "https://linode.com/certifications"
website: "https://linode.com"
```

**Processus de validation (15 minutes):**

1. ✅ **Template respecté** - Structure YAML correcte
2. 🔍 **Vérification des sources:**
   - Clique sur le lien certifications - **404 Error!** ❌
   - Va sur linode.com/trust → trouve la vraie page certifications
   - Vérifie les datacenters (site officiel) - ✅ Correct
   - Vérifie les services - ✅ Kubernetes existe bien
3. 📝 **Review comment:**
   "Merci @dev_enthusiast! Linode est pertinent. Petite correction: le lien certifications est cassé. Utilise https://linode.com/trust à la place. Je merge après correction."

**PR #48 (Update Provider - Fast Track):**

Lucie de Scaleway a soumis une mise à jour de certifications. Nicolas connaît déjà Lucie (provider maintainer vérifiée).

**Processus rapide (5 minutes):**
1. ✅ **Source officielle fournie** - Lien ANSSI pour EUCS
2. ✅ **Cross-check** - Vérifie rapidement sur le site ANSSI que Scaleway a bien l'EUCS
3. ✅ **Merge immédiat** - Pas de friction pour les provider maintainers vérifiés
4. 📝 Comment: "Merged! EUCS est une certification clé pour cloudlandscape. Merci Lucie!"

**PR #49 (Code Architecture - Technical Path):**

Refactoring du système de filtres - c'est du code, pas des données.

**Processus technique (20 minutes):**
1. ✅ **CI/CD automatique** - Les tests passent au vert
2. 🔍 **Code review:**
   - Vérifie la logique de filtrage
   - Teste localement les filtres multi-critères
   - Vérifie la performance (<2s requirement)
3. ✅ **Tests coverage** - 85% coverage maintenu
4. 📝 Review: "Clean refactor! Tests passent, perf OK. Merge!"

**Climax - Moment "aha!":**

Nicolas se rend compte: **3 PRs, 3 types différents, 40 minutes total.** Le processus de validation est **scalable:**
- Providers: Template + vérification sources = rapide
- Provider maintainers vérifiés: Fast track
- Code: CI/CD automatise la validation technique

**Il peut maintenir la qualité SANS que ça devienne un bottleneck!**

**Resolution:**

Dimanche, le site se régénère via CI/CD:
- Linode ajouté (après correction du contributeur)
- Scaleway certifications mises à jour
- Filtres refactorisés et plus performants

**Nouvelle réalité:**
- **3 contributeurs différents** = communauté active ✅
- **Qualité maintenue** via process clair ✅  
- **Temps de validation raisonnable** = soutenable ✅
- Nicolas peut scaler: si 10 PRs/semaine, processus tient la charge

### Journey Requirements Summary

Ces journeys révèlent les capabilities clés nécessaires pour cloudlandscape:

**Capabilities pour Primary Users (Jérôme, Sarah):**
- **Système de filtrage multi-critères** (service/pays/certification) avec réponse <2 secondes
- **Tableau comparatif** des providers sélectionnés avec vue synthétique
- **Alignement des services** via taxonomie unifiée (S3 ≈ Object Storage ≈ Blob Storage)
- **Interface intuitive** compréhensible en 5-10 secondes
- **Liens directs** vers sites providers et pages certifications officielles
- **Bilingue** FR/EN pour accessibilité internationale
- **Performance** - Site réactif, léger, responsive (GreenIT)

**Capabilities pour Contributeurs (Marc, Lucie):**
- **Template YAML standardisé** pour providers avec structure claire
- **Guide de contribution** en FR/EN avec processus pas-à-pas
- **GitHub PR workflow** transparent et documenté
- **Validation feedback** rapide et constructive
- **Fast track** pour provider maintainers vérifiés
- **Visibilité** des contributions (changements visibles après génération)

**Capabilities pour Mainteneur (Nicolas):**
- **Validation automatique** de structure YAML via CI/CD
- **Process de vérification sources** documenté et scalable
- **Tests automatisés** pour changes de code (coverage, performance)
- **Génération automatique du site** via CI/CD après merge
- **Système de provider maintainers** pour fast track des updates officielles
- **Review workflow** efficace (15-20 min par PR provider, 5 min pour maintainers vérifiés)


## Web Application Specific Requirements

### Project-Type Overview
## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP

cloudlandscape follows a lean, problem-solving MVP approach focused on delivering immediate value to the primary user (architects searching for compliant cloud providers). The MVP solves the core problem of fragmented cloud provider discoverability by providing a neutral, centralized reference with essential filtering and comparison capabilities.

**MVP Success Criteria:**
- Architects can discover compliant European providers in <10 minutes (vs 2+ hours manual research)
- Contributors can submit provider data via clear PR workflow
- Site loads and searches perform under performance targets (<2s filtering)
- Organic traffic achieves >20 unique visitors/month within 30 days of launch

**Resource Requirements:**
- 1 developer/maintainer (initial phase)
- Provider data collection: 10-20 hours (10 providers with certification validation)
- SSG setup + CI/CD pipeline: 15-25 hours
- MVP feasible as solo open-source project with community contributions

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

1. **Jérôme (Architect) - Primary User Journey:**
   - Discover cloud providers matching specific criteria (service type, certification, geography)
   - Compare 2-4 providers side-by-side with aligned service taxonomy
   - Access official provider sites and certification documentation
   - Complete discovery task in <10 minutes with confidence

2. **Marc (Contributor) - Essential for Community Growth:**
   - Fork repository and submit provider data via Pull Request
   - Follow clear YAML template and contribution guidelines (bilingual FR/EN)
   - Receive automated CI validation feedback and maintainer review
   - See contribution published within 48-72 hours of PR merge

3. **Nicolas (Maintainer) - Critical for Quality & Scalability:**
   - Review PRs with automated validation support (schema checks, broken links)
   - Maintain data quality through clear validation process
   - Deploy updates automatically via CI/CD pipeline
   - Scale contribution review without becoming bottleneck

**Must-Have Capabilities:**

**Provider Discovery & Filtering:**
- 10 European cloud providers (focus France: Scaleway, OVH, Outscale, Claranet + 6 others)
- Basic service taxonomy: Compute, Database, Storage, Kubernetes (KaaS), Platform (PaaS), Containers (CaaS), Identity/Access Management (IAM), API Gateway
- Certification trio: SecNumCloud, HDS (Hébergeur de Données de Santé), EUCS (EU Cybersecurity Scheme)
- Multi-criteria filtering: Service type AND/OR Certification AND/OR Country/Region
- Client-side search with <2 second response time

**Provider Comparison:**
- Side-by-side comparison of 2-4 providers maximum
- Service alignment view using unified taxonomy (S3 = Object Storage = Blob Storage)
- Certification matrix showing compliance coverage
- Direct links to provider official sites and certification attestation pages

**Contribution Workflow:**
- Fork + Pull Request process documented in contribution guide
- Provider data YAML template with clear field definitions
- CI validation: YAML schema validation, broken link detection, Lighthouse checks
- Contribution guide available in French and English
- Maintainer review process with <48 hour feedback target

**Site Infrastructure:**
- Static Multi-Page Application generated via Static Site Generator
- Bilingual support (French/English) with language selector
- Responsive design (mobile/tablet/desktop breakpoints)
- RGAA 4 Niveau AA accessibility compliance
- SEO optimized (homepage, provider listings, comparison pages)
- CI/CD pipeline: automated build, test, deploy on PR merge
- Edge CDN hosting for global performance

**Explicitly OUT of MVP Scope:**
- Advanced filtering (multi-tenant models, extended compliance frameworks beyond trio)
- Provider maintainer fast-track system (all updates via PR workflow in MVP)
- Usage analytics or visitor tracking (privacy-first approach in MVP)
- User accounts, personalization, or saved searches
- Public API for programmatic data access
- Provider contact forms or inclusion request system
- Community forum, comments, or provider reviews

### Post-MVP Features

**Phase 2: Growth (Post-Launch + 3-6 months)**

**Provider Expansion:**
- Extend coverage to 30-50 cloud providers across Europe
- Add international providers (US hyperscalers for comparison, Asia-Pacific, other regions)
- Include regional/niche providers (edge computing, sovereign cloud specialists)

**Enhanced Taxonomy:**
- Expand service categories: CDN, Monitoring/Observability, Security Services, Networking, DevOps Tools
- Subcategories for complex services (e.g., Database → Relational, NoSQL, Time-Series, Graph)
- Service feature comparison within categories (e.g., Kubernetes: managed control plane, auto-scaling, multi-region)

**Provider Maintainer System:**
- Fast-track updates for verified provider representatives (Lucie journey support)
- Provider-submitted updates with expedited review process
- Provider badges for verified/maintained profiles

**Advanced Filtering & Search:**
- Multi-certification combinations (e.g., SecNumCloud AND HDS AND ISO 27001)
- Compliance framework filtering (GDPR, ISO 27001, SOC 2, PCI-DSS)
- Geographic filtering with datacenter location precision
- Free-text search across provider descriptions and service details

**Provider Contact & Inclusion:**
- Provider inclusion request form with validation workflow
- Contact mechanism for provider updates and corrections
- Automated provider outreach for data validation

**Analytics & Insights:**
- Privacy-respecting usage analytics (aggregate, no personal data)
- Popular search queries and provider visibility metrics
- Keyword ranking tracking for SEO optimization
- Community contribution statistics and leaderboard

**Phase 3: Expansion (12+ months, Vision)**

**Platform & Community Features:**
- Community comments and moderated provider reviews
- Discussion forums for cloud architecture topics
- Provider-submitted case studies and use case examples
- Community-curated "stacks" (provider + service combinations for common scenarios)

**API & Integrations:**
- Public API for programmatic access to provider data
- Terraform/OpenTofu provider registry integration
- CI/CD tool integrations (automated provider selection in pipelines)
- Embeddable widgets for third-party sites

**Enhanced Provider Profiles:**
- Detailed provider profiles with compliance history, incident reports
- Pricing indicators and cost comparison tools (relative, not absolute)
- Service Level Agreement (SLA) comparison
- Support model comparison (community, standard, premium)

**Regional & Vertical Expansion:**
- Global provider coverage (Americas, APAC, Africa, Middle East)
- Vertical-specific views (healthcare, finance, government, education)
- Industry compliance mapping (HIPAA, PCI-DSS, FedRAMP equivalents)

**Personalization & Advanced Tools:**
- User accounts with saved searches and favorites
- Custom comparison sets and shareable comparison URLs
- Certification roadmap tools for architects
- Migration planning tools (current provider → alternative providers)

### Risk Mitigation Strategy

**Technical Risks:**

**Risk: Client-side search performance degradation with growing dataset**
- Mitigation: Implement efficient search indexing (Lunr.js or Fuse.js with optimized index structure), monitor index size growth, implement pagination or lazy loading for large result sets if needed
- Validation: Load test with simulated 50-100 provider dataset to ensure <2 second filter response target holds at scale
- Contingency: If client-side search becomes bottleneck, implement server-side search API in Phase 2

**Risk: Static site generation time increases with content growth**
- Mitigation: Implement incremental builds (only regenerate pages affected by PR changes), optimize build pipeline with caching, monitor build time metrics
- Target: Maintain full site build under 5 minutes through Phase 2 (50 providers)
- Contingency: Migrate to more performant SSG or implement parallel build strategies if build time exceeds 10 minutes

**Risk: YAML data quality and validation gaps**
- Mitigation: Comprehensive CI validation pipeline (JSON Schema validation for YAML structure, broken link detection for external URLs, certification attestation verification), clear PR review checklist for maintainers
- Process: All provider data PRs require passing CI checks AND manual maintainer review before merge
- Quality assurance: Quarterly audit of provider data freshness and accuracy

**Market Risks:**

**Risk: Low initial traffic (20 visitors/month target realistic but fragile)**
- Mitigation: SEO optimization from day 1 (technical SEO, keyword-rich content, structured data markup), targeted outreach to architecture communities (LinkedIn groups, Reddit r/devops, French tech forums), submit to Product Hunt and relevant directories
- Validation: Track organic search traffic, monitor keyword ranking positions, measure referral sources
- Pivot: If organic growth slow, consider targeted content marketing (blog posts, provider comparison guides) to drive inbound traffic

**Risk: Provider data accuracy and freshness decay over time**
- Mitigation: Clear source documentation requirements in YAML (official certification page URLs, last verified date), periodic validation cadence (quarterly review), provider maintainer system to incentivize updates
- Process: Automated alerts for certifications nearing expiration dates, stale data flagging (>12 months since last update)
- Community support: Encourage contributors to submit updates when they notice outdated information

**Risk: Community contribution momentum insufficient for sustainability**
- Mitigation: Low-friction contribution process (clear docs, YAML template, fast feedback), public recognition for contributors (contributor list, GitHub badges), responsive maintainer communication (<48 hour PR feedback)
- Validation: Monitor PR frequency, contributor diversity (not just maintainer updates), time-to-merge metrics
- Growth strategy: After 6 months, recruit co-maintainers from active contributors to reduce single-point-of-failure risk

**Resource Risks:**

**Risk: Solo maintainer bottleneck (Nicolas as single point of failure)**
- Mitigation: Maximize automation (CI/CD validation, deployment, testing), clear contribution guidelines to reduce PR review complexity, lightweight PR review process focused on data validation not code review
- Contingency: Recruit co-maintainer from early contributor community after 3-6 months of operation
- Succession planning: Document all processes, maintain runbooks, ensure project can continue if maintainer unavailable

**Risk: Provider data collection effort for 10 MVP providers is underestimated**
- Mitigation: Start with 5 well-known providers with easily accessible data (Scaleway, OVH, Outscale, Claranet, AWS for comparison), add remaining 5 incrementally post-launch
- Approach: Provider data collection is non-blocking - can launch MVP with 5 providers and grow incrementally
- Community leverage: Encourage contributors to submit their preferred providers after launch

**Risk: Static site generator technology choice delays architecture phase**
- Mitigation: Default to proven, well-documented SSG (Hugo or 11ty recommended for performance and simplicity), architecture phase makes final decision based on team preferences
- Contingency: MVP can launch with any mature SSG - content is portable, migration possible if technology choice proves suboptimal
- De-risk: Technology choice is less critical than data structure and contribution workflow - focus on those first

## Functional Requirements

### Provider Discovery & Search

- **FR1:** Users can view a list of cloud providers
- **FR2:** Users can filter providers by service type (Compute, Database, Storage, Kubernetes, Platform, Containers, IAM, API Gateway)
- **FR3:** Users can filter providers by certification (SecNumCloud, HDS, EUCS)
- **FR4:** Users can filter providers by country or geographic region
- **FR5:** Users can apply multiple filter criteria simultaneously (e.g., Kubernetes AND SecNumCloud AND France)
- **FR6:** Users can reset all filters to view the complete provider list
- **FR7:** Users can perform keyword search across provider names and descriptions
- **FR8:** Users receive filter results in under 2 seconds

### Provider Information Display

- **FR9:** Users can view detailed information for each cloud provider
- **FR10:** Users can view a provider's available services mapped to the unified taxonomy
- **FR11:** Users can view a provider's certifications with attestation status
- **FR12:** Users can view a provider's datacenter locations
- **FR13:** Users can view a provider's country of origin and headquarters
- **FR14:** Users can access direct links to provider official websites
- **FR15:** Users can access direct links to provider certification attestation pages

### Provider Comparison

- **FR16:** Users can select 2-4 providers for side-by-side comparison
- **FR17:** Users can view a comparison table with service alignment (unified taxonomy)
- **FR18:** Users can view a certification coverage matrix in comparison view
- **FR19:** Users can view geographic coverage comparison
- **FR20:** Users can share comparison URLs with others
- **FR21:** Users can export comparison data (future: Phase 2)

### Multilingual Support

- **FR22:** Users can switch between French and English language versions
- **FR23:** All provider listings are available in both French and English
- **FR24:** All UI elements and navigation are translated in both languages
- **FR25:** Users' language preference persists across browsing sessions

### Contribution Workflow

- **FR26:** Contributors can access contribution guidelines in French and English
- **FR27:** Contributors can fork the repository to submit provider data
- **FR28:** Contributors can use a YAML template to structure provider data
- **FR29:** Contributors can submit provider data via Pull Request
- **FR30:** Contributors receive automated validation feedback on their submissions
- **FR31:** Contributors can view validation error messages explaining required corrections
- **FR32:** Contributors can see their contributions published after maintainer approval

### Data Quality & Validation

- **FR33:** System validates provider YAML structure against defined schema
- **FR34:** System detects broken external links in provider data
- **FR35:** System validates certification attestation URLs are accessible
- **FR36:** System prevents duplicate provider entries
- **FR37:** System flags provider data older than 12 months for review (future: Phase 2)

### Maintainer Management

- **FR38:** Maintainers can review Pull Requests with automated validation status
- **FR39:** Maintainers can approve or request changes on provider data submissions
- **FR40:** Maintainers can merge approved Pull Requests
- **FR41:** Maintainers can trigger site regeneration after data updates
- **FR42:** Maintainers can view CI/CD pipeline status for builds and deployments
- **FR43:** Maintainers can rollback to previous deployment if issues are detected

### Content Management

- **FR44:** System generates static site pages from provider YAML data
- **FR45:** System generates homepage with project introduction and value proposition
- **FR46:** System generates individual provider detail pages
- **FR47:** System generates comparison pages with dynamic URLs
- **FR48:** System generates certification explainer pages (SecNumCloud, HDS, EUCS)
- **FR49:** System generates XML sitemap for search engine crawlers
- **FR50:** System generates multilingual page variants with proper hreflang tags

### Accessibility & Usability

- **FR51:** Users can navigate the entire site using keyboard only
- **FR52:** Screen reader users can access all content and functionality
- **FR53:** Users can view content with sufficient color contrast (WCAG 2.1 AA)
- **FR54:** Users can access skip navigation links
- **FR55:** Users can read content structure without CSS styling
- **FR56:** Users receive clear focus indicators on interactive elements

### Responsive Design

- **FR57:** Users can access full functionality on mobile devices (320px+)
- **FR58:** Users can access full functionality on tablet devices (768px+)
- **FR59:** Users can access full functionality on desktop devices (1024px+)
- **FR60:** Users experience consistent functionality across all device sizes
- **FR61:** Users see optimized layouts appropriate for their screen size

### Performance & Optimization

- **FR62:** Users receive initial page load in under 1.5 seconds on 3G
- **FR63:** Users can interact with the page in under 3 seconds (Time to Interactive)
- **FR64:** Users experience no layout shifts during page load (CLS < 0.1)
- **FR65:** Users receive optimized images for their device and viewport
- **FR66:** Users can view content progressively as it loads (no blank page wait)

## Non-Functional Requirements

### Performance

**Page Load Performance:**
- **NFR-P1:** Homepage loads in under 1.5 seconds on 3G connection (as measured by Lighthouse)
- **NFR-P2:** Provider listing pages load in under 2 seconds on 3G connection
- **NFR-P3:** Time to Interactive (TTI) is under 3 seconds on 3G connection
- **NFR-P4:** First Contentful Paint (FCP) occurs in under 1 second

**Search & Filtering Performance:**
- **NFR-P5:** Client-side filter operations complete in under 2 seconds for datasets up to 100 providers
- **NFR-P6:** Multi-criteria filter combinations (service + certification + country) respond in under 2 seconds
- **NFR-P7:** Comparison table generation completes in under 1 second for 2-4 providers

**Asset Optimization:**
- **NFR-P8:** Total page weight remains under 500KB excluding images
- **NFR-P9:** JavaScript bundle size remains under 100KB gzipped
- **NFR-P10:** CSS bundle size remains under 50KB gzipped
- **NFR-P11:** Images are compressed, lazy-loaded, and served in WebP format with fallbacks

**GreenIT Compliance:**
- **NFR-P12:** DOM complexity remains under 1500 nodes per page
- **NFR-P13:** No unnecessary animations or heavy graphics that consume resources
- **NFR-P14:** Client-side search index size remains under 200KB for 50-100 providers

**Performance Monitoring:**
- **NFR-P15:** Lighthouse CI scores maintain: Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 95
- **NFR-P16:** Real User Monitoring (RUM) tracks actual user performance metrics

### Security & Data Integrity

**Data Protection:**
- **NFR-S1:** All provider data sources are validated and documented with official URLs
- **NFR-S2:** All external links are validated for accessibility before publication
- **NFR-S3:** Provider certification attestations are verified against official sources

**Input Validation:**
- **NFR-S4:** All provider YAML submissions are validated against JSON Schema before merge
- **NFR-S5:** Malformed or incomplete provider data is rejected with clear error messages
- **NFR-S6:** Duplicate provider entries are prevented through validation checks

**Transport Security:**
- **NFR-S7:** Site is served over HTTPS with valid SSL/TLS certificate
- **NFR-S8:** Security headers are configured (CSP, X-Frame-Options, X-Content-Type-Options)
- **NFR-S9:** No sensitive data or secrets are committed to repository

**Supply Chain Security:**
- **NFR-S10:** CI/CD pipeline validates all dependencies for known vulnerabilities
- **NFR-S11:** Build process is reproducible and auditable
- **NFR-S12:** Deployment artifacts are integrity-checked before publication

### Scalability & Growth

**Data Volume Scaling:**
- **NFR-SC1:** System supports 10 providers at MVP launch with target to scale to 50-100 providers
- **NFR-SC2:** Filter performance degrades by less than 10% when dataset grows from 10 to 100 providers
- **NFR-SC3:** Search index size scales linearly with provider count (max 4KB per provider)

**Build & Deployment Scaling:**
- **NFR-SC4:** Full site build completes in under 5 minutes for datasets up to 50 providers
- **NFR-SC5:** Incremental builds regenerate only affected pages (not entire site) for provider updates
- **NFR-SC6:** Build time increases by less than 20% when provider count doubles

**Traffic Scaling:**
- **NFR-SC7:** Static CDN architecture supports 100,000+ monthly page views without performance degradation
- **NFR-SC8:** Edge caching ensures consistent performance across geographic regions

### Accessibility

**WCAG 2.1 AA Compliance (RGAA 4 Niveau AA):**
- **NFR-A1:** Color contrast ratio is ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- **NFR-A2:** All images and icons include text alternatives (alt attributes)
- **NFR-A3:** Content structure is readable and navigable without CSS styling
- **NFR-A4:** Full keyboard navigation is supported with no mouse-only interactions

**Operability:**
- **NFR-A5:** Skip navigation links are provided for screen reader users
- **NFR-A6:** Focus indicators are clearly visible on all interactive elements
- **NFR-A7:** No time limits are imposed on user interactions
- **NFR-A8:** Users can pause, stop, or hide any moving or auto-updating content

**Understandability:**
- **NFR-A9:** Navigation is consistent across all pages
- **NFR-A10:** Form labels and error messages are clear and explicit
- **NFR-A11:** Page language is declared in HTML (lang="fr" or lang="en")
- **NFR-A12:** Predictable behavior with no unexpected navigation changes

**Robustness:**
- **NFR-A13:** Valid, semantic HTML5 markup is used throughout
- **NFR-A14:** ARIA landmarks and roles are applied where appropriate
- **NFR-A15:** Content is compatible with assistive technologies (screen readers, magnifiers)
- **NFR-A16:** Progressive enhancement ensures core content works without JavaScript

**Testing & Validation:**
- **NFR-A17:** Automated accessibility testing (axe-core, WAVE) is integrated into CI pipeline
- **NFR-A18:** Manual keyboard navigation testing is performed for all user flows
- **NFR-A19:** Screen reader testing (NVDA, JAWS, VoiceOver) validates accessibility

### Reliability & Availability

**Uptime & Availability:**
- **NFR-R1:** Site availability target is 99.9% uptime (measured monthly)
- **NFR-R2:** Planned maintenance windows are communicated 48 hours in advance
- **NFR-R3:** Emergency fixes can be deployed within 2 hours of issue detection

**Deployment Reliability:**
- **NFR-R4:** Automated deployment process prevents manual errors
- **NFR-R5:** Rollback to previous version completes in under 5 minutes if issues are detected
- **NFR-R6:** Zero-downtime deployments via atomic CDN cache updates

**Data Integrity:**
- **NFR-R7:** Provider data is version-controlled in Git with complete change history
- **NFR-R8:** All data changes are traceable to specific commits and authors
- **NFR-R9:** Backup of provider data is inherent in Git repository distribution

**Error Handling:**
- **NFR-R10:** Broken links in provider data do not prevent site from building (logged as warnings)
- **NFR-R11:** Missing provider data fields fall back to graceful defaults
- **NFR-R12:** Build failures trigger notifications to maintainer with detailed error logs

### Maintainability & Operations

**Code & Configuration Quality:**
- **NFR-M1:** Codebase follows consistent style guide (enforced by linters)
- **NFR-M2:** Provider data schema is documented with examples
- **NFR-M3:** Contribution guidelines are clear and comprehensive (bilingual)

**CI/CD Pipeline:**
- **NFR-M4:** All validation checks run automatically on Pull Requests
- **NFR-M5:** Build and deployment are fully automated with no manual steps
- **NFR-M6:** CI pipeline completes in under 10 minutes from PR merge to deployment

**Operational Burden:**
- **NFR-M7:** Solo maintainer can review and merge provider PRs in under 15 minutes per PR
- **NFR-M8:** Automated validation reduces manual validation effort by 80%+
- **NFR-M9:** Clear runbooks and documentation enable continuity if maintainer is unavailable

**Monitoring & Observability:**
- **NFR-M10:** Build failures are detected and reported immediately via CI
- **NFR-M11:** Deployment status is visible via CI/CD dashboard
- **NFR-M12:** Broken links and validation failures are surfaced in PR checks before merge
