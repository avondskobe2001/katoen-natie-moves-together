import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Globe, Heart } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kn-red shadow-sm">
                <span className="text-lg font-black text-white">KN</span>
              </div>
              <div>
                <p className="font-bold text-foreground">Katoen Natie Moves Together</p>
                <p className="text-sm text-kn-red">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Uniting employees and partners worldwide through sport, health, and company pride.
              From Antwerp to Shanghai, Lagos to Santos — we move as one.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tour-de-france" className="hover:text-kn-red transition-colors">Tour de France</Link></li>
              <li><Link href="/challenges" className="hover:text-kn-red transition-colors">{tNav("challenges")}</Link></li>
              <li><Link href="/predictions" className="hover:text-kn-red transition-colors">{tNav("predictions")}</Link></li>
              <li><Link href="/leaderboards" className="hover:text-kn-red transition-colors">{tNav("leaderboards")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-kn-red transition-colors">{tNav("about")}</Link></li>
              <li><Link href="/profiles" className="hover:text-kn-red transition-colors">{tNav("profiles")}</Link></li>
              <li><Link href="/teams" className="hover:text-kn-red transition-colors">{tNav("teams")}</Link></li>
              <li>
                <a href="https://www.katoennatie.com" target="_blank" rel="noopener noreferrer" className="hover:text-kn-red transition-colors inline-flex items-center gap-1">
                  <Globe className="h-3 w-3" /> katoennatie.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Katoen Natie NV. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-kn-red fill-kn-red" /> for our global team
          </p>
        </div>
      </div>
    </footer>
  );
}