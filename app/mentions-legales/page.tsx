import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Mentions Légales — AM Couverture",
  description: "Mentions légales du site AM Couverture.",
  robots: "noindex, nofollow",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      {/* Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition text-sm mb-8"
      >
        <ArrowLeft size={16} />
        Retour à l&apos;accueil
      </Link>

      <Logo size="md" />

      {/* Content */}
      <article className="mt-12 text-slate-300 leading-relaxed space-y-10">
        <h1 className="text-3xl font-bold text-white">Mentions Légales</h1>

        {/* Éditeur */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Éditeur du site</h2>
          <div className="space-y-1 text-sm">
            <p><strong className="text-white">Nom commercial :</strong> AM Couverture</p>
            <p><strong className="text-white">Activité :</strong> Travaux de couverture, démoussage, nettoyage et rénovation de toiture</p>
            <p><strong className="text-white">Zone d&apos;intervention :</strong> Loiret (45) — Orléans Métropole et communes environnantes</p>
            <p><strong className="text-white">Adresse :</strong> Ingré (45), France</p>
            <p><strong className="text-white">Email :</strong> contact@am-couverture.net</p>
            <p><strong className="text-white">Site web :</strong> https://www.am-couverture.net</p>
          </div>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Hébergement</h2>
          <div className="space-y-1 text-sm">
            <p>Le site est hébergé par :</p>
            <p><strong className="text-white">Vercel Inc.</strong></p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723, USA</p>
            <p>Site web : https://vercel.com</p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Propriété intellectuelle</h2>
          <p className="text-sm">
            L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes)
            est la propriété exclusive d&apos;AM Couverture ou de ses partenaires.
            Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        {/* RGPD */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Protection des données personnelles</h2>

          <h3 className="text-base font-semibold text-white mt-6 mb-2">Données collectées</h3>
          <p className="text-sm mb-2">
            Ce site collecte les données suivantes via le formulaire de demande de devis :
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>Prénom</li>
            <li>Numéro de téléphone</li>
            <li>Code postal</li>
            <li>Type de projet</li>
            <li>Adresse email (optionnel)</li>
          </ul>

          <h3 className="text-base font-semibold text-white mt-6 mb-2">Finalité du traitement</h3>
          <p className="text-sm">Les données collectées sont utilisées exclusivement pour :</p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2 mt-2">
            <li>Vous recontacter dans le cadre de votre demande de devis</li>
            <li>Vous envoyer un email de confirmation de réception</li>
          </ul>

          <h3 className="text-base font-semibold text-white mt-6 mb-2">Durée de conservation</h3>
          <p className="text-sm">
            Les données sont conservées pendant une durée maximale de 3 ans à compter de leur collecte.
          </p>

          <h3 className="text-base font-semibold text-white mt-6 mb-2">Vos droits</h3>
          <p className="text-sm mb-2">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit de suppression de vos données</li>
            <li>Droit d&apos;opposition au traitement de vos données</li>
          </ul>
          <p className="text-sm mt-3">
            Pour exercer ces droits, contactez-nous à : <strong className="text-white">contact@am-couverture.net</strong>
          </p>

          <h3 className="text-base font-semibold text-white mt-6 mb-2">Sous-traitants</h3>
          <p className="text-sm mb-2">
            Les données collectées peuvent être transmises aux sous-traitants suivants :
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>Resend (envoi d&apos;emails) — https://resend.com</li>
            <li>Google (stockage dans Google Sheets) — https://google.com</li>
            <li>Vercel (hébergement) — https://vercel.com</li>
          </ul>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Cookies et traceurs</h2>
          <p className="text-sm">
            Ce site utilise le Meta Pixel (Facebook) à des fins de mesure d&apos;audience
            et d&apos;optimisation des campagnes publicitaires. Ce traceur collecte des données
            anonymisées sur votre navigation.
          </p>
          <p className="text-sm mt-3">
            Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
          </p>
        </section>

        {/* Publicité */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Publicité</h2>
          <p className="text-sm">
            Ce site peut être promu via des campagnes publicitaires sur les plateformes Meta
            (Facebook, Instagram). Les publicités renvoient vers les pages de demande de devis de ce site.
          </p>
        </section>

        {/* Litiges */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Litiges</h2>
          <p className="text-sm">
            Le présent site est soumis au droit français. En cas de litige,
            les tribunaux français seront seuls compétents.
          </p>
        </section>
      </article>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-800 text-slate-500 text-xs text-center">
        © {new Date().getFullYear()} AM Couverture — Ingré (45)
      </div>
    </main>
  );
}
