import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe2, Heart, Trophy, Users, Building2, Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { sponsorships, platformStats } from "@/data/sample-data";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-kn-orange/30 bg-kn-orange/10 px-4 py-1.5 text-sm font-medium text-kn-orange mb-6">
          <Heart className="h-4 w-4" />
          {tCommon("tagline")}
        </div>
        <h1 className="text-4xl font-black">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Countries" value={platformStats.totalCountries} icon={Globe2} />
        <StatCard label="Terminals" value={platformStats.totalTerminals} icon={Building2} />
        <StatCard label="Participants" value={platformStats.totalParticipants} icon={Users} />
        <StatCard label="Total Distance" value={platformStats.totalDistance} icon={Route} suffix="km" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{t("wellbeing")}</h2>
        <Card className="border-kn-blue-light/20">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed text-lg">{t("wellbeingText")}</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{t("sponsorships")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorships.map((sponsorship) => (
            <Card key={sponsorship.id} className="hover:border-kn-orange/30 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kn-orange/10 mb-2">
                  <Trophy className="h-6 w-6 text-kn-orange" />
                </div>
                <CardTitle>{sponsorship.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {sponsorship.sport} · Since {sponsorship.since}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sponsorship.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{t("globalReach")}</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Globe2 className="h-8 w-8 text-kn-orange mx-auto mb-3" />
                <p className="font-bold text-lg">Europe</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Antwerp, Rotterdam, Felixstowe, and more
                </p>
              </div>
              <div>
                <Globe2 className="h-8 w-8 text-kn-orange mx-auto mb-3" />
                <p className="font-bold text-lg">Africa & Asia</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lagos, Durban, Shanghai, and beyond
                </p>
              </div>
              <div>
                <Globe2 className="h-8 w-8 text-kn-orange mx-auto mb-3" />
                <p className="font-bold text-lg">Americas</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Santos, Houston, and growing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}