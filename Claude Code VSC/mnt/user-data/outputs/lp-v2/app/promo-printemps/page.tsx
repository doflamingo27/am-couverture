import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import PainSection from '@/components/PainSection'
import BeforeAfter from '@/components/BeforeAfter'
import PromoOfferTable from '@/components/PromoOfferTable'
import TestimonialsSection from '@/components/TestimonialsSection'
import HowItWorks from '@/components/HowItWorks'
import PlayTheTapeForward from '@/components/PlayTheTapeForward'
import FAQSection from '@/components/FAQSection'
import CloserSection from '@/components/CloserSection'

export const metadata: Metadata = {
  title: 'Offre Printemps Toiture — Démoussage 11€/m² | AM Couverture Loiret',
  description:
    'Offre spéciale printemps : démoussage toiture à 11€/m², hydrofuge toiture 13€/m², hydrofuge façade 9€/m². Valable jusqu\'au 21 avril. Artisan certifié Loiret (45). Devis gratuit sous 24h.',
  robots: { index: false, follow: false }, // noindex — page promo temporaire
}

const utmHeadlines: Record<string, string> = {
  'c1-promo-printemps': 'Offre printemps — Démoussage à 11€/m² jusqu\'au 21 avril',
  'c5-urgence': 'Votre toiture vous attend — L\'offre se termine le 21 avril',
}

export default function PromoPrintempsPage() {
  return (
    <main>
      {/* ━━━ 1. HERO + FORMULAIRE ━━━ */}
      <HeroSection
        defaultHeadline="Offre Printemps — Toiture propre et protégée à partir de 11€/m²"
        subheadline="Profitez de nos tarifs de printemps pour démoussage, hydrofuge toiture et hydrofuge façade. Artisan certifié Loiret, assurance décennale. Offre valable jusqu'au 21 avril uniquement."
        utmHeadlines={utmHeadlines}
        ctaText="Profiter de l'offre maintenant"
        formTitle="Devis offre printemps — 24h"
        reviewCount={47}
        reviewScore="4.9"
        experienceYears={15}
        interventionCount={200}
        imageSrc="/images/demoussage-apres.jpg"
        imageAlt="Toiture démoussée et hydrofugée — Offre printemps AM Couverture"
      />

      {/* ━━━ 2. BARRE DE CONFIANCE ━━━ */}
      <TrustBadges />

      {/* ━━━ 3. TABLEAU DES PRIX PROMO — affiché tôt car c'est l'argument central ━━━ */}
      <PromoOfferTable deadline="21 avril" />

      {/* ━━━ 4. SECTION DOULEUR (PAS) ━━━ */}
      <PainSection variant="demoussage" />

      {/* ━━━ 5. AVANT / APRÈS ━━━ */}
      <BeforeAfter variant="demoussage" />

      {/* ━━━ 6. TÉMOIGNAGES ━━━ */}
      <TestimonialsSection variant="demoussage" />

      {/* ━━━ 7. COMMENT ÇA MARCHE ━━━ */}
      <HowItWorks
        title="Votre toiture traitée en 3 étapes — résultat visible immédiatement"
        variant="demoussage"
      />

      {/* ━━━ 8. PLAY THE TAPE FORWARD ━━━ */}
      <PlayTheTapeForward
        variant="promo"
        ctaText="Profiter de l'offre printemps maintenant"
        urgencyText="Offre valable jusqu'au 21 avril — Places limitées ce mois-ci"
      />

      {/* ━━━ 9. FAQ ━━━ */}
      <FAQSection variant="demoussage" />

      {/* ━━━ 10. CLOSER SECTION ━━━ */}
      <CloserSection
        variant="promo"
        headline="Il reste des créneaux disponibles avant le 21 avril."
        subline="Démoussage à 11€/m² · Hydrofuge toiture 13€/m² · Hydrofuge façade 9€/m². Devis gratuit, rappel sous 2h."
        ctaText="Réserver mon créneau maintenant"
      />
    </main>
  )
}
