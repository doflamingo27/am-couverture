import { NextResponse } from "next/server";

type LeadData = {
  firstName: string;
  phone: string;
  postalCode: string;
  projectType: string;
  propertyType: string;
  source: string;
};

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, "");
  return /^(\+33|0)[1-9]\d{8}$/.test(cleaned);
}

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    // Validation
    if (!data.firstName?.trim()) {
      return NextResponse.json(
        { error: "Le prénom est requis" },
        { status: 400 }
      );
    }
    if (!validatePhone(data.phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Run all integrations in parallel
    const results = await Promise.allSettled([
      sendConfirmationEmail(data),
      sendNotificationEmail(data),
      addToGoogleSheet(data),
      sendMetaCAPI(data),
    ]);

    // Log any failures (don't block the response)
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const names = ["confirmation email", "notification email", "google sheet", "meta capi"];
        console.error(`Failed: ${names[i]}`, result.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(data: LeadData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "AM Couverture <noreply@resend.dev>",
    to: [], // No prospect email collected — skip for now
    subject: "Votre demande de devis a bien été reçue",
    html: `
      <h2>Merci ${data.firstName} !</h2>
      <p>Nous avons bien reçu votre demande de devis.</p>
      <p>Un conseiller vous rappelle sous 2h aux heures ouvrées.</p>
      <p>En cas d'urgence : <a href="tel:+33785966248">07 85 96 62 48</a></p>
      <br/>
      <p>L'équipe AM Couverture</p>
    `,
  });
}

async function sendNotificationEmail(data: LeadData) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifEmail = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !notifEmail) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Leads AM Couverture <noreply@resend.dev>",
    to: [notifEmail],
    subject: `Nouveau lead - ${data.projectType} - ${data.postalCode}`,
    html: `
      <h2>Nouveau lead !</h2>
      <table>
        <tr><td><strong>Prénom</strong></td><td>${data.firstName}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Code postal</strong></td><td>${data.postalCode}</td></tr>
        <tr><td><strong>Type de projet</strong></td><td>${data.projectType}</td></tr>
        <tr><td><strong>Type de bien</strong></td><td>${data.propertyType}</td></tr>
        <tr><td><strong>Source</strong></td><td>${data.source}</td></tr>
        <tr><td><strong>Date</strong></td><td>${new Date().toLocaleString("fr-FR")}</td></tr>
      </table>
    `,
  });
}

async function addToGoogleSheet(data: LeadData) {
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
    "Téléphone": data.phone,
    "Email": "",
    "Code Postal": data.postalCode,
    "Type de projet": data.projectType,
    "Type de bien": data.propertyType,
    "Source (URL)": data.source,
    Statut: "",
    "Notes commercial": "",
  });
}

async function sendMetaCAPI(data: LeadData) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return;

  await fetch(
    `https://graph.facebook.com/v18.0/${pixelId}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            user_data: {
              ph: [data.phone],
              fn: [data.firstName.toLowerCase()],
              zp: [data.postalCode],
            },
          },
        ],
        access_token: token,
      }),
    }
  );
}
