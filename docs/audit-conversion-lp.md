# Audit Conversion — Landing Pages AM Couverture

**Date** : 20 mars 2026
**Pages auditées** : /demoussage, /demoussage-v2, /renovation, /merci
**Référentiel** : Guide de conversion Meta Ads AM Couverture

---

## Synthèse globale

| Critère | /demoussage | /demoussage-v2 | /renovation |
|---------|:-----------:|:--------------:|:-----------:|
| Formulaire multi-étapes | OK | OK | OK |
| Champs max 4-5 | OK (5) | OK (5) | OK (5) |
| CTA "Recevoir mon devis gratuit" | OK | Diff* | OK |
| Texte sous bouton | OK | OK | Partiel** |
| Badge cadenas confiance | OK | OK | OK |
| Barre sticky tel cliquable | OK | OK | OK |
| Pas de navigation/menu | OK | OK | OK |
| Pas d'adresse/nom/captcha/message | OK | OK | OK |
| Barre progression formulaire | OK | OK | OK |
| Exit intent popup | MANQUANT | MANQUANT | MANQUANT |
| Social proof temps réel | MANQUANT | MANQUANT | MANQUANT |
| H1 dynamique UTM | MANQUANT | MANQUANT | MANQUANT |
| Micro-interactions avancées | PARTIEL | PARTIEL | PARTIEL |

