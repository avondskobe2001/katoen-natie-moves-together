import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { LeaderboardEntry } from "@/types";
import { cn, formatNumber, getInitials } from "@/lib/utils";
import { Medal } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  showDistance?: boolean;
  showPredictions?: boolean;
  highlightUserId?: string;
}

export function LeaderboardTable({
  entries,
  showDistance = false,
  showPredictions = false,
  highlightUserId,
}: LeaderboardTableProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.userId}
          className={cn(
            "flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-kn-red/25 hover:shadow-sm",
            highlightUserId === entry.userId && "border-kn-red/30 bg-kn-red-soft ring-1 ring-kn-red/10"
          )}
        >
          <div className="flex w-8 items-center justify-center">
            {entry.rank <= 3 ? (
              <Medal
                className={cn(
                  "h-5 w-5",
                  entry.rank === 1 && "text-kn-red",
                  entry.rank === 2 && "text-[#9b0e24]",
                  entry.rank === 3 && "text-[#e63950]"
                )}
              />
            ) : (
              <span className="text-sm font-bold text-muted-foreground">#{entry.rank}</span>
            )}
          </div>

          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">{getInitials(entry.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate text-foreground">{entry.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {entry.terminal}, {entry.country}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold text-kn-red">{formatNumber(entry.points)}</p>
            <p className="text-xs text-muted-foreground">
              {showDistance && entry.distance !== undefined && `${formatNumber(entry.distance)} km`}
              {showPredictions && entry.predictions !== undefined && `${entry.predictions} preds`}
              {!showDistance && !showPredictions && "pts"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}