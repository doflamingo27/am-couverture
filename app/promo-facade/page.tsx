import { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { LeadForm } from "@/components/LeadForm";
import { PromoOfferTable } from "@/components/PromoOfferTable";
import { PainSection } from "@/components/PainSection";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { Services } from "@/components/Services";
import { PlayTheTapeForward } from "@/components/PlayTheTapeForward";
import { FAQ } from "@/components/FAQ";
import { CloserSection } from "@/components/CloserSection";
import { Footer } from "@/components/Footer";
import { config } from "./config";

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <>
      <HeroSection hero={config.hero} />
      <TrustBadges badges={config.trustBadges} />
      <LeadForm form={config.form} />
      <PromoOfferTable
        deadline="10 mai"
        offers={[
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
            highlight: false,
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
            oldPrice: "25",
            highlight: true,
            badge: "Protection 10 ans",
            points: [
              "Compatible crépi, pierre, enduit, brique",
              "Produit invisible une fois sec",
              "Protection 10 ans minimum",
              "Stop infiltrations et mousses",
            ],
          },
        ]}
      />
      <PainSection variant="facade" />
      <BeforeAfter items={config.beforeAfter} />
      <Testimonials variant="facade" />
      <Services
        data={config.services}
        title="Votre façade protégée en 3 étapes — résultat visible immédiatement"
      />
      <PlayTheTapeForward
        variant="promo"
        urgencyText="Offre valable jusqu'au 10 mai — Places limitées"
        sectionTitle="Deux futurs possibles pour votre façade"
        content={{
          actTitle: "Si vous agissez avant le 10 mai",
          actPoints: [
            "Votre façade est protégée 10 ans",
            "Stop aux infiltrations et aux mousses",
            "Vous valorisez votre patrimoine et réduisez vos factures de chauffage",
            "Devis gratuit et sans engagement",
          ],
          waitTitle: "Si vous attendez après le 10 mai",
          waitPoints: [
            "Une façade non traitée continue d'absorber l'humidité",
            "Les murs se fragilisent, les mousses prolifèrent",
            "Un ravalement complet peut dépasser 8\u00a0000\u00a0€",
            "Vous repoussez encore d'une saison",
          ],
        }}
      />
      <FAQ items={config.faq} />
      <CloserSection
        variant="promo"
        headline="Offre limitée — Protégez votre façade avant le 10 mai."
        ctaText="Réserver mon créneau maintenant"
        form={config.form}
      />
      <Footer />
    </>
  );
}
