import { createClient } from "@/lib/supabase/server";
import type { StravaTokens } from "@/types";

export interface StravaConnection {
  userId: string;
  athleteId: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  lastSyncAt: string | null;
}

function mapConnection(row: Record<string, unknown>): StravaConnection {
  return {
    userId: row.user_id as string,
    athleteId: Number(row.athlete_id),
    accessToken: row.access_token as string,
    refreshToken: row.refresh_token as string,
    expiresAt: Number(row.expires_at),
    lastSyncAt: (row.last_sync_at as string) ?? null,
  };
}

export async function getStravaConnectionForUser(userId: string): Promise<StravaConnection | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("strava_connections")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapConnection(data);
}

export async function getStravaConnectionForCurrentUser(): Promise<StravaConnection | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return getStravaConnectionForUser(user.id);
}

export async function saveStravaConnection(userId: string, tokens: StravaTokens): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("strava_connections").upsert(
    {
      user_id: userId,
      athlete_id: tokens.athleteId,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_at: tokens.expiresAt,
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
}

export async function deleteStravaConnection(userId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("strava_connections").delete().eq("user_id", userId);
}

export async function updateStravaLastSync(userId: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from("strava_connections")
    .update({ last_sync_at: new Date().toISOString() })
    .eq("user_id", userId);
}