---
name: add-provider
description: >
  Créer la fiche d'un nouveau fournisseur cloud dans le répertoire cloudlandscape.
  Utiliser ce skill quand l'utilisateur fournit l'URL d'un site commercial cloud et
  demande de générer la fiche du provider, d'ajouter un fournisseur à l'annuaire,
  de remplir le template provider, ou mentionne un opérateur cloud européen à
  référencer. Déclencher aussi si l'utilisateur donne une URL et dit « ajoute ce
  provider », « crée la fiche », « génère index.md et index.en.md » ou équivalent.
  Ce skill scrape le site, mappe les services et certifications aux taxonomies du
  projet, et génère les deux fichiers TOML+Markdown bilingues prêts à être écrits
  dans content/providers/{slug}/.
---

# Add Provider

Skill pour créer les fiches bilingues d'un fournisseur cloud dans cloudlandscape.

**Entrée :** une URI de site commercial (ex. `https://www.scaleway.com`)  
**Sortie :** deux fichiers prêts à écrire dans `content/providers/{slug}/` :
- `index.md` — fiche en **français**
- `index.en.md` — fiche en **anglais**

---

## Étape 1 — Recherche web

### 1.1 Scraper le site du fournisseur

Fetcher les pages dans l'ordre suivant. S'arrêter dès que tous les champs requis (§ Étape 2) sont couverts.

| Priorité | Chemins à essayer |
|----------|------------------|
| Haute    | `/`, `/about`, `/company`, `/en`, `/fr` |
| Moyenne  | `/products`, `/services`, `/cloud`, `/solutions`, `/platform` |
| Moyenne  | `/certifications`, `/compliance`, `/trust`, `/security`, `/legal` |
| Basse    | `/pricing`, `/datacenters`, `/infrastructure`, `/careers` |

Si `fetch` est bloqué (403, redirect, JS-only), essayer `browser/open` + `browser/snapshot -i`.

### 1.2 Vérifier les certifications dans les registres officiels

**Ne jamais inclure une certification sans la vérifier ici.** Chercher le nom du provider dans chaque registre pertinent.

| Certification | Registre officiel |
|---------------|------------------|
| `secnumcloud` | `https://cyber.gouv.fr` — rechercher le nom du provider + « SecNumCloud » |
| `hds`         | `https://esante.gouv.fr` — liste des organismes certifiés HDS |
| `eucs`        | `https://www.enisa.europa.eu` — liste EUCS candidates / certifiées |

> **Note :** `ssi.gouv.fr` redirige désormais vers `cyber.gouv.fr`. Toujours utiliser le nouveau domaine dans `certification_links`.

---

## Étape 2 — Extraire les données du provider

Construire un enregistrement depuis le contenu scrappé. Les champs **requis** doivent avoir une valeur réelle avant de générer les fichiers ; les champs optionnels ne sont inclus que s'ils sont trouvés.

| Champ | Type | Requis ? | Contrainte | Notes |
|-------|------|----------|-----------|-------|
| `title` | string | oui | 1–100 car. | Nom de marque officiel, casse exacte (ex. `OVHcloud`, `3DS Outscale`) |
| `slug` | string | oui | `^[a-z0-9]+(-[a-z0-9]+)*$`, max 50 | kebab-case dérivé du nom |
| `description` (FR) | string | oui | 50–200 car. | Proposition de valeur en français |
| `description` (EN) | string | oui | 50–200 car. | Proposition de valeur en anglais — **traduction distincte, pas une copie** |
| `country` | string | oui | casse normale | Pays d'immatriculation (ex. `France`, `Germany`) |
| `headquarters` | string | oui | `Ville, Pays` | ex. `Paris, France` |
| `website` | string | oui | commence par `https://` | URL canonique de la page d'accueil |
| `datacenter_locations` | tableau | oui | min 1 élément, pas de doublons | Noms de villes ou régions |
| `founded` | entier | non | 1950–2030, sans guillemets | Année de fondation ; omettre si inconnu |
| `services` | tableau | oui | min 1, slugs valides uniquement (§ Étape 3) | Seulement les services réellement proposés |
| `certifications` | tableau | non | slugs valides uniquement (§ Étape 4) | Seulement les certifications réellement détenues |
| `certification_links` | objet | non | valeurs URI | URLs directes vers les attestations officielles |

---

## Étape 3 — Mapper les services vers la taxonomie

**N'inclure que les slugs des services que le provider propose réellement.** Ne pas déduire depuis du texte marketing générique.

