# GUIDELINES GÉNÉRATION CRÉATIVES META ADS
## AM Couverture · Loiret (45)
### Document de référence pour Claude Code

---

## 1. PHOTOS — Règles de cohérence

- Chaque paire AVANT/APRÈS doit montrer LA MÊME MAISON — seul le toit change
- Jardin, volets, porte, portail, allée, clôture = IDENTIQUES
- Même angle de prise de vue (le plus important)
- Façade propre — PAS de moisissure noire sur les murs
- Feuillages et végétation identiques entre les photos

---

## 2. PHOTOS — Niveau de dégradation

- Dégâts localisés à un seul endroit sur la toiture (pas sur tout le toit)
- Le reste du toit est vieillot avec de la mousse légère
- Pas d'exagération — doit être réaliste et crédible
- Différence entre démoussage (toit moussue mais intact) et rénovation (tuiles cassées/manquantes, faîtage abîmé, gouttières rouillées)

---

## 3. PHOTOS — Style technique

- Prompt suffix obligatoire :
```
"Realistic photograph, Canon EOS R5, 35mm, f/8, natural lighting, French suburban neighborhood Loiret style, no text, no watermark, no AI signature"
```
- AVANT : ciel gris couvert, atmosphère morne
- APRÈS : ciel bleu/éclaircies, atmosphère chaleureuse
- Maisons style Loiret (pavillons français suburbains)
- MCP mcp-image avec `quality="quality"` pour le modèle pro Gemini
- Utiliser `inputImagePath` de la photo AVANT pour générer l'APRÈS (cohérence)

---

## 4. SLIDES HTML — Layout avant/après (Pub 1 / Pub 9)

- Moitié haute (540px) : Photo AVANT avec badge rouge "AVANT" en haut gauche
- Moitié basse (540px) : Photo APRÈS avec badge vert "APRÈS" en haut gauche
- Barre en bas (~60px) fond sombre : texte localisation + type de travaux
- Dernière slide : badges `4.9/5 + Décennale` + logo AM COUVERTURE

---

## 5. SLIDES HTML — Layout storytelling (Pub 6 / Pub 8)

- Photo plein écran + overlay gradient : `linear-gradient(transparent 30%, rgba(0,0,0,0.85) 65%)`
- Pill badge couleur (rouge AVANT / orange EN COURS / vert APRÈS)
- Titre blanc bold en bas
- Barre de progression en bas gauche (segments chartreuse + gris)
- Logo AM COUVERTURE bas droite

---

## 6. SLIDE CTA (dernière slide)

- Fond noir `#0A0A0A`
- Titre blanc bold 36px
- Sous-titre gris 18px
- Puces chartreuse `#B8CC30` (pas d'emojis)
- Bouton chartreuse : "DEVIS GRATUIT →" texte noir bold
- Badges en gris : "Décennale / 4.9/5 / Artisan local Loiret"

---

## 7. COULEURS

| Élément | Hex |
|---------|-----|
| Accent / marque | `#B8CC30` (chartreuse atténuée, PAS `#CCFF00` trop fluo) |
| Fond sombre | `#0F172A` |
| Badge AVANT | `#DC2626` (rouge) |
| Badge EN COURS | `#F97316` (orange) |
| Badge APRÈS | `#16A34A` (vert) |
| CTA | `#B8CC30` fond, texte noir |

---

## 8. RÈGLES ABSOLUES

- PAS D'EMOJIS — nulle part
- PAS de logo central — tu le fais toi-même sur Canva
- PAS de prix spécifiques — "Devis gratuit", "10-20x moins cher"
- PAS de photos stock — style chantier réel
- PAS de texte excessif sur l'image (Andromeda pénalise)
- Max 20% de texte sur l'image
- Chaque créative doit être visuellement distincte (Entity ID diversity Andromeda)

---

## 9. WORKFLOW GÉNÉRATION

```
1. Générer photo AVANT via mcp-image
2. Copier en .png pour servir d'input
3. Générer photo APRÈS avec inputImagePath pointant vers l'AVANT
4. Copier les images dans slides/ en .jpg
5. Créer les HTML dans ad-creatives/slides/
6. Screenshot via Playwright (1080x1080 viewport)
7. Output final dans ad-creatives/
```
