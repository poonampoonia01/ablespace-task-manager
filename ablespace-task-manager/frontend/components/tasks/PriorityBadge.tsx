import type { Priority } from "../../types/task";

const map: Record<Priority, { label: string; className: string }> = {
  NONE: { label: "No Priority", className: "text-neutral-400" },
  URGENT: { label: "Urgent", className: "text-red-500" },
  HIGH: { label: "High", className: "text-red-400" },
  MEDIUM: { label: "Medium", className: "text-amber-500" },
  LOW: { label: "Low", className: "text-slate-400" }
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const item = map[priority];
  return (
    <span className={`text-[11px] font-medium ${item.className}`}>
      ↗ {item.label}
    </span>
  );
}
