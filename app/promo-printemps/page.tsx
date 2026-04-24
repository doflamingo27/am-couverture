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
      <PromoOfferTable deadline="10 mai" />
      <PainSection variant="demoussage" />
      <BeforeAfter items={config.beforeAfter} />
      <Testimonials variant="demoussage" />
      <Services
        data={config.services}
        title="Votre toiture traitée en 3 étapes — résultat visible immédiatement"
      />
      <PlayTheTapeForward
        variant="promo"
        urgencyText="Offre valable jusqu'au 10 mai — Places limitées"
      />
      <FAQ items={config.faq} />
      <CloserSection
        variant="promo"
        headline="Il reste des créneaux disponibles avant le 10 mai."
        ctaText="Réserver mon créneau maintenant"
        form={config.form}
      />
      <Footer />
    </>
  );
}
