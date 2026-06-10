+++
title = "S3NS (Thales Trusted Cloud)"
slug = "s3ns"
description = "Cloud de confiance français qualifié SecNumCloud 3.2 : S3NS, joint-venture Thales et Google Cloud, pour OIV, secteur public et données très sensibles."

[taxonomies]
services = ["compute", "kubernetes", "object-storage", "database", "iam"]
certifications = ["secnumcloud", "hds"]
countries = ["france"]

[extra]
country = "France"
headquarters = "Paris, France"
website = "https://s3ns.io"
founded = 2022
datacenter_locations = ["Paris", "Île-de-France"]

[extra.certification_links]
secnumcloud = "https://s3ns.io/fr/offres/premi3ns"
hds = "https://s3ns.io/fr/offres/premi3ns"
+++

**S3NS** est la filiale française de Thales dédiée au **Cloud de Confiance**, créée en 2022 en joint-venture avec Google Cloud. S3NS opère la technologie Google Cloud sur une infrastructure **physiquement et logiquement isolée** du cloud mondial Google, sous souveraineté française totale. L'ensemble du personnel est de nationalité française ; chaque mise à jour logicielle passe par un sas de sécurité contrôlé par Thales.

S3NS a obtenu la **qualification SecNumCloud 3.2 de l'ANSSI** — le niveau de confiance le plus élevé de la doctrine « Cloud au Centre » du gouvernement français — pour son offre PREMI3NS. C'est l'une des premières offres basées sur une technologie hyperscaler à atteindre cette qualification.

## Offres

### PREMI3NS — Le Cloud de Confiance qualifié SecNumCloud 3.2

Offre cible : **OIV** (Opérateurs d'Importance Vitale), **ISE** (opérateurs de services essentiels), secteur public, santé, défense, industries stratégiques.

- Infrastructure dédiée avec triple isolation physique (3 datacenters indépendants en France)
- Architecture Zero Trust sur toute la pile
- HSM Thales certifiés ANSSI
- SOC PDIS qualifié
- Chiffrement au repos et en transit

### CRYPT3NS — Contrôle cryptographique souverain

Offre cible : organisations souhaitant une conformité régionale sans qualification SecNumCloud complète.

- EKMS (Electronic Key Management System) opéré par S3NS/Thales
- Clés de chiffrement hébergées hors de l'infrastructure Google
- Disponible sur les régions Google Cloud en France, Belgique et Pays-Bas
- Journalisation centralisée de toutes les demandes de déchiffrement

## Services (PREMI3NS)

| Catégorie            | Service                                                |
| -------------------- | ------------------------------------------------------ |
| **Compute**          | Compute Engine (VMs, GPU Nvidia H100 pour IA/HPC)      |
| **Kubernetes**       | Google Kubernetes Engine (GKE)                         |
| **Stockage objet**   | Cloud Storage (structuré/non structuré, multi-niveaux) |
| **Stockage bloc**    | Persistent Disk                                        |
| **Bases de données** | Cloud SQL (PostgreSQL, MySQL, SQL Server)              |
| **Analytique**       | BigQuery (analytique temps réel)                       |
| **Réseau**           | VPC, Cloud VPN, Cloud Interconnect, Cloud DNS          |
| **IAM & Sécurité**   | Cloud Armor, IAM, HSM Thales, EKMS, Zero Trust         |
| **Messagerie**       | Pub/Sub                                                |

> Le catalogue évolue en continu suivant la roadmap Google Cloud, validée via le processus de staging sécurité Thales.

## Certifications

| Certification                         | PREMI3NS    | CRYPT3NS          |
| ------------------------------------- | ----------- | ----------------- |
| **SecNumCloud 3.2 (ANSSI)**           | ✅ Qualifié | ❌ Hors périmètre |
| **HDS** (Données de Santé)            | ✅ Certifié | ✅ Certifié       |
| **ISO 27001**                         | ✅ Certifié | ✅ Certifié       |
| **ISO 22301** (continuité d'activité) | ✅ Certifié | —                 |
