import type { LandingPageConfig } from "@/lib/types";

export const config: LandingPageConfig = {
  meta: {
    title: "Hydrofuge Façade 9€/m² — Promo Printemps Loiret 45",
    description:
      "Hydrofuge façade professionnel à 9€/m² au lieu de 25€/m². Protection 10 ans, stop infiltrations. Artisan local Loiret. Devis gratuit 24h. Offre jusqu'au 10 mai 2026.",
    noindex: true,
  },
  hero: {
    badge: "OFFRE PRINTEMPS — FAÇADE COMME NEUVE",
    title: "Offre Printemps — Façade protégée 10 ans à partir de 9€/m²",
    subtitle:
      "Profitez des tarifs préférentiels jusqu'au 10 mai. Hydrofuge façade professionnel, stop infiltrations et mousses, artisan local certifié. Devis gratuit en 24h.",
    backgroundImage: "/images/promo-facade-hero.jpg",
    dynamicH1: {
      "promo-facade": "Offre printemps — Hydrofuge façade à 9€/m² jusqu'au 10 mai",
    },
    stats: [
      { text: "4+ ans d\u2019expérience", color: "blue" },
      { text: "200+ façades traitées", color: "green" },
      { text: "100% garantie décennale", color: "orange" },
    ],
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
      { label: "Hydrofuge façade", value: "hydrofuge-facade" },
      { label: "Démoussage / Nettoyage de toiture", value: "demoussage" },
      { label: "Traitement hydrofuge toiture", value: "hydrofuge" },
      { label: "Démoussage + Hydrofuge", value: "demoussage-hydrofuge" },
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
    problemTitle: "Une façade non traitée absorbe l'humidité jour après jour",
    problemPoints: [
      "L'humidité pénètre les murs et dégrade l'isolation thermique",
      "Les mousses et algues noircissent la façade",
      "Les fissures s'agrandissent sous l'effet du gel",
      "Un ravalement complet peut dépasser 8 000€",
    ],
    solutionTitle: "L'hydrofuge façade protège vos murs pour 10 ans",
    solutionPoints: [
      "Produit hydrofuge professionnel invisible",
      "L'eau ruisselle au lieu de pénétrer",
      "Les mousses ne reviennent plus",
      "Compatible crépi, pierre, enduit, brique",
    ],
  },
  services: {
    title: "Votre façade protégée en 3 étapes — résultat visible immédiatement",
    badge: "Prestation clé en main",
    highlightWord: "protégée",
    items: [
      { icon: "Search", title: "Diagnostic façade", description: "Évaluation de l'état de votre façade\u00a0: type de support, niveau d'encrassement, fissures éventuelles." },
      { icon: "Droplets", title: "Nettoyage professionnel", description: "Nettoyage adapté au support (crépi, pierre, enduit) sans détériorer la surface." },
      { icon: "FlaskConical", title: "Application hydrofuge", description: "Pulvérisation du produit hydrofuge professionnel — invisible une fois sec." },
      { icon: "ShieldCheck", title: "Protection 10 ans", description: "Votre façade devient imperméable. L'eau ruisselle, les mousses ne reviennent plus." },
    ],
  },
  beforeAfter: [
    {
      before: "/images/demoussage-avant-1.jpg",
      after: "/images/demoussage-apres-1.jpg",
      caption: "Maison à Orléans — Hydrofuge façade crépi",
    },
    {
      before: "/images/demoussage-avant-2.jpg",
      after: "/images/demoussage-apres-2.jpg",
      caption: "Pavillon à Ingré — Traitement hydrofuge façade pierre",
    },
  ],
  testimonials: {
    average: 4.9,
    count: 47,
    items: [],
  },
  faq: [
    {
      question: "L'hydrofuge change-t-il l'aspect de ma façade ?",
      answer:
        "Non, le produit est invisible une fois sec. Votre façade garde son aspect d'origine, mais devient imperméable.",
    },
    {
      question: "Combien de temps dure la protection ?",
      answer:
        "10 ans minimum. Le produit professionnel que nous utilisons est garanti pour cette durée.",
    },
    {
      question: "Tous les types de façade sont-ils compatibles ?",
      answer:
        "Oui\u00a0: pierre, crépi, enduit, brique. Nous évaluons chaque façade lors du devis gratuit pour adapter le produit.",
    },
    {
      question: "L'offre à 9€/m² est-elle valable longtemps ?",
      answer:
        "Cette offre printemps est valable jusqu'au 10 mai uniquement, dans la limite des places disponibles.",
    },
  ],
  ctaFinal: {
    title: "Profitez de l'offre printemps façade",
    subtitle: "Tarifs préférentiels jusqu'au 10 mai — Places limitées",
    ctaText: "Réserver mon créneau",
    reassurance: "Rappel sous 2h • Sans engagement • Tarifs garantis",
  },
};
