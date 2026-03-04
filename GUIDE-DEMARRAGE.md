# Guide de démarrage - AM Couverture Lead Gen

## Étape 1 : Créer le projet en local

Ouvre ton terminal (PowerShell ou CMD) et tape ces commandes une par une :

```bash
cd C:\Dev
mkdir "AM Construction"
cd "AM Construction"
npx create-next-app@latest .
```

Le point `.` à la fin dit à Next.js de créer le projet DANS le dossier actuel (sans créer de sous-dossier).

Quand il te pose des questions, réponds comme ça :
- ✔ Would you like to use TypeScript? → **Yes**
- ✔ Would you like to use ESLint? → **Yes**
- ✔ Would you like to use Tailwind CSS? → **Yes**
- ✔ Would you like your code inside a `src/` directory? → **No**
- ✔ Would you like to use App Router? → **Yes**
- ✔ Would you like to use Turbopack for next dev? → **Yes**
- ✔ Would you like to customize the import alias? → **No**

## Étape 2 : Initialiser Git et connecter à GitHub

```bash
git init
git add .
git commit -m "Initial commit - Next.js setup"
```

Ensuite, va sur https://github.com/new et crée un nouveau repo nommé `am-construction` (laisse tout par défaut, ne coche PAS "Add a README").

Puis dans ton terminal :

```bash
git remote add origin https://github.com/TON-USERNAME/am-construction.git
git branch -M main
git push -u origin main
```

(Remplace `TON-USERNAME` par ton nom d'utilisateur GitHub)

---

## Étape 3 : Déployer sur Vercel

1. Va sur https://vercel.com et connecte-toi avec GitHub
2. Clique sur "Add New Project"
3. Sélectionne le repo `am-construction`
4. Clique "Deploy" (les settings par défaut sont parfaits pour Next.js)
5. Une fois déployé, va dans Settings > Domains > ajoute ton nom de domaine

---

## Étape 4 : Installer les dépendances utiles

Dans ton terminal (dans le dossier du projet) :

```bash
npm install lucide-react resend google-spreadsheet google-auth-library
```

C'est tout ! Voici ce que chaque package fait :
- `lucide-react` : icônes légères (téléphone, check, étoiles, etc.)
- `resend` : envoi des emails (confirmation prospect + notification commercial)
- `google-spreadsheet` : écriture automatique des leads dans Google Sheet
- `google-auth-library` : authentification avec le service account Google

---

## Étape 5 : Ajouter le CLAUDE.md

Copie le fichier CLAUDE.md fourni à la racine de ton projet :
`C:\Dev\AM Construction\CLAUDE.md`

---

## Étape 6 : Créer le dossier tasks

```bash
mkdir tasks
```

Crée un fichier `tasks/todo.md` vide — Claude Code l'utilisera pour planifier.

---

## Étape 7 : Créer le fichier .env.local

Crée un fichier `.env.local` à la racine du projet avec :

```
# Meta Ads Tracking (à remplir quand tu créeras le Pixel)
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_TOKEN=
META_PIXEL_ID=

# Resend (à remplir après inscription sur resend.com)
RESEND_API_KEY=
NOTIFICATION_EMAIL=email-du-commercial@exemple.com

# Google Sheets (à remplir après setup du Service Account)
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Infos entreprise
NEXT_PUBLIC_PHONE=06 XX XX XX XX
NEXT_PUBLIC_COMPANY_NAME=AM Couverture
NEXT_PUBLIC_SITE_URL=https://ton-domaine.com
```

Tu rempliras les valeurs au fur et à mesure. On configurera ensemble :
1. Resend → quand on code l'API route
2. Google Sheet → quand on setup le service account Google
3. Meta Pixel → quand tu crées ta première campagne

---

## Étape 8 : Ouvrir le projet dans Claude Code

```bash
cd "C:\Dev\AM Construction"
claude
```

Claude Code lira le CLAUDE.md automatiquement et suivra les instructions du projet.

---

## Prochaine étape

Dis-moi "done" quand tu as terminé ces étapes et on passera à la construction des landing pages avec Claude Code !

---

## Memo : Commandes de déploiement

À chaque fois que tu veux mettre à jour le site en ligne :

```bash
git add .
git commit -m "description de ce que tu as changé"
git push
```

Vercel détecte automatiquement le push et redéploie. C'est tout.
