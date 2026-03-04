# CLAUDE.md - AM Couverture Lead Generation Landing Pages

## Contexte du projet

Site de landing pages pour génération de leads via Meta Ads (Facebook/Instagram Ads) pour une entreprise de couverture/toiture dans le Loiret (45).

**Chemin du projet** : `C:\Dev\AM Construction`

**Objectif principal** : Maximiser le taux de conversion des visiteurs Meta Ads en leads qualifiés (demandes de devis).

**Services ciblés** :
- Démoussage / Nettoyage de toiture
- Rénovation de toiture complète
- Réparation / Urgences toiture
- Traitement hydrofuge
- Zinguerie / Gouttières

**Zone géographique** : Orléans Métropole et communes environnantes (45)

## Stack technique

- **Framework** : Next.js 14+ (App Router) avec TypeScript
- **Styling** : Tailwind CSS 3.4+
- **Déploiement** : Vercel (auto-deploy depuis GitHub)
- **Tracking** : Meta Pixel + Conversions API (CAPI) server-side
- **Formulaire** : API Route Next.js → Webhook (Google Sheets / Brevo / Email)
- **Images** : next/image avec optimisation automatique WebP/AVIF
- **Analytics** : Google Analytics 4 (optionnel)

## Règles de travail Claude Code

1. D'abord réfléchir au problème, lire le code pour trouver les fichiers concernés, et écrire un plan dans `tasks/todo.md`.
2. Le plan doit avoir une liste de tâches que tu peux cocher au fur et à mesure que tu les termines.
3. Avant de commencer à coder, vérifie avec moi et je validerai le plan.
4. Ensuite, travaille sur les tâches, en les marquant comme terminées au fur et à mesure.
5. À chaque étape, donne-moi juste une explication rapide de ce que tu as changé.
6. Chaque tâche et modification de code doit être la plus simple possible. On veut éviter les changements massifs ou complexes. Chaque modification doit impacter le moins de code possible. Tout est question de simplicité.
7. À la fin, ajoute une section "review" dans le fichier `tasks/todo.md` avec un résumé des changements et toute info pertinente.
8. NE SOIS PAS PARESSEUX. JAMAIS. S'il y a un bug, trouve la cause racine et corrige-la. Pas de solutions temporaires. Tu es un DÉVELOPPEUR SENIOR. Ne sois jamais paresseux.
9. Toutes les corrections et modifications de code doivent être les plus simples possible. Elles ne doivent impacter QUE le code nécessaire à la tâche et rien d'autre. Ça doit toucher le moins de code possible. Ton objectif est de ne pas introduire de bugs. TOUT EST QUESTION DE SIMPLICITÉ.

## Architecture des landing pages

### Structure des URLs
Chaque landing page est une route indépendante dans `/app/` :

```
/demoussage          → Landing page démoussage V1
/demoussage-v2       → Landing page démoussage V2 (variante test)
/renovation          → Landing page rénovation V1
/renovation-v2       → Landing page rénovation V2 (variante test)
/urgence-toiture     → Landing page urgence
/merci               → Page de remerciement post-soumission (conversion event)
```

### Règles de design pour la conversion

1. **AUCUN menu de navigation** sur les landing pages. Pas de header avec liens. Le seul objectif = remplir le formulaire.
2. **CTA visible sans scroller** (above the fold) sur mobile ET desktop.
3. **Formulaire court** : Prénom, Téléphone, Code postal, Type de projet (dropdown). Maximum 4-5 champs.
4. **Numéro de téléphone cliquable** (tel:) en header sticky comme alternative au formulaire.
5. **Mobile-first** : 80%+ du trafic viendra de mobile. Tout doit être parfait sur petit écran.
6. **Vitesse** : Objectif PageSpeed > 95. Pas de bibliothèques lourdes. Images optimisées.
7. **Couleurs** : Utiliser des couleurs qui inspirent confiance (bleu marine, vert, blanc). Rouge/orange pour les CTA.
8. **Social proof** : Avis clients, nombre d'interventions, badges de confiance (assurance décennale, RGE si applicable).

### Structure type d'une landing page (ordre des sections)

