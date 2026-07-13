"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Match } from "@/types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const isFinished = match.status === "finished";
  const isLive = match.status === "live";

  return (
    <Card className="hover:border-kn-orange/20 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">{match.round}</Badge>
          {isLive && <Badge variant="success">LIVE</Badge>}
          {isFinished && <Badge variant="secondary">FT</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <span className="text-3xl mb-2 block">{match.homeFlag}</span>
            <p className="font-semibold text-sm">{match.homeTeam}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            {isFinished ? (
              <div className="text-2xl font-black text-kn-orange">
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={homeScore}
                  onChange={(e) => setHomeScore(Number(e.target.value))}
                  className="w-12 h-10 rounded-lg border border-kn-blue-light/30 bg-kn-blue/20 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-kn-orange"
                  aria-label={`${match.homeTeam} score`}
                />
                <span className="text-muted-foreground font-bold">-</span>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={awayScore}
                  onChange={(e) => setAwayScore(Number(e.target.value))}
                  className="w-12 h-10 rounded-lg border border-kn-blue-light/30 bg-kn-blue/20 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-kn-orange"
                  aria-label={`${match.awayTeam} score`}
                />
              </div>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(match.kickoff).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex-1 text-center">
            <span className="text-3xl mb-2 block">{match.awayFlag}</span>
            <p className="font-semibold text-sm">{match.awayTeam}</p>
          </div>
        </div>

        {!isFinished && (
          <Button variant="default" size="sm" className="w-full">
            Submit Prediction
          </Button>
        )}
      </CardContent>
    </Card>
  );
}