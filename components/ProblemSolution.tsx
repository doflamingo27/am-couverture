import Image from "next/image";
import { AlertTriangle, CheckCircle, XCircle, Camera } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

export function ProblemSolution({
  data,
}: {
  data: LandingPageConfig["problemSolution"];
}) {
  return (
    <section className="py-14 sm:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-12">
          Le problème est{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            invisible
          </span>{" "}
          depuis le sol
        </h2>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden">
          {/* Cell 1: Photo problème (haut gauche) */}
          {data.problemImage ? (
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <Image src={data.problemImage} alt="Toiture avant intervention" fill className="object-cover" />
            </div>
          ) : (
            <div className="bg-slate-800 flex flex-col items-center justify-center gap-3 p-10 sm:p-14 aspect-[4/3] md:aspect-auto">
              <Camera size={40} className="text-slate-600" />
              <p className="text-slate-500 text-sm font-medium">Photo à venir</p>
              <p className="text-slate-600 text-xs">Toiture avant intervention</p>
            </div>
          )}

          {/* Cell 2: Texte problème (haut droite) */}
          <div className="bg-gradient-to-br from-red-950/50 to-slate-900 p-7 sm:p-9">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/[0.12] text-red-300 border border-red-500/20 mb-5">
              <AlertTriangle size={12} />
              Le problème
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 leading-snug">
              {data.problemTitle}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {data.problemPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                  <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Cell 3: Texte solution (bas gauche) */}
          <div className="bg-gradient-to-br from-[#B8CC30]/10 to-slate-900 p-7 sm:p-9">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B8CC30]/[0.15] text-[#B8CC30] border border-[#B8CC30]/20 mb-5">
              <CheckCircle size={12} />
              La solution
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-5 leading-snug">
              {data.solutionTitle}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {data.solutionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                  <CheckCircle size={18} className="text-[#B8CC30] shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Cell 4: Photo solution (bas droite) */}
          {data.solutionImage ? (
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <Image src={data.solutionImage} alt="Toiture après intervention" fill className="object-cover" />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#B8CC30]/5 to-slate-800 flex flex-col items-center justify-center gap-3 p-10 sm:p-14 aspect-[4/3] md:aspect-auto">
              <Camera size={40} className="text-slate-600" />
              <p className="text-slate-500 text-sm font-medium">Photo à venir</p>
              <p className="text-slate-600 text-xs">Toiture après intervention</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
