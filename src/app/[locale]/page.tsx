import { getTranslations, setRequestLocale } from "next-intl/server";
import { Users, Route, Globe2, Building2, Map, Trophy, MessageCircle } from "lucide-react";
import { SectionDivider } from "@/components/shared/DecorativeGraphics";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { HeroSection } from "@/components/home/HeroSection";
import { GlobalMap } from "@/components/home/GlobalMap";
import { ChallengeCard } from "@/components/home/ChallengeCard";
import { FeedPreview } from "@/components/home/FeedPreview";
import { StatCard } from "@/components/shared/StatCard";
import { LeaderboardTable } from "@/components/shared/LeaderboardTable";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import {
  challenges,
  feedPosts,
  globalLeaderboard,
  platformStats,
} from "@/data/sample-data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const activeChallenges = challenges.filter((c) => c.status === "active");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroSection />

      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={t("stats.participants")} value={platformStats.totalParticipants} icon={Users} index={0} />
          <StatCard label={t("stats.distance")} value={platformStats.totalDistance} icon={Route} suffix="km" index={1} />
          <StatCard label={t("stats.countries")} value={platformStats.totalCountries} icon={Globe2} index={2} />
          <StatCard label={t("stats.terminals")} value={platformStats.totalTerminals} icon={Building2} index={3} />
        </div>
      </section>

      <SectionDivider />

      <section>
        <SectionTitle title={t("globalActivity")} icon={Map} />
        <GlobalMap />
      </section>

      <SectionDivider />

      <section>
        <SectionTitle title={t("currentChallenges")} icon={Trophy}>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/challenges">{tCommon("viewAll")}</Link>
          </Button>
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SectionTitle title={t("topMovers")} icon={Users}>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/leaderboards">{tCommon("viewAll")}</Link>
            </Button>
          </SectionTitle>
          <LeaderboardTable
            entries={globalLeaderboard}
            showDistance
            highlightUserId="user-001"
          />
        </div>

        <div>
          <SectionTitle title={t("recentActivity")} icon={MessageCircle}>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/community">{tCommon("viewAll")}</Link>
            </Button>
          </SectionTitle>
          <FeedPreview posts={feedPosts} />
        </div>
      </section>
    </div>
  );
}