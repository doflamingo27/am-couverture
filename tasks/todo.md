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
