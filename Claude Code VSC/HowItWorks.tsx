'use client'

interface Step {
  number: string
  title: string
  description: string
  duration?: string
}

interface HowItWorksProps {
  title?: string
  variant?: 'demoussage' | 'renovation'
}

const demoussageSteps: Step[] = [
  {
    number: '01',
    title: 'Vous demandez votre devis',
    description: 'Remplissez le formulaire. Un artisan vous rappelle sous 2h (jamais un commercial). On convient d\'une date d\'inspection.',
    duration: '5 minutes',
  },
  {
    number: '02',
    title: 'On inspecte votre toiture',
    description: 'Notre artisan se déplace, monte sur le toit, évalue l\'étendue de la mousse et l\'état des tuiles. Il vous explique tout en clair.',
    duration: 'Gratuit',
  },
  {
    number: '03',
    title: 'On traite — sans Karcher',
    description: 'Nettoyage basse pression + produits professionnels (Algimousse/Sikagard). Application du traitement hydrofuge si souhaité.',
    duration: '1-2 jours',
  },
  {
    number: '04',
    title: 'Résultat garanti',
    description: 'Votre toiture est propre, protégée pour 5-10 ans. On nettoie le chantier. On vous envoie les photos avant/après.',
    duration: '5-10 ans de protection',
  },
]

const renovationSteps: Step[] = [
  {
    number: '01',
    title: 'Devis gratuit sur place',
    description: 'Notre artisan se déplace, inspecte la charpente et la couverture, et vous remet un devis détaillé sous 24h. Prix ferme, sans surprise.',
    duration: 'Gratuit',
  },
  {
    number: '02',
    title: 'On prépare votre chantier',
    description: 'Mise en place de l\'échafaudage, protection de votre propriété. On s\'occupe de tout — vous n\'avez rien à gérer.',
    duration: 'Demi-journée',
  },
  {
    number: '03',
    title: 'Dépose et reconstruction',
    description: 'Dépose de l\'ancienne couverture, vérification et renforcement de la charpente si nécessaire, pose de tuiles neuves et zinguerie complète.',
    duration: '2-5 jours',
  },
  {
    number: '04',
    title: 'Nettoyage et remise en état',
    description: 'Nettoyage intégral du chantier, évacuation des gravats, remise en état de vos gouttières. Photos avant/après fournies.',
    duration: 'Garanti 10 ans',
  },
]

export default function HowItWorks({ title, variant = 'demoussage' }: HowItWorksProps) {
  const steps = variant === 'renovation' ? renovationSteps : demoussageSteps
  const defaultTitle =
    variant === 'renovation'
      ? 'Votre toiture rénovée en 4 étapes — un seul artisan du début à la fin'
      : 'Votre toiture propre et protégée en 4 étapes — sans stress et sans surprise'

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {title ?? defaultTitle}
          </h2>
          <p className="text-gray-500 mt-3">Simple, rapide, sans mauvaise surprise</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="font-extrabold text-orange-600 text-sm">{step.number}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  {step.duration && (
                    <span className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#formulaire"
            className="inline-block bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-md transition-all duration-200"
          >
            Commencer maintenant — Devis gratuit
          </a>
          <p className="text-sm text-gray-400 mt-3">Rappel sous 2h · Sans engagement · Artisan Loiret (45)</p>
        </div>

      </div>
    </section>
  )
}
