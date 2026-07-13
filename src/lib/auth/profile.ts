import { createClient } from "@/lib/supabase/server";
import type { ApprovalStatus, EmailType, Region } from "@/types";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  terminal: string;
  country: string;
  region: Region;
  birthDate: string | null;
  approvalStatus: ApprovalStatus;
  emailType: EmailType;
  isAdmin: boolean;
  avatarUrl: string | null;
  createdAt: string;
}

function mapProfile(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    terminal: (row.terminal as string) ?? "",
    country: (row.country as string) ?? "",
    region: (row.region as Region) ?? "global",
    birthDate: (row.birth_date as string) ?? null,
    approvalStatus: (row.approval_status as ApprovalStatus) ?? "pending",
    emailType: (row.email_type as EmailType) ?? "personal",
    isAdmin: Boolean(row.is_admin),
    avatarUrl: (row.avatar_url as string) ?? null,
    createdAt: row.created_at as string,
  };
}

export async function getSessionUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;
  return mapProfile(data);
}

export async function requireApprovedProfile(): Promise<UserProfile> {
  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("UNAUTHENTICATED");
  }
  if (profile.approvalStatus === "pending") {
    throw new Error("PENDING_APPROVAL");
  }
  if (profile.approvalStatus === "rejected") {
    throw new Error("REJECTED");
  }
  return profile;
}