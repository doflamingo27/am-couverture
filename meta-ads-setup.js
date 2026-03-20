#!/usr/bin/env node

/**
 * meta-ads-setup.js
 * Crée la campagne Meta Ads complète pour AM Couverture — Vague 1
 * 1 campagne + 1 ad set + 9 ads (tout en PAUSED)
 *
 * Usage: node meta-ads-setup.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('node:fs');
const path = require('node:path');

// ============================================================
// CONFIG
// ============================================================

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID || 'act_1247430407284609';
const PIXEL_ID = process.env.META_PIXEL_ID || '935146592304186';
const PAGE_ID = '1053175781205657';
const API_VERSION = 'v21.0';
const API_BASE = `https://graph.facebook.com/${API_VERSION}`;
const SITE_URL = 'https://www.am-couverture.net';

if (!ACCESS_TOKEN) {
  console.error('❌ META_ACCESS_TOKEN manquant dans .env.local');
  process.exit(1);
}

// ============================================================
// HELPERS
// ============================================================

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callMetaAPI(endpoint, params = {}, method = 'POST') {
  const url = `${API_BASE}/${endpoint}`;

  const body = new URLSearchParams();
  body.append('access_token', ACCESS_TOKEN);
  for (const [key, value] of Object.entries(params)) {
    body.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { method, body: body.toString(), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      const data = await res.json();
      if (data.error) {
        const errDetail = JSON.stringify(data.error, null, 2);
        console.error(`  🔍 Détails erreur API:\n${errDetail}`);
        throw new Error(`Meta API Error: ${data.error.message} (code ${data.error.code})`);
      }
      return data;
    } catch (err) {
      if (attempt === 0 && !err.message.includes('Meta API Error')) {
        console.warn(`  ⚠️  Retry dans 2s: ${err.message}`);
        await delay(2000);
      } else {
        throw err;
      }
    }
  }
}

async function uploadImage(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Fichier introuvable: ${absolutePath}`);
  }

  // Lire le fichier et encoder en base64
  const fileBuffer = fs.readFileSync(absolutePath);
  const base64Data = fileBuffer.toString('base64');
  const fileName = path.basename(absolutePath);

  // Utiliser le paramètre bytes (base64) au lieu de multipart upload
  const result = await callMetaAPI(`${AD_ACCOUNT_ID}/adimages`, {
    bytes: base64Data,
    name: fileName,
  });

  // Extraire le hash depuis la réponse { images: { filename: { hash: "xxx" } } }
  const images = result.images;
  const firstKey = Object.keys(images)[0];
  return images[firstKey].hash;
}

// ============================================================
// PUB CONFIGS — 9 pubs avec textes complets
// ============================================================

const ADS_DIR = path.join(__dirname, 'ad-creatives', 'META ADS');

const PUB_CONFIGS = [
  // ---- PUB 1 — Transformation Radicale (Carousel 3) ----
  {
    num: 1,
    name: 'Transformation Radicale',
    format: 'CAROUSEL',
    landingPage: '/demoussage',
    utmContent: 'p1-transformation',
    primaryText: `Même maison. Même toit. Résultat méconnaissable.

Faites glisser pour voir 3 transformations de toitures dans le Loiret →

Nos clients ne s'attendaient pas à un tel résultat.
Vous non plus, vous ne vous y attendrez pas.

● 4.9/5 sur Google
● Garantie décennale
● Devis gratuit en 24h

→ Obtenez votre devis gratuit`,
    headline: 'Démoussage + Hydrofuge — Résultat garanti',
    description: 'Artisan local Loiret · Rappel sous 2h · Devis gratuit',
    slideHeadline: 'Voir le résultat →',
    slideDescription: 'Devis gratuit en 24h — Artisan local Loiret',
    images: [
      path.join(ADS_DIR, 'PUB 1', 'Slide1.png'),
      path.join(ADS_DIR, 'PUB 1', 'Slide2.png'),
      path.join(ADS_DIR, 'PUB 1', 'Slide3.png'),
    ],
  },

  // ---- PUB 2 — Diagnostic Offert (Image) ----
  {
    num: 2,
    name: 'Diagnostic Offert',
    format: 'IMAGE',
    landingPage: '/demoussage',
    utmContent: 'p2-diagnostic',
    primaryText: `Vous ne savez pas dans quel état est votre toiture ?

On monte. On inspecte. On vous dit tout. Gratuitement.

Notre diagnostic complet comprend :
● Inspection visuelle de chaque tuile
● Identification des zones à risque
● Devis détaillé sans engagement

Intervention dans tout le Loiret (45).
Rappel sous 2h.

→ Réservez votre diagnostic offert`,
    headline: 'Diagnostic Toiture GRATUIT — Sans engagement',
    description: 'On monte, on inspecte, on vous dit tout. Rappel sous 2h.',
    images: [
      path.join(ADS_DIR, 'PUB 2', 'pub2-diagnostic-offert.png'),
    ],
  },

  // ---- PUB 3 — Comparatif Choc (Image) ----
  {
    num: 3,
    name: 'Comparatif Choc',
    format: 'IMAGE',
    landingPage: '/demoussage',
    utmContent: 'p3-comparatif',
    primaryText: `Un nettoyage préventif coûte 10 à 20x moins cher qu'une rénovation complète.

Votre toiture se dégrade chaque jour sous la mousse. Plus vous attendez, plus la facture grimpe.

● Diagnostic gratuit sous 24h
● Artisan local certifié — Loiret (45)
● Devis transparent et personnalisé

→ Demandez votre devis gratuit`,
    headline: 'Nettoyage préventif vs Rénovation — Le calcul est vite fait',
    description: '10-20x moins cher que la rénovation · Devis gratuit · Loiret (45)',
    images: [
      path.join(ADS_DIR, 'PUB 3', 'pub3-comparatif-choc.png'),
    ],
  },

  // ---- PUB 4 — Bouclier Anti-Mousse (Image) ----
  {
    num: 4,
    name: 'Bouclier Anti-Mousse',
    format: 'IMAGE',
    landingPage: '/demoussage',
    utmContent: 'p4-bouclier',
    primaryText: `Votre voisin a fait nettoyer son toit il y a 2 ans. La mousse est déjà revenue.

Pourquoi ? Parce qu'un simple nettoyage ne suffit pas.

Notre traitement hydrofuge professionnel protège vos tuiles pendant 5 à 10 ans. Pas 1 an. Pas 2 ans. Minimum 5 ans, garanti.

● Nettoyage basse pression (pas de Kärcher)
● Traitement anti-mousse longue durée
● Application hydrofuge protecteur
● Garantie décennale

→ Demandez votre devis détaillé`,
    headline: 'Avec hydrofuge : protection 5-10 ans. Sans : la mousse revient en 1 an.',
    description: 'Nettoyage + hydrofuge pro · Protection 5-10 ans garantie · Loiret (45)',
    images: [
      path.join(ADS_DIR, 'PUB 4', 'pub4-bouclier-v2.png'),
    ],
  },

  // ---- PUB 5 — Dégâts Invisibles (Image) ----
  {
    num: 5,
    name: 'Dégâts Invisibles',
    format: 'IMAGE',
    landingPage: '/demoussage-v2',
    utmContent: 'p5-degats',
    primaryText: `Depuis le sol, votre toit a l'air normal.

Mais montez dessus et voilà ce qu'on trouve :
● Mousse qui retient l'humidité 24h/24
● Tuiles devenues poreuses et fragiles
● Micro-fissures invisibles à l'œil nu

Le problème ? Quand vous le voyez depuis le sol, il est déjà trop tard.

On vérifie pour vous. Gratuitement. Sans engagement.

→ Réservez votre inspection gratuite`,
    headline: 'Votre Toit Cache des Dégâts — Inspection GRATUITE',
    description: 'Mousse, fissures, infiltrations invisibles depuis le sol. On vérifie pour vous.',
    images: [
      path.join(ADS_DIR, 'PUB 5', 'pub5-degats-invisibles.png'),
    ],
  },

  // ---- PUB 6 — Rénovation Clé en Main (Carousel 4) ----
  {
    num: 6,
    name: 'Rénovation Clé en Main',
    format: 'CAROUSEL',
    landingPage: '/renovation',
    utmContent: 'p6-cle-en-main',
    primaryText: `Votre toiture a besoin de plus qu'un nettoyage ?

On gère tout. De A à Z.

Étape 1 : Diagnostic complet de la toiture et charpente
Étape 2 : Dépose et évacuation de l'ancienne couverture
Étape 3 : Pose de la nouvelle couverture + zinguerie
Étape 4 : Nettoyage du chantier + rapport photos

Résultat : un toit neuf, garanti 10 ans (décennale).

Artisan local — Loiret (45)
Rappel sous 2h

→ Demandez votre devis rénovation`,
    headline: 'Rénovation Toiture Complète — Garanti 10 ans',
    description: 'On gère tout de A à Z · Devis gratuit · Artisan local Loiret',
    slideHeadline: 'Étape suivante →',
    slideDescription: 'Rénovation toiture garantie 10 ans',
    images: [
      path.join(ADS_DIR, 'PUB 6', 'pub6-slide1-v2.png'),
      path.join(ADS_DIR, 'PUB 6', 'pub6-slide2-v2.png'),
      path.join(ADS_DIR, 'PUB 6', 'pub6-slide3-v2.png'),
      path.join(ADS_DIR, 'PUB 6', 'pub6-slide4-v2.png'),
    ],
  },

  // ---- PUB 7 — Protecteur de Patrimoine (Image) ----
  {
    num: 7,
    name: 'Protecteur de Patrimoine',
    format: 'IMAGE',
    landingPage: '/renovation',
    utmContent: 'p7-patrimoine',
    primaryText: `Votre toiture représente 15% de la valeur de votre maison.

Si elle est abîmée, c'est tout votre bien qui perd de la valeur.

Une rénovation de toiture, c'est :
● Valeur immobilière préservée
● Zéro risque d'infiltration pour 30+ ans
● Une maison qui retrouve son cachet

Artisan local dans le Loiret — Devis transparent et personnalisé.

→ Demandez votre devis rénovation`,
    headline: 'Protégez la Valeur de Votre Bien — Devis Gratuit',
    description: 'Votre toiture = 15% de la valeur de votre maison. Rénovation garantie 10 ans.',
    images: [
      path.join(ADS_DIR, 'PUB 7', 'pub7-protecteur-patrimoine.png'),
    ],
  },

  // ---- PUB 8 — La Maison qui Reprend Vie (Carousel 4) ----
  {
    num: 8,
    name: 'La Maison qui Reprend Vie',
    format: 'CAROUSEL',
    landingPage: '/renovation',
    utmContent: 'p8-reprend-vie',
    primaryText: `Cette maison dans le Loiret avait un toit qui prenait l'eau depuis 3 ans.

Aujourd'hui, elle a repris 10 ans de vie.

Faites glisser pour voir la transformation →

Ce qu'on a fait :
● Dépose complète de l'ancienne couverture
● Vérification et renforcement charpente
● Pose tuiles neuves + zinguerie complète
● Résultat garanti 10 ans (décennale)

→ Demandez votre devis rénovation`,
    headline: 'Avant / En cours / Après — Rénovation Toiture Complète',
    description: 'Elle a repris 10 ans de vie · Garanti décennale · Devis gratuit',
    slideHeadline: 'Voir la suite →',
    slideDescription: 'Rénovation complète — Garanti 10 ans',
    images: [
      path.join(ADS_DIR, 'PUB 8', 'pub8-slide1-avant.png'),
      path.join(ADS_DIR, 'PUB 8', 'pub8-slide2-encours.png'),
      path.join(ADS_DIR, 'PUB 8', 'pub8-slide3-apres.png'),
      path.join(ADS_DIR, 'PUB 8', 'pub8-slide4-cta.png'),
    ],
  },

  // ---- PUB 9 — Transformation Rénovation (Carousel 3) ----
  {
    num: 9,
    name: 'Transformation Rénovation',
    format: 'CAROUSEL',
    landingPage: '/renovation',
    utmContent: 'p9-transformation-reno',
    primaryText: `Même maison. Toit neuf. Transformation totale.

Faites glisser pour voir 3 rénovations de toitures dans le Loiret →

Tuiles cassées, fuites, gouttières rouillées... et après notre passage, un toit neuf garanti 10 ans.

● Dépose + pose complète
● Zinguerie neuve
● Garantie décennale
● Devis gratuit en 24h

→ Obtenez votre devis rénovation`,
    headline: 'Rénovation Toiture Avant / Après — Garanti 10 ans',
    description: 'Toiture neuve · Garanti décennale · Artisan local Loiret (45)',
    slideHeadline: 'Voir le résultat →',
    slideDescription: 'Rénovation toiture garantie 10 ans — Loiret (45)',
    images: [
      path.join(ADS_DIR, 'PUB 9', 'pub9-slide1-reno.png'),
      path.join(ADS_DIR, 'PUB 9', 'pub9-slide2-reno.png'),
    ],
  },
];

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('🚀 Meta Ads Setup — AM Couverture — Vague 1');
  console.log('============================================\n');

  // Vérifier que tous les fichiers images existent
  console.log('📁 Vérification des fichiers images...');
  let allFilesExist = true;
  for (const pub of PUB_CONFIGS) {
    for (const img of pub.images) {
      if (!fs.existsSync(img)) {
        console.error(`  ❌ MANQUANT: ${img}`);
        allFilesExist = false;
      }
    }
  }
  if (!allFilesExist) {
    console.error('\n❌ Des fichiers images manquent. Corrigez avant de relancer.');
    process.exit(1);
  }
  console.log('  ✅ Tous les fichiers images trouvés\n');

  // ---- ÉTAPE 1 : Créer la campagne ----
  console.log('📌 ÉTAPE 1 — Création de la campagne...');
  const campaign = await callMetaAPI(`${AD_ACCOUNT_ID}/campaigns`, {
    name: 'Lead Gen — AM Couverture — Vague 1',
    objective: 'OUTCOME_LEADS',
    special_ad_categories: [],
    daily_budget: 3200,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    status: 'PAUSED',
  });
  const campaignId = campaign.id;
  console.log(`  ✅ Campagne créée: ${campaignId}\n`);

  await delay(1000);

  // ---- ÉTAPE 2 : Créer l'ad set ----
  console.log('📌 ÉTAPE 2 — Création de l\'ad set...');
  const adset = await callMetaAPI(`${AD_ACCOUNT_ID}/adsets`, {
    name: 'Loiret Large — 30-65 ans — Advantage+',
    campaign_id: campaignId,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'OFFSITE_CONVERSIONS',
    targeting: {
      geo_locations: { regions: [{ key: '1498' }] },
      age_min: 30,
      age_max: 65,
      locales: [6],
    },
    promoted_object: {
      pixel_id: PIXEL_ID,
      custom_event_type: 'LEAD',
    },
    dsa_beneficiary: 'AM Couverture',
    dsa_payor: 'AM Couverture',
    status: 'PAUSED',
  });
  const adsetId = adset.id;
  console.log(`  ✅ Ad Set créé: ${adsetId}\n`);

  await delay(1000);

  // ---- ÉTAPE 3 & 4 : Upload images + Créer ads ----
  console.log('📌 ÉTAPE 3 & 4 — Upload images + Création des ads...\n');

  const report = [];

  for (const pub of PUB_CONFIGS) {
    const pubLabel = `P${pub.num}`;
    console.log(`  🔄 ${pubLabel} — ${pub.name} (${pub.format})...`);

    try {
      // Upload images
      const imageHashes = [];
      for (let i = 0; i < pub.images.length; i++) {
        const imgPath = pub.images[i];
        const fileName = path.basename(imgPath);
        console.log(`    📤 Upload ${fileName}...`);
        const hash = await uploadImage(imgPath);
        imageHashes.push(hash);
        console.log(`    ✅ Hash: ${hash}`);
        await delay(500);
      }

      // Créer l'ad creative
      const link = `${SITE_URL}${pub.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=vague1&utm_content=${pub.utmContent}`;
      let creativeParams;

      if (pub.format === 'IMAGE') {
        // Image unique
        creativeParams = {
          name: `Creative — ${pubLabel} — ${pub.name}`,
          object_story_spec: {
            page_id: PAGE_ID,
            link_data: {
              image_hash: imageHashes[0],
              link: link,
              message: pub.primaryText,
              name: pub.headline,
              description: pub.description,
              call_to_action: { type: 'LEARN_MORE', value: { link: link } },
            },
          },
        };
      } else {
        // Carousel
        const childAttachments = imageHashes.map((hash) => ({
          image_hash: hash,
          link: link,
          name: pub.slideHeadline || pub.headline,
          description: pub.slideDescription || pub.description,
          call_to_action: { type: 'LEARN_MORE', value: { link: link } },
        }));

        creativeParams = {
          name: `Creative — ${pubLabel} — ${pub.name}`,
          object_story_spec: {
            page_id: PAGE_ID,
            link_data: {
              message: pub.primaryText,
              link: link,
              child_attachments: childAttachments,
              multi_share_optimized: false,
              multi_share_end_card: false,
            },
          },
        };
      }

      console.log(`    🎨 Création du creative...`);
      const creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams);
      const creativeId = creative.id;
      console.log(`    ✅ Creative: ${creativeId}`);

      await delay(500);

      // Créer l'ad
      const formatLabel = pub.format === 'IMAGE' ? 'Image' : `Carrousel ${pub.images.length}`;
      console.log(`    📢 Création de l'ad...`);
      const ad = await callMetaAPI(`${AD_ACCOUNT_ID}/ads`, {
        name: `${pubLabel} — ${pub.name} — ${formatLabel}`,
        adset_id: adsetId,
        creative: { creative_id: creativeId },
        status: 'PAUSED',
      });
      const adId = ad.id;
      console.log(`    ✅ Ad: ${adId}`);

      report.push({
        pub: pubLabel,
        nom: pub.name,
        format: formatLabel,
        creative_id: creativeId,
        ad_id: adId,
        status: '✅ PAUSED',
      });

      console.log(`  ✅ ${pubLabel} terminé\n`);
      await delay(1000);

    } catch (err) {
      console.error(`  ❌ ${pubLabel} ERREUR: ${err.message}\n`);
      report.push({
        pub: pubLabel,
        nom: pub.name,
        format: pub.format,
        creative_id: '-',
        ad_id: '-',
        status: `❌ ${err.message.substring(0, 50)}`,
      });
    }
  }

  // ---- RAPPORT FINAL ----
  console.log('\n============================================');
  console.log('📊 RAPPORT FINAL');
  console.log('============================================\n');
  console.log(`Campaign ID: ${campaignId}`);
  console.log(`Ad Set ID:   ${adsetId}\n`);
  console.table(report);

  const successes = report.filter((r) => r.status.startsWith('✅')).length;
  const failures = report.filter((r) => r.status.startsWith('❌')).length;
  console.log(`\n✅ ${successes} ads créées avec succès`);
  if (failures > 0) {
    console.log(`❌ ${failures} ads en erreur`);
  }
  console.log('\n⚠️  Tout est en PAUSED — Activez manuellement dans Meta Ads Manager.');
}

main().catch((err) => {
  console.error('💥 Erreur fatale:', err.message);
  process.exit(1);
});
