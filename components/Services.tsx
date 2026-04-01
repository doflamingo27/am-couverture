import {
  Search,
  Droplets,
  FlaskConical,
  ShieldCheck,
  Home,
  Sparkles,
  ClipboardCheck,
  BadgeCheck,
  Hammer,
  Wrench,
  ScanEye,
  Layers,
  Zap,
} from "lucide-react";
import type { LandingPageConfig } from "@/lib/types";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search,
  Droplets,
  FlaskConical,
  ShieldCheck,
  Home,
  Sparkles,
  ClipboardCheck,
  BadgeCheck,
  Hammer,
  Wrench,
  ScanEye,
  Layers,
  Zap,
};

function renderTitle(title: string, highlightWord?: string) {
  if (!highlightWord) return <span>{title}</span>;
  const idx = title.toLowerCase().indexOf(highlightWord.toLowerCase());
  if (idx === -1) return <span>{title}</span>;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + highlightWord.length);
  const after = title.slice(idx + highlightWord.length);
  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        {match}
      </span>
      {after}
    </>
  );
}

export function Services({ data, title }: { data: LandingPageConfig["services"]; title?: string }) {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#1E293B]/60">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          {data.badge && (
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700/50 rounded-full px-4 py-1.5 mb-4">
              <Zap size={14} className="text-[#B8CC30]" />
              <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                {data.badge}
              </span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            {title || renderTitle(data.title, data.highlightWord)}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {data.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Zap;
            return (
              <div
                key={i}
                className="group relative bg-white/[0.04] border border-slate-700/30 rounded-2xl p-6 text-center sm:text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-slate-600/50 hover:shadow-lg hover:shadow-black/20 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8CC30] to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-xl bg-[#B8CC30]/10 border border-[#B8CC30]/20 flex items-center justify-center mb-4 mx-auto sm:mx-0 group-hover:bg-[#B8CC30]/15 transition-colors duration-300">
                  <Icon size={22} className="text-[#B8CC30]" />
                </div>

                <h3 className="font-bold text-white text-sm sm:text-base mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
