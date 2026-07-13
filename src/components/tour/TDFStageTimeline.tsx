import { Route, CircleDot } from "lucide-react";
import type { TDFStage } from "@/types";
import { cn } from "@/lib/utils";

const typeLabels: Record<TDFStage["type"], { label: string; color: string; bg: string }> = {
  flat: { label: "Flat", color: "text-emerald-700", bg: "bg-emerald-50" },
  hilly: { label: "Hilly", color: "text-amber-700", bg: "bg-amber-50" },
  mountain: { label: "Mountain", color: "text-red-700", bg: "bg-red-50" },
  "team-tt": { label: "Team TT", color: "text-violet-700", bg: "bg-violet-50" },
  "individual-tt": { label: "ITT", color: "text-purple-700", bg: "bg-purple-50" },
  rest: { label: "Rest Day", color: "text-muted-foreground", bg: "bg-muted" },
};

interface TDFStageTimelineProps {
  stages: TDFStage[];
}

export function TDFStageTimeline({ stages }: TDFStageTimelineProps) {
  return (
    <div className="space-y-2">
      {stages.map((stage, idx) => {
        if (stage.type === "rest") {
          return (
            <div
              key={`rest-${idx}`}
              className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted/50 px-4 py-3"
            >
              <CircleDot className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Rest Day</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(stage.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} — {stage.start}
                </p>
              </div>
            </div>
          );
        }

        const typeInfo = typeLabels[stage.type];

        return (
          <div
            key={stage.number}
            className={cn(
              "flex items-start gap-4 rounded-xl border px-4 py-3 transition-all bg-white",
              stage.status === "completed" && "border-emerald-200 bg-emerald-50/30",
              stage.status === "live" && "border-kn-orange/40 bg-orange-50/50 ring-1 ring-kn-orange/20",
              stage.status === "upcoming" && "border-border"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                stage.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                stage.status === "live" ? "bg-kn-orange/15 text-kn-orange" :
                "bg-kn-blue-soft text-kn-blue"
              )}
            >
              {stage.number}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm">{stage.start} → {stage.finish}</p>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", typeInfo.bg, typeInfo.color)}>
                  {typeInfo.label}
                </span>
                {stage.status === "live" && (
                  <span className="text-xs font-bold text-kn-orange uppercase">Live</span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Route className="h-3 w-3" /> {stage.distance} km
                </span>
                <span>
                  {new Date(stage.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                </span>
              </div>

              {stage.winner && (
                <p className="text-xs mt-2 text-kn-blue font-medium">
                  Winner: {stage.winner}
                  {stage.winningTime && <span className="text-muted-foreground font-normal"> — {stage.winningTime}</span>}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}