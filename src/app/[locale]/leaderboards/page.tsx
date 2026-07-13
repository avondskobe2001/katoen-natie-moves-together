import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeaderboardTable } from "@/components/shared/LeaderboardTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  globalLeaderboard,
  cyclingLeaderboard,
  predictionLeaderboard,
  teams,
} from "@/data/sample-data";
import { formatNumber } from "@/lib/utils";

export default async function LeaderboardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("leaderboards");

  const countryTeams = teams.filter((team) => team.type === "country");
  const terminalTeams = teams.filter((team) => team.type === "terminal");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{t("subtitle")}</p>
      </div>

      <Tabs defaultValue="global">
        <TabsList>
          <TabsTrigger value="global">{t("global")}</TabsTrigger>
          <TabsTrigger value="cycling">{t("cycling")}</TabsTrigger>
          <TabsTrigger value="predictions">{t("predictions")}</TabsTrigger>
          <TabsTrigger value="country">{t("byCountry")}</TabsTrigger>
          <TabsTrigger value="terminal">{t("byTerminal")}</TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <div className="max-w-2xl">
            <LeaderboardTable entries={globalLeaderboard} showDistance highlightUserId="user-001" />
          </div>
        </TabsContent>

        <TabsContent value="cycling">
          <div className="max-w-2xl">
            <LeaderboardTable entries={cyclingLeaderboard} showDistance />
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="max-w-2xl">
            <LeaderboardTable entries={predictionLeaderboard} showPredictions />
          </div>
        </TabsContent>

        <TabsContent value="country">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{team.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-bold text-kn-orange">{formatNumber(team.totalPoints)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-bold">{formatNumber(team.totalDistance)} km</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Members</span>
                    <span>{formatNumber(team.members)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="terminal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {terminalTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{team.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{team.country}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-bold text-kn-orange">{formatNumber(team.totalPoints)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-bold">{formatNumber(team.totalDistance)} km</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}