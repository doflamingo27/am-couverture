import { Shield, Clock, MapPin, Star } from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  Clock,
  MapPin,
  Star,
};

export function TrustBadges({
  badges,
}: {
  badges: LandingPageConfig["trustBadges"];
}) {
  return (
    <section className="relative -mt-8 z-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1E293B]/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 shadow-xl">
          {badges.map((badge, i) => {
            const Icon = ICONS[badge.icon] || Shield;
            return (
              <div
                key={i}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#B8CC30]/10 border border-[#B8CC30]/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#B8CC30]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
