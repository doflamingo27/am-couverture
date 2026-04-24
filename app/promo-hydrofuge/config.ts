import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Hydrofuge Toiture 13€/m² — Promo Printemps Loiret 45",
    description:
      "Hydrofuge toiture professionnel à 13€/m² au lieu de 25€/m². Protection garantie 10 ans. Artisan local Loiret. Devis gratuit 24h. Offre jusqu'au 10 mai 2026.",
    noindex: true,
  },
  hero: {
    badge: "OFFRE PRINTEMPS — PROTECTION 10 ANS",
    title: "Offre Printemps — Toiture protégée 10 ans à partir de 13€/m²",
    subtitle:
      "Profitez des tarifs préférentiels jusqu'au 10 mai. Hydrofuge toiture professionnel, effet perlant garanti, artisan local certifié. Devis gratuit en 24h.",
    backgroundImage: "/images/roofcleaning1.jpg",
    dynamicH1: {
      "promo-hydrofuge": "Offre printemps — Hydrofuge toiture à 13€/m² jusqu'au 10 mai",
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
      { label: "Traitement hydrofuge", value: "hydrofuge" },
      { label: "Démoussage + Hydrofuge", value: "demoussage-hydrofuge" },
      { label: "Démoussage / Nettoyage de toiture", value: "demoussage" },
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
    problemTitle: "Une toiture non protégée vieillit deux fois plus vite",
    problemPoints: [
      "Les tuiles absorbent l'eau et deviennent poreuses",
      "La mousse revient en quelques mois sans traitement",
      "L'humidité atteint la charpente et provoque des dégâts structurels",
      "La valeur immobilière de votre maison baisse significativement",
    ],
    solutionTitle: "L'hydrofuge professionnel protège votre toiture pour 10 ans",
    solutionPoints: [
      "Hydrofuge Sikagard professionnel à effet perlant",
      "L'eau perle en surface au lieu de pénétrer les tuiles",
      "La mousse ne peut plus s'accrocher",
      "Protection garantie 10 ans minimum",
    ],
  },
  services: {
    title: "Votre toiture protégée en 3 étapes — effet perlant garanti",
    badge: "Prestation clé en main",
    highlightWord: "protégée",
    items: [
      { icon: "Search", title: "Diagnostic complet", description: "Vérification de l'état de chaque tuile et identification des zones à traiter en priorité." },
      { icon: "Droplets", title: "Nettoyage préparatoire", description: "Nettoyage basse pression de la surface pour permettre une pénétration optimale du produit." },
      { icon: "FlaskConical", title: "Application hydrofuge Sikagard", description: "Pulvérisation du produit hydrofuge professionnel sur l'ensemble de la toiture." },
      { icon: "ShieldCheck", title: "Protection 10 ans", description: "Vos tuiles deviennent imperméables. L'eau perle en surface, la mousse ne s'accroche plus." },
    ],
  },
  beforeAfter: [
    {
      before: "/images/demoussage-avant-1.jpg",
      after: "/images/demoussage-apres-1.jpg",
      caption: "Maison à Orléans — Hydrofuge toiture après démoussage complet",
    },
    {
      before: "/images/demoussage-avant-2.jpg",
      after: "/images/demoussage-apres-2.jpg",
      caption: "Pavillon à Ingré — Traitement hydrofuge tuiles terre cuite",
    },
  ],
  testimonials: {
    average: 4.9,
    count: 47,
    items: [],
  },
  faq: [
    {
      question: "Combien de temps dure le traitement hydrofuge ?",
      answer:
        "L'hydrofuge professionnel que nous appliquons offre une protection de 10 ans minimum. Au-delà, un nouveau traitement prolonge l'efficacité.",
    },
    {
      question: "L'effet perlant est-il vraiment garanti ?",
      answer:
        "Oui. Dès le séchage du produit, l'eau perle visiblement sur vos tuiles au lieu de pénétrer. C'est notre garantie qualité.",
    },
    {
      question: "Faut-il faire un démoussage avant l'hydrofuge ?",
      answer:
        "Oui, un nettoyage est nécessaire pour que le produit pénètre bien. Nous proposons un forfait combiné démoussage + hydrofuge à tarif préférentiel.",
    },
    {
      question: "L'offre à 13€/m² est-elle valable longtemps ?",
      answer:
        "Cette offre printemps est valable jusqu'au 10 mai uniquement, dans la limite des places disponibles.",
    },
  ],
  ctaFinal: {
    title: "Profitez de l'offre printemps hydrofuge",
    subtitle: "Tarifs préférentiels jusqu'au 10 mai — Places limitées",
    ctaText: "Réserver mon créneau",
    reassurance: "Rappel sous 2h • Sans engagement • Tarifs garantis",
  },
};
