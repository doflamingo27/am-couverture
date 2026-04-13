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
  title: 'Démoussage Toiture Orléans & Loiret — Devis Gratuit 24h | AM Couverture',
  description:
    'Démoussage et traitement hydrofuge de toiture dans le Loiret. Artisan certifié, assurance décennale, 4.9/5 Google. Devis gratuit sous 24h. Intervention rapide à Orléans et alentours.',
  robots: { index: true, follow: true },
}

// UTM headline map — chaque pub a son H1 exact
const utmHeadlines: Record<string, string> = {
  'c1-promo-printemps': 'Offre printemps — Démoussage à 11€/m² jusqu\'au 21 avril',
  'c3-agissez-printemps': 'La mousse détruit votre toiture en silence — Agissez ce printemps',
  'p1-transformation': 'Votre toiture retrouve son éclat — Devis gratuit en 24h',
  'p2-diagnostic': 'Diagnostic toiture GRATUIT — On vous dit exactement où en est votre toit',
  'p3-comparatif': 'Protégez votre toit avant qu\'il soit trop tard — 10 à 20× moins cher',
  'p4-bouclier': 'Votre toit propre ET protégé pour 5 à 10 ans',
}

export default function DemoussagePage() {
  return (
    <main>
      {/* ━━━ 1. HERO + FORMULAIRE (above the fold) ━━━ */}
      <HeroSection
        defaultHeadline="Retrouvez une toiture propre et protégée — Devis gratuit en 24h"
        subheadline="Fatigué de voir la mousse s'installer ? Nos artisans certifiés du Loiret traitent votre toiture avec des produits professionnels, sans Karcher, sans mauvaise surprise."
        utmHeadlines={utmHeadlines}
        ctaText="Recevoir mon devis gratuit"
        formTitle="Devis gratuit en 24h"
        reviewCount={47}
        reviewScore="4.9"
        experienceYears={15}
        interventionCount={200}
        imageSrc="/images/demoussage-apres.jpg"
        imageAlt="Toiture démoussée et hydrofugée par AM Couverture dans le Loiret"
      />

      {/* ━━━ 2. BARRE DE CONFIANCE ━━━ */}
      <TrustBadges />

      {/* ━━━ 3. SECTION DOULEUR (PAS) — CRITIQUE pour audience Meta non-aware ━━━ */}
      <PainSection variant="demoussage" />

      {/* ━━━ 4. AVANT / APRÈS ━━━ */}
      <BeforeAfter variant="demoussage" />

      {/* ━━━ 5. TÉMOIGNAGES — 3 ciblés sur les objections, pas de carousel ━━━ */}
      <TestimonialsSection variant="demoussage" />

      {/* ━━━ 6. COMMENT ÇA MARCHE (titre benefit-driven) ━━━ */}
      <HowItWorks
        title="Votre toiture propre et protégée en 3 étapes — sans stress et sans surprise"
        variant="demoussage"
      />

      {/* ━━━ 7. SERVICES INCLUS ━━━ */}
      <ServicesIncluded variant="demoussage" />

      {/* ━━━ 8. PLAY THE TAPE FORWARD — 2 futurs contrastés ━━━ */}
      <PlayTheTapeForward
        variant="demoussage"
        ctaText="Demander mon devis gratuit maintenant"
      />

      {/* ━━━ 9. FAQ — objections de closing ━━━ */}
      <FAQSection variant="demoussage" />

      {/* ━━━ 10. CLOSER SECTION — mini-hero bas de page ━━━ */}
      <CloserSection variant="demoussage" />
    </main>
  )
}
