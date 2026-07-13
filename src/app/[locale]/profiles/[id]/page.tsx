import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Building2, Calendar, Award, Route, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SportIcon } from "@/components/shared/SportIcon";
import { users } from "@/data/sample-data";
import { formatNumber, getInitials } from "@/lib/utils";

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("profiles");
  const user = users.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Card className="border-kn-orange/20">
        <CardContent className="pt-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-kn-orange/30">
              <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-black">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.terminal}, {user.country}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {user.department}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user.joinedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              </div>

              <div className="flex justify-center sm:justify-start gap-2 mt-4">
                {user.sport.map((s) => (
                  <div key={s} className="flex items-center gap-1 rounded-full bg-kn-blue/30 px-3 py-1 text-xs">
                    <SportIcon sport={s} size="sm" />
                    <span className="capitalize">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center rounded-xl bg-kn-blue/20 p-4">
              <Trophy className="h-5 w-5 text-kn-orange mx-auto mb-2" />
              <p className="text-2xl font-black text-kn-orange">{formatNumber(user.totalPoints)}</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center rounded-xl bg-kn-blue/20 p-4">
              <Route className="h-5 w-5 text-kn-orange mx-auto mb-2" />
              <p className="text-2xl font-black">{formatNumber(user.totalDistance)}</p>
              <p className="text-xs text-muted-foreground">km Covered</p>
            </div>
            <div className="text-center rounded-xl bg-kn-blue/20 p-4">
              <Award className="h-5 w-5 text-kn-orange mx-auto mb-2" />
              <p className="text-2xl font-black">{user.achievements.length}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </div>
            <div className="text-center rounded-xl bg-kn-blue/20 p-4">
              <MapPin className="h-5 w-5 text-kn-orange mx-auto mb-2" />
              <p className="text-2xl font-black capitalize">{user.region}</p>
              <p className="text-xs text-muted-foreground">Region</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {user.achievements.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">{t("achievements")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.achievements.map((achievement) => (
              <Card key={achievement.id} className="hover:border-kn-orange/20 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kn-orange/10">
                      <Award className="h-5 w-5 text-kn-orange" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(achievement.earnedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}