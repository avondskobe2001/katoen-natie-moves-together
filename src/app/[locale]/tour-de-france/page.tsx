import { setRequestLocale } from "next-intl/server";
import { ExternalLink, MapPin, Trophy, Users, Mountain, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProJerseyBadge } from "@/components/tour/ProJerseyBadge";
import { TDFStageTimeline } from "@/components/tour/TDFStageTimeline";
import { StravaConnect } from "@/components/tour/StravaConnect";
import { KTNJerseyStandings } from "@/components/tour/KTNJerseyStandings";
import { JerseyBadge } from "@/components/tour/JerseyBadge";
import {
  tdf2026Meta,
  tdf2026Stages,
  tdf2026GC,
  tdf2026Jerseys,
  tdf2026Highlights,
} from "@/data/tour-de-france-2026";
import { ktnChallengeMeta } from "@/data/ktn-challenge";
import { formatNumber } from "@/lib/utils";
import { StravaCallbackNotice } from "@/components/tour/StravaCallbackNotice";
import { Suspense } from "react";

export const metadata = {
  title: "Tour de France 2026",
  description: "Live Tour de France 2026 coverage and the KTN de France Challenge with Strava sync.",
};

export default async function TourDeFrancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const completedDistance = tdf2026Stages
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.distance, 0);

  const nextStage = tdf2026Stages.find((s) => s.status === "upcoming" && s.type !== "rest");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Suspense fallback={null}>
        <StravaCallbackNotice />
      </Suspense>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-lg shadow-kn-blue/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 38px, #C8102E18 38px, #C8102E18 40px, transparent 40px, transparent 78px, #004b8710 78px, #004b8710 80px)",
        }} />
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#C8102E]/8 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-kn-blue-light/10 blur-3xl" />
        <div className="relative px-6 py-14 sm:px-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="success">Live — Stage {tdf2026Meta.currentStage} tomorrow</Badge>
            <Badge variant="outline">4 July – 26 July 2026</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Tour de France <span className="text-[#C8102E]">2026</span>
          </h1>
          <p className="mt-2 text-xl text-kn-blue font-semibold">
            KTN de France Challenge
          </p>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Follow the real Tour de France — 21 stages, 3,320.7 km from Barcelona to Paris —
            and compete in the Katoen Natie virtual challenge. Connect Strava and ride for
            the red &amp; white, white, blue, and pink jerseys.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: tdf2026Meta.stageCount, label: "Stages", accent: "text-kn-blue" },
              { value: formatNumber(tdf2026Meta.totalDistance), label: "km total", accent: "text-foreground" },
              { value: formatNumber(tdf2026Meta.totalElevation), label: "m elevation", accent: "text-foreground" },
              { value: formatNumber(ktnChallengeMeta.participants), label: "KTN riders", accent: "text-kn-orange" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-kn-blue-soft/50 p-4 text-center">
                <p className={`text-2xl font-black ${stat.accent}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="https://www.letour.fr/en/overall-route"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-6 text-sm text-kn-orange hover:underline"
          >
            Official route on letour.fr <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Pro race live section */}
      <section id="live">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-kn-orange" />
            Pro Race — Live Standings
          </h2>
          <span className="text-xs text-muted-foreground">
            Updated after Stage 5 · Source: letour.fr
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pro jersey holders */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Jersey Holders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tdf2026Jerseys.map((j) => (
                <div key={j.jersey} className="flex items-center gap-3">
                  <ProJerseyBadge jersey={j.jersey} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{j.rider}</p>
                    <p className="text-xs text-muted-foreground truncate">{j.team}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{j.points}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* GC Top 10 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ProJerseyBadge jersey="yellow" />
                General Classification — Top 10
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tdf2026GC.map((rider) => (
                  <div
                    key={rider.rank}
                    className="flex items-center gap-4 rounded-lg border border-kn-blue-light/10 px-4 py-2.5 hover:border-kn-orange/20 transition-all"
                  >
                    <span className={rider.rank <= 3 ? "font-black text-kn-orange w-6" : "text-muted-foreground w-6"}>
                      {rider.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{rider.name}</p>
                      <p className="text-xs text-muted-foreground">{rider.team}</p>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">{rider.country}</span>
                    <div className="text-right">
                      <p className="text-sm font-mono">{rider.time}</p>
                      {rider.gap !== "—" && <p className="text-xs text-muted-foreground">{rider.gap}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {nextStage && (
          <Card className="mt-6 border-kn-orange/20">
            <CardContent className="py-4 flex flex-wrap items-center gap-4">
              <Calendar className="h-5 w-5 text-kn-orange" />
              <div>
                <p className="font-semibold">Next: Stage {nextStage.number}</p>
                <p className="text-sm text-muted-foreground">
                  {nextStage.start} → {nextStage.finish} · {nextStage.distance} km ·{" "}
                  {new Date(nextStage.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
              <Badge variant="cycling" className="ml-auto capitalize">{String(nextStage.type).replace(/-/g, " ")}</Badge>
            </CardContent>
          </Card>
        )}
      </section>

      {/* All stages */}
      <section id="stages">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-kn-orange" />
          2026 Route — All Stages
        </h2>
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Mountain className="h-4 w-4" /> 8 mountain stages</span>
          <span>7 flat · 4 hilly · 2 time trials · 2 rest days</span>
          <span>{formatNumber(completedDistance)} km completed so far</span>
        </div>
        <TDFStageTimeline stages={tdf2026Stages} />

        <div className="mt-6 rounded-xl border border-kn-blue-light/20 bg-kn-blue/10 p-5">
          <h3 className="font-semibold mb-3">Race Highlights</h3>
          <ul className="space-y-2">
            {tdf2026Highlights.map((h, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-kn-orange mt-0.5">•</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator className="bg-kn-orange/20" />

      {/* KTN Challenge */}
      <section id="ktn-challenge">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-3 mb-4">
            <JerseyBadge type="gc" size="md" />
            <JerseyBadge type="young" size="md" />
            <JerseyBadge type="mountain" size="md" />
            <JerseyBadge type="women" size="md" />
          </div>
          <h2 className="text-3xl font-black">{ktnChallengeMeta.title}</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">{ktnChallengeMeta.subtitle}</p>
        </div>

        {/* Jersey rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-[#C8102E]/30">
            <CardContent className="pt-5 text-center">
              <JerseyBadge type="gc" size="md" showLabel />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 text-center">
              <JerseyBadge type="young" size="md" showLabel />
            </CardContent>
          </Card>
          <Card className="border-kn-blue-light/40">
            <CardContent className="pt-5 text-center">
              <JerseyBadge type="mountain" size="md" showLabel />
            </CardContent>
          </Card>
          <Card className="border-pink-500/30">
            <CardContent className="pt-5 text-center">
              <JerseyBadge type="women" size="md" showLabel />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <StravaConnect />
          </div>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-kn-orange" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {ktnChallengeMeta.rules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kn-orange/20 text-kn-orange text-xs font-bold">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <KTNJerseyStandings />
      </section>
    </div>
  );
}