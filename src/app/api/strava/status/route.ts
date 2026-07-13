import { NextResponse } from "next/server";
import { getStravaTokens } from "@/lib/strava/tokens";
import { getStravaConfig } from "@/lib/strava/config";
import { getStravaConnectionForCurrentUser } from "@/lib/strava/connections";

export async function GET() {
  const { isConfigured } = getStravaConfig();
  const dbConnection = await getStravaConnectionForCurrentUser();
  const cookieTokens = await getStravaTokens();

  const connected = Boolean(dbConnection || cookieTokens);
  const athleteId = dbConnection?.athleteId ?? cookieTokens?.athleteId ?? null;
  const expiresAt = dbConnection?.expiresAt ?? cookieTokens?.expiresAt ?? null;
  const source = dbConnection ? "account" : cookieTokens ? "cookie" : null;

  return NextResponse.json({
    configured: isConfigured,
    connected,
    athleteId,
    expiresAt,
    source,
  });
}