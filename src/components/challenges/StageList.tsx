import { CheckCircle2, Circle, Mountain, Route } from "lucide-react";
import type { CyclingStage } from "@/types";
import { cn } from "@/lib/utils";

interface StageListProps {
  stages: CyclingStage[];
}

export function StageList({ stages }: StageListProps) {
  return (
    <div className="space-y-2">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className={cn(
            "flex items-center gap-4 rounded-lg border px-4 py-3 transition-all",
            stage.completed
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-kn-blue-light/10 bg-card/30"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-kn-blue/40 text-sm font-bold">
            {stage.number}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{stage.name}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Route className="h-3 w-3" /> {stage.distance} km
              </span>
              <span className="flex items-center gap-1">
                <Mountain className="h-3 w-3" /> {stage.elevation}m
              </span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground hidden sm:block">
            {new Date(stage.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
          </div>

          {stage.completed ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}