"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, BadgeCheck, Quote } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

export function Testimonials({
  data,
}: {
  data: LandingPageConfig["testimonials"];
}) {
  const [current, setCurrent] = useState(0);
  const total = data.items.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-14 sm:py-20 px-6 bg-[#1E293B]/60">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2.5 mb-5">
            <Stars rating={Math.round(data.average)} />
            <span className="text-amber-400 font-bold text-sm">{data.average}/5</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Ce que disent nos clients</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Basé sur {data.count} avis vérifiés
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden max-w-2xl mx-auto">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {data.items.map((item, i) => (
              <div
                key={i}
                className="w-full shrink-0 px-1"
              >
                <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Stars rating={item.rating} />
                    <Quote size={20} className="text-[#B8CC30]/30" />
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed flex-1">
                    {item.text}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#B8CC30]/15 flex items-center justify-center text-[#B8CC30] text-sm font-bold">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-slate-400 text-xs">{item.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#B8CC30] text-xs font-medium">
                      <BadgeCheck size={14} />
                      Vérifié
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {data.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-[#B8CC30]"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
