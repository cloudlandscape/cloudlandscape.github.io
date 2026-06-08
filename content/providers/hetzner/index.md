+++
title = "Hetzner"
slug = "hetzner"
description = "Hébergeur allemand fondé en 1997 : cloud VPS, serveurs dédiés, stockage objet S3, load balancers et réseaux privés. Certifié ISO 27001 et C5 (BSI)."

[taxonomies]
services = ["compute", "object-storage", "database"]
certifications = []
countries = ["germany"]

[extra]
country = "Germany"
headquarters = "Gunzenhausen, Germany"
website = "https://www.hetzner.com"
founded = 1997
datacenter_locations = ["Falkenstein", "Nuremberg", "Helsinki", "Hillsboro", "Ashburn", "Singapore"]
+++

Hetzner Online GmbH est un hébergeur allemand fondé en **1997** à Gunzenhausen, Bavière. L'un des plus grands opérateurs de datacenters en Europe, Hetzner est reconnu pour son **excellent rapport qualité-prix** — souvent 10 à 12 fois moins cher que les hyperscalers américains pour des performances équivalentes, sans facturation surprise sur l'egress réseau.

## Infrastructure

Hetzner opère **6 sites** dans le monde :

| Site               | Pays                            |
| ------------------ | ------------------------------- |
| Falkenstein (FSN1) | 🇩🇪 Allemagne                    |
| Nuremberg (NBG1)   | 🇩🇪 Allemagne                    |
| Helsinki (HEL1)    | 🇫🇮 Finlande                     |
| Hillsboro, Oregon  | 🇺🇸 États-Unis                   |
| Ashburn, Virginie  | 🇺🇸 États-Unis                   |
| Singapour (SIN1)   | 🇸🇬 Singapour _(ouverture 2024)_ |

Le **stockage objet S3-compatible** est disponible uniquement sur les sites européens (FSN1, NBG1, HEL1).

## Services

- **Compute** : Cloud VMs (Cost Optimized, Regular Performance, General Purpose à vCPU dédié), serveurs dédiés bare metal, colocation
- **Stockage objet** : Object Storage compatible S3 — jusqu'à 100 buckets × 100 To ; chiffrement côté serveur, verrouillage d'objets, versioning, URL présignées
- **Stockage bloc** : volumes attachés aux VMs
- **Bases de données managées** : offre managée disponible (MySQL, PostgreSQL)
- **Réseau** : réseaux privés (VXLAN), pare-feu intégrés (inclus, stateful), load balancers managés
- **Hébergement web** : plans d'hébergement mutualisé
- **Domaines & SSL** : gestion de noms de domaine et certificats

## Certifications

| Certification          | Statut                                                            |
| ---------------------- | ----------------------------------------------------------------- |
| **ISO/IEC 27001:2022** | ✅ Certifié — datacenters Nuremberg, Falkenstein, Helsinki        |
| **C5** (BSI allemand)  | ✅ Certifié — cloud.hetzner.com                                   |
| **RGPD**               | ✅ Conforme — données personnelles hébergées dans l'UE par défaut |

## Différenciateurs clés

- Tarification transparente sans frais de sortie réseau surprise
- Paiement à l'heure ou au mois
- Intégrations natives : Terraform, Ansible, Kubernetes, SDK Python et Go
- One-Click Apps : Docker, WordPress, GitLab, Nextcloud, Grafana, WireGuard…
- SLA 99,9 % avec crédits en cas de dépassement
