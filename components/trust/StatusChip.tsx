export type Status =
  | "implemented"
  | "planned"
  | "enterprise"
  | "completed"
  | "certified"
  | "available"
  | "published"
  | "in_planning"
  | "early_access"
  | "developer_preview";

const styles: Record<Status, string> = {
  implemented: "bg-emerald/10 text-emerald border border-emerald/30",
  planned: "bg-gold/10 text-gold border border-gold/30",
  enterprise: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  completed: "bg-emerald/10 text-emerald border border-emerald/30",
  certified: "bg-emerald/10 text-emerald border border-emerald/30",
  available: "bg-gold/10 text-gold border border-gold/30",
  published: "bg-gold/10 text-gold border border-gold/30",
  in_planning: "bg-gold/10 text-gold border border-gold/30",
  early_access: "bg-gold/10 text-gold border border-gold/30",
  developer_preview: "bg-gold/10 text-gold border border-gold/30",
};

const labels: Record<Status, string> = {
  implemented: "Implemented",
  planned: "Planned",
  enterprise: "Enterprise option",
  completed: "Completed",
  certified: "Certified",
  available: "Available",
  published: "Published",
  in_planning: "In Planning",
  early_access: "Early Access",
  developer_preview: "Developer Preview",
};

type StatusChipProps = {
  status: Status;
  className?: string;
};

export function StatusChip({ status, className = "" }: StatusChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  );
}
