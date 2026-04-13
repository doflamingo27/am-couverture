import { NextResponse } from "next/server";
import { createHmac } from "crypto";

// ─── GET — Vérification webhook Meta ────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

// ─── POST — Réception lead Facebook Instant Form ─────────────────────
export async function POST(request: Request) {
  // 1. Lire le body raw pour la vérification HMAC
  const rawBody = await request.text();
  const appSecret = process.env.META_APP_SECRET;

  // 2. Vérifier la signature si META_APP_SECRET est configuré
  if (appSecret) {
    const signature = request.headers.get("x-hub-signature-256") || "";
    const expected = "sha256=" + createHmac("sha256", appSecret)
      .update(rawBody)
      .digest("hex");
    if (signature !== expected) {
      console.error("[webhook] Signature invalide");
      return new Response("Forbidden", { status: 403 });
    }
  } else {
    console.warn("[webhook] META_APP_SECRET absent — signature non vérifiée");
  }

  // 3. Parser le body
  let body: MetaWebhookPayload;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // 4. Traiter chaque lead (toujours retourner 200 à Meta)
  if (body.object === "page" && Array.isArray(body.entry)) {
    for (const entry of body.entry) {
      for (const change of entry.changes ?? []) {
        if (change.field === "leadgen") {
          // Fire and forget — ne pas bloquer le 200
          processLead(change.value).catch((err) =>
            console.error("[webhook] processLead error:", err)
          );
        }
      }
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
}

// ─── Types ────────────────────────────────────────────────────────────
type MetaWebhookPayload = {
  object: string;
  entry: Array<{
    id: string;
    changes?: Array<{
      field: string;
      value: LeadgenValue;
    }>;
  }>;
};

type LeadgenValue = {
  leadgen_id: string;
  form_id: string;
  page_id: string;
  ad_id?: string;
  ad_name?: string;
  adset_id?: string;
  adset_name?: string;
  campaign_id?: string;
  campaign_name?: string;
};

type FieldData = { name: string; values: string[] };

// ─── Traitement d'un lead ────────────────────────────────────────────
async function processLead(value: LeadgenValue) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("[webhook] META_ACCESS_TOKEN manquant");
    return;
  }

  // Appel API Graph pour récupérer les champs du lead
  const url = `https://graph.facebook.com/v21.0/${value.leadgen_id}?` +
    `fields=field_data,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,form_id` +
    `&access_token=${accessToken}`;

  let leadData: { field_data: FieldData[]; ad_name?: string; adset_name?: string; campaign_name?: string; form_id?: string };
  try {
    const res = await fetch(url);
    leadData = await res.json();
    if (!leadData.field_data) {
      console.error("[webhook] Réponse API Graph invalide:", JSON.stringify(leadData));
      return;
    }
  } catch (err) {
    console.error("[webhook] Erreur API Graph:", err);
    return;
  }

  // Helper pour extraire un champ par nom
  const getField = (...names: string[]): string => {
    for (const name of names) {
      const field = leadData.field_data.find(
        (f) => f.name.toLowerCase() === name.toLowerCase()
      );
      if (field?.values?.[0]) return field.values[0];
    }
    return "";
  };

  // Mapper les champs
  const rawName = getField("full_name", "first_name");
  const firstName = rawName.split(" ")[0] || rawName;
  const phone = getField("phone_number");
  const email = getField("email");
  const postalCode = getField("zip_code", "postal_code");
  const campaignName = leadData.campaign_name || value.campaign_name || "";
  const adName = leadData.ad_name || value.ad_name || "";
  const formId = leadData.form_id || value.form_id || "";

  // Type de projet depuis le formulaire ou déduit depuis le nom de campagne
  let projectType = getField(
    "what_type_of_project_are_you_interested_in",
    "project_type",
    "type_de_projet"
  );
  if (!projectType) {
    projectType = campaignName.toLowerCase().includes("renovation")
      ? "Rénovation toiture"
      : "Démoussage / Nettoyage";
  }

  // Ajouter au Sheet et envoyer l'email en parallèle
  const results = await Promise.allSettled([
    addToGoogleSheet({ firstName, phone, email, postalCode, projectType, campaignName, adName, formId }),
    sendNotification({ firstName, phone, email, postalCode, projectType, campaignName, adName }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[webhook] Étape ${i === 0 ? "Sheet" : "Email"} échouée:`, r.reason);
    }
  });
}

// ─── Google Sheet ────────────────────────────────────────────────────
// Même logique que addToGoogleSheet dans app/api/lead/route.ts
async function addToGoogleSheet(data: {
  firstName: string;
  phone: string;
  email: string;
  postalCode: string;
  projectType: string;
  campaignName: string;
  adName: string;
  formId: string;
}) {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!sheetId || !serviceEmail || !privateKey) return;

  const { GoogleSpreadsheet } = await import("google-spreadsheet");
  const { JWT } = await import("google-auth-library");

  const auth = new JWT({
    email: serviceEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Date: new Date().toLocaleString("fr-FR"),
    "Prénom": data.firstName,
    "Téléphone": "'" + data.phone,
    "Email": data.email,
    "Code Postal": data.postalCode,
    "Type de projet": data.projectType,
    "Type de bien": "",
    "Source (URL)": `Meta Lead Form — ${data.formId}`,
    utm_source: "facebook",
    utm_medium: "lead_form",
    utm_campaign: data.campaignName,
    utm_content: data.adName,
    Statut: "",
    "Notes commercial": "",
  });
}

// ─── Email notification ──────────────────────────────────────────────
// Même logique que sendOwnerNotificationEmail dans app/api/lead/route.ts
async function sendNotification(data: {
  firstName: string;
  phone: string;
  email: string;
  postalCode: string;
  projectType: string;
  campaignName: string;
  adName: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "AM Couverture <notifications@am-couverture.net>",
    to: ["footballmindset.hs@gmail.com"],
    subject: `🔔 [FB FORM] Nouveau lead — ${data.projectType} — ${data.postalCode}`,
    text: `Nouveau lead Facebook Form !

Prénom : ${data.firstName}
Téléphone : ${data.phone}
Email : ${data.email}
Code postal : ${data.postalCode}
Besoin : ${data.projectType}
Pub : ${data.adName}
Campagne : ${data.campaignName}

Via formulaire Facebook natif.
→ Rappeler sous 2h !`,
  });
}
