import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { KatoenNatieHexagonLogoHero } from "@/components/graphics/KatoenNatieHexagonLogo";

export async function HeroSection() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-md shadow-kn-red/5">
      <KatoenNatieHexagonLogoHero />

      <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-kn-red/20 bg-kn-red-soft px-4 py-1.5 text-sm font-medium text-kn-red-dark mb-6">
            <Sparkles className="h-4 w-4 text-kn-red" />
            {tCommon("tagline")}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
            <span className="text-gradient">{t("heroTitle")}</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/tour-de-france">
                Tour de France 2026
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/challenges">{tCommon("joinChallenge")}</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/about">{tCommon("learnMore")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}