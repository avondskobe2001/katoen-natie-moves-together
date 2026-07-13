import { LucideIcon } from "lucide-react";
import { SectionBackdrop } from "@/components/shared/DecorativeGraphics";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export function SectionTitle({ title, icon: Icon, className, children }: SectionTitleProps) {
  return (
    <div className={cn("relative flex items-center justify-between mb-6", className)}>
      <SectionBackdrop />
      <div className="relative flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kn-red shadow-sm shadow-kn-red/20">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}