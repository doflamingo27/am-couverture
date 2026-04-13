'use client'

import LeadForm from './LeadForm'

interface CloserSectionProps {
  headline?: string
  subline?: string
  ctaText?: string
  variant?: 'demoussage' | 'renovation' | 'promo'
}

const defaultContent = {
  demoussage: {
    headline: 'Votre toiture mérite une inspection gratuite — cette semaine.',
    subline:
      'Nos artisans se déplacent dans tout le Loiret. Devis détaillé sous 24h, intervention rapide.',
    ctaText: 'Recevoir mon devis gratuit',
    urgency: 'Plus de 200 propriétaires du Loiret nous font déjà confiance.',
  },
  renovation: {
    headline: 'Votre maison mérite une toiture à la hauteur.',
    subline:
      'Un seul interlocuteur, garanti décennale, devis gratuit. On s\'occupe de tout.',
    ctaText: 'Demander mon devis rénovation',
    urgency: 'Créneaux disponibles ce mois-ci dans le Loiret (45).',
  },
  promo: {
    headline: 'L\'offre printemps se termine le 21 avril — il reste des créneaux.',
    subline:
      'Démoussage à 11€/m², hydrofuge à 13€/m². Artisan certifié, résultat garanti.',
    ctaText: 'Profiter de l\'offre maintenant',
    urgency: 'Offre valable jusqu\'au 21 avril uniquement.',
  },
}

export default function CloserSection({
  variant = 'demoussage',
  headline,
  subline,
  ctaText,
}: CloserSectionProps) {
  const c = defaultContent[variant]
  const finalHeadline = headline ?? c.headline
  const finalSubline = subline ?? c.subline
  const finalCta = ctaText ?? c.ctaText

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-14 md:py-20" id="devis-final">
      <div className="max-w-5xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left — Copy */}
          <div>
            {/* Urgency pill */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              {c.urgency}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {finalHeadline}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{finalSubline}</p>

            {/* 2x social proof (different forms from above-fold) */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Assurance décennale active</p>
                  <p className="text-xs text-gray-500">Tous nos travaux sont garantis 10 ans</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.9/5 · 47 avis Google vérifiés</p>
                  <p className="text-xs text-gray-500">La note la plus élevée du Loiret</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Rappel sous 2h garanti</p>
                  <p className="text-xs text-gray-500">Du lundi au samedi, 8h-18h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-xl">
              <p className="font-bold text-xl text-gray-900 text-center mb-1">{finalCta}</p>
              <p className="text-sm text-gray-500 text-center mb-5">Réponse garantie sous 24h · Artisan Loiret (45)</p>
              <LeadForm ctaText={finalCta} />
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Sans engagement
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="text-green-500">✓</span> 100% gratuit
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="text-green-500">✓</span> Données sécurisées
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Pas de démarchage · Pas de revente de données · Résultat garanti
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
