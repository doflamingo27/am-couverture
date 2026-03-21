import Link from "next/link";
import { Sparkles, Hammer, Shield, Star, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Logo */}
      <Logo size="lg" />
      <p className="text-slate-400 mt-3 text-lg">Couvreur · Loiret (45)</p>

      {/* Service buttons */}
      <div className="mt-12 w-full max-w-md space-y-4">
        <Link
          href="/demoussage"
          className="block w-full bg-[#B8CC30] text-black rounded-2xl p-6 hover:brightness-110 transition"
        >
          <div className="flex items-center gap-4">
            <Sparkles size={28} strokeWidth={2} />
            <div>
              <div className="text-xl font-bold">Démoussage &amp; Nettoyage</div>
              <div className="text-sm opacity-75 mt-1">
                Nettoyage + traitement hydrofuge de votre toiture
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/renovation"
          className="block w-full bg-white text-black rounded-2xl p-6 hover:brightness-95 transition"
        >
          <div className="flex items-center gap-4">
            <Hammer size={28} strokeWidth={2} />
            <div>
              <div className="text-xl font-bold">Rénovation Toiture</div>
              <div className="text-sm opacity-75 mt-1">
                Couverture neuve complète, garanti 10 ans
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Trust badges */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-1.5">
          <Shield size={15} />
          Décennale
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={15} />
          4.9/5 Google
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={15} />
          Artisan local
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-slate-500 text-xs text-center">
        <p>© {new Date().getFullYear()} AM Couverture — Ingré (45)</p>
        <Link
          href="/mentions-legales"
          className="hover:text-slate-300 underline underline-offset-2 mt-1 inline-block"
        >
          Mentions légales
        </Link>
      </div>
    </main>
  );
}
