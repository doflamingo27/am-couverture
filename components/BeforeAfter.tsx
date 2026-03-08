import Image from "next/image";
import type { LandingPageConfig } from "@/lib/types";

function ImageOrPlaceholder({ src, label }: { src: string | null; label: string }) {
  if (!src) {
    return (
      <div className="relative aspect-[4/3] bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-xs sm:text-sm border border-slate-700/50">
        <span className="text-slate-400">Photo à venir</span>
        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-md">
          {label}
        </span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
      <Image src={src} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-md">
        {label}
      </span>
    </div>
  );
}

export function BeforeAfter({
  items,
}: {
  items: LandingPageConfig["beforeAfter"];
}) {
  return (
    <section className="py-14 sm:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Avant / Après</h2>
          <div className="w-16 h-1 bg-[#B8CC30] rounded-full mx-auto mt-4" />
        </div>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className={`bg-slate-800/30 border border-slate-700/30 rounded-2xl p-4 sm:p-5${items.length % 2 === 1 && i === items.length - 1 ? " md:col-span-2 md:max-w-[calc(50%-20px)] md:mx-auto" : ""}`}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <ImageOrPlaceholder src={item.before} label="AVANT" />
                <ImageOrPlaceholder src={item.after} label="APRÈS" />
              </div>
              <p className="text-center text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
