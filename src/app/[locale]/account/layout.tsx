import { redirect } from "next/navigation";
import { getCurrentProfile, getSessionUser } from "@/lib/auth/profile";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth/login");
  }

  const profile = await getCurrentProfile();
  if (profile?.approvalStatus === "pending") {
    redirect("/auth/pending");
  }

  if (profile?.approvalStatus === "rejected") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}