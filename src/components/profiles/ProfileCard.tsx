import { MapPin, Building2, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/shared/SportIcon";
import type { User } from "@/types";
import { formatNumber, getInitials } from "@/lib/utils";
import { Link } from "@/lib/i18n/navigation";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Link href={`/profiles/${user.id}`}>
      <Card className="hover:border-kn-orange/30 transition-all group cursor-pointer h-full">
        <CardHeader className="text-center pb-2">
          <Avatar className="h-16 w-16 mx-auto ring-2 ring-kn-orange/30 group-hover:ring-kn-orange transition-all">
            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold mt-3 group-hover:text-kn-orange transition-colors">{user.name}</h3>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {user.terminal}, {user.country}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            {user.department}
          </div>

          <div className="flex justify-center gap-1">
            {user.sport.map((s) => (
              <SportIcon key={s} sport={s} size="sm" />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-kn-blue/20 p-2">
              <p className="text-lg font-bold text-kn-orange">{formatNumber(user.totalPoints)}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="rounded-lg bg-kn-blue/20 p-2">
              <p className="text-lg font-bold">{formatNumber(user.totalDistance)}</p>
              <p className="text-xs text-muted-foreground">km</p>
            </div>
          </div>

          {user.achievements.length > 0 && (
            <div className="flex items-center justify-center gap-1">
              <Award className="h-3 w-3 text-kn-orange" />
              <Badge variant="outline" className="text-xs">
                {user.achievements.length} achievements
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}