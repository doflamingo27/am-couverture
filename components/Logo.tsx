export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { box: "w-7 h-7 text-xs", text: "text-sm" },
    md: { box: "w-9 h-9 text-sm", text: "text-base" },
    lg: { box: "w-12 h-12 text-lg", text: "text-xl" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${s.box} bg-[#B8CC30] text-black font-bold flex items-center justify-center rounded-sm`}
      >
        AM
      </div>
      <span className={`${s.text} font-semibold text-white tracking-widest`}>
        COUVERTURE
      </span>
    </div>
  );
}
