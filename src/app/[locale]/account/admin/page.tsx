import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/profile";
import { isAdminEmail } from "@/lib/auth/config";
import { AdminApprovals } from "@/components/account/AdminApprovals";

export default async function AdminPage() {
  const profile = await getCurrentProfile();

  if (!profile || (!profile.isAdmin && !isAdminEmail(profile.email))) {
    redirect("/account");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Team approvals</h1>
        <p className="text-muted-foreground mt-1">Katoen Natie administrator panel</p>
      </div>
      <AdminApprovals />
    </div>
  );
}