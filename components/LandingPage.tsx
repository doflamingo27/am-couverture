import { StickyPhoneBar } from "@/components/StickyPhoneBar";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { LeadForm } from "@/components/LeadForm";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import type { LandingPageConfig } from "@/lib/types";

export function LandingPage({ config }: { config: LandingPageConfig }) {
  return (
    <>
      <StickyPhoneBar />
      <HeroSection hero={config.hero} />
      <TrustBadges badges={config.trustBadges} />
      <LeadForm form={config.form} />
      <ProblemSolution data={config.problemSolution} />
      <Services data={config.services} />
      <BeforeAfter items={config.beforeAfter} />
      <Testimonials data={config.testimonials} />
      <FAQ items={config.faq} />
      <CTASection data={config.ctaFinal} />
      <Footer />
    </>
  );
}
