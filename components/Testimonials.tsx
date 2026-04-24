import { Star, BadgeCheck, Quote } from "lucide-react";

type Testimonial = {
  name: string;
  city: string;
  rating: number;
  text: string;
  service?: string;
};

type VariantKey = "demoussage" | "renovation" | "hydrofuge" | "facade";

const TESTIMONIALS: Record<VariantKey, Testimonial[]> = {
  demoussage: [
    {
      name: "Michel D.",
      city: "Fleury-les-Aubrais",
      rating: 5,
      text: "J'avais peur de me faire arnaquer — on entend tellement d'histoires avec les démarcheurs. AM Couverture m'a communiqué leur SIRET, l'assurance, et le devis détaillé avant de commencer. Zéro surprise sur la facture.",
      service: "Démoussage + Hydrofuge",
    },
    {
      name: "Christine B.",
      city: "Ingré",
      rating: 5,
      text: "Le résultat est bluffant. On dirait une toiture neuve. Je ne pensais pas qu'un traitement pouvait changer autant l'apparence d'une maison. Et deux hivers plus tard, toujours pas la moindre infiltration.",
      service: "Démoussage complet",
    },
    {
      name: "Alain P.",
      city: "Saran",
      rating: 5,
      text: "Devis reçu en moins de 24h comme promis, intervention programmée la semaine suivante. Dans le BTP c'est rare. L'artisan a même pris le temps de m'expliquer chaque étape. Je recommande sans hésitation.",
      service: "Démoussage + Nettoyage",
    },
  ],
  renovation: [
    {
      name: "Jacques & Marie F.",
      city: "Olivet",
      rating: 5,
      text: "Notre toiture fuyait depuis 3 ans. On repoussait chaque année. Quand AM Couverture est venu inspecter, ils ont constaté que la charpente commençait à souffrir — on avait bien fait de ne pas attendre une année de plus.",
      service: "Rénovation complète",
    },
    {
      name: "Martine L.",
      city: "La Chapelle-Saint-Mesmin",
      rating: 5,
      text: "Devis clair, prix respecté à l'euro près. Pas de travaux supplémentaires 'imprévus' apparus en cours de chantier — ce qui est malheureusement trop fréquent. Un seul interlocuteur du début à la fin.",
      service: "Rénovation toiture",
    },
    {
      name: "Bernard T.",
      city: "Saint-Jean-de-la-Ruelle",
      rating: 5,
      text: "La maison a pris 10 ans de moins d'un coup. Le chantier était propre à leur départ. Et la garantie décennale nous permet de dormir tranquilles pour les 10 prochaines années.",
      service: "Rénovation complète",
    },
  ],
  hydrofuge: [
    {
      name: "Patrice M.",
      city: "Orléans",
      rating: 5,
      text: "J\u2019avais fait démousser ma toiture il y a 4 ans sans hydrofuge. La mousse est revenue en 18 mois. Cette fois-ci, j\u2019ai pris le forfait avec hydrofuge Sikagard. Trois ans plus tard, pas une trace. Le surcoût vaut largement le coup.",
      service: "Hydrofuge toiture Sikagard",
    },
    {
      name: "Nathalie R.",
      city: "Saran",
      rating: 5,
      text: "Mon couvreur précédent m\u2019avait dit que l\u2019hydrofuge n\u2019était pas nécessaire. Quand j\u2019ai vu l\u2019état de mes tuiles après deux hivers, j\u2019ai appelé AM Couverture. Le diagnostic était honnête, le traitement rapide, et depuis l\u2019eau perle sur mes tuiles.",
      service: "Démoussage + Hydrofuge",
    },
    {
      name: "Jean-Claude T.",
      city: "Ingré",
      rating: 5,
      text: "Je suis retraité et méfiant par nature, surtout pour les travaux de toiture. J\u2019ai demandé trois devis. AM Couverture était le seul à détailler chaque poste. Travaux faits en une journée, chantier propre, et la facture correspond au centime près au devis.",
      service: "Hydrofuge toiture",
    },
  ],
  facade: [
    {
      name: "Sylvie K.",
      city: "Olivet",
      rating: 5,
      text: "Ma façade nord était couverte de traces vertes depuis des années. Mon voisin avait payé 7\u00a0000\u00a0€ pour un ravalement. AM Couverture m\u2019a proposé un nettoyage + hydrofuge pour moins de 1\u00a0200\u00a0€. Résultat identique, ma façade est comme neuve.",
      service: "Nettoyage + Hydrofuge façade",
    },
    {
      name: "Marc D.",
      city: "Fleury-les-Aubrais",
      rating: 5,
      text: "Le produit est complètement invisible \u2014 ma façade en crépi a gardé exactement la même teinte. Mais quand il pleut, on voit la différence\u00a0: l\u2019eau glisse au lieu de s\u2019imbiber. Plus de traces noires sous les fenêtres.",
      service: "Hydrofuge façade",
    },
    {
      name: "Françoise L.",
      city: "Saint-Jean-de-la-Ruelle",
      rating: 5,
      text: "J\u2019ai repoussé pendant 3 ans parce que je croyais qu\u2019il fallait un ravalement complet. Le diagnostic d\u2019AM Couverture m\u2019a rassurée\u00a0: un simple hydrofuge suffisait. Intervention en une demi-journée, pas de nuisance, prix correct.",
      service: "Hydrofuge façade",
    },
  ],
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-slate-600"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials({
  variant,
  data,
}: {
  variant?: VariantKey;
  data?: { average: number; count: number; items: Testimonial[] };
}) {
  const items = variant ? TESTIMONIALS[variant] : data?.items || [];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#1E293B]/60">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2.5 mb-5">
            <Stars rating={5} />
            <span className="text-amber-400 font-bold text-sm">4.9/5</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ce que disent nos clients
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Basé sur 47 avis vérifiés
          </p>
        </div>

        {/* Static grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 sm:p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars rating={item.rating} />
                <Quote size={18} className="text-[#B8CC30]/30" />
              </div>
              <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed flex-1">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#B8CC30]/15 flex items-center justify-center text-[#B8CC30] text-sm font-bold">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#B8CC30] text-xs font-medium">
                    <BadgeCheck size={14} />
                    Vérifié
                  </div>
                </div>
                {item.service && (
                  <p className="text-slate-500 text-xs mt-2">
                    {item.service}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 sm:mt-10 text-slate-400 text-sm font-medium">
          <span>4.9/5 ⭐</span>
          <span>·</span>
          <span>47 avis</span>
          <span>·</span>
          <span>200+ toitures</span>
          <span>·</span>
          <span>0 litige</span>
        </div>
      </div>
    </section>
  );
}
