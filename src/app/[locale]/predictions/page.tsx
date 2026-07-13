import { getTranslations, setRequestLocale } from "next-intl/server";
import { TournamentCard } from "@/components/predictions/TournamentCard";
import { MatchCard } from "@/components/predictions/MatchCard";
import { LeaderboardTable } from "@/components/shared/LeaderboardTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tournaments, matches, predictionLeaderboard } from "@/data/sample-data";

export default async function PredictionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("predictions");

  const upcomingMatches = matches.filter((m) => m.status === "scheduled");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{t("subtitle")}</p>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Tournaments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="matches">{t("upcomingMatches")}</TabsTrigger>
          <TabsTrigger value="leaderboard">{t("leaderboard")}</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="max-w-xl">
            <LeaderboardTable
              entries={predictionLeaderboard}
              showPredictions
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}