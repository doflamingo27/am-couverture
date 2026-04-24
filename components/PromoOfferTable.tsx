import { CheckCircle, Star } from "lucide-react";

type OfferItem = {
  title: string;
  price: string;
  oldPrice?: string;
  highlight: boolean;
  badge?: string;
  points: string[];
};

const DEFAULT_OFFERS: OfferItem[] = [
  {
    title: "Démoussage toiture",
    price: "11",
    highlight: false,
    points: [
      "Nettoyage basse pression intégral",
      "Traitement anti-mousse professionnel",
      "Rapport photos avant/après",
      "Nettoyage du chantier",
    ],
  },
  {
    title: "Hydrofuge toiture",
    price: "13",
    highlight: true,
    badge: "Le plus populaire",
    points: [
      "Hydrofuge Sikagard professionnel",
      "Protection 5 à 10 ans garantie",
      "Rapport d'application détaillé",
      "Sans modifier l'aspect de vos tuiles",
    ],
  },
  {
    title: "Hydrofuge façade",
    price: "9",
    highlight: false,
    points: [
      "Façade enduite ou pierre",
      "Protection contre l'humidité",
      "Finition invisible et naturelle",
      "Résultat garanti",
    ],
  },
];

export function PromoOfferTable({
  deadline = "10 mai",
  heading,
  offers,
}: {
  deadline?: string;
  heading?: string;
  offers?: OfferItem[];
}) {
  const items = offers ?? DEFAULT_OFFERS;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Animated badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-red-500/15 text-red-400 text-sm font-bold px-5 py-2 rounded-full border border-red-500/30 animate-pulse">
            Offre limitée — valable jusqu&apos;au {deadline} uniquement
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
          {heading ?? "Nos tarifs printemps"}
        </h2>

        {/* Cards */}
        <div className={`grid grid-cols-1 ${items.length > 1 ? "md:grid-cols-3" : "max-w-sm mx-auto"} gap-4 sm:gap-6 mb-8`}>
          {items.map((offer, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 sm:p-8 border ${
                offer.highlight
                  ? "bg-orange-500/10 border-orange-500/40 ring-1 ring-orange-500/20"
                  : "bg-slate-800/60 border-slate-700/40"
              }`}
            >
              {offer.highlight && offer.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star size={12} className="fill-white" />
                    {offer.badge}
                  </span>
                </div>
              )}

              <h3 className="font-bold text-lg text-white mb-2">
                {offer.title}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                {offer.oldPrice && (
                  <span className="line-through text-slate-500 text-lg mr-1">
                    {offer.oldPrice}€
                  </span>
                )}
                <span className="text-3xl sm:text-4xl font-extrabold text-[#B8CC30]">
                  {offer.price}€
                </span>
                <span className="text-slate-400 text-sm">/m²</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6">
                {offer.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#B8CC30] shrink-0 mt-0.5"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href="#formulaire"
                className={`block w-full text-center font-bold py-3 rounded-full text-sm transition-colors duration-200 ${
                  offer.highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white/10 hover:bg-white/15 text-white border border-slate-600"
                }`}
              >
                Demander un devis
              </a>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-400 text-xs sm:text-sm">
          <span>Devis gratuit</span>
          <span>·</span>
          <span>Prix ferme avant intervention</span>
          <span>·</span>
          <span>Artisan certifié</span>
          <span>·</span>
          <span>Décennale</span>
        </div>
      </div>
    </section>
  );
}
