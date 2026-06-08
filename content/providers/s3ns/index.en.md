+++
title = "Thales Trusted Cloud (S3NS)"
slug = "thales-trusted-cloud"
description = "French SecNumCloud 3.2 qualified trusted cloud: S3NS, a Thales and Google Cloud joint-venture, for critical infrastructure, public sector, and sensitive data."

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

**S3NS** is Thales's French subsidiary dedicated to the **Cloud de Confiance** (Trusted Cloud), created in 2022 as a joint-venture with Google Cloud. S3NS operates Google Cloud technology on infrastructure **physically and logically isolated** from Google's global cloud, under full French sovereignty. All personnel are French nationals; every software update passes through a Thales-controlled security staging process.

S3NS has obtained **ANSSI SecNumCloud 3.2 qualification** — the highest trust level in the French government's "Cloud au Centre" doctrine — for its PREMI3NS offering. It is one of the first offerings based on hyperscaler technology to achieve this qualification.

## Offerings

### PREMI3NS — SecNumCloud 3.2 qualified Trusted Cloud

Target customers: **OIVs** (critical infrastructure operators), **ISEs** (essential service operators), public sector, healthcare, defence, strategic industries.

- Dedicated infrastructure with triple physical isolation (3 independent datacenters in France)
- Zero Trust architecture across the full stack
- ANSSI-certified Thales HSMs
- Qualified PDIS SOC
- Encryption at rest and in transit

### CRYPT3NS — Sovereign cryptographic control

Target customers: organisations seeking regional compliance without full SecNumCloud qualification.

- EKMS (Electronic Key Management System) operated by S3NS/Thales
- Encryption keys hosted outside Google's infrastructure
- Available on Google Cloud regions in France, Belgium, and the Netherlands
- Centralised audit log for all decryption requests

## Services (PREMI3NS)

| Category           | Service                                             |
| ------------------ | --------------------------------------------------- |
| **Compute**        | Compute Engine (VMs, Nvidia H100 GPU for AI/HPC)    |
| **Kubernetes**     | Google Kubernetes Engine (GKE)                      |
| **Object storage** | Cloud Storage (structured/unstructured, multi-tier) |
| **Block storage**  | Persistent Disk                                     |
| **Databases**      | Cloud SQL (PostgreSQL, MySQL, SQL Server)           |
| **Analytics**      | BigQuery (real-time analytics)                      |
| **Networking**     | VPC, Cloud VPN, Cloud Interconnect, Cloud DNS       |
| **IAM & Security** | Cloud Armor, IAM, Thales HSM, EKMS, Zero Trust      |
| **Messaging**      | Pub/Sub                                             |

> The catalogue evolves continuously following the Google Cloud roadmap, validated through Thales's security staging process.

## Certifications

| Certification                       | PREMI3NS     | CRYPT3NS        |
| ----------------------------------- | ------------ | --------------- |
| **SecNumCloud 3.2 (ANSSI)**         | ✅ Qualified | ❌ Out of scope |
| **HDS** (Health Data)               | ✅ Certified | ✅ Certified    |
| **ISO 27001**                       | ✅ Certified | ✅ Certified    |
| **ISO 22301** (business continuity) | ✅ Certified | —               |
