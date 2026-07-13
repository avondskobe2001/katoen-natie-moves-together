import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChallengeCard } from "@/components/home/ChallengeCard";
import { StageList } from "@/components/challenges/StageList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { challenges } from "@/data/sample-data";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";
export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("challenges");

  const cyclingChallenges = challenges.filter((c) => c.sport === "cycling");
  const runningChallenges = challenges.filter(
    (c) => c.sport === "running" || c.sport === "walking"
  );
  const customChallenges = challenges.filter(
    (c) => c.sport === "general"
  );

  const tdfChallenge = challenges.find((c) => c.id === "chal-001");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("subtitle")}</p>
        </div>
        <Button asChild className="bg-[#C8102E] hover:bg-[#a00d24] text-white shrink-0">
          <Link href="/tour-de-france">
            Tour de France 2026 <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {tdfChallenge && (
        <Card id="chal-001" className="border-kn-orange/20">
          <CardHeader>
            <CardTitle className="text-xl text-kn-orange">
              {tdfChallenge.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{tdfChallenge.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {tdfChallenge.targetDistance && tdfChallenge.currentDistance !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("progress")}</span>
                  <span className="font-bold text-kn-orange">
                    {Math.round(
                      (tdfChallenge.currentDistance / tdfChallenge.targetDistance) * 100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (tdfChallenge.currentDistance / tdfChallenge.targetDistance) * 100
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {formatNumber(tdfChallenge.currentDistance)} /{" "}
                  {formatNumber(tdfChallenge.targetDistance)} km —{" "}
                  {formatNumber(tdfChallenge.participants)} participants
                </p>
              </div>
            )}
            {tdfChallenge.stages && (
              <div>
                <h3 className="font-semibold mb-3">{t("stages")}</h3>
                <StageList stages={tdfChallenge.stages} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="cycling">
        <TabsList>
          <TabsTrigger value="cycling">{t("cycling")}</TabsTrigger>
          <TabsTrigger value="running">{t("running")}</TabsTrigger>
          <TabsTrigger value="custom">{t("custom")}</TabsTrigger>
        </TabsList>

        <TabsContent value="cycling">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cyclingChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="running">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {runningChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}