---
name: lighthouse-ci-reader
description: >
  Lire, analyser et traiter les rapports d'analyse Lighthouse CI (fichiers .json générés par
  https://github.com/GoogleChrome/lighthouse-ci). Utiliser ce skill dès que l'utilisateur
  mentionne un rapport Lighthouse, un fichier lhr.json, un résultat LHCI, des scores de
  performance/accessibilité/SEO web, des Core Web Vitals, ou demande d'améliorer les résultats
  d'un audit web automatisé. Déclencher aussi si l'utilisateur colle du JSON Lighthouse dans
  le chat ou évoque des métriques comme LCP, CLS, INP, TBT, FCP, TTI, ou des audits échoués.
---

# Lighthouse CI Reader

Skill pour lire et traiter les rapports Lighthouse CI (LHR — Lighthouse Result objects).

## Formats de rapports supportés

| Format | Description |
|--------|-------------|
| `lhr-*.json` | Rapport brut généré par `lhci collect` |
| `manifest.json` | Index LHCI listant plusieurs runs |
| JSON collé directement dans le chat | LHR complet ou partiel |
| HTML Lighthouse | Extraire le JSON embarqué (voir Étape 1, Cas 4) |

---

## Étape 1 — Récupérer le rapport

### Cas 1 : Fichier uploadé ou path fourni
```bash
cat <path>/lhr-*.json | python3 -c "
import json, sys
lhr = json.load(sys.stdin)
print(json.dumps(lhr, indent=2))
"
```

### Cas 2 : Répertoire `.lighthouseci/`
Lighthouse CI stocke ses rapports dans `.lighthouseci/` par défaut.
```bash
ls .lighthouseci/
# Chercher les fichiers lhr-*.json
```

### Cas 3 : JSON collé dans le chat
Traiter directement le JSON fourni.

### Cas 4 : Rapport HTML Lighthouse
Le JSON est embarqué dans le HTML sous forme de variable JS.
```bash
python3 - <<'EOF'
import re, json

with open("report.html", "r", encoding="utf-8") as f:
    html = f.read()

# Lighthouse embarque le LHR dans window.__LIGHTHOUSE_JSON__ ou window.__LIGHTHOUSE_REPORT__
match = re.search(r'window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.*?\});\s*</script>', html, re.DOTALL)
if not match:
    match = re.search(r'window\.__LIGHTHOUSE_REPORT__\s*=\s*(\{.*?\});\s*</script>', html, re.DOTALL)

if match:
    lhr = json.loads(match.group(1))
    with open("extracted-lhr.json", "w") as out:
        json.dump(lhr, out, indent=2)
    print("LHR extrait dans extracted-lhr.json")
else:
    print("JSON non trouvé dans le HTML — vérifier le format du rapport")
EOF
```

---

## Étape 2 — Parser le LHR

Structure clé du LHR :

```
lhr
├── finalUrl              # URL auditée
├── fetchTime             # Timestamp ISO-8601
├── lighthouseVersion     # Ex: "11.x"
├── configSettings
│   ├── formFactor        # "mobile" | "desktop"
│   └── throttlingMethod  # "simulate" | "devtools" | "provided"
├── categories            # Scores par catégorie (0–1)
│   ├── performance       { score, auditRefs }
│   ├── accessibility     { score, auditRefs }
│   ├── best-practices    { score, auditRefs }
│   ├── seo               { score, auditRefs }
│   └── pwa               { score, auditRefs }  (optionnel)
└── audits                # Résultats détaillés de chaque audit
    └── <audit-id>
        ├── score         # null | 0–1
        ├── scoreDisplayMode  # binary | numeric | informative | notApplicable | error
        ├── displayValue  # Valeur lisible
        ├── numericValue  # Valeur brute (ms, bytes, etc.)
        ├── explanation   # Raison de l'échec
        ├── warnings      # Avertissements
        └── details       # Tableau/liste d'éléments à corriger
```

**Score → Couleur :**
- `0.9–1.0` = ✅ Bon
- `0.5–0.89` = ⚠️ À améliorer
- `0–0.49` = ❌ Mauvais
- `null` = ℹ️ Informatif / non applicable

---

## Étape 3 — Résumer les scores de catégories

Toujours afficher le contexte d'audit. Les scores mobile et desktop ne sont pas comparables.
Extraire `configSettings.formFactor` et `configSettings.throttlingMethod` depuis le LHR.

