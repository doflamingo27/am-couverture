# HANDOVER — AM Construction (Landing Pages Lead Gen Meta Ads)

## Contexte du projet

On crée un site de **landing pages de génération de leads** pour un client couvreur/toiture dans le Loiret (45). Le site sera utilisé exclusivement avec des **Meta Ads** (Facebook/Instagram) pour tester plusieurs landing pages, créatives et ad copy. L'objectif est de récolter des leads (demandes de devis) qu'un commercial rappellera ensuite.

**Ce n'est PAS un site vitrine classique.** C'est un système de landing pages autonomes, sans navigation, 100% orientées conversion.

---

## Stack technique décidé

- **Framework** : Next.js 14+ (App Router) + TypeScript
- **Styling** : Tailwind CSS
- **Icônes** : lucide-react
- **Emails** : Resend (confirmation prospect + notification commercial)
- **Stockage leads** : Google Sheets via google-spreadsheet + google-auth-library
- **Tracking** : Meta Pixel + Conversions API (CAPI) server-side
- **Déploiement** : Vercel (auto-deploy depuis GitHub)
- **Coût** : 0€/mois (tout en free tier)

**Dépendances à installer :**
```bash
npm install lucide-react resend google-spreadsheet google-auth-library
```

---

## Chemin du projet

```
C:\Dev\AM Construction
```

---

## Architecture des pages

```
app/
├── layout.tsx              # Layout global (Meta Pixel, fonts, sticky phone bar)
├── page.tsx                # Redirect ou page d'accueil simple
├── demoussage/
│   └── page.tsx            # Landing page Démoussage V1
├── demoussage-v2/
│   └── page.tsx            # Landing page Démoussage V2 (variante A/B)
├── demoussage-v3/
│   └── page.tsx            # Landing page Démoussage V3 (autre angle)
├── renovation/
│   └── page.tsx            # Landing page Rénovation V1
├── renovation-v2/
│   └── page.tsx            # Landing page Rénovation V2
├── urgence/
│   └── page.tsx            # Landing page Urgence toiture
├── merci/
│   └── page.tsx            # Page de remerciement (conversion tracking event)
└── api/
    └── lead/
        └── route.ts        # API : validation → Resend emails → Google Sheet → Meta CAPI

components/
├── HeroSection.tsx         # Hero avec titre, sous-titre, CTA, image fond
├── LeadForm.tsx            # Formulaire de capture (multi-étapes recommandé)
├── TrustBadges.tsx         # Bandeau confiance (décennale, avis, expérience)
├── BeforeAfter.tsx         # Galerie avant/après
├── Testimonials.tsx        # Avis clients
├── ProblemSolution.tsx     # Section problème → solution
├── Services.tsx            # Détail des prestations incluses
├── FAQ.tsx                 # Questions/réponses accordion
├── StickyPhoneBar.tsx      # Barre sticky mobile avec tel cliquable
├── CTASection.tsx          # CTA de rappel en bas de page
├── MetaPixel.tsx           # Script Meta Pixel côté client
└── Footer.tsx              # Footer minimal (mentions légales, zone intervention)

lib/
├── meta-pixel.ts           # Helpers fbq() events
├── send-lead.ts            # Logique Resend + Google Sheet + CAPI
└── constants.ts            # Textes, villes, numéro, etc.
```

---

## Flow de conversion

```
Meta Ad (Facebook/Instagram)
    ↓ clic
Landing Page (/demoussage, /renovation, etc.)
    ↓ formulaire soumis
API Route /api/lead
    ↓ en parallèle :
    ├── Email confirmation → prospect (Resend)
    ├── Email notification → commercial (Resend)
    ├── Nouvelle ligne → Google Sheet
    └── Event Lead → Meta CAPI (server-side)
    ↓
Page /merci (+ event Lead côté client via Pixel)
    ↓
Commercial ouvre le Google Sheet → rappelle le lead
```

---

## Google Sheet : structure des colonnes

| Date | Prénom | Téléphone | Email | Code Postal | Type de projet | Source (URL) | Statut | Notes commercial |
|------|--------|-----------|-------|-------------|----------------|--------------|--------|-----------------|

Le commercial remplit "Statut" manuellement : À rappeler / Contacté / RDV pris / Signé / Perdu.