\* demoussage-v2 dit "Demander mon diagnostic gratuit" (cohérent avec l'angle peur)
\** renovation dit "Rappel sous 2h . Devis gratuit . 100% gratuit" au lieu de "Sans engagement"

---

## 1. LP /demoussage — Audit détaillé

### H1 et cohérence pub
- **H1 actuel** : "Retrouvez une toiture propre et protégée pour les 10 prochaines années"
- **Cohérence** : Bon match avec P1 (Transformation) et P4 (Bouclier). Moins adapté pour P2 (Diagnostic) et P3 (Comparatif).
- **Recommandation** : Implémenter le H1 dynamique via `utm_content` pour matcher chaque pub :
  - `p1-transformation` → "Votre toiture retrouve son éclat — Devis gratuit"
  - `p2-diagnostic` → "Diagnostic toiture GRATUIT — On vous dit tout"
  - `p3-comparatif` → "Protégez votre toit pour 10-20x moins cher"
  - `p4-bouclier` → "Votre toit propre ET protégé pour 5-10 ans"

### Formulaire
- **Étapes** : 3 étapes (Besoin → Type de bien → Coordonnées)
- **Champs étape 3** : Prénom, Téléphone, Code postal (3 champs) — OK, sous le max de 5
- **CTA bouton** : "Recevoir mon devis gratuit" — CONFORME au guide
- **Texte sous bouton** : "Rappel sous 2h . Sans engagement . 100% gratuit" — CONFORME
- **Badge confiance** : Icône cadenas (Lock) + texte de reassurance — CONFORME
- **Barre de progression** : "1/3", "2/3", "3/3" — CONFORME
- **Validation téléphone** : Oui, en temps réel avec message d'erreur — CONFORME
- **Pas de** : adresse, nom de famille, captcha, message libre — CONFORME

### Sections (ordre)
1. Hero + 2 CTA (Appeler / Devis) — OK
2. Trust badges (4) — OK
3. Formulaire — OK
4. Problème/Solution — OK
5. Services (8 cartes) — OK
6. Avant/Après (3 cas) — OK
7. Avis clients (4.9/5, 47 avis, 4 témoignages) — OK
8. FAQ (5 questions) — OK, traite les 5 objections clés
9. CTA final + "Places limitées ce mois-ci" — OK
10. Footer minimal — OK

### Points conformes
- Pas de menu de navigation
- Numéro tel cliquable (tel:+33785966248) dans sticky bar
- Images optimisées via next/image
- Trust badges visibles au-dessus du formulaire
- FAQ traite toutes les objections (prix, arnaque, Karcher, durée, timing)
- CTA final avec urgence ("Places limitées ce mois-ci")

### Points à améliorer
1. **Pas de H1 dynamique UTM** — Tous les visiteurs voient le même H1 quelle que soit la pub
2. **Pas d'exit intent popup** (desktop) — Opportunité manquée de récupérer les abandons
3. **Pas de social proof temps réel** — Pas de bandeau "Jean-Pierre de Fleury a demandé un devis il y a 2h"
4. **Le bouton CTA étape 3 ne change pas de texte** — Devrait dire "Dernière étape →" sur l'étape 2

---

## 2. LP /demoussage-v2 — Audit détaillé

### H1 et cohérence pub
- **H1 actuel** : "La mousse sur votre toit ? Elle cause bien plus de dégâts que vous ne le pensez"
- **Angle** : Peur/urgence — Cohérent avec P5 (Dégâts invisibles)
- **Moins adapté** pour P1-P4 qui arrivent aussi sur cette LP (P5 seul pointe ici)
- **Recommandation** : OK tel quel si seul P5 pointe vers cette LP. Sinon, H1 dynamique UTM.

### Formulaire
- **Identique** au /demoussage sauf :
  - **CTA bouton** : "Demander mon diagnostic gratuit" — Cohérent avec l'angle diagnostic/urgence
  - **Reassurance** : "Rappel sous 2h . Sans engagement . 100% gratuit" — CONFORME

### Sections
- Même structure que /demoussage — 10 sections dans le bon ordre
- Trust badge différent : "Diagnostic gratuit en 24h" au lieu de "Devis gratuit en 24h"
- CTA final : "N'attendez pas que les dégâts s'aggravent" — Bon angle urgence
- FAQ Q5 différente : "Est-ce vraiment urgent ?" au lieu de "C'est le bon moment ?" — Plus percutant

### Points conformes
- Tous les mêmes points que /demoussage
- Angle copywriting cohérent (peur/urgence du début à la fin)
- Variante A/B bien différenciée du /demoussage

### Points à améliorer
1. **Mêmes 4 points que /demoussage** (UTM, exit intent, social proof, micro-interactions)
2. **Avant/Après** : seulement 3 cas comme /demoussage — OK mais pourrait en avoir un 4e orienté "urgence/dégâts évités"

---

## 3. LP /renovation — Audit détaillé

### H1 et cohérence pub
- **H1 actuel** : "Une toiture neuve et durable pour votre tranquillité"
- **Cohérence** : Bon match général pour P6-P9. Mais le guide suggère "Rénovation toiture complète — Garanti 10 ans" pour P6-P9.
- **Recommandation** : H1 dynamique UTM :
  - `p6-cle-en-main` → "Rénovation toiture complète — On gère tout de A à Z"
  - `p7-patrimoine` → "Protégez la valeur de votre bien — Toiture neuve garantie 10 ans"
  - `p8-reprend-vie` → "Votre maison reprend 10 ans de vie — Rénovation complète"
  - `p9-transformation` → "Toit neuf garanti 10 ans — Transformation complète"

### Formulaire
- **Étape 1 label** : "Quel type de travaux ?" (adapté rénovation) — CONFORME
- **Options** : Rénovation complète, Remplacement partiel, Zinguerie, Autre — CONFORME
- **CTA bouton** : "Recevoir mon devis gratuit" — CONFORME
- **Reassurance** : "Rappel sous 2h . **Devis gratuit** . 100% gratuit"
  - **Diff** : dit "Devis gratuit" au lieu de "Sans engagement" — Légère incohérence avec le guide qui recommande "Sans engagement"

### Sections
- Même structure 10 sections — OK
- **Avant/Après** : seulement **2 cas** (vs 3 pour les LP démoussage)
  - **Recommandation** : Ajouter un 3e cas avant/après rénovation pour plus de social proof

### Points conformes
- Tous les éléments de base sont présents et conformes
- FAQ adaptée au contexte rénovation (coût, durée, charpente, garanties, habitation pendant travaux)
- Services bien détaillés (8 prestations)

### Points à améliorer
1. **Seulement 2 avant/après** au lieu de 3 — Ajouter un cas supplémentaire
2. **Reassurance formulaire** : remplacer "Devis gratuit" par "Sans engagement" pour cohérence
3. **Mêmes 4 points transversaux** (UTM, exit intent, social proof, micro-interactions)
4. **La mention "Garanti 10 ans"** n'est pas dans le H1 — C'est pourtant l'argument clé des pubs P6-P9

---

## 4. Page /merci — Audit détaillé

### Contenu actuel
- Titre : "Merci pour votre demande !"
- Message : "Un conseiller vous rappelle sous 2h aux heures ouvrées pour discuter de votre projet et planifier une visite."
- Bouton : "En cas d'urgence : 07 85 96 62 48" (cliquable)
- Footer : "© 2026 AM Couverture — Ingré (45)"

### Ce que le guide recommande vs ce qui est en place

| Élément recommandé | Présent ? | Détail |
|---------------------|:---------:|--------|
| Confirmation "demande reçue" | OK | "Merci pour votre demande !" |
| "Rappel sous 2h" | OK | Mentionné dans le texte |
| Badges de confiance | MANQUANT | Pas de décennale, 4.9/5, artisan local |
| Étapes "voici ce qui va se passer" | MANQUANT | Pas de roadmap (1) Rappel (2) Inspection (3) Devis |
| Contenu éducatif bonus | MANQUANT | Pas de "3 signes que votre toiture a besoin d'entretien" |
| Tracking Meta Pixel Lead | PARTIEL | PageView OK, mais l'event `Lead` est déclenché côté client AVANT la redirection (dans LeadForm.tsx), pas sur la page /merci elle-même |

### Recommandations pour /merci
1. **Ajouter les badges de confiance** : Décennale, 4.9/5 Google, Artisan local Loiret
2. **Ajouter la roadmap** :
   - Étape 1 : Rappel par un conseiller sous 2h
   - Étape 2 : Rendez-vous d'inspection gratuit à domicile
   - Étape 3 : Devis détaillé personnalisé sous 48h
3. **Ajouter du contenu éducatif** : "En attendant, voici 3 signes que votre toiture a besoin d'entretien" (avec visuels)
4. **Vérifier le tracking Lead** : L'event `fbq('track', 'Lead')` est déclenché dans LeadForm.tsx avant la redirection — OK fonctionnellement mais ajouter un event de backup sur /merci serait plus fiable

---

## 5. Améliorations transversales (les 3 LP)

### Priorité haute (impact conversion fort)

#### 5.1 H1 dynamique via utm_content
Chaque pub Meta Ads doit envoyer un paramètre UTM unique. Le H1 de la LP s'adapte automatiquement.
- **Impact estimé** : +15-25% de pertinence perçue
- **Complexité** : Faible (useSearchParams + mapping dans config)
- **Fichiers à modifier** : composant HeroSection + configs

#### 5.2 Exit intent popup (desktop uniquement)
Quand le curseur quitte la page, afficher : "Attendez ! Votre diagnostic toiture est GRATUIT et sans engagement. Laissez-nous juste votre numéro, on vous rappelle sous 2h."
- **Impact estimé** : Récupération 5-10% des abandons desktop
- **Complexité** : Moyenne (nouveau composant, event listener mouseleave)

#### 5.3 Amélioration page /merci
Ajouter badges, roadmap étapes, contenu éducatif (voir section 4).
- **Impact** : Réduit l'anxiété post-conversion, prépare le lead au rappel
- **Complexité** : Faible

### Priorité moyenne (nice-to-have)

#### 5.4 Social proof temps réel
Bandeau discret : "Jean-Pierre de Fleury-les-Aubrais a demandé un devis il y a 2h"
- **Impact** : Urgence sociale + preuve que d'autres agissent
- **Complexité** : Moyenne (faux données statiques ou API Google Sheet)

#### 5.5 Micro-interactions formulaire
- Bouton étape 2 dit "Dernière étape →" au lieu du label standard
- Animation subtile entre les étapes (slide/fade)
- Le numéro d'étape est déjà affiché (1/3, 2/3, 3/3) — OK
- **Complexité** : Faible

#### 5.6 3e avant/après pour /renovation
Ajouter un cas supplémentaire pour aligner avec les LP démoussage (3 cas chacune).

### Priorité basse (optimisation fine)

#### 5.7 Cohérence texte reassurance /renovation
Remplacer "Devis gratuit" par "Sans engagement" dans la reassurance du formulaire rénovation.

#### 5.8 CAPI feedback loop
Renvoyer les statuts "Devis signé" depuis Google Sheet vers Meta pour que l'algorithme apprenne quels profils convertissent vraiment (pas juste qui remplit le formulaire).
- **Impact** : Amélioration qualité leads long terme
- **Complexité** : Haute (webhook Google Sheet → Meta Offline Conversions API)

---

## Checklist pré-lancement

| # | Item | Statut |
|---|------|--------|
| 1 | Chaque URL de pub contient les UTM corrects | A FAIRE (dans meta-ads-setup.js les URLs n'ont pas d'UTM) |
| 2 | Les 3 LP chargent en < 3s sur mobile | A VÉRIFIER (next/image + Vercel = devrait être OK) |
| 3 | Formulaire fonctionne sur iPhone ET Android | A TESTER |
| 4 | Email notification arrive au commercial | A TESTER |
| 5 | Google Sheet se remplit correctement | A TESTER |
| 6 | /merci déclenche Lead dans Meta Pixel | PARTIEL (déclenché avant redirect, pas sur /merci) |
| 7 | CAPI envoie l'event côté serveur | A VÉRIFIER |
| 8 | Numéro tel cliquable sur mobile | OK (tel:+33785966248) |
| 9 | Commercial sait qu'il doit rappeler < 2h | PROCESS (pas technique) |
| 10 | Script de rappel prêt | PROCESS (pas technique) |

---

## Conclusion

Les 3 LP sont **globalement conformes** au guide de conversion : formulaire multi-étapes, CTA clairs, pas de navigation, trust badges, sticky phone bar, FAQ traitant les objections, avant/après. La structure est solide.

Les **3 améliorations prioritaires** à implémenter :
1. **H1 dynamique UTM** — Cohérence pub → LP (impact conversion le plus fort)
2. **Enrichir /merci** — Badges + roadmap + contenu éducatif
3. **Ajouter les UTM aux URLs** dans meta-ads-setup.js (checklist item #1)
