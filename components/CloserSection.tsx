import { Shield, Star, Clock } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import type { LandingPageConfig } from "@/lib/types";

type Variant = "demoussage" | "renovation" | "promo";

const HEADLINES: Record<Variant, { headline: string; subline: string }> = {
  demoussage: {
    headline:
      "Votre toiture mérite une inspection gratuite — cette semaine.",
    subline:
      "Remplissez le formulaire, un conseiller vous rappelle sous 2h pour planifier votre diagnostic.",
  },
  renovation: {
    headline: "Votre maison mérite une toiture à la hauteur.",
    subline:
      "Demandez votre devis personnalisé — un seul artisan du début à la fin.",
  },
  promo: {
    headline: "Il reste des créneaux disponibles avant le 21 avril.",
    subline:
      "Profitez des tarifs printemps — devis gratuit et sans engagement.",
  },
};

const PROOF_CARDS = [
  {
    icon: Shield,
    title: "Assurance décennale",
    text: "Garantie 10 ans sur tous nos travaux",
  },
  {
    icon: Star,
    title: "4.9/5 sur Google",
    text: "47 avis clients vérifiés",
  },
  {
    icon: Clock,
    title: "Rappel sous 2h",
    text: "Un conseiller vous contacte rapidement",
  },
] as const;

export function CloserSection({
  variant,
  headline,
  subline,
  ctaText,
  form,
}: {
  variant: Variant;
  headline?: string;
  subline?: string;
  ctaText?: string;
  form: LandingPageConfig["form"];
}) {
  const defaults = HEADLINES[variant];
  const h = headline || defaults.headline;
  const sub = subline || defaults.subline;
  const formConfig = ctaText ? { ...form, submitText: ctaText } : form;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — copy + social proof */}
          <div className="flex flex-col gap-6">
            {/* Urgency pill */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Places limitées
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {h}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {sub}
            </p>

            {/* Social proof cards */}
            <div className="flex flex-col gap-3">
              {PROOF_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#B8CC30]/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#B8CC30]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {card.title}
                      </p>
                      <p className="text-gray-500 text-xs">{card.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — LeadForm */}
          <div className="border border-orange-200 rounded-2xl overflow-hidden bg-[#0F172A]">
            <LeadForm
              form={formConfig}
              id="formulaire-bottom"
              sectionClassName="py-6 sm:py-8 px-4 sm:px-6"
            />
            <div className="px-4 pb-4 text-center">
              <p className="text-slate-400 text-xs">
                Vos données sont protégées et ne seront jamais partagées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
