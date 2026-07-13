"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeaderAuth } from "@/components/auth/HeaderAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "/" },
  { key: "tourDeFrance", href: "/tour-de-france" },
  { key: "challenges", href: "/challenges" },
  { key: "predictions", href: "/predictions" },
  { key: "community", href: "/community" },
  { key: "leaderboards", href: "/leaderboards" },
  { key: "profiles", href: "/profiles" },
  { key: "about", href: "/about" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl shadow-sm shadow-kn-red/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kn-red shadow-md shadow-kn-red/25 ring-2 ring-white/50 transition-transform group-hover:scale-105">
            <span className="text-lg font-black text-white">KN</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-foreground">Katoen Natie</p>
            <p className="text-xs text-kn-red font-medium">Moves Together</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-kn-red-soft text-kn-red font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  item.key === "tourDeFrance" && !isActive && "text-kn-red font-semibold"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <HeaderAuth />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-kn-red-soft text-kn-red"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3 flex flex-col gap-2">
              <Link
                href="/auth/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium bg-kn-red-soft text-kn-red"
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Sign In
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                My Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}