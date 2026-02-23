---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
date: 2026-01-21
author: nicolas
---

# Product Brief: cloudlandscape

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**cloudlandscape** est un référentiel ouvert et neutre des acteurs du cloud mondial, conçu pour donner aux professionnels IT (architectes, développeurs, décideurs, Ops, SRE) une vision claire et objective du marché au-delà du trio dominant AWS/GCP/Azure.

Face à un marché écrasé par trois géants américains et à un contexte géopolitique en mutation rapide, cloudlandscape révèle l'écosystème complet des fournisseurs cloud - particulièrement les acteurs européens et internationaux qui offrent des solutions cohérentes mais souffrent d'un manque critique de visibilité.

L'outil propose plusieurs modes d'exploration (carte interactive, tableaux multi-niveaux, recherche par critères) et s'appuie sur un dictionnaire unifié de services permettant de comparer objectivement les offres malgré les terminologies marketing divergentes. La dimension souveraineté et certification est centrale, permettant aux organisations de faire des choix éclairés sur la territorialité de leurs données.

Modèle open-source et communautaire, cloudlandscape se distingue par son absence totale de conflit d'intérêt commercial, offrant une neutralité impossible pour les acteurs insérés dans les flux de revenus du cloud.

---

## Core Vision

### Problem Statement

Les architectes et décideurs IT cherchant des solutions cloud alternatives aux géants américains se heurtent à un problème de **découvrabilité fragmentée**. Aujourd'hui, identifier des fournisseurs cloud répondant à des critères de souveraineté, sécurité ou géographie nécessite un "detective work" dispersé : recherches Internet multiples, consultation d'articles de blog ponctuels et biaisés, interrogation de pairs, navigation sur des sites d'acteurs utilisant chacun leur propre terminologie.

**Aucune source centralisée, neutre et maintenue n'existe pour comparer objectivement l'écosystème cloud global.**

Les articles de blog se concentrent sur les acteurs les plus visibles pour générer du trafic, comportent des biais d'expérience personnelle, et s'accumulent sans mise à jour. Le CNCF Landscape cartographie l'Open Source, pas les cloud providers. Chaque fournisseur nomme ses services différemment (S3, Object Storage, Blob Storage...), créant une barrière à la comparaison.

### Problem Impact

**Les conséquences sont concrètes et mesurables :**

- **Choix par défaut non-optimaux** : Faute de visibilité sur les alternatives, les projets IT partent sur AWS/GCP/Azure même quand d'autres acteurs répondraient mieux aux besoins
- **Sacrifice de souveraineté** : Les organisations européennes acceptent des risques de souveraineté des données qu'elles pourraient éviter
- **Risques de sécurité et continuité** : Les pannes majeures récentes (AWS, GCP, Azure, Cloudflare) et fermetures de comptes sans recours (Microsoft 365, Apple) ont révélé les dangers de concentration
- **Temps perdu en recherche** : Les architectes consacrent des heures à reconstituer manuellement une vue du marché
- **Opportunités manquées** : Les fournisseurs alternatifs de qualité restent invisibles malgré des offres compétitives

La CNIL elle-même a dû autoriser Azure pour une plateforme de santé publique "car aucune alternative ne permet de répondre à la flexibilité demandée", tout en reconnaissant un "risque fort sur la souveraineté" - aveu symptomatique du problème de visibilité.

### Why Existing Solutions Fall Short

**Conflit d'intérêt structurel** : Tous les acteurs existants (médias tech, cabinets de conseil, marketplaces cloud) sont insérés dans les flux de revenus du cloud. Ils se concentrent sur les acteurs générant le plus de commissions ou de trafic publicitaire. Une comparaison neutre ne peut émerger d'un modèle économique dépendant des fournisseurs comparés.

**Fragmentation et obsolescence** : Les articles et comparatifs existants sont des instantanés ponctuels qui s'empilent sans cohérence. Pas de maintenance, pas de taxonomie commune, pas de vue d'ensemble.

**Absence de normalisation** : Chaque fournisseur invente sa propre terminologie marketing pour des services identiques, rendant la comparaison cognitive extrêmement coûteuse.

**Angle incomplet** : Le CNCF Landscape cartographie l'écosystème Open Source/CNCF, pas le marché des cloud providers avec leurs dimensions géopolitiques et certifications.

### Proposed Solution

**cloudlandscape** est un référentiel open-source et communautaire qui cartographie l'écosystème mondial des fournisseurs cloud avec une neutralité absolue.

