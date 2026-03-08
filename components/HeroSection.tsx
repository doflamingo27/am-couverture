"use client";

import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PHONE, PHONE_DISPLAY } from "@/lib/constants";
import type { LandingPageConfig } from "@/lib/types";

export function HeroSection({ hero }: { hero: LandingPageConfig["hero"] }) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src={hero.backgroundImage}
        alt="Couvreur au travail"
        fill
        className="object-cover scale-105"
        priority
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-black/50 to-[#0F172A]/90" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <Logo />
        <a
          href={`tel:${PHONE}`}
          className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#B8CC30] hover:text-black hover:border-[#B8CC30] transition-all duration-300"
        >
          <Phone size={16} />
          {PHONE_DISPLAY}
        </a>
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-28 sm:pb-24">
        {hero.badge && (
          <div className="inline-flex items-center gap-2 bg-[#B8CC30]/15 backdrop-blur-sm border border-[#B8CC30]/30 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#B8CC30] animate-pulse" />
            <span className="text-[#B8CC30] text-xs sm:text-sm font-semibold tracking-wider uppercase">
              {hero.badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-[1.1] mb-6">
          {hero.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
          {hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none sm:justify-center">
          <a
            href={`tel:${PHONE}`}
            className="group flex items-center justify-center gap-2 bg-[#B8CC30] text-black font-bold px-7 sm:px-8 py-4 rounded-full text-base sm:text-lg hover:bg-[#c8dc40] hover:shadow-[0_0_30px_rgba(184,204,48,0.3)] transition-all duration-300"
          >
            <Phone size={20} />
            Appeler maintenant
          </a>
          <button
            onClick={() =>
              document
                .getElementById("formulaire")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 sm:px-8 py-4 rounded-full text-base sm:text-lg hover:bg-white/20 transition-all duration-300"
          >
            Demander un devis
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F172A] to-transparent z-10" />
    </section>
  );
}
