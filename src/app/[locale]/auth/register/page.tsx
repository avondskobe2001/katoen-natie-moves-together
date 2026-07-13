import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SupabaseSetupNotice } from "@/components/auth/SupabaseSetupNotice";
import { isSupabaseConfigured } from "@/lib/auth/config";

export default function RegisterPage() {
  const configured = isSupabaseConfigured();

  return (
    <AuthShell
      title="Create your profile"
      subtitle="Join Katoen Natie Moves Together with your work or personal email"
    >
      {configured ? <RegisterForm /> : <SupabaseSetupNotice />}
    </AuthShell>
  );
}