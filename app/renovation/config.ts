import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Rénovation de Toiture à Orléans & Loiret — Devis Gratuit | AM Couverture",
    description:
      "Rénovation complète de toiture par un artisan local certifié. Couverture, zinguerie, isolation. Devis gratuit en 24h dans le Loiret (45).",
  },
  hero: {
    badge: "AM COUVERTURE — INGRÉ (45)",
    title: "Une toiture neuve et durable pour votre tranquillité",
    subtitle:
      "Rénovation complète de couverture. Artisan certifié, assurance décennale. Devis détaillé gratuit sous 24h.",
    backgroundImage: "/images/hero2.jpg",
    dynamicH1: {
      "c2-maison-retrouve-vie": "Rénovation toiture complète — Votre maison retrouve 10 ans de vie",
      "p6-cle-en-main": "Rénovation toiture clé en main — On gère tout du début à la fin",
      "p7-patrimoine": "Protégez 15% de la valeur de votre maison — Rénovation garantie 10 ans",
      "p8-reprend-vie": "Cette maison dans le Loiret prenait l'eau — Voici ce qu'on a fait",
      "p9-transformation-reno": "Même maison. Toit neuf. Transformation totale.",
    },
  },
  trustBadges: [
    { icon: "Clock", text: "Devis gratuit en 24h" },
    { icon: "Shield", text: "Assurance décennale" },
    { icon: "MapPin", text: "Artisan local Loiret" },
    { icon: "Star", text: "4.9★ sur Google" },
  ],
  form: {
    step1Label: "Quel type de travaux ?",
    step1Options: [
      { label: "Rénovation complète de toiture", value: "renovation-complete" },
      { label: "Remplacement partiel de tuiles", value: "remplacement-tuiles" },
      { label: "Zinguerie / Gouttières", value: "zinguerie" },
      { label: "Autre demande", value: "autre" },
    ],
    step2Label: "Quel type de bien ?",
    step2Options: [
      { label: "Maison individuelle", value: "maison" },
      { label: "Immeuble / Copropriété", value: "immeuble" },
      { label: "Local commercial", value: "commerce" },
    ],
    submitText: "Recevoir mon devis gratuit",
    reassurance: "Rappel sous 2h • Sans engagement • 100% gratuit",
  },
  problemSolution: {
    problemTitle: "Une toiture vieillissante menace votre maison",
    problemPoints: [
      "Les tuiles cassées ou déplacées provoquent des infiltrations d'eau",
      "Une couverture dégradée fait chuter la valeur de votre bien immobilier",
      "Les déperditions thermiques augmentent vos factures d'énergie",
      "Les petites réparations repoussées finissent par coûter très cher",
    ],
    problemImage: "/images/renovation-probleme.jpg",
    solutionTitle: "Une rénovation complète par des professionnels",
    solutionPoints: [
      "Diagnostic complet de la charpente et de la couverture",
      "Remplacement des tuiles, ardoises ou bardeaux selon vos besoins",
      "Réfection de la zinguerie (gouttières, chéneaux, noues)",
      "Garantie décennale sur tous les travaux réalisés",
    ],
    solutionImage: "/images/renovation-solution.jpg",
  },
  services: {
    title: "Nos prestations de rénovation",
    badge: "Prestation clé en main",
    highlightWord: "rénovation",
    items: [
      { icon: "Search", title: "Diagnostic complet", description: "Inspection approfondie de la toiture et de la charpente avant tout travaux." },
      { icon: "Hammer", title: "Dépose anciens matériaux", description: "Retrait et évacuation soignée de l'ancienne couverture et des débris." },
      { icon: "Home", title: "Nouvelle couverture", description: "Pose de tuiles, ardoises ou bardeaux neufs selon vos besoins et votre budget." },
      { icon: "Wrench", title: "Zinguerie complète", description: "Réfection des gouttières, chéneaux, noues et tous les points singuliers." },
      { icon: "ScanEye", title: "Inspection charpente", description: "Vérification et renforcement de la charpente si nécessaire avant repose." },
      { icon: "Layers", title: "Écran sous-toiture", description: "Pose d'un écran de protection pour une isolation et une étanchéité optimales." },
      { icon: "Sparkles", title: "Nettoyage chantier", description: "Nettoyage complet de votre propriété et évacuation de tous les déchets." },
      { icon: "BadgeCheck", title: "Garantie décennale", description: "Tous nos travaux de rénovation sont couverts par la garantie décennale (10 ans)." },
    ],
  },
  beforeAfter: [
    {
      before: "/images/renovation-avant-1.jpg",
      after: "/images/renovation-apres-1.jpg",
      caption: "Pavillon à Fleury-les-Aubrais — Rénovation complète couverture tuiles",
    },
    {
      before: "/images/renovation-avant-2.jpg",
      after: "/images/renovation-apres-2.jpg",
      caption: "Maison à Ingré — Réfection toiture + zinguerie",
    },
  ],
  testimonials: {
    average: 4.9,
    count: 47,
    items: [
      {
        name: "Marc",
        city: "Orléans",
        rating: 5,
        text: "Rénovation complète de notre toiture en 5 jours. Travail remarquable, équipe sérieuse. Plus aucune fuite depuis 2 ans.",
      },
      {
        name: "Sophie",
        city: "Ingré",
        rating: 5,
        text: "Le devis était clair et détaillé. Pas de surprise à la fin. La toiture est superbe et on sent la différence sur le chauffage.",
      },
      {
        name: "Christophe",
        city: "La Chapelle-Saint-Mesmin",
        rating: 5,
        text: "Excellents conseils sur le choix des tuiles. Le résultat est au-delà de mes attentes. Chantier propre et respect des délais.",
      },
      {
        name: "Annie",
        city: "Saran",
        rating: 5,
        text: "Notre maison de 1970 avait besoin d'une réfection totale. AM Couverture a fait un travail magnifique. Très professionnels.",
      },
    ],
  },
  faq: [
    {
      question: "Combien coûte une rénovation de toiture ?",
      answer:
        "Le prix dépend de la surface, du type de couverture et de l'état de la charpente. Nous proposons un diagnostic et devis gratuit pour vous donner un prix exact, transparent et sans surprise.",
    },
    {
      question: "Combien de temps durent les travaux ?",
      answer:
        "En moyenne 3 à 7 jours pour une maison individuelle, selon l'ampleur des travaux. Nous vous communiquons un planning précis avant de commencer.",
    },
    {
      question: "Est-ce que vous vérifiez la charpente ?",
      answer:
        "Oui, systématiquement. Avant toute réfection de couverture, nous inspectons l'état de la charpente et vous signalons si des travaux de renforcement sont nécessaires.",
    },
    {
      question: "Quelles garanties proposez-vous ?",
      answer:
        "Tous nos travaux de rénovation sont couverts par la garantie décennale. Vous êtes protégé pendant 10 ans contre tout défaut ou malfaçon.",
    },
    {
      question: "Peut-on rester dans la maison pendant les travaux ?",
      answer:
        "Oui, dans la grande majorité des cas. Nous travaillons depuis l'extérieur. Nous vous prévenons à l'avance si une pièce doit être temporairement inaccessible.",
    },
  ],
  ctaFinal: {
    title: "Votre toiture mérite d'être entre de bonnes mains",
    subtitle: "Devis détaillé gratuit — Artisan certifié dans le Loiret",
    ctaText: "Demander mon devis gratuit",
    reassurance: "Rappel sous 2h • Sans engagement • 100% gratuit",
  },
};