```
URL      : https://example.com
Date     : 2024-01-15T10:30:00Z
Appareil : Mobile (simulation throttling)

CATÉGORIE          SCORE   STATUT
Performance        72      ⚠️
Accessibility      94      ✅
Best Practices     83      ⚠️
SEO                91      ✅
PWA                —       N/A
```

---

## Étape 4 — Identifier les problèmes prioritaires

### Script d'extraction des problèmes avec catégorisation

```python
import json

def extract_issues(lhr_path):
    with open(lhr_path) as f:
        lhr = json.load(f)

    issues = []
    for audit_id, audit in lhr['audits'].items():
        score = audit.get('score')
        mode = audit.get('scoreDisplayMode')

        # Ignorer les audits non notés
        if mode in ('informative', 'notApplicable', 'manual') or score is None:
            continue

        if score < 0.9:
            # Catégoriser par niveau de criticité
            if score == 0 and mode == 'binary':
                priority = 'critical'
            elif score < 0.5:
                priority = 'major'
            else:
                priority = 'minor'

            issues.append({
                'id': audit_id,
                'title': audit.get('title', ''),
                'score': score,
                'priority': priority,
                'displayValue': audit.get('displayValue', ''),
                'explanation': audit.get('explanation', ''),
                'details': audit.get('details', {}),
            })

    # Trier : critical → major → minor, puis par score croissant
    priority_order = {'critical': 0, 'major': 1, 'minor': 2}
    issues.sort(key=lambda x: (priority_order[x['priority']], x['score'] or 0))
    return issues
```

### Niveaux de priorité

| Niveau | Critère |
|--------|---------|
| 🔴 Critique | `score == 0` + `scoreDisplayMode == "binary"` |
| 🟠 Majeur | `score < 0.5` |
| 🟡 Mineur | `0.5 ≤ score < 0.9` |

---

## Étape 5 — Présenter les résultats

Pour chaque problème identifié :

```
❌ [titre de l'audit]
   Score : 0.0  |  Valeur : <displayValue>
   Problème : <explanation>
   → Recommandation : <voir references/audits-guide.md>

   Éléments concernés (si details.items exist) :
   - url ou element
   - impact estimé
```

Regrouper par catégorie :
1. **Performance** (LCP, INP, CLS, TBT, FCP, TTI, Speed Index)
2. **Accessibilité** (contraste, aria, sémantique)
3. **Best Practices** (HTTPS, console errors, dépréciations)
4. **SEO** (meta, liens, crawlabilité)

---

## Étape 6 — Générer un plan d'action

```markdown
## Plan d'action — [URL] — [date]

### 🔴 Actions critiques (score == 0, binary)
1. ...

### 🟠 Problèmes majeurs (score < 0.5)
1. ...

### 🟡 Améliorations recommandées (score 0.5–0.89)
1. ...
```

Chaque action doit inclure : le problème, la correction, l'impact estimé sur le score.

---

## Comparer plusieurs runs

> ⚠️ Ne jamais comparer un rapport mobile et un rapport desktop. Vérifier `configSettings.formFactor` avant toute comparaison.

```python
import json

def compare_runs(path_before, path_after):
    with open(path_before) as f:
        before = json.load(f)
    with open(path_after) as f:
        after = json.load(f)

    # Vérifier la cohérence des appareils
    form_before = before.get('configSettings', {}).get('formFactor', 'unknown')
    form_after = after.get('configSettings', {}).get('formFactor', 'unknown')
    if form_before != form_after:
        print(f"⚠️  Comparaison {form_before} vs {form_after} — résultats non comparables")

    results = []
    for cat_id, cat_before in before.get('categories', {}).items():
        cat_after = after.get('categories', {}).get(cat_id)
        if not cat_after:
            continue
        score_b = round((cat_before.get('score') or 0) * 100)
        score_a = round((cat_after.get('score') or 0) * 100)
        delta = score_a - score_b
        status = '✅' if delta > 0 else ('⚠️' if delta < 0 else '=')
        results.append({
            'category': cat_before.get('title', cat_id),
            'before': score_b,
            'after': score_a,
            'delta': delta,
            'status': status,
        })

    return results

# Affichage attendu :
# CATÉGORIE      AVANT   APRÈS   DELTA
# Performance    65      78      +13  ✅
# Accessibility  88      94      +6   ✅
# Best Practices 75      75      =
# SEO            90      85      -5   ⚠️
```

---

## Références

- `references/audits-guide.md` — Guide détaillé par audit : description, impact, correction
- Source : https://github.com/GoogleChrome/lighthouse-ci
- Documentation LHR : https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md
