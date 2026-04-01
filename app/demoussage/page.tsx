import { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { LeadForm } from "@/components/LeadForm";
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
};

export default function Page() {
  return (
    <>
      <HeroSection hero={config.hero} />
      <TrustBadges badges={config.trustBadges} />
      <LeadForm form={config.form} />
      <PainSection variant="demoussage" />
      <BeforeAfter items={config.beforeAfter} />
      <Testimonials variant="demoussage" />
      <Services
        data={config.services}
        title="Votre toiture propre et protégée en 4 étapes — sans stress et sans surprise"
      />
      <PlayTheTapeForward variant="demoussage" />
      <FAQ items={config.faq} />
      <CloserSection variant="demoussage" form={config.form} />
      <Footer />
    </>
  );
}