1. **Hero** : Titre accrocheur + sous-titre + CTA bouton + image de toiture propre
2. **Bandeau confiance** : "✓ Devis gratuit en 24h ✓ Assurance décennale ✓ Artisan local ✓ 15 ans d'expérience"
3. **Formulaire inline** : Le formulaire de contact intégré directement
4. **Problème/Solution** : Pourquoi agir maintenant (mousse = dégâts, infiltrations...)
5. **Services détaillés** : Ce qui est inclus dans la prestation
6. **Avant/Après** : Photos comparatives (TRÈS important pour la conversion)
7. **Avis clients** : 3-4 témoignages avec prénom et ville
8. **FAQ** : 4-5 questions fréquentes
9. **CTA final** : Rappel du formulaire avec urgence ("Places limitées ce mois-ci")
10. **Footer minimal** : Mentions légales, zone d'intervention, pas de liens de navigation

### Composants réutilisables

Tous les composants sont dans `/components/` et sont paramétrables via des props pour permettre les variantes :

- `HeroSection` : titre, sous-titre, image de fond, CTA text
- `LeadForm` : champs configurables, action API
- `TrustBadges` : badges de confiance
- `BeforeAfter` : galerie avant/après
- `Testimonials` : avis clients
- `FAQ` : questions/réponses en accordion
- `StickyPhoneBar` : barre sticky mobile avec numéro cliquable
- `MetaPixel` : intégration Meta Pixel côté client

### Variantes A/B

Pour tester des variantes de landing pages :
- Dupliquer le dossier de la page (ex: `/demoussage` → `/demoussage-v2`)
- Changer les éléments à tester (titre, couleur CTA, ordre des sections, images)
- Chaque variante a sa propre URL → chaque ad set dans Meta Ads pointe vers une URL différente
- Tracker les conversions par URL dans Meta Ads Manager

## Tracking Meta Pixel

### Events à tracker
- `PageView` : automatique sur chaque landing page
- `Lead` : au submit du formulaire (côté client via Pixel)
- `Lead` : confirmation côté serveur via Conversions API (CAPI) dans l'API route

### Implémentation
- Le Meta Pixel ID est stocké dans `.env.local` : `NEXT_PUBLIC_META_PIXEL_ID`
- Le token CAPI est dans `.env.local` : `META_CAPI_TOKEN`
- Le composant `MetaPixel` charge le script fbq dans le layout
- L'API route `/api/lead` envoie l'event `Lead` via CAPI en plus du formulaire

## API de réception des leads

L'endpoint `/api/lead/route.ts` fait 4 choses en parallèle :

1. **Valide** les champs (prénom, téléphone obligatoires, format téléphone FR)
2. **Email de confirmation** au prospect via Resend ("Merci, nous vous rappelons sous 24h")
3. **Email de notification** au commercial via Resend (avec toutes les infos du lead)
4. **Google Sheet** : ajoute une ligne avec : date/heure, prénom, téléphone, code postal, type de projet, landing page source (URL), statut (vide = à rappeler)
5. **Meta CAPI** : envoie l'event `Lead` côté serveur pour le tracking
6. **Retourne** un JSON de succès → redirect client vers `/merci`

### Google Sheet : structure des colonnes

| Date | Prénom | Téléphone | Email | Code Postal | Type de projet | Source (URL) | Statut | Notes commercial |
|------|--------|-----------|-------|-------------|----------------|--------------|--------|-----------------|

- Le commercial remplit manuellement "Statut" (À rappeler / Contacté / RDV pris / Signé / Perdu)
- La colonne "Source" permet de savoir quelle landing page + quelle ad convertit le mieux
- La colonne "Notes commercial" est libre pour le suivi

### Resend : emails envoyés

**Email au prospect** (confirmation) :
- From : contact@[domaine] (domaine vérifié dans Resend)
- Objet : "Votre demande de devis a bien été reçue"
- Contenu : Merci [prénom], un conseiller vous rappelle sous 24h. En cas d'urgence : [téléphone].

**Email au commercial** (notification) :
- From : leads@[domaine]
- Objet : "🔔 Nouveau lead - [type de projet] - [code postal]"
- Contenu : toutes les infos du formulaire + lien vers le Google Sheet

