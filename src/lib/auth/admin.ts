import { isAdminEmail } from "@/lib/auth/config";
import { getCurrentProfile } from "@/lib/auth/profile";

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("UNAUTHENTICATED");
  }
  if (!profile.isAdmin && !isAdminEmail(profile.email)) {
    throw new Error("FORBIDDEN");
  }
  return profile;
}