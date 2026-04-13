#!/usr/bin/env node

/**
 * meta-ads-fix.js
 * Diagnostique et corrige les 9 ads existantes :
 * 1. Ajoute le CTA "LEARN_MORE" sur toutes les ads
 * 2. Vérifie multi_share_optimized: false sur les carrousels
 * 3. Vérifie la destination WEBSITE
 *
 * Usage: node meta-ads-fix.js [--fix]
 *   Sans --fix : diagnostic seulement (lecture)
 *   Avec --fix : recrée les creatives et met à jour les ads
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

const ADSET_ID = '120243283188180572';

const DRY_RUN = !process.argv.includes('--fix');

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

  // POST
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
    console.error(`  🔍 Détails erreur API:\n${JSON.stringify(data.error, null, 2)}`);
    throw new Error(`Meta API: ${data.error.message} (code ${data.error.code})`);
  }
  return data;
}

// ============================================================
// PUB CONFIGS — needed for recreating creatives
// ============================================================

const ADS_DIR = path.join(__dirname, 'ad-creatives', 'META ADS');

const PUB_CONFIGS = [
  {
    num: 1, name: 'Transformation Radicale', format: 'CAROUSEL',
    landingPage: '/demoussage', utmContent: 'p1-transformation',
    primaryText: `Votre toit est méconnaissable après notre passage. Faites glisser →\n\n3 toitures du Loiret. Avant : mousse, lichen, tuiles ternies.\nAprès : propres, protégées, comme neuves.\n\nCe qu'on fait :\n● Nettoyage basse pression (jamais de Kärcher)\n● Traitement anti-mousse longue durée\n● Hydrofuge protecteur 5-10 ans\n● Nettoyage complet du chantier\n\n4.9/5 sur Google · Garantie décennale · Artisan local\n\n→ Demandez votre devis gratuit en 24h`,
    headline: 'Démoussage + Hydrofuge — Résultat visible immédiatement',
    description: 'Rappel sous 2h · Devis gratuit · Artisan local Loiret (45)',
    slideHeadline: 'Voir le résultat →',
    slideDescription: 'Devis gratuit en 24h — Artisan local Loiret',
  },
  {
    num: 2, name: 'Diagnostic Offert', format: 'IMAGE',
    landingPage: '/demoussage', utmContent: 'p2-diagnostic',
    primaryText: `On monte sur votre toit. On inspecte. On vous dit tout. Gratuitement.\n\nVous ne montez probablement jamais sur votre toiture.\nNous si. Et ce qu'on trouve surprend toujours.\n\nCe que comprend notre diagnostic :\n● Inspection tuile par tuile\n● Identification des zones à risque d'infiltration\n● Rapport complet + photos\n● Devis détaillé sans engagement\n\nPlus de 200 toitures inspectées dans le Loiret.\nRappel sous 2h.\n\n→ Réservez votre diagnostic gratuit`,
    headline: 'Diagnostic Toiture GRATUIT — On vous dit tout',
    description: 'Propriétaires Loiret : inspection complète + rapport photos offert',
  },
  {
    num: 3, name: 'Comparatif Choc', format: 'IMAGE',
    landingPage: '/demoussage', utmContent: 'p3-comparatif',
    primaryText: `Un nettoyage préventif coûte 10 à 20x moins cher qu'une rénovation.\n\nChaque mois sans entretien, la mousse s'infiltre plus profond. Les tuiles deviennent poreuses. L'eau s'infiltre. Et un jour, c'est la charpente qui trinque.\n\nÀ ce stade, ce n'est plus un nettoyage — c'est une rénovation complète.\n\nLa bonne nouvelle : un traitement préventif protège votre toit pour 5-10 ans. Et ça coûte une fraction du prix.\n\n● Devis transparent, personnalisé\n● Artisan certifié · Garantie décennale\n● Intervention rapide dans tout le Loiret\n\n→ Demandez votre devis avant que ça empire`,
    headline: 'Prévention vs Rénovation — Le calcul est vite fait',
    description: '10-20x moins cher d\'agir maintenant · Devis gratuit en 24h · Loiret (45)',
  },
  {
    num: 4, name: 'Bouclier Anti-Mousse', format: 'IMAGE',
    landingPage: '/demoussage', utmContent: 'p4-bouclier',
    primaryText: `La mousse sur le toit de votre voisin est revenue en 2 ans. Voici pourquoi.\n\nUn simple nettoyage retire la mousse en surface.\nNotre traitement hydrofuge l'empêche de revenir pendant 5 à 10 ans.\n\nLa différence ? Le produit professionnel qu'on applique après le nettoyage. Il rend vos tuiles imperméables — la mousse ne peut plus s'accrocher.\n\n● Nettoyage basse pression (pas de Kärcher)\n● Anti-mousse professionnel longue durée\n● Hydrofuge protecteur certifié\n● Garantie décennale\n\nPlus de 200 toitures traitées dans le Loiret.\n\n→ Demandez votre devis avec hydrofuge inclus`,
    headline: 'Hydrofuge pro : votre toit protégé 5-10 ans. Garanti.',
    description: 'Nettoyage seul = mousse en 1 an. Avec hydrofuge = protection 5-10 ans.',
  },
  {
    num: 5, name: 'Dégâts Invisibles', format: 'IMAGE',
    landingPage: '/demoussage-v2', utmContent: 'p5-degats',
    primaryText: `Depuis le sol, votre toit a l'air normal. La réalité est souvent différente.\n\nVoilà ce qu'on trouve quand on monte :\n● Mousse qui retient l'humidité sous les tuiles 24h/24\n● Tuiles devenues poreuses par le gel\n● Micro-fissures invisibles depuis le sol\n● Gouttières bouchées qui débordent en silence\n\nLe pire ? Quand les dégâts sont visibles depuis la rue, il est déjà trop tard pour un simple nettoyage.\n\nOn vérifie pour vous. Gratuitement. En 30 minutes.\n\n4.9/5 sur Google · Garantie décennale\n\n→ Réservez votre inspection gratuite`,
    headline: 'Votre toit cache des dégâts — Inspection offerte',
    description: 'On monte, on inspecte, on vous dit tout. Rapport photos inclus. Loiret (45)',
  },
  {
    num: 6, name: 'Rénovation Clé en Main', format: 'CAROUSEL',
    landingPage: '/renovation', utmContent: 'p6-cle-en-main',
    primaryText: `Votre toiture a besoin de plus qu'un nettoyage ? On gère tout de A à Z.\n\nÉtape 1 → Diagnostic complet toiture + charpente\nÉtape 2 → Dépose et évacuation de l'ancienne couverture\nÉtape 3 → Pose de la nouvelle couverture + zinguerie\nÉtape 4 → Nettoyage du chantier + rapport photos\n\nRésultat : un toit neuf, garanti 10 ans.\n\nPourquoi nous choisir :\n● On ne sous-traite rien — notre équipe de A à Z\n● Devis détaillé ligne par ligne, sans surprise\n● Garantie décennale sur tous les travaux\n● Plus de 200 toitures dans le Loiret\n\n→ Demandez votre devis rénovation gratuit`,
    headline: 'Rénovation toiture complète — Garanti 10 ans',
    description: 'Diagnostic offert · On gère tout · Artisan local Loiret (45)',
    slideHeadline: 'Étape suivante →',
    slideDescription: 'Rénovation toiture garantie 10 ans',
  },
  {
    num: 7, name: 'Protecteur de Patrimoine', format: 'IMAGE',
    landingPage: '/renovation', utmContent: 'p7-patrimoine',
    primaryText: `Votre toiture représente 15% de la valeur de votre maison.\n\nSi elle est abîmée, c'est tout votre patrimoine qui se déprécie. Et chaque mois qui passe aggrave la situation :\n● Infiltrations d'eau dans la charpente\n● Isolation dégradée — factures de chauffage en hausse\n● Valeur immobilière en baisse\n\nUne rénovation de toiture, c'est un investissement qui protège votre bien pour 30 ans minimum.\n\n● Devis transparent et personnalisé\n● Garanti 10 ans (décennale)\n● Artisan local dans le Loiret\n\n→ Demandez votre devis rénovation`,
    headline: 'Protégez 15% de la valeur de votre maison',
    description: 'Rénovation toiture garanti 10 ans · Devis gratuit · Loiret (45)',
  },
  {
    num: 8, name: 'La Maison qui Reprend Vie', format: 'CAROUSEL',
    landingPage: '/renovation', utmContent: 'p8-reprend-vie',
    primaryText: `Cette maison dans le Loiret prenait l'eau depuis 3 ans. Faites glisser pour voir ce qu'on a fait →\n\nLe propriétaire repoussait les travaux. Quand il a appelé, la charpente commençait à souffrir. On est intervenu en 2 semaines :\n\n● Dépose complète de l'ancienne couverture\n● Vérification et renforcement de la charpente\n● Pose de tuiles neuves + zinguerie complète\n● Nettoyage intégral du chantier\n\nRésultat : un toit neuf, garanti 10 ans. Et une maison qui a repris 10 ans de vie.\n\n4.9/5 sur Google · Garantie décennale\n\n→ Demandez votre devis rénovation`,
    headline: 'Elle a repris 10 ans de vie — Rénovation complète',
    description: 'Avant / En cours / Après · Garanti décennale · Devis gratuit',
    slideHeadline: 'Voir la suite →',
    slideDescription: 'Rénovation complète — Garanti 10 ans',
  },
  {
    num: 9, name: 'Transformation Rénovation', format: 'CAROUSEL',
    landingPage: '/renovation', utmContent: 'p9-transformation-reno',
    primaryText: `Même maison. Toit neuf. Transformation totale. Faites glisser →\n\nTuiles cassées, fuites, gouttières rouillées — c'est ce que nos clients avaient avant de nous appeler.\n\nCe qu'ils ont maintenant :\n● Un toit neuf, étanche, garanti 10 ans\n● Des gouttières zinc neuves\n● Zéro infiltration\n● Une maison qui a retrouvé sa valeur\n\nOn gère tout : dépose, pose, zinguerie, nettoyage.\nUn seul interlocuteur du début à la fin.\n\n4.9/5 sur Google · Garantie décennale\n\n→ Obtenez votre devis rénovation gratuit`,
    headline: 'Toiture neuve, garanti 10 ans — Avant / Après',
    description: 'Dépose + pose complète · Artisan local Loiret (45) · Devis gratuit',
    slideHeadline: 'Voir le résultat →',
    slideDescription: 'Rénovation toiture garantie 10 ans — Loiret (45)',
  },
];

// ============================================================
// STEP 1: Fetch all ads in the ad set
// ============================================================

async function fetchAds() {
  console.log(`📋 Récupération des ads dans l'ad set ${ADSET_ID}...\n`);

  const data = await callMetaAPI(`${ADSET_ID}/ads`, {
    fields: 'id,name,status,creative{id,name,object_story_spec,effective_object_story_id}',
    limit: 50,
  });

  return data.data || [];
}

// ============================================================
// STEP 2: Fetch creative details
// ============================================================

async function fetchCreativeDetails(creativeId) {
  const data = await callMetaAPI(creativeId, {
    fields: 'id,name,object_story_spec,url_tags',
  });
  return data;
}

// ============================================================
// STEP 3: Diagnose issues
// ============================================================

function diagnoseCreative(ad, creative, pubConfig) {
  const issues = [];
  const info = { url: '', cta: '', expectedUrl: '' };
  const spec = creative.object_story_spec;

  if (pubConfig) {
    info.expectedUrl = `${SITE_URL}${pubConfig.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=vague1&utm_content=${pubConfig.utmContent}`;
  }

  if (!spec) {
    issues.push('❌ Pas de object_story_spec');
    return { issues, info };
  }

  const linkData = spec.link_data;
  if (!linkData) {
    issues.push('❌ Pas de link_data');
    return { issues, info };
  }

  // Capture actual URL
  info.url = linkData.link || '';

  // Check CTA
  if (!linkData.call_to_action || linkData.call_to_action.type === 'NO_BUTTON') {
    issues.push('❌ CTA manquant (Aucun bouton)');
    info.cta = 'AUCUN';
  } else {
    info.cta = linkData.call_to_action.type;
    if (linkData.call_to_action.type !== 'LEARN_MORE') {
      issues.push(`⚠️  CTA = "${linkData.call_to_action.type}" (devrait être LEARN_MORE)`);
    }
  }

  // Check URL matches expected
  if (info.expectedUrl && info.url !== info.expectedUrl) {
    issues.push(`❌ URL incorrecte`);
  }

  // Check carousel settings
  if (linkData.child_attachments) {
    if (linkData.multi_share_optimized !== false) {
      issues.push('❌ multi_share_optimized n\'est pas false (carrousel)');
    }
    if (linkData.multi_share_end_card !== false) {
      issues.push('❌ multi_share_end_card n\'est pas false (carrousel)');
    }

    // Check CTA and URL on each child
    for (let i = 0; i < linkData.child_attachments.length; i++) {
      const child = linkData.child_attachments[i];
      if (!child.call_to_action || child.call_to_action.type === 'NO_BUTTON') {
        issues.push(`❌ Slide ${i + 1}: CTA manquant`);
      }
      if (info.expectedUrl && child.link && child.link !== info.expectedUrl) {
        issues.push(`❌ Slide ${i + 1}: URL incorrecte`);
      }
    }
  }

  // Check destination is a website
  if (!info.url.startsWith('http')) {
    issues.push(`❌ Destination non-website: "${info.url}"`);
  }

  return { issues, info };
}

// ============================================================
// STEP 4: Upload image and recreate creative
// ============================================================

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

async function recreateCreative(pub, existingCreative) {
  const link = `${SITE_URL}${pub.landingPage}?utm_source=facebook&utm_medium=cpc&utm_campaign=vague1&utm_content=${pub.utmContent}`;

  // Get image hashes from existing creative
  const spec = existingCreative.object_story_spec;
  const linkData = spec?.link_data;

  let creativeParams;

  if (pub.format === 'IMAGE') {
    const imageHash = linkData?.image_hash;
    if (!imageHash) {
      throw new Error(`Impossible de récupérer image_hash pour P${pub.num}`);
    }

    creativeParams = {
      name: `Creative — P${pub.num} — ${pub.name} — FIX CTA`,
      object_story_spec: {
        page_id: PAGE_ID,
        link_data: {
          image_hash: imageHash,
          link: link,
          message: pub.primaryText,
          name: pub.headline,
          description: pub.description,
          call_to_action: { type: 'LEARN_MORE', value: { link: link } },
        },
      },
    };
  } else {
    // CAROUSEL — get image hashes from child_attachments
    const children = linkData?.child_attachments;
    if (!children || children.length === 0) {
      throw new Error(`Pas de child_attachments pour P${pub.num}`);
    }

    const childAttachments = children.map((child) => ({
      image_hash: child.image_hash,
      link: link,
      name: pub.slideHeadline || pub.headline,
      description: pub.slideDescription || pub.description,
      call_to_action: { type: 'LEARN_MORE', value: { link: link } },
    }));

    creativeParams = {
      name: `Creative — P${pub.num} — ${pub.name} — FIX CTA`,
      object_story_spec: {
        page_id: PAGE_ID,
        link_data: {
          message: pub.primaryText,
          link: link,
          child_attachments: childAttachments,
          multi_share_optimized: false,
          multi_share_end_card: false,
          call_to_action: { type: 'LEARN_MORE', value: { link: link } },
        },
      },
    };
  }

  const creative = await callMetaAPI(`${AD_ACCOUNT_ID}/adcreatives`, creativeParams, 'POST');
  return creative.id;
}

async function updateAdCreative(adId, newCreativeId) {
  await callMetaAPI(adId, {
    creative: { creative_id: newCreativeId },
  }, 'POST');
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('🔧 Meta Ads Fix — Diagnostic & Corrections');
  console.log(`   Mode: ${DRY_RUN ? '🔍 DIAGNOSTIC (ajouter --fix pour corriger)' : '🛠️  CORRECTION'}`);
  console.log('============================================\n');

  // Step 1: Fetch ads
  const ads = await fetchAds();
  console.log(`📌 ${ads.length} ads trouvées\n`);

  if (ads.length === 0) {
    console.log('❌ Aucune ad trouvée dans cet ad set');
    return;
  }

  // Step 2: Diagnose each ad
  const diagnostics = [];
  const reportRows = [];

  for (const ad of ads) {
    const creativeId = ad.creative?.id;
    const adName = ad.name || 'Sans nom';

    // Detect pub number from name
    const pubMatch = adName.match(/P(\d+)/);
    const pubNum = pubMatch ? parseInt(pubMatch[1]) : null;
    const pubConfig = pubNum ? PUB_CONFIGS.find((p) => p.num === pubNum) : null;

    console.log(`━━━ ${adName} ━━━`);
    console.log(`  Ad ID:      ${ad.id}`);
    console.log(`  Creative:   ${creativeId || 'N/A'}`);
    console.log(`  Status:     ${ad.status}`);

    if (!creativeId) {
      console.log('  ❌ Pas de creative associé\n');
      diagnostics.push({ ad, issues: ['Pas de creative'], pubNum });
      reportRows.push({ pub: `P${pubNum}`, ad_id: ad.id, url: 'N/A', cta: 'N/A', status: ad.status, ok: '❌' });
      continue;
    }

    // Fetch full creative details
    const creative = await fetchCreativeDetails(creativeId);
    const { issues, info } = diagnoseCreative(ad, creative, pubConfig);

    // Show URL info
    console.log(`  URL:        ${info.url}`);
    if (info.expectedUrl && info.url !== info.expectedUrl) {
      console.log(`  ATTENDUE:   ${info.expectedUrl}`);
    }
    console.log(`  CTA:        ${info.cta || 'N/A'}`);

    if (issues.length === 0) {
      console.log('  ✅ Tout est OK\n');
    } else {
      for (const issue of issues) {
        console.log(`  ${issue}`);
      }
      console.log('');
    }

    diagnostics.push({ ad, creative, issues, pubNum, info });
    reportRows.push({
      pub: `P${pubNum}`,
      ad_id: ad.id,
      url: info.url || 'N/A',
      cta: info.cta || 'N/A',
      status: ad.status,
      ok: issues.length === 0 ? '✅' : '❌',
    });
    await delay(300);
  }

  // Sort report by pub number
  reportRows.sort((a, b) => parseInt(a.pub.slice(1)) - parseInt(b.pub.slice(1)));

  // Full report table
  console.log('\n============================================');
  console.log('📊 RAPPORT COMPLET');
  console.log('============================================\n');
  console.table(reportRows);

  // Summary
  const adsWithIssues = diagnostics.filter((d) => d.issues.length > 0);
  const adsOK = diagnostics.filter((d) => d.issues.length === 0);

  console.log(`\n✅ ${adsOK.length} ads OK`);
  console.log(`❌ ${adsWithIssues.length} ads à corriger\n`);

  if (adsWithIssues.length > 0) {
    for (const d of adsWithIssues) {
      console.log(`  ${d.ad.name}:`);
      for (const issue of d.issues) {
        console.log(`    ${issue}`);
      }
    }
  }

  // Step 3: Fix if --fix flag
  if (DRY_RUN) {
    console.log('\n💡 Pour corriger, relancer avec : node meta-ads-fix.js --fix');
    return;
  }

  if (adsWithIssues.length === 0) {
    console.log('\n✅ Rien à corriger !');
    return;
  }

  console.log('\n🛠️  CORRECTION EN COURS...\n');

  for (const diag of adsWithIssues) {
    const { ad, creative, pubNum } = diag;

    // Skip P8 (désactivée)
    if (pubNum === 8) {
      console.log(`  ⏭️  P8 — SKIP (désactivée)\n`);
      continue;
    }

    const pubConfig = PUB_CONFIGS.find((p) => p.num === pubNum);

    if (!pubConfig) {
      console.log(`  ⚠️  ${ad.name}: impossible de trouver la config pour P${pubNum}, skip`);
      continue;
    }

    if (!creative) {
      console.log(`  ⚠️  ${ad.name}: pas de creative existant, skip`);
      continue;
    }

    try {
      console.log(`  🔄 ${ad.name}...`);

      // Recreate creative with correct params
      console.log(`    🎨 Création du nouveau creative...`);
      const newCreativeId = await recreateCreative(pubConfig, creative);
      console.log(`    ✅ Nouveau creative: ${newCreativeId}`);

      // Update ad to use new creative
      console.log(`    📢 Mise à jour de l'ad...`);
      await updateAdCreative(ad.id, newCreativeId);
      console.log(`    ✅ Ad mise à jour`);

      console.log(`  ✅ ${ad.name} corrigée\n`);
      await delay(1000);
    } catch (err) {
      console.error(`  ❌ ${ad.name}: ${err.message}\n`);
    }
  }

  console.log('\n============================================');
  console.log('✅ Corrections terminées');
  console.log('⚠️  Vérifiez dans Meta Ads Manager que les CTA sont bien visibles');
  console.log('============================================');
}

main().catch((err) => {
  console.error('💥 Erreur fatale:', err.message);
  process.exit(1);
});
