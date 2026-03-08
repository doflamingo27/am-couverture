"use client";

import { Phone, FileText } from "lucide-react";
import { PHONE, PHONE_DISPLAY } from "@/lib/constants";

export function StickyPhoneBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0F172A]/95 backdrop-blur-sm border-t border-slate-700 p-3 flex gap-3">
      <a
        href={`tel:${PHONE}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#B8CC30] text-black font-semibold py-3 rounded-lg"
      >
        <Phone size={18} />
        {PHONE_DISPLAY}
      </a>
      <button
        onClick={() =>
          document
            .getElementById("formulaire")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex-1 flex items-center justify-center gap-2 border border-white text-white font-semibold py-3 rounded-lg"
      >
        <FileText size={18} />
        Devis gratuit
      </button>
    </div>
  );
}
