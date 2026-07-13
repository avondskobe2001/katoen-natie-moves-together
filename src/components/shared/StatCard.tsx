import { LucideIcon } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const iconColors = [
  "from-kn-red-dark to-kn-red",
  "from-kn-red to-kn-red-light",
  "from-[#9b0e24] to-kn-red",
  "from-kn-red-light to-[#e8354a]",
];

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  suffix?: string;
  className?: string;
  index?: number;
}

export function StatCard({ label, value, icon: Icon, suffix, className, index = 0 }: StatCardProps) {
  const displayValue = typeof value === "number" ? formatNumber(value) : value;
  const gradient = iconColors[index % iconColors.length];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm card-hover",
        className
      )}
    >
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm mb-4", gradient)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">
        {displayValue}
        {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}