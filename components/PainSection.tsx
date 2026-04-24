import { AlertTriangle } from "lucide-react";

type Variant = "demoussage" | "renovation" | "hydrofuge" | "facade";

const CONTENT: Record<Variant, {
  badge: string;
  title: string;
  intro: string;
  agitateTitle: string;
  agitatePoints: string[];
  costLine: string;
  solveTitle: string;
  solveText: string;
}> = {
  demoussage: {
    badge: "Pourquoi agir maintenant",
    title: "La mousse sur votre toiture ne gêne pas que l'esthétique.",
    intro:
      "Elle retient l'humidité en permanence contre vos tuiles. Résultat\u00a0: des tuiles poreuses qui s'abîment de l'intérieur, invisiblement.",
    agitateTitle: "Chaque mois d'attente aggrave la situation.",
    agitatePoints: [
      "L'humidité s'infiltre sous les tuiles et attaque la charpente",
      "Le gel hivernal fait éclater les tuiles poreuses\u00a0: fuites garanties",
      "Moins de 15\u00a0% de pertes d'isolation\u00a0: vos factures de chauffage grimpent",
      "Un toit non entretenu perd 15 à 25\u00a0% de sa valeur immobilière",
    ],
    costLine:
      "Ce qui coûte 500-800\u00a0€ à traiter aujourd'hui peut coûter 8\u00a0000 à 15\u00a0000\u00a0€ dans 3 ans si on attend la réfection complète.",
    solveTitle:
      "Il existe une solution préventive, simple, et 10 à 20× moins chère.",
    solveText:
      "Un nettoyage basse pression professionnel suivi d'un traitement anti-mousse (Algimousse) et d'un hydrofuge (Sikagard) protège votre toiture pour 5 à 10 ans — sans abîmer vos tuiles, sans Karcher.",
  },
  renovation: {
    badge: "Pourquoi agir maintenant",
    title: "Les infiltrations ne préviennent pas — elles s'aggravent.",
    intro:
      "Tuiles fissurées, charpente humide, isolation dégradée\u00a0: chaque saison qui passe amplifie les dégâts et le coût de la réparation.",
    agitateTitle: "Chaque année d'attente aggrave la situation.",
    agitatePoints: [
      "L'humidité atteint la charpente — risque structurel majeur",
      "L'isolation perd en efficacité\u00a0: factures de chauffage en hausse",
      "Les tuiles cassées laissent passer l'eau à chaque pluie",
      "La valeur immobilière de votre maison chute de 15 à 25\u00a0%",
    ],
    costLine:
      "Une rénovation ciblée aujourd'hui coûte 2 à 3× moins cher qu'une réfection d'urgence dans 2-3 ans avec charpente atteinte.",
    solveTitle:
      "La rénovation complète règle tout d'un coup — pour 30 ans.",
    solveText:
      "Nouvelles tuiles, charpente vérifiée et traitée, isolation renforcée, zinguerie neuve. Un seul chantier, un seul interlocuteur, une garantie décennale.",
  },
  hydrofuge: {
    badge: "Pourquoi protéger votre toiture",
    title: "Une toiture non protégée vieillit deux fois plus vite.",
    intro:
      "Sans hydrofuge, vos tuiles absorbent l\u2019eau comme une éponge. L\u2019humidité s\u2019infiltre, la mousse revient, et les dégâts s\u2019accumulent saison après saison.",
    agitateTitle: "Chaque année sans protection aggrave la situation.",
    agitatePoints: [
      "Les tuiles poreuses éclatent au gel\u00a0: fuites et infiltrations",
      "La mousse se réinstalle en quelques mois sur des tuiles non traitées",
      "L\u2019humidité atteint la charpente et provoque des dégâts structurels",
      "La valeur immobilière de votre maison baisse de 15 à 25\u00a0%",
    ],
    costLine:
      "Un hydrofuge à 13\u00a0€/m² aujourd\u2019hui évite une réfection complète à 8\u00a0000-15\u00a0000\u00a0€ dans 3 à 5 ans.",
    solveTitle:
      "L\u2019hydrofuge professionnel protège votre toiture pour 10 ans.",
    solveText:
      "Un hydrofuge Sikagard appliqué par un artisan certifié rend vos tuiles imperméables. L\u2019eau perle en surface, la mousse ne s\u2019accroche plus, et votre toiture conserve son état pendant une décennie.",
  },
  facade: {
    badge: "Pourquoi protéger votre façade",
    title: "Une façade non traitée absorbe l\u2019humidité jour après jour.",
    intro:
      "Les murs non protégés se gorgent d\u2019eau à chaque pluie. Résultat\u00a0: mousses, fissures, et une isolation qui se dégrade en silence.",
    agitateTitle: "Chaque saison sans protection aggrave la situation.",
    agitatePoints: [
      "L\u2019humidité pénètre les murs et dégrade l\u2019isolation thermique",
      "Les mousses et algues noircissent la façade\u00a0: aspect négligé",
      "Les fissures s\u2019agrandissent sous l\u2019effet du gel et de l\u2019humidité",
      "Un ravalement complet peut dépasser 8\u00a0000\u00a0€ si on attend trop",
    ],
    costLine:
      "Un hydrofuge façade à 9\u00a0€/m² aujourd\u2019hui évite un ravalement complet à 8\u00a0000\u00a0€+ dans quelques années.",
    solveTitle:
      "L\u2019hydrofuge façade protège vos murs pour 10 ans.",
    solveText:
      "Un hydrofuge professionnel invisible rend votre façade imperméable sans modifier son aspect. L\u2019eau ruisselle au lieu de pénétrer, les mousses ne reviennent plus, et vos murs restent sains pendant une décennie.",
  },
};

export function PainSection({
  variant,
}: {
  variant: Variant;
}) {
  const c = CONTENT[variant];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-orange-200">
            <AlertTriangle size={13} />
            {c.badge}
          </span>
        </div>

        {/* Title + intro */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-4 leading-tight">
          {c.title}
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed mb-8">
          {c.intro}
        </p>

        {/* Agitate block */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 sm:p-8 mb-6">
          <p className="font-bold text-gray-900 text-lg mb-4">
            {c.agitateTitle}
          </p>
          <ul className="flex flex-col gap-3">
            {c.agitatePoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-gray-700 leading-relaxed"
              >
                <span className="text-orange-500 font-bold shrink-0 mt-0.5">
                  ⚠
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Cost callout */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-6">
          <p className="text-orange-800 text-sm sm:text-[15px] font-semibold leading-relaxed">
            {c.costLine}
          </p>
        </div>

        {/* Solve block */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 mb-8">
          <p className="font-bold text-green-900 text-lg mb-3">
            {c.solveTitle}
          </p>
          <p className="text-green-800 text-sm sm:text-[15px] leading-relaxed">
            {c.solveText}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#formulaire"
            className="animate-shadow-pulse inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg transition-colors duration-200"
          >
            Demander mon devis gratuit
          </a>
          <p className="text-gray-500 text-xs sm:text-sm mt-3">
            Rappel sous 2h · Sans engagement · 100% gratuit
          </p>
        </div>
      </div>
    </section>
  );
}
