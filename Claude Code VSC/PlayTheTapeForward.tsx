'use client'

interface PlayTheTapeProps {
  variant?: 'demoussage' | 'renovation' | 'promo'
  ctaText?: string
  urgencyText?: string
}

const content = {
  demoussage: {
    title: 'Deux chemins devant vous.',
    futureA: {
      label: 'Si vous demandez votre devis aujourd\'hui',
      color: 'green',
      icon: '✓',
      points: [
        'Dans 2 semaines : votre toiture est démoussée et hydrofugée',
        'Protégée pour 5 à 10 ans — vous oubliez ce sujet',
        'Coût : une fraction de ce qu\'une réfection complète vous coûtera',
        'Valeur de votre maison préservée voire améliorée',
      ],
    },
    futureB: {
      label: 'Si vous attendez encore un printemps',
      color: 'red',
      icon: '✗',
      points: [
        'La mousse continue à retenir l\'humidité sous les tuiles',
        'Le prochain hiver fragilise davantage vos tuiles poreuses',
        'Dans 2-3 ans : réfection complète à 8 000-15 000€ inévitable',
        'Sans compter le risque d\'infiltration dans la charpente',
      ],
    },
  },
  renovation: {
    title: 'La décision que vous prenez aujourd\'hui compte.',
    futureA: {
      label: 'Si vous lancez la rénovation maintenant',
      color: 'green',
      icon: '✓',
      points: [
        'Toiture neuve, étanche, garantie 10 ans — problème réglé',
        'Isolation renforcée : économies sur vos factures d\'énergie',
        'Valeur immobilière en hausse pour votre logement',
        'Un seul chantier, un seul interlocuteur, pas de surprise',
      ],
    },
    futureB: {
      label: 'Si vous repoussez encore les travaux',
      color: 'red',
      icon: '✗',
      points: [
        'L\'humidité continue de progresser dans la charpente',
        'Un hiver de plus peut transformer une rénovation en réhabilitation',
        'Coût potentiellement ×2 à ×3 si la structure est atteinte',
        'Sinistre possible — et risque de non-couverture assurance',
      ],
    },
  },
  promo: {
    title: 'L\'offre est là maintenant — pas dans 3 mois.',
    futureA: {
      label: 'Si vous agissez avant le 21 avril',
      color: 'green',
      icon: '✓',
      points: [
        'Tarifs printemps : démoussage à 11€/m², hydrofuge à 13€/m²',
        'Intervention programmée avant l\'été — le meilleur moment',
        'Toiture propre et protégée avant les prochaines chaleurs',
        'Devis gratuit et détaillé sous 24h',
      ],
    },
    futureB: {
      label: 'Si vous attendez après le 21 avril',
      color: 'red',
      icon: '✗',
      points: [
        'L\'offre printemps n\'est plus valable',
        'Les créneaux d\'intervention s\'espacent en été',
        'La mousse a encore un printemps pour progresser',
        'Les tarifs reprennent leurs niveaux habituels',
      ],
    },
  },
}

export default function PlayTheTapeForward({
  variant = 'demoussage',
  ctaText = 'Demander mon devis gratuit maintenant',
  urgencyText,
}: PlayTheTapeProps) {
  const c = content[variant]

  return (
    <section className="bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{c.title}</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Future A — Good */}
          <div className="bg-green-900/40 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {c.futureA.icon}
              </span>
              <p className="font-semibold text-green-300 text-sm leading-tight">{c.futureA.label}</p>
            </div>
            <ul className="space-y-2.5">
              {c.futureA.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Future B — Bad */}
          <div className="bg-red-900/40 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {c.futureB.icon}
              </span>
              <p className="font-semibold text-red-300 text-sm leading-tight">{c.futureB.label}</p>
            </div>
            <ul className="space-y-2.5">
              {c.futureB.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">
          {urgencyText && (
            <p className="text-orange-300 font-medium mb-4 text-sm">{urgencyText}</p>
          )}
          <a
            href="#formulaire"
            className="inline-block bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl transition-all duration-200"
          >
            {ctaText}
          </a>
          <p className="text-gray-400 text-sm mt-3">Sans engagement · Gratuit · Rappel sous 2h</p>
        </div>

      </div>
    </section>
  )
}
