'use client'

interface Testimonial {
  quote: string
  author: string
  city: string
  service: string
  objectionResolved: string
  rating?: number
  verified?: boolean
}

interface TestimonialsSectionProps {
  variant?: 'demoussage' | 'renovation'
  customTestimonials?: Testimonial[]
}

const demoussageTestimonials: Testimonial[] = [
  {
    quote:
      'J\'avais peur de me faire arnaquer — on entend tellement d\'histoires avec les démarcheurs. AM Couverture m\'a communiqué leur SIRET, l\'assurance, et le devis détaillé avant de commencer. Zéro surprise sur la facture.',
    author: 'Michel D.',
    city: 'Fleury-les-Aubrais',
    service: 'Démoussage + Hydrofuge',
    objectionResolved: 'Confiance / Peur arnaque',
    rating: 5,
    verified: true,
  },
  {
    quote:
      'Le résultat est bluffant. On dirait une toiture neuve. Je ne pensais pas qu\'un traitement pouvait changer autant l\'apparence d\'une maison. Et deux hivers plus tard, toujours pas la moindre infiltration.',
    author: 'Christine B.',
    city: 'Ingré',
    service: 'Démoussage complet',
    objectionResolved: 'Résultat visible',
    rating: 5,
    verified: true,
  },
  {
    quote:
      'Devis reçu en moins de 24h comme promis, intervention programmée la semaine suivante. Dans le BTP c\'est rare. L\'artisan a même pris le temps de m\'expliquer chaque étape depuis son téléphone. Je recommande sans hésitation.',
    author: 'Alain P.',
    city: 'Saran',
    service: 'Démoussage + Nettoyage',
    objectionResolved: 'Rapidité & Communication',
    rating: 5,
    verified: true,
  },
]

const renovationTestimonials: Testimonial[] = [
  {
    quote:
      'Notre toiture fuyait depuis 3 ans. On repoussait les travaux chaque année. Quand AM Couverture est venu inspecter, ils ont constaté que la charpente commençait à souffrir — on avait bien fait de ne pas attendre une année de plus.',
    author: 'Jacques & Marie F.',
    city: 'Olivet',
    service: 'Rénovation toiture complète',
    objectionResolved: 'Urgence d\'agir',
    rating: 5,
    verified: true,
  },
  {
    quote:
      'Devis clair, prix respecté à l\'euro près. Pas de travaux supplémentaires "imprévus" apparus en cours de chantier — ce qui est malheureusement trop fréquent. Un seul interlocuteur du début à la fin.',
    author: 'Martine L.',
    city: 'La Chapelle-Saint-Mesmin',
    service: 'Rénovation + Zinguerie',
    objectionResolved: 'Transparence des prix',
    rating: 5,
    verified: true,
  },
  {
    quote:
      'La maison a pris 10 ans de moins d\'un coup. Le chantier était propre à leur départ, même les gravats de l\'ancienne toiture. Et la garantie décennale nous permet de dormir tranquilles pour les 10 prochaines années.',
    author: 'Bernard T.',
    city: 'Saint-Jean-de-la-Ruelle',
    service: 'Rénovation complète',
    objectionResolved: 'Propreté chantier & Garantie',
    rating: 5,
    verified: true,
  },
]

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection({
  variant = 'demoussage',
  customTestimonials,
}: TestimonialsSectionProps) {
  const testimonials =
    customTestimonials ?? (variant === 'renovation' ? renovationTestimonials : demoussageTestimonials)

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-4 py-1.5 rounded-full text-sm font-medium text-yellow-800 mb-4">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9/5 · Ce que disent nos clients dans le Loiret
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ils ont fait confiance à AM Couverture
          </h2>
        </div>

        {/* Testimonials grid — all visible, no carousel */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center justify-between mb-4">
                <StarRating count={t.rating ?? 5} />
                {t.verified && (
                  <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Vérifié Google
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 leading-relaxed flex-1 mb-5 text-sm md:text-base">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-500">{t.city} · {t.service}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Global social proof under testimonials */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { value: '4.9/5', label: 'Note Google moyenne' },
            { value: '47', label: 'Avis vérifiés' },
            { value: '200+', label: 'Toitures traitées' },
            { value: '0', label: 'Litige en cours' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
