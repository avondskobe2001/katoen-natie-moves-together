import { Users, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SportIcon } from "@/components/shared/SportIcon";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Challenge } from "@/types";
import { formatNumber } from "@/lib/utils";
import { Link } from "@/lib/i18n/navigation";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress =
    challenge.targetDistance && challenge.currentDistance
      ? Math.round((challenge.currentDistance / challenge.targetDistance) * 100)
      : 0;

  return (
    <Card className="group bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kn-red-soft">
            <SportIcon sport={challenge.sport} />
          </div>
          <StatusBadge status={challenge.status} />
        </div>
        <CardTitle className="mt-3 group-hover:text-kn-red transition-colors">
          {challenge.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>

        {challenge.targetDistance && challenge.currentDistance !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-kn-red">{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              {formatNumber(challenge.currentDistance)} / {formatNumber(challenge.targetDistance)} km
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {formatNumber(challenge.participants)}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(challenge.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/challenges#${challenge.id}`}>View Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}