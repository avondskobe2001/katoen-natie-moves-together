import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamCard } from "@/components/teams/TeamCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teams } from "@/data/sample-data";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("profiles");
  const tNav = await getTranslations("nav");

  const terminalTeams = teams.filter((team) => team.type === "terminal");
  const countryTeams = teams.filter((team) => team.type === "country");
  const departmentTeams = teams.filter((team) => team.type === "department");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black">{tNav("teams")}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{t("subtitle")}</p>
      </div>

      <Tabs defaultValue="terminal">
        <TabsList>
          <TabsTrigger value="terminal">Terminals</TabsTrigger>
          <TabsTrigger value="country">Countries</TabsTrigger>
          <TabsTrigger value="department">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="terminal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terminalTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="country">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="department">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}