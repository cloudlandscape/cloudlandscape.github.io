# Contributing to Cloud Landscape

🇫🇷 [Version française ci-dessous](#contribuer-à-cloud-landscape)

Thank you for your interest in contributing to Cloud Landscape! This guide will help you add or update cloud provider information.

## Quick Start

1. **Fork** this repository
2. **Add or edit** a provider in `content/providers/`
3. **Submit** a Pull Request
4. **Wait** for automated validation and review

## Adding a New Provider

### Step 1: Create Provider Files

Create a new directory in `content/providers/` with your provider's slug (lowercase, hyphenated):

```bash
mkdir content/providers/my-cloud-provider
```

Create two files for bilingual support:
- `index.md` (French)
- `index.en.md` (English)

### Step 2: Use the Template

Copy the template from [docs/provider-template.yaml](docs/provider-template.yaml) and fill in all required fields.

**Required fields:**
- `title` - Provider name
- `slug` - URL-friendly identifier (lowercase, hyphens)
- `description` - Brief description (150 chars max)
- `taxonomies.services` - List of services (see taxonomy below)
- `taxonomies.countries` - List of countries (lowercase)
- `extra.country` - Country of origin
- `extra.headquarters` - City, Country
- `extra.website` - Official website URL
- `extra.datacenter_locations` - Array of datacenter cities

**Optional fields:**
- `taxonomies.certifications` - SecNumCloud, HDS, EUCS
- `extra.founded` - Year founded
- `extra.certification_links` - URLs to attestation pages

### Step 3: Service Taxonomy

Use these standardized service names:
- `compute` - Virtual machines, bare metal
- `kubernetes` - Managed Kubernetes
- `object-storage` - S3-compatible storage
- `database` - Managed databases
- `paas` - Platform as a Service
- `caas` - Containers as a Service
- `iam` - Identity & Access Management
- `api-gateway` - API management

### Step 4: Example

```yaml
+++
title = "My Cloud Provider"
slug = "my-cloud-provider"
description = "European sovereign cloud provider"

[taxonomies]
services = ["compute", "kubernetes", "object-storage"]
certifications = ["secnumcloud"]
countries = ["france"]

[extra]
country = "France"
headquarters = "Paris, France"
website = "https://www.example.com"
datacenter_locations = ["Paris", "Lyon", "Marseille"]
founded = 2020
+++

Detailed description in French...
```

### Step 5: Submit Pull Request

1. Commit your changes: `git commit -m "Add My Cloud Provider"`
2. Push to your fork: `git push origin main`
3. Open a Pull Request on GitHub
4. Wait for automated validation checks

## Updating an Existing Provider

To update a provider's information:

1. Navigate to `content/providers/[provider-slug]/`
2. Edit `index.md` (French) and/or `index.en.md` (English)
3. Update the relevant fields in the YAML frontmatter
4. Submit a Pull Request with your changes

**Note:** The YAML schema and validation rules are identical for new providers and updates.

## Validation

Your Pull Request will be automatically validated for:

- ✅ Valid YAML structure
- ✅ Required fields present
- ✅ Valid service taxonomy values
- ✅ Accessible website URLs
- ✅ Valid certification attestation links (if provided)
- ✅ No duplicate providers

If validation fails, you'll see clear error messages explaining what to fix.

## Resources

- **Service Taxonomy:** See above list
- **Certifications:** [SecNumCloud](https://www.ssi.gouv.fr/), [HDS](https://esante.gouv.fr/)
- **Country Codes:** Use full country names in lowercase
- **Template:** [docs/provider-template.yaml](docs/provider-template.yaml)

## Questions?

Open an issue or contact the maintainers.

---

# Contribuer à Cloud Landscape

🇬🇧 [English version above](#contributing-to-cloud-landscape)

Merci de votre intérêt pour contribuer à Cloud Landscape ! Ce guide vous aidera à ajouter ou mettre à jour des informations sur les fournisseurs cloud.

## Démarrage Rapide

1. **Fork** ce dépôt
2. **Ajoutez ou modifiez** un fournisseur dans `content/providers/`
3. **Soumettez** une Pull Request
4. **Attendez** la validation automatique et la revue

## Ajouter un Nouveau Fournisseur

### Étape 1: Créer les Fichiers

Créez un nouveau répertoire dans `content/providers/` avec le slug de votre fournisseur (minuscules, tirets) :

```bash
mkdir content/providers/mon-fournisseur-cloud
```

Créez deux fichiers pour le support bilingue :
- `index.md` (Français)
- `index.en.md` (Anglais)

### Étape 2: Utiliser le Template

Copiez le template depuis [docs/provider-template.yaml](docs/provider-template.yaml) et remplissez tous les champs requis.

**Champs requis :**
- `title` - Nom du fournisseur
- `slug` - Identifiant URL (minuscules, tirets)
- `description` - Brève description (150 caractères max)
- `taxonomies.services` - Liste des services (voir taxonomie ci-dessous)
- `taxonomies.countries` - Liste des pays (minuscules)
- `extra.country` - Pays d'origine
- `extra.headquarters` - Ville, Pays
- `extra.website` - URL du site officiel
- `extra.datacenter_locations` - Tableau des villes de datacenters

**Champs optionnels :**
- `taxonomies.certifications` - SecNumCloud, HDS, EUCS
- `extra.founded` - Année de création
- `extra.certification_links` - URLs vers les pages d'attestation

### Étape 3: Taxonomie des Services

Utilisez ces noms de services standardisés :
- `compute` - Machines virtuelles, bare metal
- `kubernetes` - Kubernetes managé
- `object-storage` - Stockage compatible S3
- `database` - Bases de données managées
- `paas` - Platform as a Service
- `caas` - Containers as a Service
- `iam` - Gestion des identités et accès
- `api-gateway` - Gestion d'API

### Étape 4: Exemple

```yaml
+++
title = "Mon Fournisseur Cloud"
slug = "mon-fournisseur-cloud"
description = "Fournisseur cloud souverain européen"

[taxonomies]
services = ["compute", "kubernetes", "object-storage"]
certifications = ["secnumcloud"]
countries = ["france"]

[extra]
country = "France"
headquarters = "Paris, France"
website = "https://www.example.fr"
datacenter_locations = ["Paris", "Lyon", "Marseille"]
founded = 2020
+++

Description détaillée en français...
```

### Étape 5: Soumettre la Pull Request

1. Commitez vos changements : `git commit -m "Ajout Mon Fournisseur Cloud"`
2. Poussez vers votre fork : `git push origin main`
3. Ouvrez une Pull Request sur GitHub
4. Attendez les vérifications automatiques

## Mettre à Jour un Fournisseur Existant

Pour mettre à jour les informations d'un fournisseur :

1. Naviguez vers `content/providers/[slug-fournisseur]/`
2. Modifiez `index.md` (Français) et/ou `index.en.md` (Anglais)
3. Mettez à jour les champs pertinents dans le frontmatter YAML
4. Soumettez une Pull Request avec vos changements

**Note :** Le schéma YAML et les règles de validation sont identiques pour les nouveaux fournisseurs et les mises à jour.

## Validation

Votre Pull Request sera automatiquement validée pour :

- ✅ Structure YAML valide
- ✅ Présence des champs requis
- ✅ Valeurs de taxonomie de service valides
- ✅ URLs de site web accessibles
- ✅ Liens d'attestation de certification valides (si fournis)
- ✅ Pas de fournisseurs en double

En cas d'échec de validation, vous verrez des messages d'erreur clairs expliquant quoi corriger.

## Ressources

- **Taxonomie des Services :** Voir liste ci-dessus
- **Certifications :** [SecNumCloud](https://www.ssi.gouv.fr/), [HDS](https://esante.gouv.fr/)
- **Codes Pays :** Utilisez les noms complets de pays en minuscules
- **Template :** [docs/provider-template.yaml](docs/provider-template.yaml)

## Questions ?

Ouvrez une issue ou contactez les mainteneurs.
