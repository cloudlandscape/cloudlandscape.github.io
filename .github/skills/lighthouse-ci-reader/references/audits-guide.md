# Guide des audits Lighthouse — Corrections et recommandations

## Table des matières
1. [Performance](#performance)
2. [Accessibilité](#accessibilité)
3. [Best Practices](#best-practices)
4. [SEO](#seo)

---

## Performance

### Core Web Vitals

#### `largest-contentful-paint` (LCP)
**Seuils :** ✅ < 2.5s | ⚠️ 2.5–4s | ❌ > 4s  
**Problème :** Le plus grand élément visible met trop de temps à s'afficher.  
**Corrections :**
- Précharger l'image hero avec `<link rel="preload">`
- Utiliser un CDN pour les assets statiques
- Optimiser le TTFB serveur (cache, HTTP/2)
- Éviter le CSS/JS bloquant avant le LCP element
- Utiliser des formats modernes : WebP, AVIF

#### `total-blocking-time` (TBT)
**Seuils :** ✅ < 200ms | ⚠️ 200–600ms | ❌ > 600ms  
**Problème :** Le thread principal est bloqué par du JavaScript long.  
**Corrections :**
- Diviser les long tasks (> 50ms) en chunks
- Utiliser `requestIdleCallback` ou `setTimeout(0)` pour le travail non urgent
- Lazy-loader les scripts tiers
- Réduire la taille des bundles JS (tree-shaking, code splitting)

#### `interaction-to-next-paint` (INP)
**Seuils :** ✅ < 200ms | ⚠️ 200–500ms | ❌ > 500ms  
**Problème :** Délai entre une interaction utilisateur (clic, frappe) et la mise à jour visuelle suivante.  
**Note :** INP remplace FID comme Core Web Vital depuis mars 2024.  
**Corrections :**
- Éviter les long tasks JS pendant les interactions (> 50ms)
- Utiliser `scheduler.yield()` pour céder le thread principal entre les tâches
- Différer le travail non essentiel avec `requestIdleCallback`
- Réduire la taille des composants React/Vue re-rendus inutilement
- Identifier les handlers d'événements lourds avec Chrome DevTools > Performance

#### `cumulative-layout-shift` (CLS)
**Seuils :** ✅ < 0.1 | ⚠️ 0.1–0.25 | ❌ > 0.25  
**Problème :** Les éléments bougent de façon inattendue pendant le chargement.  
**Corrections :**
- Définir `width` et `height` sur toutes les images/vidéos
- Réserver l'espace pour les publicités et iframes avec `min-height`
- Éviter d'insérer du contenu au-dessus du contenu existant
- Utiliser `font-display: optional` ou précharger les fonts

#### `first-contentful-paint` (FCP)
**Seuils :** ✅ < 1.8s | ⚠️ 1.8–3s | ❌ > 3s  
**Corrections :**
- Éliminer les ressources bloquant le rendu
- Minifier CSS critique et l'inliner dans `<head>`
- Réduire les redirections

#### `speed-index`
**Seuils :** ✅ < 3.4s | ⚠️ 3.4–5.8s | ❌ > 5.8s  
**Corrections :**
- Optimiser le Critical Rendering Path
- Différer le CSS/JS non critique

#### `interactive` (TTI)
**Seuils :** ✅ < 3.8s | ⚠️ 3.8–7.3s | ❌ > 7.3s  
**Corrections :**
- Réduire le JS exécuté au démarrage
- Différer les scripts tiers non essentiels

---

### Opportunités fréquentes

#### `render-blocking-resources`
**Problème :** CSS ou JS dans `<head>` bloquent l'affichage.  
**Correction :** Ajouter `defer` ou `async` aux scripts. Inliner le CSS critique, différer le reste.

#### `unused-javascript`
**Problème :** Des bytes de JS sont chargés mais jamais exécutés.  
**Correction :** Code splitting, tree-shaking, lazy loading des routes.

#### `unused-css-rules`
**Problème :** Du CSS inutilisé est chargé.  
**Correction :** Utiliser PurgeCSS, supprimer les frameworks CSS inutilisés.

#### `uses-optimized-images`
**Problème :** Images non optimisées (trop lourdes).  
**Correction :** Compresser avec squoosh/imagemin, utiliser WebP/AVIF.

#### `uses-responsive-images`
**Problème :** Images trop grandes par rapport à leur affichage.  
**Correction :** Utiliser `srcset` et `sizes`, générer plusieurs résolutions.

#### `efficient-animated-content`
**Problème :** GIFs animés au lieu de vidéos.  
**Correction :** Convertir en MP4/WebM avec autoplay, loop, muted.

#### `uses-text-compression`
**Problème :** Les ressources texte ne sont pas compressées (gzip/brotli).  
**Correction :** Activer gzip ou brotli sur le serveur web.

#### `uses-long-cache-ttl`
**Problème :** Les assets statiques ont un TTL de cache court.  
**Correction :** Configurer `Cache-Control: max-age=31536000` + fingerprinting des fichiers.

#### `eliminate-render-blocking-resources`
Voir `render-blocking-resources` ci-dessus.

#### `server-response-time` (TTFB)
**Seuils :** ✅ < 600ms  
**Correction :** Cache serveur, CDN, optimiser les requêtes DB, upgrade hébergement.

#### `third-party-summary`
**Problème :** Scripts tiers (analytics, pub, chat) ralentissent la page.  
**Correction :** Charger en `defer`, utiliser `rel="preconnect"` pour les domaines tiers.

---

## Accessibilité

#### `color-contrast`
**Problème :** Texte avec contraste insuffisant (ratio < 4.5:1 pour texte normal, < 3:1 pour grand texte).  
**Correction :** Augmenter le contraste. Vérifier avec https://webaim.org/resources/contrastchecker/

#### `image-alt`
**Problème :** Images sans attribut `alt`.  
**Correction :** Ajouter `alt="description"` à toutes les images. `alt=""` pour les images décoratives.

#### `button-name`
**Problème :** Boutons sans libellé accessible.  
**Correction :** Ajouter `aria-label` ou du texte visible dans le bouton.

#### `link-name`
**Problème :** Liens sans texte descriptif.  
**Correction :** Éviter les "cliquez ici", préférer des textes descriptifs. Utiliser `aria-label` si nécessaire.

#### `label`
**Problème :** Champs de formulaire sans `<label>` associé.  
**Correction :** Associer `<label for="id">` à chaque `<input id="id">`.

#### `aria-*`
**Problème :** Attributs ARIA invalides ou mal utilisés.  
**Correction :** Consulter https://www.w3.org/TR/wai-aria/ pour l'usage correct.

#### `heading-order`
**Problème :** Hiérarchie des titres (h1→h6) incorrecte.  
**Correction :** Ne pas sauter de niveaux (ex: h1 → h3 sans h2).

#### `html-has-lang`
**Correction :** Ajouter `lang="fr"` (ou la langue appropriée) sur la balise `<html>`.

#### `meta-viewport`
**Problème :** `user-scalable=no` bloque le zoom pour les malvoyants.  
**Correction :** Retirer `user-scalable=no` du meta viewport.

---

## Best Practices

#### `is-on-https`
**Problème :** La page ou ses ressources utilisent HTTP.  
**Correction :** Migrer vers HTTPS. Corriger les mixed content.

#### `no-vulnerable-libraries`
**Problème :** Bibliothèques JS avec vulnérabilités connues.  
**Correction :** Mettre à jour les dépendances. Utiliser `npm audit fix`.

#### `js-libraries`
**Info :** Inventaire des bibliothèques JS détectées (informatif).

#### `deprecations`
**Problème :** Utilisation d'APIs web dépréciées.  
**Correction :** Mettre à jour le code selon les avertissements de la console.

#### `errors-in-console`
**Problème :** Erreurs JS dans la console.  
**Correction :** Corriger toutes les erreurs JS visibles dans les DevTools.

#### `uses-http2`
**Problème :** Ressources servies via HTTP/1.1.  
**Correction :** Configurer HTTP/2 sur le serveur web.

#### `no-unload-listeners`
**Problème :** `unload` event listener détecté (bloque BFCache).  
**Correction :** Remplacer par `pagehide` ou `visibilitychange`.

---

## SEO

#### `meta-description`
**Correction :** Ajouter `<meta name="description" content="...">` (50–160 caractères).

#### `document-title`
**Correction :** Ajouter `<title>` unique et descriptif sur chaque page.

#### `hreflang`
**Problème :** Balises hreflang invalides pour les sites multilingues.  
**Correction :** Vérifier le format : `<link rel="alternate" hreflang="fr" href="...">`

#### `canonical`
**Correction :** Ajouter `<link rel="canonical" href="URL-préférée">`.

#### `robots-txt`
**Correction :** S'assurer que `/robots.txt` est valide et accessible.

#### `tap-targets`
**Problème :** Éléments cliquables trop petits ou trop proches (mobile).  
**Correction :** Taille minimum recommandée : 48×48px avec 8px d'espacement.

#### `font-size`
**Problème :** Texte trop petit pour être lu sur mobile.  
**Correction :** Taille minimale de 12px pour le contenu principal.

#### `link-text`
**Problème :** Textes de liens non descriptifs ("cliquez ici", "en savoir plus").  
**Correction :** Utiliser des textes de liens décrivant la destination.

#### `crawlable-anchors`
**Problème :** Liens non crawlables par les moteurs de recherche.  
**Correction :** Utiliser de vrais `<a href="...">` au lieu de JS pour la navigation.

---

## Scores de référence

| Score | Couleur | Signification |
|-------|---------|---------------|
| 90–100 | 🟢 Vert | Bon |
| 50–89 | 🟠 Orange | À améliorer |
| 0–49 | 🔴 Rouge | Mauvais |
| null | ⚪ Gris | Informatif / non noté |

## Priorités d'optimisation

**Impact fort sur l'expérience utilisateur :**
1. LCP (chargement visible)
2. CLS (stabilité visuelle)
3. TBT / INP (réactivité)
4. Contraste couleurs (accessibilité)

**Impact fort sur le SEO :**
1. Meta description + title
2. Mobile-friendliness (tap targets, font size)
3. HTTPS
4. Crawlabilité
