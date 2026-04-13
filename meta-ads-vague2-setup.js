#!/usr/bin/env node

/**
 * meta-ads-vague2-setup.js
 * Crée les campagnes Meta Ads — Vague 2 Printemps 2026 — AM Couverture
 * 2 campagnes + 2 ad sets + 5 ads (tout en PAUSED)
 *
 * Campagne 1 : TOF Prospection Printemps (27€/j, 4 pubs C1-C4)
 * Campagne 2 : BOF Retargeting Offre Printemps (3€/j, 1 pub C5)
 *
 * Usage: node meta-ads-vague2-setup.js
 */

require('dotenv').config({ path: require('node:path').join(__dirname, '.env.local') });
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

async function callMetaAPIGet(endpoint, params = {}) {
  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.append('access_token', ACCESS_TOKEN);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  const res = await fetch(url.toString(), { method: 'GET' });
  const data = await res.json();
  if (data.error) {
    const errDetail = JSON.stringify(data.error, null, 2);
    console.error(`  🔍 Détails erreur API GET:\n${errDetail}`);
    throw new Error(`Meta API Error: ${data.error.message} (code ${data.error.code})`);
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
  });

  const images = result.images;
  const firstKey = Object.keys(images)[0];
  return images[firstKey].hash;
}

// ============================================================
// CUSTOM AUDIENCE — Visiteurs site web 14 jours
// ============================================================

async function getOrCreateWebsiteCustomAudience() {
  const audienceName = 'Visiteurs du site web — 14 derniers jours';
  console.log('  🔍 Recherche custom audience existante...');

  const existing = await callMetaAPIGet(`${AD_ACCOUNT_ID}/customaudiences`, {
    fields: 'id,name',
    limit: 100,
  });

  if (existing.data && existing.data.length > 0) {
    const match = existing.data.find((a) =>
      a.name.toLowerCase().includes('14') && a.name.toLowerCase().includes('visiteur')
    );
    if (match) {
      console.log(`  ✅ Audience trouvée: ${match.name} (${match.id})`);
      return match.id;
    }
  }

  console.log('  📌 Audience non trouvée — création...');
  const result = await callMetaAPI(`${AD_ACCOUNT_ID}/customaudiences`, {
    name: audienceName,
    prefill: true,
    retention_days: 14,
    rule: {
      inclusions: {
        operator: 'or',
        rules: [{
          event_sources: [{ id: PIXEL_ID, type: 'pixel' }],
          retention_seconds: 1209600,
          filter: { operator: 'and', filters: [{ field: 'url', operator: 'i_contains', value: '' }] },
        }],
      },
    },
  });

  console.log(`  ✅ Audience créée: ${result.id}`);
  return result.id;
}

// ============================================================
// ADVANTAGE+ CREATIVE ENHANCEMENTS
// ============================================================

function getAdvantagePlusSpec() {
  return {
    creative_features_spec: {
      standard_enhancements_catalog: { enroll_status: 'OPT_IN' },
    },
  };
}

// ============================================================
// GEO TARGETING — Loiret (identique sur les 2 adsets)
// ============================================================

const GEO_TARGETING = {
  geo_locations: {
    cities: [
      { key: '739674', radius: 17, distance_unit: 'kilometer' },  // Briare
      { key: '746262' },                                           // Courtenay
      { key: '752260', radius: 20, distance_unit: 'kilometer' },  // Gien
      { key: '773818', radius: 25, distance_unit: 'kilometer' },  // Montargis
      { key: '777266', radius: 40, distance_unit: 'kilometer' },  // Orléans
      { key: '779169', radius: 20, distance_unit: 'kilometer' },  // Pithiviers
      { key: '792289', radius: 17, distance_unit: 'kilometer' },  // Sully-sur-Loire
    ],
    location_types: ['home', 'recent'],
  },
};

// ============================================================
// PUB CONFIGS — 5 pubs Vague 2
// ============================================================

const C2_DIR = path.join(__dirname, 'ad-creatives', 'META ADS', 'CAMPAGNE 2');

