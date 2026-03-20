import { Metadata } from "next";
import {
  CheckCircle,
  Phone,
  Search,
  FileText,
  Shield,
  Star,
  MapPin,
  AlertTriangle,
  Droplets,
  CloudRain,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Merci ! — AM Couverture",
  description: "Votre demande de devis a bien été reçue.",
  robots: "noindex, nofollow",
};

export default function MerciPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 text-center py-12">
      <Logo size="lg" />

      {/* Confirmation */}
      <div className="mt-10">
        <CheckCircle size={64} className="text-[#B8CC30] mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Merci pour votre demande !
        </h1>
        <p className="text-lg text-slate-300 max-w-lg mx-auto mb-8">
          Un conseiller vous rappelle sous 2h aux heures ouvrées pour discuter
          de votre projet et planifier une visite.
        </p>

        <p className="text-[#B8CC30] font-semibold text-lg">
          Un conseiller vous rappelle sous 2h aux heures ouvrées.
        </p>
      </div>

      {/* Roadmap 3 étapes */}
      <div className="mt-16 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-8">Voici ce qui va se passer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#B8CC30]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={22} className="text-[#B8CC30]" />
            </div>
            <h3 className="font-bold mb-2">Rappel sous 2h</h3>
            <p className="text-sm text-slate-400">
              Un conseiller vous contacte pour discuter de votre projet
            </p>
          </div>
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#B8CC30]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-[#B8CC30]" />
            </div>
            <h3 className="font-bold mb-2">Inspection gratuite</h3>
            <p className="text-sm text-slate-400">
              Visite à domicile pour évaluer votre toiture
            </p>
          </div>
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6">
            <div className="w-12 h-12 bg-[#B8CC30]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={22} className="text-[#B8CC30]" />
            </div>
            <h3 className="font-bold mb-2">Devis détaillé</h3>
            <p className="text-sm text-slate-400">
              Devis personnalisé sous 48h, sans engagement
            </p>
          </div>
        </div>
      </div>

      {/* Badges de confiance */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[#B8CC30]" />
          Garantie décennale
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} className="text-[#B8CC30]" />
          4.9/5 sur Google
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#B8CC30]" />
          Artisan local Loiret
        </div>
      </div>

      {/* Section éducative */}
      <div className="mt-16 w-full max-w-2xl bg-slate-800/50 rounded-2xl p-8">
        <h2 className="text-lg font-bold mb-6">
          3 signes que votre toiture a besoin d&apos;entretien
        </h2>
        <div className="grid gap-4 text-left">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <AlertTriangle size={18} className="text-amber-400" />
            </div>
            <p className="text-sm text-slate-300 pt-2">
              Mousse visible sur les tuiles, même légère
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Droplets size={18} className="text-blue-400" />
            </div>
            <p className="text-sm text-slate-300 pt-2">
              Traces d&apos;humidité au plafond ou dans les combles
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <CloudRain size={18} className="text-blue-400" />
            </div>
            <p className="text-sm text-slate-300 pt-2">
              Gouttières qui débordent quand il pleut
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-slate-500 text-sm">
        © {new Date().getFullYear()} AM Couverture — Ingré (45)
      </div>
    </main>
  );
}
