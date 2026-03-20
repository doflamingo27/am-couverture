import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Votre Toiture Est en Danger — Démoussage Urgent Loiret | AM Couverture",
    description:
      "La mousse détruit votre toiture en silence. Agissez avant qu'il ne soit trop tard. Diagnostic gratuit. Artisan certifié à Ingré (45).",
    noindex: true,
  },
  hero: {
    badge: "AM COUVERTURE — INGRÉ (45)",
    title: "La mousse sur votre toit ? Elle cause bien plus de dégâts que vous ne le pensez",
    subtitle:
      "Chaque mois sans entretien rapproche votre toiture d'une rénovation complète. Agissez maintenant, diagnostic gratuit.",
    backgroundImage: "/images/hero1.jpg",
    dynamicH1: {
      "p5-degats": "Votre toit cache des dégâts — Vérification gratuite",
    },
  },
  trustBadges: [
    { icon: "Clock", text: "Diagnostic gratuit en 24h" },
    { icon: "Shield", text: "Assurance décennale" },
    { icon: "MapPin", text: "Artisan local Loiret" },
    { icon: "Star", text: "4.9★ sur Google" },
  ],
  form: {
    step1Label: "Quel est votre besoin ?",
    step1Options: [
      { label: "Démoussage / Nettoyage de toiture", value: "demoussage" },
      { label: "Traitement hydrofuge", value: "hydrofuge" },
      { label: "Rénovation complète de toiture", value: "renovation" },
      { label: "Autre demande", value: "autre" },
    ],
    step2Label: "Quel type de bien ?",
    step2Options: [
      { label: "Maison individuelle", value: "maison" },
      { label: "Immeuble / Copropriété", value: "immeuble" },
      { label: "Local commercial", value: "commerce" },
    ],
    submitText: "Demander mon diagnostic gratuit",
    reassurance: "Rappel sous 2h • Sans engagement • 100% gratuit",
  },
  problemSolution: {
    problemTitle: "Votre toiture se dégrade chaque jour",
    problemPoints: [
      "La mousse s'infiltre sous les tuiles et retient l'humidité en permanence",
      "L'hiver, le gel fait éclater les tuiles fragilisées : les fuites commencent",
      "Les infiltrations attaquent la charpente : réparations à plusieurs milliers d'euros",
      "Attendre 1 an de plus peut transformer un simple nettoyage en rénovation complète",
    ],
    problemImage: "/images/demoussage-v2-probleme.jpg",
    solutionTitle: "Stoppez les dégâts avant qu'il ne soit trop tard",
    solutionPoints: [
      "Diagnostic complet gratuit : on identifie les zones à risque",
      "Nettoyage professionnel basse pression (pas de Karcher destructeur)",
      "Traitement anti-mousse + hydrofuge : protection 5 à 10 ans",
      "Intervention rapide dans tout le Loiret",
    ],
    solutionImage: "/images/demoussage-v2-solution.jpg",
  },
  services: {
    title: "Notre intervention complète",
    badge: "Prestation clé en main",
    highlightWord: "complète",
    items: [
      { icon: "Search", title: "Diagnostic gratuit", description: "Évaluation complète de l'état de votre toiture, sans frais et sans engagement." },
      { icon: "Droplets", title: "Nettoyage basse pression", description: "Nettoyage professionnel de toute la surface sans endommager vos matériaux." },
      { icon: "FlaskConical", title: "Anti-mousse longue durée", description: "Traitement professionnel certifié pour éliminer mousses et lichens durablement." },
      { icon: "ShieldCheck", title: "Hydrofuge certifié", description: "Protection imperméabilisante qui préserve vos tuiles pendant 5 à 10 ans." },
      { icon: "Home", title: "Gouttières et évacuations", description: "Nettoyage et vérification de tout le réseau d'évacuation des eaux pluviales." },
      { icon: "Sparkles", title: "Chantier laissé propre", description: "Nettoyage minutieux de votre propriété après chaque intervention." },
      { icon: "ClipboardCheck", title: "Rapport photos avant/après", description: "Documentation complète de l'intervention avec photos et recommandations." },
      { icon: "BadgeCheck", title: "Garantie sur les travaux", description: "L'ensemble de nos prestations est garanti. Zéro risque pour vous." },
    ],
  },
  beforeAfter: [
    {
      before: "/images/demoussage-v2-avant-1.jpg",
      after: "/images/demoussage-v2-apres-1.jpg",
      caption: "Maison à Orléans — Toiture envahie par la mousse → Résultat après traitement",
    },
    {
      before: "/images/demoussage-v2-avant-2.jpg",
      after: "/images/demoussage-v2-apres-2.jpg",
      caption: "Pavillon à Saran — Tuiles noircies → Toiture comme neuve",
    },
    {
      before: "/images/demoussage-v2-avant-3.jpg",
      after: "/images/demoussage-v2-apres-3.jpg",
      caption: "Villa à Olivet — Mousse épaisse → Protection hydrofuge 10 ans",
    },
  ],
  testimonials: {
    average: 4.9,
    count: 47,
    items: [
      {
        name: "Laurent",
        city: "Orléans",
        rating: 5,
        text: "J'aurais dû le faire bien avant ! Ma toiture avait 8 ans de mousse. En 2 jours, c'était comme neuf. Aucune infiltration depuis.",
      },
      {
        name: "Nathalie",
        city: "Saran",
        rating: 5,
        text: "Mon voisin a attendu trop longtemps et a dû refaire toute sa toiture. J'ai fait appel à AM Couverture à temps. Résultat impeccable.",
      },
      {
        name: "Jean-Pierre",
        city: "Fleury-les-Aubrais",
        rating: 5,
        text: "Diagnostic rapide et honnête. Ils m'ont dit exactement ce qui était nécessaire, sans essayer de vendre du superflu. Travail propre et soigné.",
      },
      {
        name: "Isabelle",
        city: "La Chapelle-Saint-Mesmin",
        rating: 5,
        text: "Suite à une fuite, ils sont intervenus rapidement. Le problème venait de tuiles fragilisées par la mousse. Tout est réparé et protégé maintenant.",
      },
    ],
  },
  faq: [
    {
      question: "Combien coûte un démoussage de toiture ?",
      answer:
        "Chaque toiture est unique, c'est pourquoi nous proposons un diagnostic et devis gratuit. En moyenne, un démoussage préventif revient 10 à 20 fois moins cher qu'une rénovation due à des dégâts de mousse non traités.",
    },
    {
      question: "Comment être sûr que ce n'est pas une arnaque ?",
      answer:
        "Notre entreprise est immatriculée au RCS, assurée en décennale, et nos avis clients sont vérifiés sur Google. Nous ne pratiquons jamais le démarchage en porte-à-porte. Notre adresse et SIRET sont publics.",
    },
    {
      question: "Vous utilisez un Karcher ?",
      answer:
        "Jamais. Le nettoyage haute pression détruit les tuiles. Nous utilisons exclusivement un nettoyage basse pression avec des produits professionnels certifiés qui préservent vos matériaux.",
    },
    {
      question: "Combien de temps durent les travaux ?",
      answer:
        "1 à 2 jours en moyenne. L'hydrofuge assure une protection de 5 à 10 ans. Nous intervenons rapidement après acceptation du devis.",
    },
    {
      question: "Est-ce vraiment urgent ?",
      answer:
        "Si vous voyez de la mousse sur votre toit, oui. Chaque saison de gel accélère la dégradation. Le printemps et l'automne sont idéaux pour intervenir, mais n'attendez pas : les dégâts ne font qu'empirer.",
    },
  ],
  ctaFinal: {
    title: "N'attendez pas que les dégâts s'aggravent",
    subtitle: "Diagnostic gratuit — Intervention rapide dans le Loiret",
    ctaText: "Demander mon diagnostic gratuit",
    reassurance: "Rappel sous 2h • Sans engagement • 100% gratuit",
  },
};