| Slug | Inclure si le provider propose… |
|------|--------------------------------|
| `compute` | Machines virtuelles (VMs), bare metal, serveurs dédiés |
| `kubernetes` | Service Kubernetes managé (K8s-as-a-Service) |
| `object-storage` | Stockage objet compatible S3, blob storage |
| `database` | Bases de données managées (SQL, NoSQL, Redis, etc.) |
| `paas` | Platform-as-a-Service — hébergement applicatif, fonctions serverless, environnements d'exécution |
| `caas` | Containers-as-a-Service — registre de conteneurs, runtime conteneur hébergé (distinct du K8s managé) |
| `iam` | Identity & Access Management — SSO, LDAP, OAuth2, annuaire d'entreprise |
| `api-gateway` | Gestion d'API, gateway, gestion du trafic, rate limiting |

> Ces huit slugs sont déclarés dans `zola.toml` et appliqués par `docs/provider-schema.json`. **Ne jamais inventer de nouveaux slugs.**

---

## Étape 4 — Mapper les certifications vers la taxonomie

**Vérifier chaque certification dans le registre officiel avant de l'inclure.**

| Slug | Nom complet | Émetteur | Vérification |
|------|-------------|----------|-------------|
| `secnumcloud` | Qualification SecNumCloud | ANSSI (France) | Chercher le nom du provider sur `cyber.gouv.fr` |
| `hds` | Hébergeur de Données de Santé | ANS / Ministère de la Santé | Chercher le nom du provider sur `esante.gouv.fr` |
| `eucs` | EU Cybersecurity Certification Scheme | ENISA (UE) | Chercher sur le site ENISA ou les communiqués officiels |

Règles supplémentaires :
- Si non trouvé dans le registre officiel → **ne pas inclure** le slug ; le signaler dans la sortie comme non vérifié.
- Les clés de `[extra.certification_links]` doivent être un **sous-ensemble strict** des slugs dans `taxonomies.certifications`. Ne jamais ajouter un lien pour une certification absente du tableau taxonomie.

---

## Étape 5 — Générer les deux fichiers

### Règles du frontmatter TOML (critiques)

- Les délimiteurs de frontmatter sont `+++` (TOML). **Ne jamais utiliser `---` (YAML).**
- `description` : 50–200 caractères (contrainte du schéma JSON — `mise run validate` échouera sinon).
- `slug` : doit correspondre à `^[a-z0-9]+(-[a-z0-9]+)*$`.
- `countries` : tableau de chaînes en **minuscules**, ex. `["france"]`, jamais `["France"]`.
- `datacenter_locations` : minimum 1 élément, pas de doublons.
- `founded` : entier brut, **sans guillemets**.
- Les deux fichiers partagent des valeurs de frontmatter **identiques**, sauf `description` (spécifique à la langue).
- `[extra.certification_links]` est une sous-table TOML ; ne l'inclure que si au moins un lien existe.

### Corps Markdown — `index.md` (français)

Rédiger **2 à 4 paragraphes en français**, dans cet ordre :

1. **Présentation générale** — activité de l'entreprise, année de fondation, appartenance à un groupe.
2. **Catalogue de services** — principaux services cloud, spécificités notables (régions, stack open-source, modèle tarifaire).
3. **Certifications & conformité** — certifications détenues et ce qu'elles garantissent. Omettre ce paragraphe si aucune certification n'est confirmée.
4. **Formation / certifications utilisateurs** *(optionnel)* — seulement si le provider propose des programmes de formation ou des certifications professionnelles à ses clients.

Ton : factuel, neutre, encyclopédique. Pas de superlatifs marketing.

### Corps Markdown — `index.en.md` (anglais)

Même structure, rédigée en **anglais**. Le champ `description` doit aussi être en anglais.

---

## Étape 6 — Format de sortie

Présenter la sortie avec exactement cette structure :

```
### Chemins cibles
- content/providers/{slug}/index.md
- content/providers/{slug}/index.en.md

### index.md
+++
(frontmatter TOML complet)
+++

(corps Markdown en français)

---

### index.en.md
+++
(frontmatter TOML complet avec description en anglais)
+++

(corps Markdown en anglais)

---

### Champs non vérifiés ou manquants
- Lister tout champ non confirmé avec la raison.
  Exemple : `certifications.hds` — aucune entrée trouvée sur esante.gouv.fr pour ce provider ;
  exclu jusqu'à vérification manuelle.

### Étape suivante
Exécuter : mise run validate
```

---

## Exemple de sortie correcte

### `index.md` (français)

