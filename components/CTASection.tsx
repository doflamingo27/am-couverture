"use client";

import { ArrowRight } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

export function CTASection({ data }: { data: LandingPageConfig["ctaFinal"] }) {
  return (
    <section className="relative py-16 sm:py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8CC30]/15 via-[#0F172A] to-[#B8CC30]/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8CC30]/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{data.title}</h2>
        <p className="text-base sm:text-lg text-slate-300 mb-10">{data.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={() =>
              document
                .getElementById("formulaire")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 bg-[#B8CC30] text-black font-bold px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg hover:bg-[#c8dc40] hover:shadow-[0_0_40px_rgba(184,204,48,0.3)] transition-all duration-300"
          >
            {data.ctaText}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-slate-400 text-sm mt-5">{data.reassurance}</p>
      </div>
    </section>
  );
}
