import { Users, Trophy, Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Team } from "@/types";
import { formatNumber } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
}

const typeLabels: Record<Team["type"], string> = {
  department: "Department",
  country: "Country",
  terminal: "Terminal",
};

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="hover:border-kn-orange/30 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{typeLabels[team.type]}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {formatNumber(team.members)}
          </span>
        </div>
        <CardTitle className="text-base mt-2">{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-kn-blue/20 p-3">
            <Trophy className="h-4 w-4 text-kn-orange" />
            <div>
              <p className="font-bold text-sm">{formatNumber(team.totalPoints)}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-kn-blue/20 p-3">
            <Route className="h-4 w-4 text-kn-orange" />
            <div>
              <p className="font-bold text-sm">{formatNumber(team.totalDistance)}</p>
              <p className="text-xs text-muted-foreground">km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}