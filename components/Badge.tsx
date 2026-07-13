type BadgeProps = {
  children: React.ReactNode;
  variant?: "emerald" | "gold" | "muted" | "danger";
};

const variants = {
  emerald: "border-emerald/30 bg-emerald/10 text-emerald",
  gold: "border-gold/30 bg-gold/10 text-gold",
  muted: "border-white/10 bg-white/5 text-muted",
  danger: "border-red-500/30 bg-red-500/10 text-red-400",
};

export function Badge({ children, variant = "emerald" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
