import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { JerseyBadge } from "@/components/tour/JerseyBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKTNGCLeaderboard, getKTNJerseyHolders } from "@/data/ktn-challenge";
import { jerseyConfig } from "@/lib/ktn-jerseys";
import { formatNumber, getInitials } from "@/lib/utils";
import type { KTNJerseyType } from "@/types";

export function KTNJerseyStandings() {
  const holders = getKTNJerseyHolders();
  const leaderboard = getKTNGCLeaderboard();

  return (
    <div className="space-y-8">
      {/* Jersey holders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {holders.map((holder) => (
          <Card key={holder.type} className="hover:border-kn-orange/20 transition-all">
            <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
              <JerseyBadge type={holder.type} size="lg" />
              <div>
                <p className="font-bold text-sm">{jerseyConfig[holder.type].name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {jerseyConfig[holder.type].description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{getInitials(holder.participant.name)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold text-sm">{holder.participant.name}</p>
                  <p className="text-xs text-muted-foreground">{holder.participant.terminal}</p>
                </div>
              </div>
              <p className="text-lg font-black text-kn-orange">
                {formatNumber(holder.value)} <span className="text-xs font-normal text-muted-foreground">{holder.unit}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full GC table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <JerseyBadge type="gc" size="sm" />
            KTN de France — General Classification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((rider, idx) => {
              const jerseys: KTNJerseyType[] = [];
              holders.forEach((h) => {
                if (h.participant.userId === rider.userId) jerseys.push(h.type);
              });

              return (
                <div
                  key={rider.userId}
                  className="flex items-center gap-4 rounded-lg border border-kn-blue-light/10 bg-card/40 px-4 py-3 hover:border-kn-orange/20 transition-all"
                >
                  <span className="w-8 text-center font-bold text-muted-foreground">#{idx + 1}</span>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{getInitials(rider.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">{rider.name}</p>
                      {jerseys.map((j) => (
                        <JerseyBadge key={j} type={j} size="sm" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{rider.terminal}, {rider.country}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">{formatNumber(rider.elevationGain)}m elev</p>
                    <p className="text-xs text-muted-foreground">{rider.stagesCompleted}/5 stages</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-kn-orange">{formatNumber(rider.totalDistance)} km</p>
                    {rider.stravaConnected && (
                      <p className="text-[10px] text-emerald-400">Strava</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}