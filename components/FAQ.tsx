"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
      open ? "border-[#B8CC30]/30 bg-[#B8CC30]/5" : "border-slate-700/50 bg-slate-800/30"
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-semibold hover:bg-white/5 transition-colors"
      >
        <span className="pr-4">{question}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
          open ? "bg-[#B8CC30] rotate-180" : "bg-slate-700"
        }`}>
          <ChevronDown size={16} className={open ? "text-black" : "text-white"} />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-300 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ items }: { items: LandingPageConfig["faq"] }) {
  return (
    <section className="py-14 sm:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle size={14} className="text-[#B8CC30]" />
            <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Questions fréquentes</h2>
        </div>
        <div className="grid gap-3">
          {items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