const PUB_CONFIGS = [
  // ---- C1 — Le Printemps des Toitures (Carrousel 3) ----
  {
    num: 1,
    name: 'Le Printemps des Toitures',
    format: 'CAROUSEL',
    campaign: 1,
    landingPage: '/promo-printemps',
    utmCampaign: 'demoussage-printemps',
    utmContent: 'c1-promo-printemps',
    primaryText: `Ce printemps, votre toiture mérite mieux qu'une mousse qui l'abîme en silence.

Les 3 chantiers que vous voyez ici : tous dans le Loiret. Avant : mousse, lichen, tuiles ternies. Après : propre, protégée, hydrofugée pour 5 à 10 ans.

Offre printemps — valable jusqu'au 21 avril :
● Démoussage toiture : 11€/m²
● Traitement hydrofuge toiture : 13€/m²
● Traitement hydrofuge façade : 9€/m²

4.9/5 sur Google · Garantie décennale · Artisan local Loiret (45)

→ Demandez votre devis gratuit`,
    headline: 'Offre Printemps — Toiture propre dès 11€/m²',
    description: 'Artisan certifié Loiret · Rappel sous 2h · Valable jusqu\'au 21 avril',
    slides: [
      { image: path.join(C2_DIR, 'C1', 'Slide1.png'), headline: 'Avant → Après : même maison', description: 'Démoussage complet + hydrofuge Loiret' },
      { image: path.join(C2_DIR, 'C1', 'Slide2.png'), headline: 'Résultat visible dès le lendemain', description: 'Nettoyage basse pression · jamais de Karcher' },
      { image: path.join(C2_DIR, 'C1', 'Slide3.png'), headline: 'Devis gratuit — Offre 21 avril', description: '4.9/5 · Décennale · Artisan local' },
    ],
  },

  // ---- C2 — Rénovation Clé en Main (Carrousel 4) ----
  {
    num: 2,
    name: 'Rénovation Clé en Main',
    format: 'CAROUSEL',
    campaign: 1,
    landingPage: '/renovation',
    utmCampaign: 'renovation-printemps',
    utmContent: 'c2-renovation-cle-en-main',
    primaryText: `Votre toiture abîmée, c'est tout un chantier. Voici exactement comment on s'en occupe — du début à la fin.

Glissez pour voir les 4 étapes →

Étape 1 : On monte inspecter — toiture ET charpente. Gratuit.
Étape 2 : Dépose complète de l'ancienne couverture.
Étape 3 : Pose de la couverture neuve + zinguerie complète.
Étape 4 : Votre maison retrouve 10 ans de vie.

Un seul artisan du début à la fin.
Devis détaillé, prix ferme, aucune mauvaise surprise.

● Garantie décennale 10 ans
● 4.9/5 sur Google
● Artisan local Loiret (45)

→ Demandez votre devis rénovation gratuit`,
    headline: 'Rénovation toiture — 4 étapes, 1 artisan, garanti 10 ans',
    description: 'Diagnostic offert · Devis gratuit · Artisan local Loiret (45)',
    slides: [
      { image: path.join(C2_DIR, 'C2', 'pub6-slide1-v2.png'), headline: 'Étape 1 — Diagnostic offert →', description: 'Inspection complète toiture + charpente' },
      { image: path.join(C2_DIR, 'C2', 'pub6-slide2-v2.png'), headline: 'Étape 2 — Dépose complète →', description: 'Retrait et évacuation de l\'ancienne couverture' },
      { image: path.join(C2_DIR, 'C2', 'pub6-slide3-v2.png'), headline: 'Étape 3 — Couverture neuve →', description: 'Tuiles neuves + zinguerie complète' },
      { image: path.join(C2_DIR, 'C2', 'pub6-slide4-v2.png'), headline: 'Résultat — Garanti 10 ans', description: 'Décennale · 4.9/5 · Artisan local Loiret' },
    ],
  },

  // ---- C3 — Bouclier Hydrofuge (Image) ----
  {
    num: 3,
    name: 'Bouclier Hydrofuge',
    format: 'IMAGE',
    campaign: 1,
    landingPage: '/promo-printemps',
    utmCampaign: 'demoussage-printemps',
    utmContent: 'c3-bouclier-hydrofuge',
    primaryText: `La mousse sur votre toit est revenue en 1 an ? C'est normal — sans hydrofuge, le nettoyage seul ne suffit pas.

La différence, c'est le traitement qu'on applique après le nettoyage. Il rend vos tuiles imperméables. La mousse ne peut plus s'accrocher.

Résultat : 5 à 10 ans de protection garantie.

Ce printemps, profitez de notre offre :
● Démoussage toiture : 11€/m²
● Traitement hydrofuge toiture : 13€/m²
● Traitement hydrofuge façade : 9€/m²

4.9/5 sur Google · Garantie décennale · Artisan local Loiret (45)
Valable jusqu'au 21 avril — Places limitées

→ Demandez votre devis gratuit`,
    headline: 'Sans hydrofuge, la mousse revient en 1 an — Offre printemps',
    description: 'Protection 5-10 ans · Artisan certifié · Devis gratuit Loiret (45)',
    images: [path.join(C2_DIR, 'C3', 'C3-bouclier--offre-printemps.jpg')],
  },

  // ---- C4 — Elle a Repris 10 Ans de Vie (Carrousel 4) ----
  {
    num: 4,
    name: 'Elle a Repris 10 Ans de Vie',
    format: 'CAROUSEL',
    campaign: 1,
    landingPage: '/renovation',
    utmCampaign: 'renovation-printemps',
    utmContent: 'c4-reprend-vie',
    primaryText: `Cette maison dans le Loiret prenait l'eau depuis 3 ans. Faites glisser pour voir ce qu'on a fait →

Le propriétaire repoussait les travaux. Quand il a appelé, la charpente commençait à souffrir. On est intervenu en 2 semaines :

● Dépose complète de l'ancienne couverture
● Vérification et renforcement de la charpente
● Pose de tuiles neuves + zinguerie complète
● Nettoyage intégral du chantier

Résultat : un toit neuf, garanti 10 ans. Et une maison qui a repris 10 ans de vie.

4.9/5 sur Google · Garantie décennale · Artisan local Loiret (45)

→ Demandez votre devis rénovation gratuit`,
    headline: 'Elle a repris 10 ans de vie — Rénovation complète Loiret',
    description: 'Avant / En cours / Après · Garanti 10 ans · Devis gratuit',
    slides: [
      { image: path.join(C2_DIR, 'C4', 'pub8-slide1-avant.png'), headline: 'Cette toiture a pris l\'eau 3 ans →', description: 'Dégât urgent — la charpente commençait à souffrir' },
      { image: path.join(C2_DIR, 'C4', 'pub8-slide2-encours.png'), headline: 'On est intervenu en 2 semaines →', description: 'Dépose complète + vérification charpente' },
      { image: path.join(C2_DIR, 'C4', 'pub8-slide3-apres.png'), headline: 'Elle a repris 10 ans de vie', description: 'Toiture neuve · Garantie décennale · Résultat bluffant' },
      { image: path.join(C2_DIR, 'C4', 'pub8-slide4-cta.png'), headline: 'Devis gratuit — Réponse sous 24h', description: 'Décennale · 4.9/5 · Artisan local Loiret (45)' },
    ],
  },

  // ---- C5 — Offre Printemps — Dernière Chance (Image) — Retargeting ----
  {
    num: 5,
    name: 'Offre Printemps — Dernière Chance',
    format: 'IMAGE',
    campaign: 2,
    landingPage: '/promo-printemps',
    utmCampaign: 'retargeting-promo',
    utmContent: 'c5-urgence',
    primaryText: `Vous avez visité notre site. L'offre printemps est toujours là — jusqu'au 21 avril.

● Démoussage toiture : 11€/m²
● Traitement hydrofuge toiture : 13€/m²
● Traitement hydrofuge façade : 9€/m²

Artisan certifié Loiret (45) · Garantie décennale · 4.9/5 Google
Il reste des créneaux cette semaine.

→ Réservez votre devis gratuit maintenant`,
    headline: 'L\'offre printemps se termine le 21 avril',
    description: 'Démoussage 11€/m² · Hydrofuge 13€/m² · Rappel sous 2h · Loiret',
    images: [path.join(C2_DIR, 'C5', 'c5-reno-offre-printemps.jpg')],
  },
];

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('🚀 Meta Ads Setup — AM Couverture — Vague 2 Printemps 2026');
  console.log('=============================================================\n');

  // ---- Vérifier que tous les fichiers images existent ----
  console.log('📁 Vérification des fichiers images...');
  let allFilesExist = true;
  for (const pub of PUB_CONFIGS) {
    const imagePaths = pub.slides ? pub.slides.map((s) => s.image) : pub.images;
    for (const img of imagePaths) {
      if (!fs.existsSync(img)) {
        console.error(`  ❌ MANQUANT: ${img}`);
        allFilesExist = false;
      } else {
        console.log(`  ✅ ${path.relative(__dirname, img)}`);
      }
    }
  }
  if (!allFilesExist) {
    console.error('\n❌ Des fichiers images manquent. Corrigez avant de relancer.');
    process.exit(1);
  }
  console.log(`\n  ✅ ${PUB_CONFIGS.reduce((n, p) => n + (p.slides ? p.slides.length : p.images.length), 0)} fichiers images trouvés\n`);

  // ================================================================
  // CAMPAGNE 1 — TOF Prospection Printemps
  // ================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📌 CAMPAGNE 1 — TOF Prospection Printemps');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('  🔄 Création de la campagne...');
  const campaign1 = await callMetaAPI(`${AD_ACCOUNT_ID}/campaigns`, {
    name: 'TOF Prospection Printemps',
    objective: 'OUTCOME_LEADS',
    status: 'PAUSED',
    special_ad_categories: [],
    daily_budget: 2700,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  });
  const campaign1Id = campaign1.id;
  console.log(`  ✅ Campagne créée: ${campaign1Id}\n`);

  await delay(1000);

  console.log('  🔄 Création de l\'ad set "Loiret Large — Printemps"...');
  const adset1 = await callMetaAPI(`${AD_ACCOUNT_ID}/adsets`, {
    name: 'Loiret Large — Printemps',
    campaign_id: campaign1Id,
    optimization_goal: 'OFFSITE_CONVERSIONS',
    billing_event: 'IMPRESSIONS',
    status: 'PAUSED',
    attribution_spec: [
      { event_type: 'CLICK_THROUGH', window_days: 7 },
      { event_type: 'VIEW_THROUGH', window_days: 1 },
    ],
    targeting: {
      ...GEO_TARGETING,
      age_min: 30,
      age_max: 65,
      facebook_positions: ['feed', 'story', 'facebook_reels'],
      instagram_positions: ['stream', 'reels', 'story'],
      publisher_platforms: ['facebook', 'instagram', 'audience_network'],
      device_platforms: ['mobile', 'desktop'],
    },
    promoted_object: {
      pixel_id: PIXEL_ID,
      custom_event_type: 'LEAD',
    },
  });
  const adset1Id = adset1.id;
  console.log(`  ✅ Ad Set créé: ${adset1Id}\n`);

  await delay(1000);

  // Créer les 4 ads (C1-C4)
  const report = [];
  const tofPubs = PUB_CONFIGS.filter((p) => p.campaign === 1);

  for (const pub of tofPubs) {
    const pubLabel = `C${pub.num}`;
    console.log(`  🔄 ${pubLabel} — ${pub.name} (${pub.format})...`);

    try {
      const link = `${SITE_URL}${pub.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=${pub.utmCampaign}&utm_content=${pub.utmContent}`;

      // Upload images
      const imageHashes = [];
      const imagePaths = pub.slides ? pub.slides.map((s) => s.image) : pub.images;
      for (const imgPath of imagePaths) {
        const fileName = path.basename(imgPath);
        console.log(`    📤 Upload ${fileName}...`);
        const hash = await uploadImage(imgPath);
        imageHashes.push(hash);
        console.log(`    ✅ Hash: ${hash}`);
        await delay(500);
      }

      // Créer le creative
      let creativeParams;

      if (pub.format === 'IMAGE') {
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
        const childAttachments = pub.slides.map((slide, i) => ({
          image_hash: imageHashes[i],
          link: link,
          name: slide.headline,
          description: slide.description,
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

      // Advantage+ Creative Enhancements (non-bloquant — retry sans si erreur)
      creativeParams.degrees_of_freedom_spec = getAdvantagePlusSpec();

      console.log(`    🎨 Création du creative...`);
      let creative;
      try {
        creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams);
      } catch (e) {
        console.warn(`    ⚠️  Advantage+ rejeté — retry sans: ${e.message.substring(0, 80)}`);
        delete creativeParams.degrees_of_freedom_spec;
        creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams);
      }
      const creativeId = creative.id;
      console.log(`    ✅ Creative: ${creativeId}`);

      await delay(500);

      // Créer l'ad
      const formatLabel = pub.format === 'IMAGE' ? 'Image' : `Carrousel ${pub.slides.length}`;
      console.log(`    📢 Création de l'ad...`);
      const ad = await callMetaAPI(`${AD_ACCOUNT_ID}/ads`, {
        name: `${pubLabel} — ${pub.name} — ${formatLabel}`,
        adset_id: adset1Id,
        creative: { creative_id: creativeId },
        status: 'PAUSED',
      });
      const adId = ad.id;
      console.log(`    ✅ Ad: ${adId}`);

      report.push({
        pub: pubLabel,
        nom: pub.name,
        format: formatLabel,
        lp: pub.landingPage,
        utm_content: pub.utmContent,
        url_complete: link,
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
        lp: pub.landingPage,
        utm_content: pub.utmContent,
        url_complete: '-',
        ad_id: '-',
        status: `❌ ${err.message.substring(0, 50)}`,
      });
    }
  }

  // ================================================================
  // CAMPAGNE 2 — BOF Retargeting Offre Printemps
  // ================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📌 CAMPAGNE 2 — BOF Retargeting Offre Printemps');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Récupérer ou créer la Custom Audience
  const customAudienceId = await getOrCreateWebsiteCustomAudience();
  await delay(1000);

  console.log('  🔄 Création de la campagne...');
  const campaign2 = await callMetaAPI(`${AD_ACCOUNT_ID}/campaigns`, {
    name: 'BOF Retargeting Offre Printemps',
    objective: 'OUTCOME_LEADS',
    status: 'PAUSED',
    special_ad_categories: [],
    daily_budget: 300,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  });
  const campaign2Id = campaign2.id;
  console.log(`  ✅ Campagne créée: ${campaign2Id}\n`);

  await delay(1000);

  console.log('  🔄 Création de l\'ad set "Visiteurs LP 14 jours"...');
  const adset2 = await callMetaAPI(`${AD_ACCOUNT_ID}/adsets`, {
    name: 'Visiteurs LP 14 jours',
    campaign_id: campaign2Id,
    optimization_goal: 'OFFSITE_CONVERSIONS',
    billing_event: 'IMPRESSIONS',
    status: 'PAUSED',
    attribution_spec: [
      { event_type: 'CLICK_THROUGH', window_days: 7 },
      { event_type: 'VIEW_THROUGH', window_days: 1 },
    ],
    targeting: {
      ...GEO_TARGETING,
      age_min: 30,
      age_max: 65,
      custom_audiences: [{ id: customAudienceId }],
      facebook_positions: ['feed', 'story', 'facebook_reels'],
      instagram_positions: ['stream', 'reels', 'story'],
      publisher_platforms: ['facebook', 'instagram', 'audience_network'],
      device_platforms: ['mobile', 'desktop'],
    },
    promoted_object: {
      pixel_id: PIXEL_ID,
      custom_event_type: 'LEAD',
    },
  });
  const adset2Id = adset2.id;
  console.log(`  ✅ Ad Set créé: ${adset2Id}\n`);

  await delay(1000);

  // Créer l'ad C5
  const pub5 = PUB_CONFIGS.find((p) => p.num === 5);
  const pubLabel = 'C5';
  console.log(`  🔄 ${pubLabel} — ${pub5.name} (${pub5.format})...`);

  try {
    const link = `${SITE_URL}${pub5.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=${pub5.utmCampaign}&utm_content=${pub5.utmContent}`;

    const fileName = path.basename(pub5.images[0]);
    console.log(`    📤 Upload ${fileName}...`);
    const hash = await uploadImage(pub5.images[0]);
    console.log(`    ✅ Hash: ${hash}`);

    await delay(500);

    const creativeParams = {
      name: `Creative — ${pubLabel} — ${pub5.name}`,
      object_story_spec: {
        page_id: PAGE_ID,
        link_data: {
          image_hash: hash,
          link: link,
          message: pub5.primaryText,
          name: pub5.headline,
          description: pub5.description,
          call_to_action: { type: 'LEARN_MORE', value: { link: link } },
        },
      },
    };

    creativeParams.degrees_of_freedom_spec = getAdvantagePlusSpec();

    console.log(`    🎨 Création du creative...`);
    let creative;
    try {
      creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams);
    } catch (e) {
      console.warn(`    ⚠️  Advantage+ rejeté — retry sans: ${e.message.substring(0, 80)}`);
      delete creativeParams.degrees_of_freedom_spec;
      creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams);
    }
    const creativeId = creative.id;
    console.log(`    ✅ Creative: ${creativeId}`);

    await delay(500);

    console.log(`    📢 Création de l'ad...`);
    const ad = await callMetaAPI(`${AD_ACCOUNT_ID}/ads`, {
      name: `${pubLabel} — ${pub5.name} — Image`,
      adset_id: adset2Id,
      creative: { creative_id: creativeId },
      status: 'PAUSED',
    });
    const adId = ad.id;
    console.log(`    ✅ Ad: ${adId}`);

    report.push({
      pub: pubLabel,
      nom: pub5.name,
      format: 'Image',
      lp: pub5.landingPage,
      utm_content: pub5.utmContent,
      url_complete: link,
      ad_id: adId,
      status: '✅ PAUSED',
    });

    console.log(`  ✅ ${pubLabel} terminé\n`);

  } catch (err) {
    console.error(`  ❌ ${pubLabel} ERREUR: ${err.message}\n`);
    report.push({
      pub: pubLabel,
      nom: pub5.name,
      format: 'Image',
      lp: pub5.landingPage,
      utm_content: pub5.utmContent,
      url_complete: '-',
      ad_id: '-',
      status: `❌ ${err.message.substring(0, 50)}`,
    });
  }

  // ================================================================
  // RAPPORT FINAL
  // ================================================================
  console.log('\n=============================================================');
  console.log('📊 RAPPORT FINAL — Vague 2 Printemps 2026');
  console.log('=============================================================\n');
  console.log(`Campaign 1 (TOF):  ${campaign1Id}`);
  console.log(`Ad Set 1:          ${adset1Id}`);
  console.log(`Campaign 2 (BOF):  ${campaign2Id}`);
  console.log(`Ad Set 2:          ${adset2Id}`);
  console.log(`Custom Audience:   ${customAudienceId}\n`);
  console.table(report);

  const successes = report.filter((r) => r.status.startsWith('✅')).length;
  const failures = report.filter((r) => r.status.startsWith('❌')).length;
  console.log(`\n✅ ${successes} pubs créées avec succès`);
  if (failures > 0) {
    console.log(`❌ ${failures} pubs en erreur`);
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  ⚠️  VÉRIFICATION MANUELLE UTM OBLIGATOIRE AVANT ACTIVATION     ║
╠══════════════════════════════════════════════════════════════════╣
║  Dans Meta Ads Manager, pour CHAQUE pub :                        ║
║  1. Cliquer sur "Prévisualiser"                                   ║
║  2. Cliquer sur le lien de la pub                                 ║
║  3. Vérifier que l'URL contient bien :                            ║
║     utm_source=facebook                                           ║
║     utm_medium=cpc                                                ║
║     utm_campaign=[nom correct]                                    ║
║     utm_content=[c1/c2/c3/c4/c5]                                  ║
║  4. Vérifier que la LP cible est bien la bonne                    ║
║  5. NE PAS ACTIVER avant confirmation visuelle de toutes les UTM  ║
╚══════════════════════════════════════════════════════════════════╝`);

  console.log('\n⚠️  Tout est en PAUSED — Activez manuellement dans Meta Ads Manager après vérification UTM.');
}

main().catch((err) => {
  console.error('💥 Erreur fatale:', err.message);
  process.exit(1);
});
