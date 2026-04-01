import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Offre Printemps — Démoussage & Hydrofuge à partir de 11€/m² | AM Couverture",
    description:
      "Offre limitée printemps : démoussage toiture à 11€/m², hydrofuge à 13€/m². Artisan certifié, décennale. Devis gratuit. Loiret (45).",
    noindex: true,
  },
  hero: {
    badge: "OFFRE PRINTEMPS — PLACES LIMITÉES",
    title: "Offre Printemps — Toiture propre et protégée à partir de 11€/m²",
    subtitle:
      "Profitez des tarifs préférentiels jusqu'au 21 avril. Démoussage professionnel, artisan local certifié. Devis gratuit en 24h.",
    backgroundImage: "/images/roofcleaning1.jpg",
    dynamicH1: {
      "c1-promo-printemps": "Offre printemps — Démoussage à 11€/m² jusqu'au 21 avril",
    },
  },
  trustBadges: [
    { icon: "Clock", text: "Devis gratuit en 24h" },
    { icon: "Shield", text: "Assurance décennale" },
    { icon: "MapPin", text: "Artisan local Loiret" },
    { icon: "Star", text: "4.9★ sur Google" },
  ],
  form: {
    step1Label: "Quel est votre besoin ?",
    step1Options: [
      { label: "Démoussage / Nettoyage de toiture", value: "demoussage" },
      { label: "Traitement hydrofuge", value: "hydrofuge" },
      { label: "Démoussage + Hydrofuge", value: "demoussage-hydrofuge" },
      { label: "Hydrofuge façade", value: "hydrofuge-facade" },
    ],
    step2Label: "Quel type de bien ?",
    step2Options: [
      { label: "Maison individuelle", value: "maison" },
      { label: "Immeuble / Copropriété", value: "immeuble" },
      { label: "Local commercial", value: "commerce" },
    ],
    submitText: "Réserver mon créneau printemps",
    reassurance: "Rappel sous 2h • Sans engagement • Tarifs garantis",
  },
  problemSolution: {
    problemTitle: "La mousse détruit votre toiture en silence",
    problemPoints: [
      "La mousse retient l'humidité et fragilise vos tuiles année après année",
      "Les tuiles poreuses éclatent au gel et provoquent des infiltrations",
      "Plus vous attendez, plus la facture grimpe",
      "Les dégâts sur la charpente peuvent devenir irréversibles",
    ],
    problemImage: "/images/demoussage-probleme.jpg",
    solutionTitle: "Un nettoyage professionnel qui protège durablement",
    solutionPoints: [
      "Nettoyage basse pression respectueux de vos tuiles",
      "Produits professionnels anti-mousse (Algimousse / Sikagard)",
      "Traitement hydrofuge pour une protection de 5 à 10 ans",
      "Chantier laissé propre",
    ],
    solutionImage: "/images/demoussage-solution.jpg",
  },
  services: {
    title: "Ce qui est inclus dans chaque intervention",
    badge: "Prestation clé en main",
    highlightWord: "inclus",
    items: [
      { icon: "Search", title: "Inspection complète", description: "Vérification de chaque tuile, faîtage et points singuliers avant intervention." },
      { icon: "Droplets", title: "Nettoyage basse pression", description: "Nettoyage doux de toute la surface sans abîmer vos tuiles. Jamais de Karcher." },
      { icon: "FlaskConical", title: "Traitement anti-mousse", description: "Application de produits professionnels longue durée (Algimousse / Sikagard)." },
      { icon: "ShieldCheck", title: "Hydrofuge protecteur", description: "Imperméabilisant qui protège votre toiture pendant 5 à 10 ans." },
    ],
  },
  beforeAfter: [
    {
      before: "/images/demoussage-avant-1.jpg",
      after: "/images/demoussage-apres-1.jpg",
      caption: "Maison à Orléans — Démoussage complet + traitement hydrofuge",
    },
    {
      before: "/images/demoussage-avant-2.jpg",
      after: "/images/demoussage-apres-2.jpg",
      caption: "Pavillon à Ingré — Nettoyage toiture tuiles terre cuite",
    },
  ],
  testimonials: {
    average: 4.9,
    count: 47,
    items: [],
  },
  faq: [
    {
      question: "Combien coûte un démoussage de toiture ?",
      answer:
        "Avec notre offre printemps : démoussage à partir de 11€/m², hydrofuge à 13€/m². Le prix exact dépend de la surface et de l'état de votre toiture. Devis gratuit et sans engagement.",
    },
    {
      question: "Comment être sûr que ce n'est pas une arnaque ?",
      answer:
        "Notre entreprise est immatriculée au RCS, assurée en décennale, et nos avis clients sont vérifiés sur Google. Nous ne pratiquons jamais le démarchage en porte-à-porte.",
    },
    {
      question: "Vous utilisez un Karcher ?",
      answer:
        "Jamais. Le nettoyage haute pression détruit les tuiles. Nous utilisons un nettoyage basse pression avec des produits professionnels certifiés.",
    },
    {
      question: "L'offre printemps est-elle vraiment limitée ?",
      answer:
        "Oui. Les tarifs à 11€/m² sont valables jusqu'au 21 avril uniquement, dans la limite des créneaux disponibles. Au-delà, les tarifs normaux s'appliquent.",
    },
    {
      question: "Combien de temps durent les travaux ?",
      answer:
        "1 à 2 jours en moyenne. L'hydrofuge assure une protection de 5 à 10 ans.",
    },
  ],
  ctaFinal: {
    title: "Profitez de l'offre printemps",
    subtitle: "Tarifs préférentiels jusqu'au 21 avril — Places limitées",
    ctaText: "Réserver mon créneau",
    reassurance: "Rappel sous 2h • Sans engagement • Tarifs garantis",
  },
};