```
+++
title = "Scaleway"
slug = "scaleway"
description = "Fournisseur cloud français proposant des solutions d'infrastructure cloud souveraine"

[taxonomies]
services = ["compute", "kubernetes", "object-storage", "database", "paas", "caas"]
certifications = ["secnumcloud", "hds"]
countries = ["france"]

[extra]
country = "France"
headquarters = "Paris, France"
website = "https://www.scaleway.com"
datacenter_locations = ["Paris", "Amsterdam", "Warsaw"]
founded = 1999

[extra.certification_links]
secnumcloud = "https://cyber.gouv.fr/enjeux-technologiques/cloud/"
hds = "https://esante.gouv.fr/produits-services/hds"
+++

Scaleway est un acteur majeur du cloud français, filiale du groupe Iliad. Fondée en 1999, la
société propose une gamme complète de services cloud incluant des instances compute, du stockage
objet S3-compatible, des clusters Kubernetes managés et des bases de données managées.

Avec ses datacenters situés en France, aux Pays-Bas et en Pologne, Scaleway offre une alternative
souveraine aux hyperscalers américains. La plateforme inclut également des services PaaS et CaaS,
un registre de conteneurs, des fonctions serverless et une API cohérente.

Qualifiée SecNumCloud par l'ANSSI et certifiée HDS, Scaleway répond aux exigences de sécurité
les plus strictes pour les administrations françaises et les acteurs du secteur de la santé.
```

### `index.en.md` (anglais)

```
+++
title = "Scaleway"
slug = "scaleway"
description = "French cloud provider offering sovereign cloud infrastructure solutions across Europe"

[taxonomies]
services = ["compute", "kubernetes", "object-storage", "database", "paas", "caas"]
certifications = ["secnumcloud", "hds"]
countries = ["france"]

[extra]
country = "France"
headquarters = "Paris, France"
website = "https://www.scaleway.com"
datacenter_locations = ["Paris", "Amsterdam", "Warsaw"]
founded = 1999

[extra.certification_links]
secnumcloud = "https://cyber.gouv.fr/enjeux-technologiques/cloud/"
hds = "https://esante.gouv.fr/produits-services/hds"
+++

Scaleway is a major French cloud provider and a subsidiary of the Iliad group. Founded in 1999,
the company offers a complete range of cloud services including compute instances, S3-compatible
object storage, managed Kubernetes clusters, and managed databases.

With datacenters located in France, the Netherlands, and Poland, Scaleway provides a sovereign
alternative to American hyperscalers. The platform also includes PaaS and CaaS services, a
container registry, serverless functions, and a consistent API.

Holding the SecNumCloud qualification from ANSSI and the HDS certification, Scaleway meets the
strictest security requirements for French government organisations and healthcare providers.
```

---

## Checklist de validation

Vérifier chaque point avant de présenter la sortie :

- [ ] `slug` correspond à `^[a-z0-9]+(-[a-z0-9]+)*$` (lettres minuscules, chiffres, tirets ; pas de tiret en début ou fin)
- [ ] `description` entre **50 et 200 caractères** dans les deux fichiers
- [ ] Les deux `description` sont **différentes** (vraies traductions FR et EN)
- [ ] Les délimiteurs de frontmatter sont `+++`, pas `---`
- [ ] Seulement des slugs `services` valides : `compute`, `kubernetes`, `object-storage`, `database`, `paas`, `caas`, `iam`, `api-gateway`
- [ ] Seulement des slugs `certifications` valides : `secnumcloud`, `hds`, `eucs`
- [ ] Chaque certification a été **vérifiée dans son registre officiel** avant inclusion
- [ ] Les clés de `[extra.certification_links]` sont un sous-ensemble strict de `taxonomies.certifications`
- [ ] Les valeurs de `countries` sont en **minuscules** (`"france"`, pas `"France"`)
- [ ] `datacenter_locations` contient **au moins un** élément
- [ ] `website` commence par `https://`
- [ ] `founded` est un **entier brut** (sans guillemets) entre 1950 et 2030, ou le champ est omis
- [ ] Le corps de `index.md` est entièrement rédigé en **français**
- [ ] Le corps de `index.en.md` est entièrement rédigé en **anglais**
- [ ] Corps de 2 à 4 paragraphes ; ton factuel et neutre ; aucun superlatif marketing
- [ ] `mise run validate` termine avec le code 0

---

## Références

- `references/provider-template.md` — Template annoté complet avec toutes les valeurs valides
- `docs/provider-schema.json` — Schéma JSON appliqué par `mise run validate`
- `zola.toml` — Déclaration des taxonomies (`services`, `certifications`, `countries`)
