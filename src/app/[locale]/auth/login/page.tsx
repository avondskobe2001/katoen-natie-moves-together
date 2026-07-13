import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { SupabaseSetupNotice } from "@/components/auth/SupabaseSetupNotice";
import { isSupabaseConfigured } from "@/lib/auth/config";

export default function LoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <AuthShell title="Sign in" subtitle="Access your profile, challenges, and Strava connection">
      {configured ? <LoginForm /> : <SupabaseSetupNotice />}
    </AuthShell>
  );
}