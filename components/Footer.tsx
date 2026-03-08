import { Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PHONE, PHONE_DISPLAY, COMPANY_NAME, CITIES_MAIN, CITIES_EXTENDED } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#0B1120] py-12 pb-28 md:pb-12 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Logo & company */}
          <div>
            <Logo size="sm" />
            <p className="text-slate-400 text-sm mt-3">{COMPANY_NAME}</p>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 text-[#B8CC30] font-semibold mt-4 hover:underline"
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Zone d'intervention principale */}
          <div>
            <div className="flex items-center gap-2 text-white font-semibold mb-3">
              <MapPin size={16} className="text-[#B8CC30]" />
              Orléans Métropole
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {CITIES_MAIN.join(" • ")}
            </p>
          </div>

          {/* Zone élargie */}
          <div>
            <div className="flex items-center gap-2 text-white font-semibold mb-3">
              <MapPin size={16} className="text-[#B8CC30]" />
              Tout le Loiret (45)
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {CITIES_EXTENDED.join(" • ")}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-slate-500 text-xs text-center">
          © {new Date().getFullYear()} {COMPANY_NAME} — Tous droits réservés — Mentions légales
        </div>
      </div>
    </footer>
  );
}
