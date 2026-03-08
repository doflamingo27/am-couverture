import { Metadata } from "next";
import { CheckCircle, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PHONE, PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Merci ! — AM Couverture",
  description: "Votre demande de devis a bien été reçue.",
  robots: "noindex, nofollow",
};

export default function MerciPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <Logo size="lg" />

      <div className="mt-10">
        <CheckCircle size={64} className="text-[#B8CC30] mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Merci pour votre demande !
        </h1>
        <p className="text-lg text-slate-300 max-w-lg mx-auto mb-8">
          Un conseiller vous rappelle sous 2h aux heures ouvrées pour discuter
          de votre projet et planifier une visite.
        </p>

        <a
          href={`tel:${PHONE}`}
          className="inline-flex items-center gap-2 bg-[#B8CC30] text-black font-semibold px-8 py-4 rounded-xl text-lg hover:bg-[#a8bc20] transition-colors"
        >
          <Phone size={20} />
          En cas d&apos;urgence : {PHONE_DISPLAY}
        </a>
      </div>

      <div className="mt-16 text-slate-500 text-sm">
        © {new Date().getFullYear()} AM Couverture — Ingré (45)
      </div>
    </main>
  );
}
