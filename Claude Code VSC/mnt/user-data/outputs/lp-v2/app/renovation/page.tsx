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
  title: 'Rénovation Toiture Orléans & Loiret — Devis Gratuit | AM Couverture',
  description:
    'Rénovation toiture complète dans le Loiret. Dépose, pose, zinguerie, nettoyage. Artisan certifié, garantie décennale 10 ans. Devis gratuit sous 24h. Orléans et alentours.',
  robots: { index: true, follow: true },
}

const utmHeadlines: Record<string, string> = {
  'c2-maison-retrouve-vie': 'Rénovation toiture complète — Votre maison retrouve 10 ans de vie',
  'p6-cle-en-main': 'Rénovation toiture clé en main — On gère tout du début à la fin',
  'p7-patrimoine': 'Protégez 15% de la valeur de votre maison — Rénovation garantie 10 ans',
  'p8-reprend-vie': 'Cette maison dans le Loiret prenait l\'eau — Voici ce qu\'on a fait',
  'p9-transformation-reno': 'Même maison. Toit neuf. Transformation totale.',
}

export default function RenovationPage() {
  return (
    <main>
      {/* ━━━ 1. HERO + FORMULAIRE ━━━ */}
      <HeroSection
        defaultHeadline="Rénovation toiture complète — Résultat garanti 10 ans"
        subheadline="Votre toiture fuit, les tuiles sont abîmées, le faîtage usé ? Nos artisans certifiés du Loiret s'occupent de tout : dépose, charpente, pose, zinguerie. Un seul interlocuteur du début à la fin."
        utmHeadlines={utmHeadlines}
        ctaText="Demander mon devis rénovation"
        formTitle="Devis rénovation gratuit"
        reviewCount={47}
        reviewScore="4.9"
        experienceYears={15}
        interventionCount={150}
        imageSrc="/images/renovation-apres.jpg"
        imageAlt="Rénovation toiture complète réalisée par AM Couverture dans le Loiret"
      />

      {/* ━━━ 2. BARRE DE CONFIANCE ━━━ */}
      <TrustBadges />

      {/* ━━━ 3. SECTION DOULEUR (PAS) ━━━ */}
      <PainSection variant="renovation" />

      {/* ━━━ 4. AVANT / APRÈS ━━━ */}
      <BeforeAfter variant="renovation" />

      {/* ━━━ 5. TÉMOIGNAGES ━━━ */}
      <TestimonialsSection variant="renovation" />

      {/* ━━━ 6. COMMENT ÇA MARCHE ━━━ */}
      <HowItWorks
        title="Votre toiture rénovée en 4 étapes — un seul artisan du début à la fin"
        variant="renovation"
      />

      {/* ━━━ 7. SERVICES INCLUS ━━━ */}
      <ServicesIncluded variant="renovation" />

      {/* ━━━ 8. PLAY THE TAPE FORWARD ━━━ */}
      <PlayTheTapeForward
        variant="renovation"
        ctaText="Demander mon devis rénovation maintenant"
      />

      {/* ━━━ 9. FAQ ━━━ */}
      <FAQSection variant="renovation" />

      {/* ━━━ 10. CLOSER SECTION ━━━ */}
      <CloserSection variant="renovation" />
    </main>
  )
}
