"use client";

import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface AuthState {
  signedIn: boolean;
  name: string | null;
}

export function HeaderAuth() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({ signedIn: false, name: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAuth({ signedIn: false, name: null });
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, approval_status")
        .eq("id", user.id)
        .single();

      setAuth({
        signedIn: profile?.approval_status === "approved",
        name: profile?.name ?? user.email ?? null,
      });
      setLoading(false);
    }

    load();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAuth({ signedIn: false, name: null });
    router.push("/");
    router.refresh();
  };

  if (loading) return null;

  if (auth.signedIn) {
    return (
      <>
        <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground" asChild>
          <Link href="/account" title={auth.name ?? "My account"}>
            <User className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
      <Button variant="default" size="sm" className="hidden sm:flex" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
    </>
  );
}