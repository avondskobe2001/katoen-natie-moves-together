import { Users, Calendar, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Tournament } from "@/types";
import { formatNumber } from "@/lib/utils";

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <Card className="hover:border-kn-orange/30 transition-all group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
            <Trophy className="h-6 w-6 text-green-400" />
          </div>
          <StatusBadge status={tournament.status} />
        </div>
        <CardTitle className="mt-4 group-hover:text-kn-orange transition-colors">
          {tournament.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(tournament.startDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          </span>
          <span>{tournament.matches} matches</span>
          {tournament.participants > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {formatNumber(tournament.participants)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}