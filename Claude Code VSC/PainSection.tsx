'use client'

interface PainItem {
  icon: string
  text: string
}

interface PainSectionProps {
  variant?: 'demoussage' | 'renovation'
}

const demoussageContent = {
  badge: 'Pourquoi agir maintenant',
  problemTitle: 'La mousse sur votre toiture ne gêne pas que l\'esthétique.',
  problemText:
    'Elle retient l\'humidité en permanence contre vos tuiles. Résultat : des tuiles poreuses qui s\'abîment de l\'intérieur, invisiblement.',
  agitateTitle: 'Chaque mois d\'attente aggrave la situation.',
  agitateItems: [
    { icon: '⚠', text: 'L\'humidité s\'infiltre sous les tuiles et attaque la charpente' },
    { icon: '⚠', text: 'Le gel hivernal fait éclater les tuiles poreuses : fuites garanties' },
    { icon: '⚠', text: 'Moins de 15% de pertes d\'isolation : vos factures de chauffage grimpent' },
    { icon: '⚠', text: 'Un toit non entretenu perd 15 à 25% de sa valeur immobilière' },
  ],
  agitateConclusion:
    'Ce qui coûte 500-800€ à traiter aujourd\'hui peut coûter 8 000 à 15 000€ dans 3 ans si on attend la réfection complète.',
  solveTitle: 'Il existe une solution préventive, simple, et 10 à 20× moins chère.',
  solveText:
    'Un démoussage professionnel suivi d\'un traitement hydrofuge protège votre toiture pour 5 à 10 ans. Pas de Karcher, pas de javel — des produits pros (Algimousse/Sikagard) qui respectent vos tuiles.',
  ctaText: 'Demandez votre devis gratuit',
  ctaSubtext: 'Rappel sous 2h · Sans engagement · 100% gratuit',
}

const renovationContent = {
  badge: 'Pourquoi ne pas attendre',
  problemTitle: 'Une toiture abîmée, c\'est tout le logement qui souffre.',
  problemText:
    'Faîtage fissuré, tuiles cassées, gouttières défoncées — chaque hiver empire la situation. Et à chaque pluie, l\'humidité gagne du terrain.',
  agitateTitle: 'Les conséquences s\'accumulent en silence.',
  agitateItems: [
    { icon: '⚠', text: 'Infiltrations d\'eau dans la charpente : réparation × 3 si on attend' },
    { icon: '⚠', text: 'Isolation dégradée : +15 à 25% sur vos factures d\'énergie' },
    { icon: '⚠', text: 'Valeur immobilière en chute : -10 à 20% avec un rapport d\'état négatif' },
    { icon: '⚠', text: 'Risque de sinistre non couvert si le toit était visiblement dégradé' },
  ],
  agitateConclusion:
    'Repousser une rénovation de 2 ans peut doubler le coût total du chantier. Ce qui se règle en une intervention devient une réhabilitation complète.',
  solveTitle: 'Une rénovation complète règle tout d\'un coup, pour 30 ans.',
  solveText:
    'Dépose, vérification charpente, pose de tuiles neuves, zinguerie complète, nettoyage du chantier. Un seul artisan certifié, du début à la fin. Garanti décennale.',
  ctaText: 'Demandez votre devis rénovation',
  ctaSubtext: 'Devis détaillé gratuit · Rappel sous 2h · Sans engagement',
}

export default function PainSection({ variant = 'demoussage' }: PainSectionProps) {
  const c = variant === 'renovation' ? renovationContent : demoussageContent

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-sm font-medium px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {c.badge}
          </span>
        </div>

        {/* PROBLEM */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 leading-tight">
          {c.problemTitle}
        </h2>
        <p className="text-gray-600 text-center text-lg mb-8 leading-relaxed">
          {c.problemText}
        </p>

        {/* AGITATE */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 mb-6">
          <p className="font-semibold text-gray-900 mb-4 text-lg">{c.agitateTitle}</p>
          <ul className="space-y-3">
            {c.agitateItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-orange-500 mt-0.5 flex-shrink-0 text-lg">{item.icon}</span>
                <span className="text-gray-700 leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-5 border-t border-orange-100">
            <p className="text-sm text-orange-900 font-medium bg-orange-50 rounded-xl p-4 leading-relaxed">
              💡 {c.agitateConclusion}
            </p>
          </div>
        </div>

        {/* SOLVE */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <p className="font-bold text-green-900 text-lg mb-2">{c.solveTitle}</p>
          <p className="text-green-800 leading-relaxed">{c.solveText}</p>
        </div>

        {/* CTA inline */}
        <div className="text-center">
          <a
            href="#formulaire"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 active:scale-95"
          >
            {c.ctaText}
          </a>
          <p className="text-sm text-gray-500 mt-3">{c.ctaSubtext}</p>
        </div>

      </div>
    </section>
  )
}
