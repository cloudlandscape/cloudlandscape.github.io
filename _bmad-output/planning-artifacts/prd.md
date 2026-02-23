---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation']
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
**Date:** 2026-01-30

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
