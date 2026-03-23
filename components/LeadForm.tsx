"use client";

import { useState } from "react";
import { Send, ArrowLeft, FileText, Lock } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

type FormData = {
  projectType: string;
  propertyType: string;
  firstName: string;
  phone: string;
  postalCode: string;
};

export function LeadForm({ form }: { form: LandingPageConfig["form"] }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    projectType: "",
    propertyType: "",
    firstName: "",
    phone: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s.-]/g, "");
    return /^(\+33|0)[1-9]\d{8}$/.test(cleaned);
  };

  const selectOption = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(data.phone)) {
      setPhoneError("Numéro invalide (ex: 06 12 34 56 78)");
      return;
    }
    setPhoneError("");
    setLoading(true);

    try {
      // Generate unique event ID for Meta deduplication (Pixel + CAPI)
      const eventId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Read Facebook cookies for CAPI matching
      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return match ? decodeURIComponent(match[1]) : "";
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: window.location.href,
          eventId,
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        }),
      });

      if (res.ok) {
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead", {}, { eventID: eventId });
        }
        window.location.href = "/merci";
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <section id="formulaire" className="py-14 sm:py-20 px-6">
      <div className="max-w-xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#B8CC30]/10 border border-[#B8CC30]/20 rounded-full px-4 py-1.5 mb-4">
            <FileText size={14} className="text-[#B8CC30]" />
            <span className="text-[#B8CC30] text-xs font-semibold uppercase tracking-wider">Devis gratuit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Obtenez votre devis en 30 secondes</h2>
        </div>

        {/* Form card */}
        <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-5 sm:p-8 shadow-2xl">
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s <= step ? "bg-[#B8CC30]" : "bg-slate-600/50"
                  }`}
                />
              </div>
            ))}
            <span className="text-xs text-slate-400 ml-2 shrink-0">
              {step}/3
            </span>
          </div>

          {/* Step 1: Project type */}
          {step === 1 && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-6">{form.step1Label}</h3>
              <div className="grid gap-3">
                {form.step1Options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption("projectType", opt.value)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-600/50 bg-slate-800/50 hover:border-[#B8CC30] hover:bg-[#B8CC30]/10 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Property type */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-slate-400 text-sm mb-4 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} /> Retour
              </button>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{form.step2Label}</h3>
              <p className="text-xs text-[#B8CC30] font-medium mb-6">Dernière étape avant vos coordonnées</p>
              <div className="grid gap-3">
                {form.step2Options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption("propertyType", opt.value)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-600/50 bg-slate-800/50 hover:border-[#B8CC30] hover:bg-[#B8CC30]/10 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-slate-400 text-sm mb-4 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} /> Retour
              </button>
              <h3 className="text-lg sm:text-xl font-bold mb-6">Vos coordonnées</h3>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  required
                  value={data.firstName}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  className="w-full px-5 py-4 rounded-xl bg-slate-800/80 border border-slate-600/50 focus:border-[#B8CC30] focus:ring-1 focus:ring-[#B8CC30]/30 focus:outline-none text-white placeholder-slate-400 transition-all"
                />
                <div>
                  <input
                    type="tel"
                    placeholder="Téléphone mobile (ex: 06 12 34 56 78)"
                    required
                    value={data.phone}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, phone: e.target.value }));
                      if (phoneError) setPhoneError("");
                    }}
                    className={`w-full px-5 py-4 rounded-xl bg-slate-800/80 border focus:ring-1 focus:outline-none text-white placeholder-slate-400 transition-all ${phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "border-slate-600/50 focus:border-[#B8CC30] focus:ring-[#B8CC30]/30"}`}
                  />
                  {phoneError && (
                    <p className="text-red-400 text-xs mt-1.5">{phoneError}</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Code postal"
                  required
                  value={data.postalCode}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, postalCode: e.target.value }))
                  }
                  className="w-full px-5 py-4 rounded-xl bg-slate-800/80 border border-slate-600/50 focus:border-[#B8CC30] focus:ring-1 focus:ring-[#B8CC30]/30 focus:outline-none text-white placeholder-slate-400 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-[#B8CC30] text-black font-bold py-4 rounded-full text-lg hover:bg-[#c8dc40] hover:shadow-[0_0_30px_rgba(184,204,48,0.25)] transition-all duration-300 disabled:opacity-50"
              >
                <Send size={18} />
                {loading ? "Envoi en cours..." : form.submitText}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs sm:text-sm mt-3">
                <Lock size={12} />
                {form.reassurance}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
