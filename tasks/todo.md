# AM Couverture — Suivi des tâches

## Phase 1 : Initialisation ✅
- [x] Créer le projet Next.js
- [x] Installer les dépendances
- [x] Créer .env.local + tasks/todo.md
- [x] Initialiser Git + premier commit
- [x] Vérifier npm run dev

---

## Phase 2 : Système modulaire de landing pages ✅

### Branding
- Fond : dark navy (#0F172A)
- Accent : chartreuse atténuée (#B8CC30)
- Texte : blanc
- Logo : CSS (carré jaune "AM" + "COUVERTURE")
- Téléphone : +33 7 85 96 62 48
- Localisation : Ingré (45)

### Architecture
Chaque landing page = **1 fichier config** + **1 fichier page.tsx de 5 lignes**.
Créer une variante = dupliquer `config.ts` + changer les textes/images.

### Tâches Phase 2

#### Étape 1 : Fondations ✅
- [x] `lib/types.ts` — Type LandingPageConfig
- [x] `lib/constants.ts` — Constantes (téléphone, villes, company name)
- [x] `lib/fbq.d.ts` — Types Meta Pixel
- [x] `components/Logo.tsx` — Logo CSS
- [x] `components/MetaPixel.tsx` — Script Meta Pixel
- [x] `app/layout.tsx` — Mise à jour avec fonts, couleurs, MetaPixel

#### Étape 2 : Composants partagés ✅
- [x] `components/StickyPhoneBar.tsx` — Barre fixe mobile (appeler + devis)
- [x] `components/HeroSection.tsx` — Hero plein écran avec image, CTA, tel
- [x] `components/TrustBadges.tsx` — 4 badges confiance avec icônes
- [x] `components/LeadForm.tsx` — Formulaire multi-étapes (3 steps)
- [x] `components/ProblemSolution.tsx` — 2 colonnes problème/solution
- [x] `components/Services.tsx` — Liste avec icônes check
- [x] `components/BeforeAfter.tsx` — Avant/après avec placeholders
- [x] `components/Testimonials.tsx` — Carrousel avis avec étoiles
- [x] `components/FAQ.tsx` — Accordion ouvert/fermé
- [x] `components/CTASection.tsx` — CTA final avec gradient
- [x] `components/Footer.tsx` — Footer minimal sans navigation
- [x] `components/LandingPage.tsx` — Assembleur de sections

#### Étape 3 : Landing pages ✅
- [x] `app/demoussage/config.ts` + `page.tsx` — Angle "résultat"
- [x] `app/demoussage-v2/config.ts` + `page.tsx` — Angle "peur"
- [x] `app/renovation/config.ts` + `page.tsx` — Angle "résultat"

#### Étape 4 : API & conversion ✅
- [x] `app/api/lead/route.ts` — Validation + Resend + Google Sheet + Meta CAPI
- [x] `app/merci/page.tsx` — Page de remerciement

#### Étape 5 : Vérification ✅
- [x] Test formulaire multi-étapes (3 steps fonctionnent)
- [x] Test responsive mobile (375px) — sticky bar visible
- [x] npm run build — 0 erreur, toutes les pages statiques
- [ ] Commit Phase 2

---

## Review Phase 2

### Ce qui a été créé
- **22 fichiers** dans lib/, components/, app/
- **3 landing pages** : /demoussage (résultat), /demoussage-v2 (peur), /renovation (résultat)
- **13 composants** réutilisables avec props
- **1 API route** /api/lead (validation + Resend + Google Sheet + Meta CAPI)
- **1 page** /merci (confirmation + tel d'urgence)
- **Type LandingPageConfig** pour le système modulaire

### Architecture modulaire
- Créer une variante = copier `config.ts` + modifier les textes
- Chaque page.tsx = ~10 lignes (import config + metadata + LandingPage)
- Tous les composants acceptent des props depuis la config

### À faire ensuite
- [ ] Remplir .env.local avec les vraies clés (Resend, Google Sheets, Meta Pixel)
- [ ] Ajouter les vraies photos avant/après
- [ ] Créer le repo GitHub + déployer sur Vercel
- [ ] Configurer le nom de domaine
- [ ] Créer les campagnes Meta Ads pointant vers les landing pages

---

## Phase 3 : Refonte LP v2 — Conversion maximale ✅

### Tâches

#### Étape 1 : Nouveaux composants ✅
- [x] `components/PainSection.tsx` — Section PAS (Problem-Agitate-Solve), variant demoussage/renovation
- [x] `components/PlayTheTapeForward.tsx` — 2 futurs contrastés (vert/rouge), variant demoussage/renovation/promo
- [x] `components/CloserSection.tsx` — Mini-hero bottom avec LeadForm intégré (id="formulaire-bottom")
- [x] `components/PromoOfferTable.tsx` — Tableau 3 offres prix printemps (11/13/9 €/m²)

#### Étape 2 : Composants modifiés ✅
- [x] `components/HeroSection.tsx` — +étoiles Google 4.9/5, +3 stats cards, +FUD reduction (4 checkmarks)
- [x] `components/Testimonials.tsx` — Carousel supprimé → grille statique 3 colonnes, contenu variant-driven (3 témoignages ciblés objections par variant), stats row
- [x] `components/Services.tsx` — +prop `title` optionnelle pour titre benefit-driven
- [x] `components/LeadForm.tsx` — +props `id` et `sectionClassName` (rétro-compatible)

#### Étape 3 : Pages mises à jour ✅
- [x] `app/demoussage/page.tsx` — Composition inline (plus via LandingPage.tsx), +2 UTM headlines
- [x] `app/demoussage-v2/page.tsx` — Idem, noindex, UTM p5-degats mis à jour
- [x] `app/renovation/page.tsx` — Idem, variant=renovation, +1 UTM headline
- [x] `app/promo-printemps/page.tsx` + `config.ts` — Nouvelle page promo avec PromoOfferTable, noindex

#### Étape 4 : Vérification ✅
- [x] npm run build — 0 erreur TypeScript, 11 routes compilées
- [x] 4 nouveaux composants existent
- [x] promo-printemps créé (config.ts + page.tsx)
- [x] LandingPage.tsx n'est plus utilisé dans les pages (grep = 0 résultat)
- [x] Commit + push sur main

---

## Review Phase 3

### Changement d'architecture
- **Avant** : LandingPage.tsx orchestrateur unique → ordre fixe pour toutes les pages
- **Après** : Chaque page.tsx compose ses sections directement → ordre flexible par page
- LandingPage.tsx conservé (rétro-compatible) mais plus utilisé par les pages actives

### Nouvel ordre des sections (toutes les LP)
1. HeroSection (étoiles Google + stats + FUD)
2. TrustBadges
3. LeadForm (id="formulaire" — formulaire principal)
4. **PainSection** ← NOUVEAU (framework PAS)
5. BeforeAfter
6. **Testimonials** ← remonté + grille statique + contenu ciblé objections
7. Services (titre benefit-driven)
8. **PlayTheTapeForward** ← NOUVEAU (2 futurs contrastés)
9. FAQ
10. **CloserSection** ← NOUVEAU (2ème formulaire en bas, id="formulaire-bottom")
11. Footer

### Spécificité /promo-printemps
- PromoOfferTable inséré après LeadForm (position 4)
- PainSection en position 5
- PlayTheTapeForward variant="promo" avec urgencyText
- CloserSection variant="promo" avec headline/ctaText personnalisés
- noindex (page temporaire)

### Composants créés
| Composant | Type | Props clés |
|-----------|------|------------|
| PainSection | Server | variant: demoussage/renovation |
| PlayTheTapeForward | Server | variant: demoussage/renovation/promo, ctaText?, urgencyText? |
| CloserSection | Server* | variant, headline?, subline?, ctaText?, form |
| PromoOfferTable | Server | deadline? |

*CloserSection importe LeadForm (client) mais est elle-même server component.

### Modifications mineures hors plan
- `tsconfig.json` : exclusion dossier `Claude Code VSC` (fichiers parasites cassaient le build)
- `LeadForm.tsx` : props `id` et `sectionClassName` ajoutées pour supporter CloserSection

### Points d'attention pour la suite
- Le formulaire bottom (CloserSection) n'a pas `id="formulaire"` — les CTA de la page scrollent vers le formulaire principal en haut
- Les UTM headlines sont dans les fichiers config.ts — ajouter de nouveaux mappings = modifier config.ts
- La page /promo-printemps est noindex — penser à la supprimer ou mettre à jour la deadline après le 21 avril
- ProblemSolution.tsx et CTASection.tsx ne sont plus utilisés dans les pages actives mais restent disponibles

---

## Phase 4 : Meta Ads Vague 2 — Campagnes Printemps 2026

### Contexte
Vague 1 = 1 campagne + 1 ad set + 9 pubs (démoussage + rénovation mélangés).
Vague 2 = 2 campagnes séparées (TOF prospection + BOF retargeting) + 5 pubs au total.
P8 (27.2% CTR) et P1 (winner démoussage) sont remixés avec nouveaux textes.
Fichier : `meta-ads-vague2-setup.js` à la racine du projet.

### Architecture du script (calquée sur meta-ads-setup.js)

Réutiliser de vague 1 :
- `callMetaAPI()` — helper fetch avec retry
- `uploadImage()` — upload base64 + extraction hash
- `delay()` — pause entre appels API
- Pattern `console.table()` pour le rapport final
- Même IDs : AD_ACCOUNT_ID, PIXEL_ID, PAGE_ID, API_VERSION, SITE_URL

Nouvelles fonctions :
- `getOrCreateWebsiteCustomAudience(name, retentionDays)` — cherche l'audience existante ou la crée
- Fonctions wrapper optionnelles pour campaign/adset/ad (ou inline comme vague 1)

### Tâches

#### Étape 1 : Structure du fichier
- [ ] Copier les helpers de `meta-ads-setup.js` (callMetaAPI, uploadImage, delay, config IDs)
- [ ] Ajouter la fonction `getOrCreateWebsiteCustomAudience()`
  - GET `AD_ACCOUNT_ID/customaudiences` avec filtre sur le nom
  - Si trouvée → retourner l'ID
  - Sinon → POST pour créer (type WEBSITE, retention_days 14, rule all_visitors)

#### Étape 2 : Configs des 5 pubs (tableau PUB_CONFIGS)
- [ ] C1 — "Le Printemps des Toitures" — Carrousel 3 slides → /promo-printemps
- [ ] C2 — "La Maison Retrouve Vie" — Carrousel 4 slides → /renovation (remake P8)
- [ ] C3 — "Agissez ce Printemps" — Image → /demoussage
- [ ] C4 — "Avant / Après Démoussage" — Image → /demoussage
- [ ] C5 — "Offre Printemps — Dernière Chance" — Image → /promo-printemps (retargeting)

Images utilisées :
- C1 : `ad-creatives/vague-2/comparatif-avant.jpg`, `comparatif-apres.jpg`, `maison-toit-propre.jpg`
- C2 : `ad-creatives/META ADS/PUB 8/pub8-slide1-avant.png` → `slide4-cta.png` (4 slides)
- C3 : `ad-creatives/vague-2/mousse-grosplan.jpg`
- C4 : `ad-creatives/vague-2/comparatif-apres.jpg`
- C5 : `ad-creatives/vague-2/maison-toit-propre.jpg`

#### Étape 3 : Fonction main() — Campagne 1 (TOF Prospection)
- [ ] Vérifier existence de tous les fichiers images
- [ ] Créer campagne "TOF Prospection Printemps" (OUTCOME_LEADS, CBO 27€/j, PAUSED)
- [ ] Créer ad set "Loiret Large — Printemps" (LEAD_GENERATION, freq cap 3/7j, geo Orléans, 30-65 ans, PAS d'intérêts, PAUSED)
- [ ] Boucle : upload images + créer creatives + créer ads C1→C4 en PAUSED
- [ ] Advantage+ creative enhancements sur chaque creative (non-bloquant si erreur API)

#### Étape 4 : Fonction main() — Campagne 2 (BOF Retargeting)
- [ ] Récupérer ou créer la Custom Audience "Visiteurs du site web — 14 derniers jours"
- [ ] Créer campagne "BOF Retargeting Offre Printemps" (OUTCOME_LEADS, CBO 3€/j, PAUSED)
- [ ] Créer ad set "Visiteurs LP 14 jours" (custom_audiences, further_limit_reach: true, use_audience_suggestions: false, PAS de freq cap, PAUSED)
- [ ] Upload image + créer creative + créer ad C5 en PAUSED

#### Étape 5 : Rapport final + vérification UTM
- [ ] console.table avec C1→C5 : nom, format, creative_id, ad_id, LP, UTM content
- [ ] Afficher le bloc de vérification UTM (encadré ASCII)
- [ ] Message final : "✅ N pubs créées en PAUSED — Vérifier les UTM avant activation"

---

## Webhook Meta Lead Ads — Configuration manuelle

- [ ] Aller sur developers.facebook.com → ton App → Webhooks → Page
- [ ] Callback URL : https://www.am-couverture.net/api/meta-lead-webhook
- [ ] Verify Token : amcouverture2026
- [ ] Cliquer "Vérifier et enregistrer" → doit retourner 200
- [ ] S'abonner à l'événement : leadgen
- [ ] Récupérer META_APP_SECRET :
      App → Paramètres → Général → App Secret → Afficher
- [ ] Ajouter dans Vercel → Settings → Environment Variables :
      META_WEBHOOK_VERIFY_TOKEN = amcouverture2026
      META_APP_SECRET = [valeur récupérée]
- [ ] git add . && git commit -m "feat: meta lead webhook" && git push
- [ ] Tester : Meta Business Manager → Webhooks → "Test" sur leadgen
      Vérifier que la ligne apparaît dans le Google Sheet

---

#### Étape 6 : Vérification
- [ ] Relire le fichier pour confirmer : tous les textes (primary, headline, description) correspondent au brief
- [ ] Vérifier : toutes les URLs avec UTM sont correctes
- [ ] Vérifier : les chemins d'images sont corrects
- [ ] Vérifier : advantage_plus_creative est configuré avec try/catch non-bloquant
