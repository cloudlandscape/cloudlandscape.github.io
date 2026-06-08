+++
title = "Hetzner"
slug = "hetzner"
description = "German hosting provider founded in 1997: cloud VPS, dedicated servers, S3 object storage, load balancers, and private networks. ISO 27001 and C5 (BSI) certified."

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

Hetzner Online GmbH is a German hosting provider founded in **1997** in Gunzenhausen, Bavaria. One of Europe's largest datacenter operators, Hetzner is renowned for its **exceptional price-to-performance ratio** — often 10–12× cheaper than US hyperscalers for equivalent resources, with no surprise egress charges.

## Infrastructure

Hetzner operates **6 sites** worldwide:

| Site               | Country                      |
| ------------------ | ---------------------------- |
| Falkenstein (FSN1) | 🇩🇪 Germany                   |
| Nuremberg (NBG1)   | 🇩🇪 Germany                   |
| Helsinki (HEL1)    | 🇫🇮 Finland                   |
| Hillsboro, Oregon  | 🇺🇸 United States             |
| Ashburn, Virginia  | 🇺🇸 United States             |
| Singapore (SIN1)   | 🇸🇬 Singapore _(opened 2024)_ |

**S3-compatible Object Storage** is available exclusively at European sites (FSN1, NBG1, HEL1).

## Services

- **Compute**: Cloud VMs (Cost Optimized, Regular Performance, General Purpose with dedicated vCPU), bare metal dedicated servers, colocation
- **Object storage**: S3-compatible Object Storage — up to 100 buckets × 100 TB each; server-side encryption, object locking, versioning, pre-signed URLs
- **Block storage**: volumes attached to VMs
- **Managed databases**: managed offering available (MySQL, PostgreSQL)
- **Networking**: private networks (VXLAN), built-in stateful firewalls (included), managed load balancers
- **Web hosting**: shared hosting plans
- **Domains & SSL**: domain name management and certificates

## Certifications

| Certification          | Status                                                      |
| ---------------------- | ----------------------------------------------------------- |
| **ISO/IEC 27001:2022** | ✅ Certified — Nuremberg, Falkenstein, Helsinki datacenters |
| **C5** (German BSI)    | ✅ Certified — cloud.hetzner.com                            |
| **GDPR**               | ✅ Compliant — personal data hosted in the EU by default    |

## Key differentiators

- Transparent pricing with no surprise egress fees
- Hourly or monthly billing
- Native integrations: Terraform, Ansible, Kubernetes, Python and Go SDKs
- One-Click Apps: Docker, WordPress, GitLab, Nextcloud, Grafana, WireGuard…
- 99.9% SLA with credits for breaches