**Architecture multi-lecture :**
- **Carte interactive** : Visualisation géographique des acteurs
- **Tableaux multi-niveaux** : Navigation avec zoom progressif sur les services
- **Recherche par critères** : Filtrage par services, pays, certifications, conformité
- **Mode architecture** : Outil basé sur une architecture technique donnée

**Dictionnaire de services unifié** : Une taxonomie normalisée (Compute, Storage, Database, IaaS, PaaS, SaaS, KaaS, CaaS, IAM...) permet de comparer les offres indépendamment des noms marketing. L'utilisateur comprend immédiatement quels services sont en concurrence directe.

**Dimension souveraineté** : Chaque acteur est documenté avec :
- Nationalité de l'entreprise
- Localisation des datacenters
- Certifications (ISO, SOC, HDS, SecNumCloud, RGPD...)
- Cadre juridique applicable

**Modèle communautaire** : Open-source, alimenté par la communauté, sans partenariat commercial ni affiliation. L'objectif est l'exhaustivité et l'exactitude, pas la monétisation.

**Objectif utilisateur** : Permettre à un architecte de passer rapidement de "j'ai besoin de X services avec Y contraintes de souveraineté" à "voici les 3-5 acteurs correspondants, je peux maintenant passer à la conception".

### Key Differentiators

**1. Neutralité absolue** : Aucun modèle économique lié aux fournisseurs. Pas de partenariats, pas de commissions, pas de publicité. L'objectif est d'éclairer, pas de monétiser.

**2. Référentiel de services unifié** : Taxonomie commune qui transcende les terminologies marketing propriétaires, permettant une vraie comparabilité.

**3. Objectivité et communauté** : Modèle open-source où la valeur vient de l'exhaustivité et de la maintenance collective, difficile à répliquer pour un acteur commercial.

**4. Angle souveraineté/géopolitique** : Pas juste une liste technique, mais un outil de **décision stratégique** intégrant nationalité, juridiction, certifications.

**5. Timing parfait** : Le contexte géopolitique actuel (politique US agressive, pannes majeures, fermetures de comptes arbitraires, perte de contrôle des données, mouvements de souveraineté numérique en Europe) crée une urgence et une réceptivité sans précédent pour un tel outil.

**Le moment "aha!"** : Un architecte trouve en quelques minutes les acteurs correspondant précisément à ses critères techniques ET de souveraineté, et peut dire : "Maintenant je peux passer à la conception."

## Success Metrics

### User Success Metrics

**Efficacité de la recherche:**
- **Gain de temps massif:** Réduction du temps de recherche d'acteurs cloud de 3-4 heures actuellement à **<10 minutes** avec cloudlandscape (gain de 95%+)
- **Découverte d'alternatives:** **>70% des utilisateurs découvrent ≥1 acteur** qu'ils ne connaissaient pas auparavant
- **Engagement récurrent:** **>50% de taux de retour dans les 3 mois** - les utilisateurs reviennent sur cloudlandscape pour leurs nouveaux projets

**Moment "aha!" mesurable:**
L'utilisateur trouve en quelques minutes les acteurs correspondant à ses critères (technique + souveraineté) et peut dire: "Maintenant je peux passer à la conception."

**Comportements indicateurs de valeur:**
- Bookmark de l'outil comme référence systématique
- Recommandation à des collègues et sur les réseaux sociaux
- Contribution active à la base de données (modèle communautaire)

### Business Objectives

**Objectifs à 3 mois (Early Traction):**
- **Adoption initiale:** >20 visiteurs uniques/mois
- **Base de données viable:** >20 providers référencés dans la base
- **Dynamique communautaire:** >10 pull requests (contributions code, données, corrections)
- **Validation du concept:** Premiers retours utilisateurs positifs et premiers signaux de bouche-à-oreille

**Objectifs à 12 mois (Market Leadership):**
- **Position de référence:** Devenir **la référence en Europe** pour la découvrabilité et comparaison des acteurs cloud
- **Exhaustivité géographique:** Couverture complète de l'écosystème cloud européen + ~10 acteurs majeurs Asie/Afrique
- **Visibilité établie:** Être cité dans des articles, blogs professionnels, communautés spécialisées (LinkedIn, dev.to, presse tech)
- **Communauté active:** >30 contributions cumulées (mises à jour, nouveaux providers, améliorations)
- **Validation par le marché:** Providers alternatifs demandent activement à être référencés après avoir constaté une augmentation de leur trafic

### Key Performance Indicators

