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
            oldPrice: "25",
            highlight: true,
            badge: "Protection 10 ans",
            points: [
              "Hydrofuge Sikagard professionnel",
              "Effet perlant garanti",
              "Protection 10 ans minimum",
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
        ]}
      />
      <PainSection variant="hydrofuge" />
      <BeforeAfter items={config.beforeAfter} />
      <Testimonials variant="hydrofuge" />
      <Services
        data={config.services}
        title="Votre toiture protégée en 3 étapes — effet perlant garanti"
      />
      <PlayTheTapeForward
        variant="promo"
        urgencyText="Offre valable jusqu'au 10 mai — Places limitées"
        sectionTitle="Deux futurs possibles pour votre toiture"
        content={{
          actTitle: "Si vous agissez avant le 10 mai",
          actPoints: [
            "Votre toiture est protégée 10 ans",
            "L'eau ruisselle sans pénétrer, les mousses ne reviennent plus",
            "Vous prolongez la durée de vie de votre toit de 15 à 20 ans",
            "Devis gratuit et sans engagement",
          ],
          waitTitle: "Si vous attendez après le 10 mai",
          waitPoints: [
            "Sans hydrofuge, votre toiture continue de s'abîmer",
            "Les infiltrations apparaissent, les tuiles se gorgent d'eau",
            "La rénovation complète peut coûter jusqu'à 15\u00a0000\u00a0€",
            "Vous repoussez encore d'une saison",
          ],
        }}
      />
      <FAQ items={config.faq} />
      <CloserSection
        variant="promo"
        headline="Offre limitée — Protégez votre toiture avant le 10 mai."
        ctaText="Réserver mon créneau maintenant"
        form={config.form}
      />
      <Footer />
    </>
  );
}
