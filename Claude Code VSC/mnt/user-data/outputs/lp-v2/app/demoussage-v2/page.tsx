import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import PainSection from '@/components/PainSection'
import BeforeAfter from '@/components/BeforeAfter'
import TestimonialsSection from '@/components/TestimonialsSection'
import HowItWorks from '@/components/HowItWorks'
import ServicesIncluded from '@/components/ServicesIncluded'
import PlayTheTapeForward from '@/components/PlayTheTapeForward'
import FAQSection from '@/components/FAQSection'
import CloserSection from '@/components/CloserSection'

export const metadata: Metadata = {
  title: 'La Mousse Détruit Votre Toiture en Silence — Diagnostic Gratuit | AM Couverture',
  description:
    'Votre toiture souffre peut-être sans que vous le sachiez. Inspection gratuite par un artisan certifié du Loiret. Devis sous 24h. 4.9/5 sur Google. Orléans et alentours.',
  robots: { index: false, follow: false }, // noindex — variante A/B test
}

const utmHeadlines: Record<string, string> = {
  'p5-degats': 'La mousse sur votre toit cause des dégâts que vous ne voyez pas encore',
  'c3-agissez-printemps': 'Agissez ce printemps — Votre toiture est peut-être en danger',
}

export default function DemoussageV2Page() {
  return (
    <main>
      {/* ━━━ 1. HERO + FORMULAIRE — angle peur ━━━ */}
      <HeroSection
        defaultHeadline="La mousse détruit votre toiture en silence — Vérification gratuite"
        subheadline="Votre toiture a plus de 5 ans ? La mousse et le lichen s'y attaquent progressivement. Un diagnostic gratuit par notre artisan certifié vous dit exactement où vous en êtes — sans engagement."
        utmHeadlines={utmHeadlines}
        ctaText="Demander mon inspection gratuite"
        formTitle="Inspection toiture gratuite"
        reviewCount={47}
        reviewScore="4.9"
        experienceYears={15}
        interventionCount={200}
        imageSrc="/images/demoussage-avant.jpg"
        imageAlt="Toiture avec mousse et lichen avant intervention AM Couverture"
      />

      {/* ━━━ 2. BARRE DE CONFIANCE ━━━ */}
      <TrustBadges />

      {/* ━━━ 3. SECTION DOULEUR — plus agressive sur cet angle ━━━ */}
      <PainSection variant="demoussage" />

      {/* ━━━ 4. AVANT / APRÈS ━━━ */}
      <BeforeAfter variant="demoussage" />

      {/* ━━━ 5. TÉMOIGNAGES ━━━ */}
      <TestimonialsSection variant="demoussage" />

      {/* ━━━ 6. COMMENT ÇA MARCHE ━━━ */}
      <HowItWorks
        title="On vous dit tout, gratuitement — Votre toiture n'aura plus de secret"
        variant="demoussage"
      />

      {/* ━━━ 7. SERVICES INCLUS ━━━ */}
      <ServicesIncluded variant="demoussage" />

      {/* ━━━ 8. PLAY THE TAPE FORWARD ━━━ */}
      <PlayTheTapeForward
        variant="demoussage"
        ctaText="Demander mon inspection gratuite maintenant"
      />

      {/* ━━━ 9. FAQ ━━━ */}
      <FAQSection variant="demoussage" />

      {/* ━━━ 10. CLOSER SECTION ━━━ */}
      <CloserSection
        variant="demoussage"
        headline="Savoir c'est pouvoir agir à temps — Inspection gratuite."
        subline="Ne découvrez pas les dégâts lors de la première fuite. Nos artisans du Loiret se déplacent gratuitement pour diagnostiquer votre toiture."
        ctaText="Demander mon inspection gratuite"
      />
    </main>
  )
}
