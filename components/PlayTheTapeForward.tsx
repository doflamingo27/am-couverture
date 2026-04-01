import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

type Variant = "demoussage" | "renovation" | "promo";

const CONTENT: Record<
  Variant,
  { actTitle: string; actPoints: string[]; waitTitle: string; waitPoints: string[] }
> = {
  demoussage: {
    actTitle: "Si vous demandez votre devis aujourd'hui",
    actPoints: [
      "Dans 2 semaines\u00a0: toiture démoussée et hydrofugée",
      "Protégée 5 à 10 ans — vous oubliez ce sujet",
      "Coût\u00a0: fraction d'une réfection complète",
      "Valeur de votre maison préservée",
    ],
    waitTitle: "Si vous attendez encore un printemps",
    waitPoints: [
      "La mousse continue à retenir l'humidité",
      "Le prochain hiver fragilise davantage les tuiles poreuses",
      "Dans 2-3 ans\u00a0: réfection complète 8\u00a0000-15\u00a0000\u00a0€ inévitable",
      "Risque d'infiltration dans la charpente",
    ],
  },
  renovation: {
    actTitle: "Si vous lancez votre rénovation maintenant",
    actPoints: [
      "Toiture neuve garantie 10 ans (décennale)",
      "Économies de chauffage dès le premier hiver",
      "Charpente vérifiée et protégée",
      "Valeur immobilière en hausse immédiate",
    ],
    waitTitle: "Si vous attendez encore une année",
    waitPoints: [
      "La charpente continue à absorber l'humidité",
      "Les infiltrations s'aggravent à chaque pluie",
      "Dans 2-3 ans\u00a0: coût ×2 ou ×3 avec charpente à reprendre",
      "Risque structurel pour votre maison",
    ],
  },
  promo: {
    actTitle: "Si vous agissez avant le 21 avril",
    actPoints: [
      "Tarifs printemps garantis (à partir de 11\u00a0€/m²)",
      "Créneau d'intervention rapide",
      "Toiture protégée avant l'été",
      "Devis gratuit et sans engagement",
    ],
    waitTitle: "Si vous attendez après le 21 avril",
    waitPoints: [
      "L'offre printemps expire — retour aux tarifs normaux",
      "Créneaux d'intervention plus espacés",
      "La mousse continue ses dégâts tout l'été",
      "Vous repoussez encore d'une saison",
    ],
  },
};

export function PlayTheTapeForward({
  variant,
  ctaText = "Demander mon devis gratuit",
  urgencyText,
}: {
  variant: Variant;
  ctaText?: string;
  urgencyText?: string;
}) {
  const c = CONTENT[variant];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
          Deux futurs possibles pour votre toiture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* Act now — green */}
          <div className="bg-green-900/40 border border-green-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={20} className="text-green-400" />
              <h3 className="font-bold text-green-300 text-base sm:text-lg">
                {c.actTitle}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {c.actPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm sm:text-[15px] text-green-100/90 leading-relaxed"
                >
                  <CheckCircle
                    size={16}
                    className="text-green-400 shrink-0 mt-0.5"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Wait — red */}
          <div className="bg-red-900/40 border border-red-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={20} className="text-red-400" />
              <h3 className="font-bold text-red-300 text-base sm:text-lg">
                {c.waitTitle}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {c.waitPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm sm:text-[15px] text-red-100/90 leading-relaxed"
                >
                  <XCircle
                    size={16}
                    className="text-red-400 shrink-0 mt-0.5"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          {urgencyText && (
            <p className="text-orange-300 text-sm font-semibold mb-4">
              {urgencyText}
            </p>
          )}
          <a
            href="#formulaire"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg transition-colors duration-200"
          >
            {ctaText}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