## Variables d'environnement (.env.local)

```
# Meta Ads Tracking
NEXT_PUBLIC_META_PIXEL_ID=        # ID du Meta Pixel
META_CAPI_TOKEN=                   # Token Conversions API Meta
META_PIXEL_ID=                     # Même ID pour le server-side

# Resend (emails)
RESEND_API_KEY=                    # Clé API Resend (https://resend.com/api-keys)
NOTIFICATION_EMAIL=                # Email du commercial qui reçoit les leads

# Google Sheets
GOOGLE_SHEETS_ID=                  # ID du Google Sheet (dans l'URL du sheet)
GOOGLE_SERVICE_ACCOUNT_EMAIL=      # Email du service account Google
GOOGLE_PRIVATE_KEY=                # Clé privée du service account (format JSON)

# Infos entreprise
NEXT_PUBLIC_PHONE=                 # Numéro de téléphone affiché
NEXT_PUBLIC_COMPANY_NAME=          # Nom de l'entreprise
NEXT_PUBLIC_SITE_URL=              # URL du site (pour les emails)
```

## Textes et contenu (basé sur l'analyse concurrentielle)

- **IMPORTANT** : Tous les textes doivent être ORIGINAUX. Ne jamais copier les textes d'un autre site.
- Écrire dans un style direct, professionnel mais accessible.
- Utiliser le "vous" (vouvoiement).
- Mentionner les villes locales : Ingré, Orléans, Fleury-les-Aubrais, Olivet, Saint-Jean-de-la-Ruelle, Saran, La Chapelle-Saint-Mesmin.
- Les titres H1 doivent contenir le mot-clé principal + la zone géographique.

### 4 piliers du copywriting (issus de l'analyse des avis clients du Loiret)

1. **CONFIANCE** : Les arnaques au démoussage sont un fléau. Les clients ont peur. Il faut prouver qu'on est légitime : SIRET visible, assurance décennale, avis Google vérifiés, photos RÉELLES, "pas de démarchage en porte-à-porte".
2. **RAPIDITÉ** : "Rappel sous 2h", "Devis sous 24h", "Intervention rapide". La réactivité est le critère n°1 des avis positifs.
3. **TRANSPARENCE** : "Devis détaillé gratuit", "Prix sans surprise", "On vous explique chaque étape". Les clients détestent les prix flous.
4. **RÉSULTAT** : Photos avant/après, "Résultat bluffant", "Plus aucune infiltration depuis X ans". Le résultat visible est le meilleur argument.

### Objections à traiter obligatoirement dans la FAQ
- "C'est cher ?" → Prévention 10-20x moins cher qu'une rénovation
- "Arnaque ?" → SIRET, décennale, avis vérifiés, pas de porte-à-porte
- "Karcher ?" → Jamais. Nettoyage doux + produits pros (Algimousse/Sikagard)
- "Durée ?" → 1-2 jours, effet hydrofuge 5-10 ans
- "Bon moment ?" → Printemps/automne idéal, mais agir vite si mousse présente

### Angles de copywriting à tester (variantes A/B)
- **Angle résultat** : "Retrouvez une toiture propre et protégée"
- **Angle peur** : "La mousse détruit votre toiture en silence"
- **Angle offre** : "Diagnostic toiture GRATUIT ce mois-ci"
- **Angle local/confiance** : "L'artisan que vos voisins recommandent"

## Performance et SEO

- Utiliser `next/image` pour toutes les images (lazy loading + formats modernes)
- Metadata dynamique par page via `generateMetadata()`
- Structured data JSON-LD LocalBusiness sur chaque page
- `robots.txt` et `sitemap.xml` auto-générés
- Pas de page inutile indexée : les variantes de test peuvent être `noindex`

## Commandes utiles

```bash
npm run dev          # Serveur de développement local
npm run build        # Build de production
npm run start        # Serveur de production local
npm run lint         # Vérification du code
```

## Déploiement

- Push sur `main` → déploiement automatique sur Vercel
- Push sur une branche → preview URL automatique (parfait pour tester les variantes avant de les mettre en production)
- Domaine custom configuré dans les settings Vercel
