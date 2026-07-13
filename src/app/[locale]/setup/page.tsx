import { AuthShell } from "@/components/auth/AuthShell";
import { SupabaseSetupWizard } from "@/components/auth/SupabaseSetupWizard";
import { isSupabaseConfigured } from "@/lib/auth/config";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";

export default function SetupPage() {
  const configured = isSupabaseConfigured();

  if (configured) {
    return (
      <AuthShell title="Supabase connected" subtitle="Registration is enabled">
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <p className="text-sm text-muted-foreground">
            Your Supabase credentials are configured. Users can now register and sign in.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/auth/register">Create account</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-kn-red text-white font-black text-lg shadow-md shadow-kn-red/25 mb-4">
          KN
        </div>
        <h1 className="text-2xl font-black">Connect Supabase</h1>
        <p className="text-sm text-muted-foreground mt-1">
          3 steps to enable user registration (~5 minutes)
        </p>
      </div>
      <SupabaseSetupWizard />
    </div>
  );
}