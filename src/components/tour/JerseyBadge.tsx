import type { KTNJerseyType } from "@/types";
import { jerseyConfig } from "@/lib/ktn-jerseys";
import { cn } from "@/lib/utils";

interface JerseyBadgeProps {
  type: KTNJerseyType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function JerseyBadge({ type, size = "md", showLabel = false, className }: JerseyBadgeProps) {
  const config = jerseyConfig[type];
  const { primary, secondary, accent } = config.colors;

  const sizeClasses = {
    sm: "h-10 w-8",
    md: "h-16 w-12",
    lg: "h-24 w-18",
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn("relative rounded-sm shadow-lg overflow-hidden", sizeClasses[size])}
        style={{ width: size === "lg" ? 72 : size === "md" ? 48 : 32 }}
        title={config.name}
      >
        {/* Jersey body */}
        <div className="absolute inset-0" style={{ backgroundColor: primary }} />
        {/* White/red stripes for GC jersey */}
        {type === "gc" && (
          <>
            <div className="absolute top-[20%] left-0 right-0 h-[8%]" style={{ backgroundColor: secondary }} />
            <div className="absolute top-[36%] left-0 right-0 h-[8%]" style={{ backgroundColor: secondary }} />
            <div className="absolute top-[52%] left-0 right-0 h-[8%]" style={{ backgroundColor: secondary }} />
          </>
        )}
        {/* Collar */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] rounded-b-full"
          style={{ backgroundColor: type === "young" ? "#ddd" : accent ?? secondary }}
        />
        {/* Sleeves */}
        <div className="absolute top-[18%] -left-[15%] w-[30%] h-[35%] rounded-sm" style={{ backgroundColor: primary }} />
        <div className="absolute top-[18%] -right-[15%] w-[30%] h-[35%] rounded-sm" style={{ backgroundColor: primary }} />
        {/* KN logo area */}
        <div
          className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-[6px] font-black leading-none"
          style={{ color: type === "young" || type === "gc" ? accent ?? "#003d7a" : secondary }}
        >
          KN
        </div>
      </div>
      {showLabel && (
        <div className="text-center">
          <p className="text-xs font-bold">{config.name}</p>
          <p className="text-[10px] text-muted-foreground max-w-[120px]">{config.description}</p>
        </div>
      )}
    </div>
  );
}