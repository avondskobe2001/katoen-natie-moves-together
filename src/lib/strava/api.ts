import { STRAVA_API_URL, STRAVA_TOKEN_URL, getStravaConfig } from "./config";
import type { StravaActivity, StravaTokens } from "@/types";

export async function exchangeCodeForTokens(code: string): Promise<StravaTokens> {
  const { clientId, clientSecret, redirectUri } = getStravaConfig();

  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) throw new Error("Failed to exchange Strava authorization code");

  const data = await res.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
    athleteId: data.athlete?.id ?? 0,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<StravaTokens> {
  const { clientId, clientSecret } = getStravaConfig();

  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh Strava token");

  const data = await res.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
    athleteId: data.athlete?.id ?? 0,
  };
}

export async function fetchAthleteActivities(
  accessToken: string,
  after?: number
): Promise<StravaActivity[]> {
  const params = new URLSearchParams({ per_page: "50" });
  if (after) params.set("after", String(after));

  const res = await fetch(`${STRAVA_API_URL}/athlete/activities?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch Strava activities");
  return res.json();
}

export function isCyclingActivity(type: string): boolean {
  return ["Ride", "VirtualRide", "EBikeRide", "GravelRide"].includes(type);
}

export function metersToKm(meters: number): number {
  return Math.round((meters / 1000) * 10) / 10;
}