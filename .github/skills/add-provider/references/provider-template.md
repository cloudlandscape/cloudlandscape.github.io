# Provider Template — Référence complète

Template annoté pour la création d'une fiche provider dans cloudlandscape.
Ce fichier est une référence ; le template TOML source est dans `docs/provider-template.yaml`.

---

## Frontmatter TOML — `index.md` (français)

```toml
+++
# Nom officiel du provider (casse exacte de la marque)
title = "Provider Name"

# Identifiant URL en kebab-case minuscule
slug = "provider-name"

# Description courte en FRANÇAIS — 50 à 200 caractères
description = "Description courte du fournisseur cloud et de sa proposition de valeur principale"

[taxonomies]
# Services réellement proposés — choisir parmi les 8 slugs valides uniquement
services = [
    "compute",        # Machines virtuelles, bare metal
    "kubernetes",     # Kubernetes managé
    "object-storage", # Stockage objet compatible S3
    "database",       # Bases de données managées
    "paas",           # Platform as a Service
    "caas",           # Containers as a Service
    "iam",            # Identity & Access Management
    "api-gateway"     # Gestion d'API et gateway
]

# Certifications détenues — choisir parmi les 3 slugs valides uniquement
# NE PAS inclure si le provider ne détient pas la certification
certifications = [
    "secnumcloud",    # Qualification ANSSI (France)
    "hds",            # Hébergeur de Données de Santé (France)
    "eucs"            # EU Cybersecurity Certification Scheme
]

# Pays de siège social — tableau de chaînes en minuscules
countries = ["france"]

[extra]
# Pays d'origine (casse normale)
country = "France"

# Siège social (Ville, Pays)
headquarters = "Paris, France"

# Site web officiel (HTTPS obligatoire)
website = "https://www.provider-website.com"

# Emplacements des datacenters (au moins 1)
datacenter_locations = ["Paris", "Amsterdam", "Frankfurt"]

# Année de fondation (entier brut, sans guillemets) — optionnel
founded = 2010

# Liens vers les attestations officielles — optionnel
# Les clés doivent être un sous-ensemble strict de taxonomies.certifications
[extra.certification_links]
secnumcloud = "https://cyber.gouv.fr/..."
hds = "https://esante.gouv.fr/..."
+++
```

---

## Frontmatter TOML — `index.en.md` (anglais)

Identique à `index.md` sauf le champ `description` qui doit être en anglais :

```toml
description = "Short description of the cloud provider and their main value proposition"
```

---

## Corps Markdown

### `index.md` — 2 à 4 paragraphes en français

**Paragraphe 1 — Présentation générale**
Activité de l'entreprise, année de fondation, appartenance à un groupe éventuel, positionnement marché.

**Paragraphe 2 — Catalogue de services**
Principaux services cloud proposés, spécificités notables (régions, stack open-source, modèle tarifaire, segments de clientèle).

**Paragraphe 3 — Certifications & conformité** *(si applicable)*
Certifications détenues et ce qu'elles garantissent pour les clients français et européens.

**Paragraphe 4 — Formation / certifications utilisateurs** *(optionnel)*
Programmes de formation ou certifications professionnelles proposées aux clients.

### `index.en.md` — Même structure en anglais

---

## Valeurs de taxonomie valides

### Services (8 slugs)

| Slug | Inclure si le provider propose… |
|------|--------------------------------|
| `compute` | VMs, bare metal, serveurs dédiés |
| `kubernetes` | K8s managé (pas seulement des VMs pour faire tourner K8s) |
| `object-storage` | Stockage objet compatible S3 / blob |
| `database` | DBaaS — SQL, NoSQL, Redis, etc. |
| `paas` | Hébergement applicatif, serverless, fonctions |
| `caas` | Registre de conteneurs, runtime conteneur hébergé |
| `iam` | SSO, LDAP, OAuth2, annuaire cloud |
| `api-gateway` | Gestion d'API, gateway, traffic management |

### Certifications (3 slugs)

| Slug | Registre de vérification |
|------|-------------------------|
| `secnumcloud` | `https://cyber.gouv.fr` |
| `hds` | `https://esante.gouv.fr` |
| `eucs` | `https://www.enisa.europa.eu` |

---

## Contraintes du schéma JSON (`docs/provider-schema.json`)

| Champ | Contrainte |
|-------|----------|
| `title` | 1–100 caractères |
| `slug` | `^[a-z0-9]+(-[a-z0-9]+)*$`, max 50 caractères |
| `description` | 50–200 caractères |
| `services` | min 1 élément, valeurs dans l'enum des 8 slugs |
| `certifications` | valeurs dans l'enum des 3 slugs |
| `countries` | chaînes minuscules |
| `datacenter_locations` | min 1 élément |
| `website` | URI commençant par `https?://` |
| `founded` | entier, 1950–2030 |

---

## Erreurs fréquentes à éviter

| Erreur | Correction |
|--------|----------|
| Utiliser `---` comme délimiteur de frontmatter | Utiliser `+++` (TOML, pas YAML) |
| `countries = ["France"]` | `countries = ["france"]` (minuscules) |
| `founded = "2010"` | `founded = 2010` (entier sans guillemets) |
| Copier la `description` FR dans le fichier EN | Écrire une vraie traduction en anglais |
| Inclure `certification_links.hds` sans `certifications = ["hds"]` | Les clés de `certification_links` doivent être dans `certifications` |
| Inventer un slug service inexistant | Utiliser uniquement les 8 slugs valides |
| `description` de 201 caractères | Raccourcir à 200 caractères maximum |
