import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Démoussage de Toiture à Orléans & Loiret — Devis Gratuit | AM Couverture",
    description:
      "Retrouvez une toiture propre et protégée. Démoussage professionnel sans Karcher, produits pros. Devis gratuit en 24h. Artisan local à Ingré (45).",
  },
  hero: {
    badge: "AM COUVERTURE — INGRÉ (45)",
    title: "Retrouvez une toiture propre et protégée pour les 10 prochaines années",
    subtitle:
      "Démoussage professionnel par un artisan local certifié, assurance décennale. Devis gratuit sous 24h.",
    backgroundImage: "/images/roofcleaning1.jpg",
    dynamicH1: {
      "c1-promo-printemps": "Offre printemps — Démoussage à 11€/m² jusqu'au 10 mai",
      "c3-agissez-printemps": "La mousse détruit votre toiture en silence — Agissez ce printemps",
      "p1-transformation": "Votre toiture retrouve son éclat — Devis gratuit en 24h",
      "p2-diagnostic": "Diagnostic toiture GRATUIT — On vous dit exactement où en est votre toit",
      "p3-comparatif": "Protégez votre toit avant qu'il soit trop tard — 10 à 20× moins cher",
      "p4-bouclier": "Votre toit propre ET protégé pour 5 à 10 ans",
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
      { label: "Rénovation complète de toiture", value: "renovation" },
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
    problemTitle: "La mousse détruit votre toiture en silence",
    problemPoints: [
      "La mousse retient l'humidité et fragilise vos tuiles année après année",
      "Les tuiles poreuses éclatent au gel et provoquent des infiltrations",
      "Plus vous attendez, plus la facture grimpe : une rénovation coûte 10 à 20 fois plus cher qu'un démoussage",
      "Les dégâts sur la charpente peuvent devenir irréversibles",
    ],
    problemImage: "/images/demoussage-probleme.jpg",
    solutionTitle: "Un nettoyage professionnel qui protège durablement",
    solutionPoints: [
      "Nettoyage basse pression respectueux de vos tuiles (jamais de Karcher)",
      "Produits professionnels anti-mousse (Algimousse / Sikagard)",
      "Traitement hydrofuge pour une protection de 5 à 10 ans",
      "Chantier laissé propre — gouttières et alentours nettoyés",
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
      { icon: "Home", title: "Gouttières et descentes", description: "Nettoyage complet des gouttières et vérification des évacuations d'eau." },
      { icon: "Sparkles", title: "Chantier propre", description: "Nettoyage soigné des abords et de votre propriété en fin d'intervention." },
      { icon: "ClipboardCheck", title: "Rapport détaillé", description: "Rapport d'intervention complet avec photos avant/après et recommandations." },
      { icon: "BadgeCheck", title: "Garantie travaux", description: "Tous nos travaux sont garantis. Votre satisfaction est notre priorité." },
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
    items: [
      {
        name: "Laurent",
        city: "Orléans",
        rating: 5,
        text: "Travail impeccable, ma toiture est comme neuve. Équipe ponctuelle et très professionnelle. Le chantier était propre à leur départ.",
      },
      {
        name: "Catherine",
        city: "Ingré",
        rating: 5,
        text: "Très satisfaite du résultat. Ils ont pris le temps de m'expliquer chaque étape. Pas de mauvaise surprise sur la facture.",
      },
      {
        name: "Philippe",
        city: "Olivet",
        rating: 5,
        text: "Intervention rapide, devis reçu le lendemain de mon appel. Résultat bluffant, plus aucune trace de mousse. Je recommande.",
      },
      {
        name: "Marie-Claude",
        city: "Saint-Jean-de-la-Ruelle",
        rating: 5,
        text: "Enfin un artisan sérieux ! Pas de démarchage, un devis clair, et un travail soigné. Ma toiture a retrouvé son éclat.",
      },
    ],
  },
  faq: [
    {
      question: "Combien coûte un démoussage de toiture ?",
      answer:
        "Chaque toiture est unique, c'est pourquoi nous vous offrons un devis gratuit sur-mesure. En moyenne, un démoussage préventif coûte 10 à 20 fois moins cher qu'une rénovation complète. C'est un investissement qui protège votre bien immobilier.",
    },
    {
      question: "Comment être sûr que ce n'est pas une arnaque ?",
      answer:
        "Notre entreprise est immatriculée au RCS, assurée en décennale, et nos avis clients sont vérifiés sur Google. Nous ne pratiquons jamais le démarchage en porte-à-porte. Vous pouvez vérifier notre SIRET et notre assurance à tout moment.",
    },
    {
      question: "Vous utilisez un Karcher ?",
      answer:
        "Jamais. Le nettoyage haute pression détruit les tuiles et réduit leur durée de vie. Nous utilisons un nettoyage basse pression avec des produits professionnels (type Algimousse / Sikagard) qui respectent vos matériaux et offrent une protection durable.",
    },
    {
      question: "Combien de temps durent les travaux ?",
      answer:
        "En moyenne 1 à 2 jours selon la surface de votre toiture. L'effet protecteur du traitement hydrofuge dure 5 à 10 ans. Nous intervenons dans les meilleurs délais après acceptation du devis.",
    },
    {
      question: "C'est le bon moment pour le faire ?",
      answer:
        "Le printemps et l'automne sont les périodes idéales pour un démoussage. Mais un toit mousseux doit être traité rapidement, quelle que soit la saison, pour éviter les dégâts liés au gel en hiver et à l'humidité.",
    },
  ],
  ctaFinal: {
    title: "Protégez votre toiture dès maintenant",
    subtitle: "Places limitées ce mois-ci — Diagnostic offert",
    ctaText: "Demander mon devis gratuit",
    reassurance: "Rappel sous 2h • Devis gratuit • Sans engagement",
  },
};
