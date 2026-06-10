+++
title = "Exoscale"
slug = "exoscale"
description = "Cloud européen suisse (groupe A1 Digital), 10 zones dans 6 pays, certifié ISO 27001, SOC 2 Type II, C5 et HDS. Zéro dépendance au droit américain."

[taxonomies]
services = ["compute", "kubernetes", "object-storage", "database", "iam"]
certifications = ["hds"]
countries = ["switzerland"]

[extra]
country = "Switzerland"
headquarters = "Lausanne, Switzerland"
website = "https://www.exoscale.com"
founded = 2011
datacenter_locations = ["Geneva", "Zurich", "Vienna", "Frankfurt", "Munich", "Sofia", "Zagreb"]

[extra.certification_links]
hds = "https://www.exoscale.com/compliance/"
+++

Exoscale (Akenes SA) est un **fournisseur de cloud 100 % européen**, fondé en 2011 en Suisse, filiale du **groupe A1 Digital International** (A1 Telekom Austria Group). Opérant exclusivement en Europe, Exoscale propose une alternative souveraine aux hyperscalers américains, sans exposition au CLOUD Act américain, alignée RGPD par conception.

## Zones géographiques

Exoscale opère **10 zones** dans **6 pays européens** :

| Zone                | Ville             | Pays         |
| ------------------- | ----------------- | ------------ |
| CH-GVA-2            | Genève            | 🇨🇭 Suisse    |
| CH-DK-2             | Zurich (Dietikon) | 🇨🇭 Suisse    |
| AT-VIE-1 / AT-VIE-2 | Vienne            | 🇦🇹 Autriche  |
| DE-FRA-1            | Francfort         | 🇩🇪 Allemagne |
| DE-MUC-1            | Munich            | 🇩🇪 Allemagne |
| BG-SOF-1            | Sofia             | 🇧🇬 Bulgarie  |
| HR-ZAG-1            | Zagreb            | 🇭🇷 Croatie   |

## Services

- **Compute** : instances virtuelles (provisionnement en ~10 secondes), GPU Servers (entraînement IA et inférence), Concrete AI
- **Kubernetes** : Managed Kubernetes SKS (Simple Kubernetes Service, cluster en ~2 minutes)
- **Stockage objet** : Object Storage compatible S3
- **Bases de données** : DBaaS managé — SQL, clé-valeur et bases de données vectorielles
- **Réseau** : VPC, Load Balancers, Private Connectivity, DNS
- **IAM** : Identity & Access Management natif
- **Marketplace** : stacks applicatifs préconfigurés

## Certifications

| Certification          | Statut                                            |
| ---------------------- | ------------------------------------------------- |
| **ISO/IEC 27001:2022** | ✅ Certifié                                       |
| **ISO/IEC 27017**      | ✅ Certifié — contrôles de sécurité cloud         |
| **ISO/IEC 27018**      | ✅ Certifié — protection des données personnelles |
| **SOC 2 Type II**      | ✅ Attesté                                        |
| **C5** (BSI allemand)  | ✅ Certifié                                       |
| **HDS** (France)       | ✅ Certifié — hébergement de données de santé     |
| **CSA STAR**           | ✅ Certifié                                       |
| **TISAX**              | ✅ Certifié (secteur automobile)                  |
| **RGPD / Swiss FDPA**  | ✅ Conformité — exclusivement hébergé en Europe   |
| **SecNumCloud**        | ❌ Non certifié                                   |

## Écosystème open source

Exoscale est entièrement piloté par API, avec des outils open source publics sur GitHub : CLI, provider Terraform, intégrations Kubernetes, SDKs. Zéro vendor lock-in — standards ouverts privilégiés.
