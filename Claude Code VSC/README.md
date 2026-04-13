# LP v2 — Guide d'implémentation
## AM Couverture · Mise à jour landing pages (taux de conversion maximal)

---

## Ce qui a changé (et pourquoi)

### Nouveaux composants à créer dans /components/
| Fichier | Description |
|---------|-------------|
| `PainSection.tsx` | Section Douleur PAS (Problem-Agitate-Solve) — impact +40-100% CVR documenté |
| `PlayTheTapeForward.tsx` | 2 futurs contrastés avant le CTA final — déclencheur décision |
| `CloserSection.tsx` | Mini-hero en bas de page (capture les visiteurs qui ont scrollé) |
| `PromoOfferTable.tsx` | Tableau prix promo printemps (uniquement pour /promo-printemps) |

### Composants à remplacer entièrement
| Fichier | Changements clés |
|---------|-----------------|
| `HeroSection.tsx` | 2 formes distinctes de social proof + FUD reduction sous CTA + H1 dynamique UTM |
| `TestimonialsSection.tsx` | 3 témoignages ciblés sur objections précises, affichage grille (pas carousel) |
| `HowItWorks.tsx` | Titre benefit-driven (pas générique "Comment ça marche") |

### Pages à mettre à jour (order des sections corrigé)
| Page | Changement critique |
|------|-------------------|
| `app/demoussage/page.tsx` | PainSection en position 3 (avant Avant/Après) |
| `app/demoussage-v2/page.tsx` | Même structure |
| `app/renovation/page.tsx` | Même structure |
| `app/promo-printemps/page.tsx` | NOUVELLE page — ajouter PromoOfferTable en position 3 |

---

## Étapes dans l'ordre

### Étape 1 — Nouveaux composants (copier dans /components/)

```bash
# Copier ces 4 fichiers dans C:\Dev\AM Construction\components\
PainSection.tsx
PlayTheTapeForward.tsx
CloserSection.tsx
PromoOfferTable.tsx
```

### Étape 2 — Remplacer les composants existants

```bash
# Remplacer dans C:\Dev\AM Construction\components\
HeroSection.tsx   ← remplacer entièrement
TestimonialsSection.tsx   ← remplacer entièrement
HowItWorks.tsx   ← remplacer entièrement
```

### Étape 3 — Mettre à jour les pages

```bash
# Remplacer dans C:\Dev\AM Construction\app\
demoussage/page.tsx        ← remplacer
demoussage-v2/page.tsx     ← remplacer
renovation/page.tsx        ← remplacer
```

### Étape 4 — Créer la nouvelle page /promo-printemps

```bash
mkdir "C:\Dev\AM Construction\app\promo-printemps"
# Copier promo-printemps/page.tsx dans ce nouveau dossier
```

### Étape 5 — Vérifier que LeadForm existe déjà

Les nouveaux composants HeroSection et CloserSection utilisent `<LeadForm />`.
Ton composant LeadForm.tsx existant doit accepter ces props (vérifie) :
```typescript
interface LeadFormProps {
  ctaText?: string
}
```
Si ta LeadForm n'a pas cette prop, ajoute-la avec une valeur par défaut.

### Étape 6 — Vérifier les imports

Dans les nouveaux page.tsx, on importe :
- `@/components/HeroSection`
- `@/components/TrustBadges` (déjà existant)
- `@/components/PainSection` (nouveau)
- `@/components/BeforeAfter` (déjà existant)
- `@/components/TestimonialsSection` (remplacé)
- `@/components/HowItWorks` (remplacé)
- `@/components/ServicesIncluded` (déjà existant)
- `@/components/PlayTheTapeForward` (nouveau)
- `@/components/FAQSection` (déjà existant)
- `@/components/CloserSection` (nouveau)
- `@/components/PromoOfferTable` (nouveau, uniquement promo-printemps)

Adapte les noms si tes composants existants ont des noms différents (ex: `FAQ.tsx` au lieu de `FAQSection.tsx`).

### Étape 7 — Tester en local

```bash
cd "C:\Dev\AM Construction"
npm run dev
```

Ouvre dans le navigateur :
- http://localhost:3000/demoussage
- http://localhost:3000/renovation
- http://localhost:3000/promo-printemps

Vérifier sur mobile (Chrome DevTools → mobile view).

### Étape 8 — Tester le H1 dynamique UTM

http://localhost:3000/demoussage?utm_content=c1-promo-printemps
→ Le H1 doit changer automatiquement.

http://localhost:3000/promo-printemps?utm_content=c5-urgence
→ H1 "Votre toiture vous attend — L'offre se termine le 21 avril"

### Étape 9 — Deploy

```bash
git add .
git commit -m "LP v2 — Vault-optimized structure: PainSection + CloserSection + PlayTheTape + TestimonialsRewrite + H1 dynamic UTM"
git push
```

Vercel déploie automatiquement.

---

## Ordre des sections (IMPORTANT — ne pas changer)

```
1. Hero + Formulaire (above the fold)
   ↳ 2x social proof (étoiles Google + stats chiffrées)
   ↳ FUD reduction sous le CTA (Sans engagement · Gratuit · Rappel sous 2h)

2. Barre de confiance (4 badges)

3. Section Douleur PAS  ← CRITIQUE, audience Meta non-aware
   ↳ Problem → Agitate → Solve + CTA inline

4. Avant/Après (visuels)

5. Témoignages (3, ciblés objections, grille statique)

6. Comment ça marche (titre benefit-driven)

7. Services inclus

8. Play the Tape Forward (2 futurs contrastés)

9. FAQ (objections de closing)

10. Closer Section (mini-hero + formulaire + 2x social proof différente)
```

---

## Notes importantes

- **HeroSection** utilise `useSearchParams` (hook client Next.js) — il faut
  que le composant soit `'use client'`. C'est déjà le cas dans le fichier fourni.
  Mais la page elle-même peut rester server component.
  
- **Suspense** autour du `DynamicHeadline` est obligatoire car `useSearchParams`
  doit être wrappé en Suspense boundary dans Next.js 14 App Router.

- **noindex** sur demoussage-v2 et promo-printemps : les variantes de test
  ne doivent pas être indexées (robots noindex dans metadata).

- **Images** : les chemins `/images/demoussage-apres.jpg` etc. correspondent
  à tes fichiers existants dans /public/images/. Adapte si les noms diffèrent.
