type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-panel p-6 ${hover ? "transition-all duration-200 hover:border-emerald/30 hover:bg-panel2 hover:shadow-[0_0_30px_rgba(31,174,130,0.08)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
