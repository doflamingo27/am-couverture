'use client'

interface PromoOfferTableProps {
  deadline?: string
}

const offers = [
  {
    service: 'Démoussage toiture',
    price: '11€/m²',
    description: 'Nettoyage basse pression + traitement anti-mousse longue durée',
    included: ['Nettoyage complet basse pression', 'Traitement anti-mousse professionnel', 'Rapport photos avant/après', 'Nettoyage chantier inclus'],
    highlight: false,
  },
  {
    service: 'Hydrofuge toiture',
    price: '13€/m²',
    description: 'Traitement imperméabilisant protection 5-10 ans',
    included: ['Application produit Sikagard pro', 'Protection 5-10 ans garantie', 'Rapport d\'application fourni', 'Sans modifier l\'aspect de la toiture'],
    highlight: true,
  },
  {
    service: 'Hydrofuge façade',
    price: '9€/m²',
    description: 'Imperméabilisation façade sans changer l\'aspect',
    included: ['Application sur façade enduite ou pierre', 'Protection contre l\'humidité', 'Résultat invisible (ne change pas la couleur)', 'Garanti plusieurs années'],
    highlight: false,
  },
]

export default function PromoOfferTable({ deadline = '21 avril' }: PromoOfferTableProps) {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 font-semibold px-4 py-2 rounded-full text-sm mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Offre limitée — valable jusqu'au {deadline} uniquement
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Tarifs printemps 2026
          </h2>
          <p className="text-gray-500 mt-2">Tous nos tarifs incluent : déplacement, main d'œuvre, produits professionnels et nettoyage du chantier.</p>
        </div>

        {/* Offer cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {offers.map((offer, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border-2 flex flex-col relative ${
                offer.highlight
                  ? 'border-orange-400 bg-orange-50 shadow-lg'
                  : 'border-gray-100 bg-white shadow-sm'
              }`}
            >
              {offer.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{offer.service}</h3>
                <p className="text-gray-500 text-sm mt-1">{offer.description}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900">{offer.price}</span>
                <span className="text-gray-400 text-sm ml-1">(offre printemps)</span>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {offer.included.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#formulaire"
                className={`block text-center font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                  offer.highlight
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                Demander un devis
              </a>
            </div>
          ))}
        </div>

        {/* Reassurance line */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Devis gratuit et détaillé
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Prix ferme avant intervention
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Artisan certifié Loiret (45)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Assurance décennale active
          </span>
        </div>

      </div>
    </section>
  )
}
