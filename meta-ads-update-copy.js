#!/usr/bin/env node

/**
 * meta-ads-update-copy.js
 * Met à jour les ad copy sur P1, P2, P3, P6
 * Recrée les creatives (l'API Meta ne permet pas de modifier un creative existant)
 *
 * Usage: node meta-ads-update-copy.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('node:fs');
const path = require('node:path');

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID || 'act_1247430407284609';
const PAGE_ID = '1053175781205657';
const API_VERSION = 'v21.0';
const API_BASE = `https://graph.facebook.com/${API_VERSION}`;
const SITE_URL = 'https://www.am-couverture.net';

if (!ACCESS_TOKEN) {
  console.error('❌ META_ACCESS_TOKEN manquant dans .env.local');
  process.exit(1);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callMetaAPI(endpoint, params = {}, method = 'GET') {
  const url = new URL(`${API_BASE}/${endpoint}`);

  if (method === 'GET') {
    url.searchParams.set('access_token', ACCESS_TOKEN);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.error) throw new Error(`Meta API: ${data.error.message} (code ${data.error.code})`);
    return data;
  }

  const body = new URLSearchParams();
  body.append('access_token', ACCESS_TOKEN);
  for (const [key, value] of Object.entries(params)) {
    body.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }
  const res = await fetch(url.toString(), {
    method: 'POST',
    body: body.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  const data = await res.json();
  if (data.error) {
    console.error(`  🔍 Erreur API:\n${JSON.stringify(data.error, null, 2)}`);
    throw new Error(`Meta API: ${data.error.message} (code ${data.error.code})`);
  }
  return data;
}

async function uploadImage(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Fichier introuvable: ${absolutePath}`);
  }
  const fileBuffer = fs.readFileSync(absolutePath);
  const base64Data = fileBuffer.toString('base64');
  const fileName = path.basename(absolutePath);

  const result = await callMetaAPI(`${AD_ACCOUNT_ID}/adimages`, {
    bytes: base64Data,
    name: fileName,
  }, 'POST');

  const images = result.images;
  const firstKey = Object.keys(images)[0];
  return images[firstKey].hash;
}

async function fetchCreative(creativeId) {
  return callMetaAPI(creativeId, {
    fields: 'id,name,object_story_spec',
  });
}

// ============================================================
// UPDATE CONFIGS — only the 4 ads to modify
// ============================================================

const UPDATES = [
  // ---- P1 — Nouveau texte complet (CAROUSEL) ----
  {
    pubNum: 1,
    adId: '120243380216450572',
    name: 'Transformation Radicale',
    format: 'CAROUSEL',
    action: 'NEW_TEXT',
    landingPage: '/demoussage',
    utmContent: 'p1-transformation',
    primaryText: `Ces 3 propriétaires du Loiret repoussaient le nettoyage de leur toiture depuis des années.

Résultat après notre intervention : faites glisser →

Chaque toiture a été traitée en une demi-journée :
● Nettoyage basse pression (jamais de Kärcher)
● Traitement anti-mousse longue durée
● Hydrofuge protecteur — résultat garanti 5-10 ans

4.9/5 sur Google · Garantie décennale · Artisan local

→ Demandez votre devis gratuit en 24h`,
    headline: 'Ils repoussaient. Ils regrettent de ne pas l\'avoir fait plus tôt.',
    description: 'Devis gratuit en 24h · Artisan local Loiret (45)',
    slideHeadline: 'Voir le résultat →',
    slideDescription: 'Devis gratuit en 24h — Artisan local Loiret',
  },

  // ---- P2 — Nouvelle image (IMAGE) ----
  {
    pubNum: 2,
    adId: '120243380220650572',
    name: 'Diagnostic Offert',
    format: 'IMAGE',
    action: 'NEW_IMAGE',
    landingPage: '/demoussage',
    utmContent: 'p2-diagnostic',
    newImagePath: path.join(__dirname, 'ad-creatives', 'META ADS', 'PUB 2', 'pub2-diagnostic-offert.png'),
    // Text will be preserved from existing creative
  },

  // ---- P3 — Nouveau hook + CTA (IMAGE) ----
  {
    pubNum: 3,
    adId: '120243380222720572',
    name: 'Comparatif Choc',
    format: 'IMAGE',
    action: 'NEW_TEXT',
    landingPage: '/demoussage',
    utmContent: 'p3-comparatif',
    primaryText: `Votre toiture se dégrade chaque mois. Le coût de l'inaction ? 10 à 20x plus cher.

Chaque mois sans entretien, la mousse s'infiltre plus profond. Les tuiles deviennent poreuses. L'eau s'infiltre. Et un jour, c'est la charpente qui trinque.

À ce stade, ce n'est plus un nettoyage — c'est une rénovation complète.

La bonne nouvelle : un traitement préventif protège votre toit pour 5-10 ans. Et ça coûte une fraction du prix.

● Devis transparent, personnalisé
● Artisan certifié · Garantie décennale
● Intervention rapide dans tout le Loiret

→ Demandez votre devis gratuit — une demi-journée suffit`,
    headline: 'Prévention vs Rénovation — Le calcul est vite fait',
    description: '10-20x moins cher d\'agir maintenant · Devis gratuit en 24h · Loiret (45)',
  },

  // ---- P6 — 1 bullet modifiée (CAROUSEL) ----
  {
    pubNum: 6,
    adId: '120243380237610572',
    name: 'Rénovation Clé en Main',
    format: 'CAROUSEL',
    action: 'NEW_TEXT',
    landingPage: '/renovation',
    utmContent: 'p6-cle-en-main',
    primaryText: `Votre toiture a besoin de plus qu'un nettoyage ? On gère tout de A à Z.

Étape 1 → Diagnostic complet toiture + charpente
Étape 2 → Dépose et évacuation de l'ancienne couverture
Étape 3 → Pose de la nouvelle couverture + zinguerie
Étape 4 → Nettoyage du chantier + rapport photos

Résultat : un toit neuf, garanti 10 ans.

Pourquoi nous choisir :
● On ne sous-traite rien — notre équipe de A à Z
● Devis détaillé ligne par ligne, sans surprise
● Garantie décennale sur tous les travaux
● Artisan expérimenté — un seul interlocuteur du début à la fin

→ Demandez votre devis rénovation gratuit`,
    headline: 'Rénovation toiture complète — Garanti 10 ans',
    description: 'Diagnostic offert · On gère tout · Artisan local Loiret (45)',
    slideHeadline: 'Étape suivante →',
    slideDescription: 'Rénovation toiture garantie 10 ans',
  },
];

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('🔄 Meta Ads — Mise à jour ad copy (P1, P2, P3, P6)');
  console.log('====================================================\n');

  const report = [];

  for (const update of UPDATES) {
    const label = `P${update.pubNum}`;
    console.log(`━━━ ${label} — ${update.name} (${update.action}) ━━━`);

    try {
      // 1. Fetch current ad to get creative ID
      console.log(`  📋 Récupération de l'ad ${update.adId}...`);
      const adData = await callMetaAPI(update.adId, {
        fields: 'id,name,creative{id}',
      });
      const oldCreativeId = adData.creative?.id;
      console.log(`  📌 Creative actuel: ${oldCreativeId}`);

      // 2. Fetch current creative details
      const oldCreative = await fetchCreative(oldCreativeId);
      const oldSpec = oldCreative.object_story_spec;
      const oldLinkData = oldSpec?.link_data;

      // 3. Build the link URL
      const link = `${SITE_URL}${update.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=vague1&utm_content=${update.utmContent}`;

      let creativeParams;

      if (update.format === 'IMAGE') {
        // Get image hash — either from new upload or existing
        let imageHash;
        if (update.action === 'NEW_IMAGE') {
          console.log(`  📤 Upload nouvelle image: ${path.basename(update.newImagePath)}...`);
          imageHash = await uploadImage(update.newImagePath);
          console.log(`  ✅ Nouveau hash: ${imageHash}`);
        } else {
          imageHash = oldLinkData?.image_hash;
          console.log(`  📌 Image hash existant: ${imageHash}`);
        }

        // Get text — either new or from existing creative
        const primaryText = update.primaryText || oldLinkData?.message || '';
        const headline = update.headline || oldLinkData?.name || '';
        const description = update.description || oldLinkData?.description || '';

        creativeParams = {
          name: `Creative — ${label} — ${update.name} — v2`,
          object_story_spec: {
            page_id: PAGE_ID,
            link_data: {
              image_hash: imageHash,
              link: link,
              message: primaryText,
              name: headline,
              description: description,
              call_to_action: { type: 'LEARN_MORE', value: { link: link } },
            },
          },
        };
      } else {
        // CAROUSEL
        const children = oldLinkData?.child_attachments;
        if (!children || children.length === 0) {
          throw new Error('Pas de child_attachments dans le creative existant');
        }

        const childAttachments = children.map((child) => ({
          image_hash: child.image_hash,
          link: link,
          name: update.slideHeadline || update.headline,
          description: update.slideDescription || update.description,
          call_to_action: { type: 'LEARN_MORE', value: { link: link } },
        }));

        console.log(`  📌 ${childAttachments.length} slides récupérées`);

        creativeParams = {
          name: `Creative — ${label} — ${update.name} — v2`,
          object_story_spec: {
            page_id: PAGE_ID,
            link_data: {
              message: update.primaryText,
              link: link,
              child_attachments: childAttachments,
              multi_share_optimized: false,
              multi_share_end_card: false,
              call_to_action: { type: 'LEARN_MORE', value: { link: link } },
            },
          },
        };
      }

      // 4. Create new creative
      console.log(`  🎨 Création du nouveau creative...`);
      const newCreative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams, 'POST');
      const newCreativeId = newCreative.id;
      console.log(`  ✅ Nouveau creative: ${newCreativeId}`);

      // 5. Update ad to use new creative
      console.log(`  📢 Mise à jour de l'ad...`);
      await callMetaAPI(update.adId, {
        creative: { creative_id: newCreativeId },
      }, 'POST');
      console.log(`  ✅ Ad mise à jour\n`);

      report.push({
        pub: label,
        action: update.action,
        old_creative: oldCreativeId,
        new_creative: newCreativeId,
        status: '✅ OK',
      });

      await delay(1000);

    } catch (err) {
      console.error(`  ❌ ERREUR: ${err.message}\n`);
      report.push({
        pub: label,
        action: update.action,
        old_creative: '-',
        new_creative: '-',
        status: `❌ ${err.message.substring(0, 60)}`,
      });
    }
  }

  // Final report
  console.log('====================================================');
  console.log('📊 RAPPORT FINAL');
  console.log('====================================================\n');
  console.table(report);

  const successes = report.filter((r) => r.status.startsWith('✅')).length;
  const failures = report.filter((r) => r.status.startsWith('❌')).length;
  console.log(`\n✅ ${successes} creatives recréés`);
  if (failures > 0) console.log(`❌ ${failures} erreurs`);
  console.log('\n💡 Relancez node meta-ads-fix.js pour vérifier URLs et CTA');
}

main().catch((err) => {
  console.error('💥 Erreur fatale:', err.message);
  process.exit(1);
});