**KPIs d'Adoption (Leading Indicators):**
- Visiteurs uniques mensuels
- Temps moyen de session (cible: moyen - exploration efficace)
- Taux de bounce (cible: <50% - les utilisateurs trouvent ce qu'ils cherchent)
- Pages vues par session (indicateur d'exploration)

**KPIs de Valeur Créée (Outcome Indicators):**
- % d'utilisateurs découvrant ≥1 nouvel acteur (cible: >70%)
- Taux de retour dans les 3 mois (cible: >50%)
- Temps moyen pour obtenir une liste d'acteurs filtrés (cible: <10 minutes)

**KPIs Communautaires (Growth Indicators):**
- Nombre de providers dans la base
  - 3 mois: >20
  - 12 mois: Exhaustivité européenne + ~10 acteurs Asie/Afrique
- Pull requests et contributions
  - 3 mois: >10 PRs
  - 12 mois: >30 contributions cumulées
- Contributeurs uniques actifs

**KPIs d'Impact (Strategic Indicators):**
- Mentions sur réseaux sociaux spécialisés (LinkedIn, dev.to, Hacker News)
- Citations dans articles/blogs professionnels et presse tech
- Inbound requests de providers demandant à être référencés
- Augmentation du trafic constatée par les providers alternatifs référencés

**Indicateur de succès ultime:**
Un architecte commence **systématiquement** ses projets cloud par une vérification sur cloudlandscape, quel que soit le contexte du projet.

## MVP Scope

### Core Features

**Référentiel de Providers & Services (Fondation)**
- **Base de données:** Référencement des 10 providers cloud européens les plus importants (OVH, Scaleway, Outscale, Claranet, etc.)
- **Services catalogués:** Taxonomie de base couvrant les catégories essentielles
  - Compute
  - Databases
  - Object Storage
  - Kubernetes as a Service (KaaS)
  - Platform as a Service (PaaS)
  - Container as a Service (CaaS)
  - Identity & Access Management (IAM)
  - API Management

**Recherche & Filtrage**
- **Recherche par critères:** Filtrage multi-critères permettant de trouver rapidement les providers correspondant aux besoins
  - Par type de service (Compute, Database, etc.)
  - Par pays/localisation
  - Par certifications
- **Interface simple et efficace:** Focus sur l'efficacité - permettre à un utilisateur de trouver ce qu'il cherche en <10 minutes

**Comparaison & Alignement**
- **Tableau comparatif:** Vue comparative des providers sélectionnés avec leurs services
- **Alignement des services concurrents:** Identification des services équivalents malgré les terminologies marketing différentes (ex: S3 ≈ Object Storage ≈ Blob Storage)
- **Récapitulatif par provider:** Vue synthétique de chaque acteur

**Dimension Souveraineté**
- **Nationalité des entreprises:** Pays d'origine clairement identifié
- **Localisation des datacenters:** Géographie des infrastructures
- **Certifications critiques:** Focus sur les 3 certifications essentielles au MVP
  - **SecNumCloud** (certification ANSSI française)
  - **HDS** (Hébergement de Données de Santé)
  - **EUCS** (EU Cybersecurity Certification Scheme)

**Infrastructure & Accessibilité**
- **Site statique bilingue:** Interface disponible en **français et anglais**
- **Liens directs:** Chaque provider avec lien vers son site officiel
- **Performance:** Site léger et rapide, optimisé pour la recherche efficace

**Contribution Communautaire (Process Manuel)**
- **Guide de contribution:** Documentation claire pour aider la communauté à contribuer
- **Process manuel initial:** Contributions validées manuellement pour assurer la qualité
- **GitHub repository:** Code et données ouvertes pour transparence et collaboration

**Version la plus simple qui crée de la valeur:**
Liste de providers + filtres essentiels + liens directs = Permet à Jérôme de passer de "recherche" à "conception" en <10 minutes.

### Out of Scope for MVP

**Fonctionnalités reportées aux versions futures:**

**Visualisation Avancée:**
- ❌ Carte interactive géographique des acteurs
- ❌ Zoom progressif par critères (drill-down multi-niveaux)
- ❌ Graphiques de comparaison avancés

**Outils Avancés:**
- ❌ Outil de conception d'architecture basé sur une stack technique
- ❌ Calculatrice de coûts / comparateur de pricing
- ❌ API publique pour intégration programmatique
- ❌ Alertes automatiques (nouveau service, changement certification)

**Features Communautaires Avancées:**
- ❌ Système de notation/reviews des providers
- ❌ Commentaires et discussions communautaires
- ❌ Profils utilisateurs et préférences sauvegardées

**Taxonomie & Données Enrichies:**
- ❌ Dictionnaire détaillé avec définitions exhaustives de chaque type de service
- ❌ Filtres thématiques avancés (écologie, performance, SLA détaillés)
- ❌ Historique des évolutions des services
- ❌ Certifications additionnelles au-delà du trio critique (ISO, SOC, etc.)

**Couverture Géographique Étendue:**
- ❌ Exhaustivité mondiale dès le MVP (focus Europe d'abord)
- ❌ Providers Asie, Afrique, Amérique Latine (phase 2)

**Multi-langue Avancée:**
- ❌ Langues additionnelles au-delà FR/EN

**Rationale des exclusions:**
Ces fonctionnalités sont intentionnellement reportées pour permettre de **valider le concept core** (découvrabilité + neutralité) avant d'investir dans des features plus complexes. Le MVP doit prouver que le référentiel simple crée déjà une valeur massive.

### MVP Success Criteria

**Critères de validation pour continuer au-delà du MVP:**

**Adoption Initiale (Quantitatif):**
- **>100 visiteurs uniques dans les 3 premiers mois** - Preuve d'intérêt et de découvrabilité
- **Taux de bounce <50%** - Les utilisateurs trouvent ce qu'ils cherchent
- **>5 contributions communautaires** - Validation du modèle open-source

**Validation du Problème (Qualitatif):**
- **Feedbacks utilisateurs positifs** confirmant que cloudlandscape résout le problème de découvrabilité
- **Au moins 3 témoignages** d'architectes/SRE affirmant avoir gagné du temps significatif
- **Partages organiques** sur réseaux sociaux (LinkedIn, dev.to) indiquant le bouche-à-oreille

**Validation Technique (Faisabilité):**
- **Les 10 providers référencés** avec données complètes et à jour
- **Système de filtrage fonctionnel** et rapide (<2 secondes de réponse)
- **Infrastructure stable** sans incidents majeurs

**Signal Marché (Business Model):**
- **Au moins 1 provider alternatif** demande à être ajouté après avoir constaté un impact trafic
- **Mention dans au moins 1 article** de blog tech ou communauté professionnelle
- **Preuve que des décisions d'architecture** ont été influencées par cloudlandscape

**Go/No-Go Decision Point:**
Si ces critères sont atteints dans les 3 premiers mois, cela valide l'hypothèse que cloudlandscape répond à un besoin réel et justifie l'investissement dans les fonctionnalités avancées (carte interactive, outil architecture, expansion géographique).

### Future Vision (2-3 ans)

**Si cloudlandscape est wildly successful, il devient:**

**La Référence Mondiale pour la Découvrabilité Cloud**
- **Coverage globale:** Exhaustivité complète de l'écosystème cloud mondial (Europe, Amérique, Asie, Afrique, Océanie)
- **Standard de l'industrie:** Cloudlandscape devient le "CNCF Landscape du cloud providers" - la référence citée dans tous les projets d'architecture
- **Intégration professionnelle:** Utilisé systématiquement par les architectes cloud dans leur workflow quotidien

**Plateforme Communautaire Active**
- **Centaines de contributeurs actifs** maintenant les données à jour
- **Providers qui demandent activement** à être référencés et maintiennent leurs propres données
- **Communauté engagée** avec discussions, recommendations, retours d'expérience

**Fonctionnalités Avancées**
- **Carte interactive mondiale** avec visualisation géographique des acteurs et datacenters
- **Outil de conception d'architecture:** Permet de définir sa stack et obtenir automatiquement les providers correspondants
- **Comparaison de pricing:** Calculatrice permettant d'estimer les coûts selon les besoins
- **API publique:** Permet l'intégration dans des outils tiers (IDE, plateformes DevOps, etc.)
- **Dictionnaire exhaustif:** Documentation détaillée de chaque type de service avec définitions et use cases

**Impact Mesurable sur le Marché**
- **Démocratisation de la découvrabilité:** Réduction drastique de la barrière à l'entrée pour les providers alternatifs
- **Augmentation de la diversité:** Statistiques montrant une augmentation de l'adoption de providers alternatifs vs. le trio dominant
- **Mouvement de souveraineté numérique:** Cloudlandscape cité comme catalyseur dans les discussions sur la souveraineté des données en Europe et ailleurs
- **Standard éducatif:** Utilisé dans les formations d'architectes cloud et les cursus universitaires

**Écosystème & Intégrations**
- **Intégrations natives:** Plugins pour outils d'architecture (draw.io, Lucidchart, etc.)
- **Data partnerships:** Collaboration avec organismes de certification pour données officielles
- **Recherche académique:** Données cloudlandscape utilisées pour analyses de marché et recherche

**Vision ultime:**
Un architecte, n'importe où dans le monde, ne commence **jamais** un projet cloud sans consulter cloudlandscape. L'outil devient invisible tant il est intégré dans le workflow - comme Google pour la recherche web.