---

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_TOKEN=
META_PIXEL_ID=
RESEND_API_KEY=
NOTIFICATION_EMAIL=
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_COMPANY_NAME=AM Couverture
NEXT_PUBLIC_SITE_URL=
```

---

## Stratégie multi-landing pages

Chaque URL = 1 landing page autonome testable dans Meta Ads.

**Par service :** /demoussage, /renovation, /urgence, /hydrofuge
**Par angle (variantes A/B) :**
- V1 = angle "résultat" : "Retrouvez une toiture comme neuve"
- V2 = angle "peur" : "La mousse détruit votre toiture en silence"
- V3 = angle "offre" : "Diagnostic toiture GRATUIT ce mois-ci"

Pour créer une variante : dupliquer le dossier de la page et changer titre, sous-titre, images, CTA.

---

## Recherche concurrentielle — Résumé des insights clés

### Ce que les clients du Loiret veulent (analyse des avis Google)

**4 piliers à mettre en avant :**

1. **CONFIANCE** (frein n°1 = peur de l'arnaque)
   - Assurance décennale visible
   - Avis Google vérifiés intégrés sur la page
   - SIRET mentionné
   - Photos RÉELLES (pas de stock)
   - "Nous ne pratiquons jamais le démarchage en porte-à-porte"

2. **RAPIDITÉ** (critère n°1 des avis 5 étoiles)
   - "Rappel sous 2h"
   - "Devis sous 24h"
   - "Intervention rapide"

3. **TRANSPARENCE** (ce que les clients détestent = prix flous)
   - "Devis détaillé gratuit"
   - "Prix sans surprise"
   - "On vous explique chaque étape"

4. **RÉSULTAT** (meilleur argument de vente)
   - Photos avant/après (CRITIQUE — le plus convertisseur en toiture)
   - "Résultat bluffant" / "Toiture comme neuve"
   - Garantie sur le travail

### Objections FAQ obligatoires
- Prix → prévention 10-20x moins cher que rénovation
- Arnaque → SIRET, décennale, avis vérifiés, pas de porte-à-porte
- Karcher → Jamais. Nettoyage doux + Algimousse/Sikagard
- Durée → 1-2 jours, hydrofuge dure 5-10 ans
- Bon moment → Printemps/automne idéal

### Best practices landing page roofing (US + France)
- Taux conversion moyen LP : 4.3%, top 25% : 11.5%+
- ZERO navigation (pas de menu)
- Mobile-first (80%+ trafic Meta)
- PageSpeed > 95
- CTA visible above the fold + répété 3x minimum
- Formulaire court 3-5 champs (ou multi-étapes)
- Continuité visuelle ad ↔ landing page obligatoire
- Photos réelles uniquement, jamais de stock

---

## Structure type d'une landing page (ordre des sections)

1. **Hero** : Titre bénéfice + sous-titre confiance + CTA + image réelle
2. **Bandeau confiance** : ✓ Devis gratuit 24h ✓ Décennale ✓ Artisan local ✓ X ans d'expérience
3. **Formulaire** : Intégré inline (ou multi-étapes)
4. **Problème/Solution** : Mousse → infiltrations → dégâts → "agissez maintenant"
5. **Services inclus** : Ce que comprend la prestation
6. **Avant/Après** : Photos comparatives
7. **Avis clients** : 3-5 témoignages prénom + ville
8. **FAQ** : 4-5 questions avec réponses anti-objections
9. **CTA final** : Rappel formulaire + urgence
10. **Footer minimal** : Mentions légales, zone intervention, pas de liens navigation

---

## Design guidelines

- **Pas de menu de navigation** — seule action = formulaire ou téléphone
- **Numéro de téléphone cliquable** en header sticky sur mobile
- **Couleurs** : fond sombre ou blanc, CTA en orange ou vert contrastant
- **Typographie** : claire, lisible, titres gros sur mobile
- **Espacement** : généreux, pas de surcharge visuelle
- **Images** : optimisées via next/image, format WebP/AVIF

---

## Ordre de développement

1. Layout global + composants communs (StickyPhoneBar, Footer, MetaPixel, LeadForm)
2. Landing page /demoussage V1 (page principale complète)
3. API route /api/lead (Resend + Google Sheet + Meta CAPI)
4. Page /merci (avec event conversion)
5. Landing page /demoussage-v2 (variante angle "peur")
6. Landing page /renovation V1
7. Tests PageSpeed + optimisation

---

## Fichiers à mettre à la racine du projet

- `CLAUDE.md` → Instructions complètes pour Claude Code (fourni séparément)
- `tasks/todo.md` → Fichier de suivi des tâches (Claude Code le remplira)
- `.env.local` → Variables d'environnement (jamais committé)
- `.gitignore` → Doit inclure .env.local

---

## Points d'attention

- Le propriétaire du projet n'a AUCUNE connaissance en code. Toutes les instructions doivent être détaillées pas à pas.
- L'environnement est Windows + PowerShell + VSCode.
- Claude Code est l'outil principal de développement.
- Les textes doivent être 100% originaux (pas de duplicate content).
- Ton : professionnel, accessible, vouvoiement.
- Villes à mentionner : Orléans, Ingré, Fleury-les-Aubrais, Olivet, Saint-Jean-de-la-Ruelle, Saran, La Chapelle-Saint-Mesmin.
- Le CLAUDE.md contient les règles de travail complètes (plan dans todo.md, validation avant de coder, simplicité, pas de paresse, impact minimal).
