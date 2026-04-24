"use client";

import { Suspense } from "react";
import Image from "next/image";
import { ArrowRight, Star, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import type { LandingPageConfig } from "@/lib/types";

function DynamicH1({ title, dynamicH1 }: { title: string; dynamicH1?: Record<string, string> }) {
  const searchParams = useSearchParams();
  const utmContent = searchParams.get("utm_content");
  const displayTitle = (utmContent && dynamicH1?.[utmContent]) || title;

  return (
    <h1 className="text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-[1.1] mb-3 md:mb-6">
      {displayTitle}
    </h1>
  );
}

export function HeroSection({ hero }: { hero: LandingPageConfig["hero"] }) {
  return (
    <section className="hero-always-animate relative flex flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src={hero.backgroundImage}
        alt="Couvreur au travail"
        fill
        className="object-cover object-[25%_20%] md:object-center md:scale-105"
        priority
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-black/40 to-[#0F172A]/85 md:from-[#0F172A]/80 md:via-black/50 md:to-[#0F172A]/90" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 md:px-6 lg:px-12 py-4 md:py-5">
        <Logo />
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 md:px-6 py-8 md:py-0 pb-16 sm:pb-24 min-h-[60vh] md:min-h-[calc(100vh-80px)]">
        {/* Google stars */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-amber-400 font-bold text-sm">4.9/5</span>
          <span className="text-slate-400 text-xs sm:text-sm">· 47 avis Google vérifiés</span>
        </div>

        {hero.badge && (
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#B8CC30]/15 backdrop-blur-sm border border-[#B8CC30]/30 rounded-full px-4 md:px-5 py-1.5 md:py-2 mb-4 md:mb-8">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#B8CC30] animate-pulse" />
            <span className="text-[#B8CC30] text-[0.65rem] sm:text-sm font-semibold tracking-wider uppercase">
              {hero.badge}
            </span>
          </div>
        )}
        <Suspense
          fallback={
            <h1 className="text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-[1.1] mb-3 md:mb-6">
              {hero.title}
            </h1>
          }
        >
          <DynamicH1 title={hero.title} dynamicH1={hero.dynamicH1} />
        </Suspense>
        <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-5 md:mb-6 leading-relaxed">
          {hero.subtitle}
        </p>

        {/* Stats cards */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 md:mb-8">
          {(hero.stats ?? [
            { text: "4+ ans d\u2019expérience", color: "blue" as const },
            { text: "200+ toitures traitées", color: "green" as const },
            { text: "100% garantie décennale", color: "orange" as const },
          ]).map((stat, i) => (
            <span
              key={i}
              className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full ${
                stat.color === "blue" ? "bg-blue-500/10 border border-blue-500/20 text-blue-200" :
                stat.color === "green" ? "bg-green-500/10 border border-green-500/20 text-green-200" :
                "bg-orange-500/10 border border-orange-500/20 text-orange-200"
              }`}
            >
              {stat.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full max-w-md sm:max-w-none sm:justify-center">
          <button
            onClick={() =>
              document
                .getElementById("formulaire")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="animate-shimmer group flex items-center justify-center gap-2 bg-[#B8CC30] text-black font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-[#c8dc40] hover:shadow-[0_0_30px_rgba(184,204,48,0.3)] transition-all duration-300"
          >
            Demander un devis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:hidden" />
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden sm:block" />
          </button>
        </div>

        {/* FUD reduction */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-4 md:mt-5 text-slate-400 text-xs sm:text-sm">
          <span className="flex items-center gap-1"><Check size={13} className="text-[#B8CC30]" />Sans engagement</span>
          <span className="flex items-center gap-1"><Check size={13} className="text-[#B8CC30]" />100% gratuit</span>
          <span className="flex items-center gap-1"><Check size={13} className="text-[#B8CC30]" />Rappel sous 2h</span>
          <span className="flex items-center gap-1"><Check size={13} className="text-[#B8CC30]" />Données protégées</span>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F172A] to-transparent z-10" />
    </section>
  );
}
