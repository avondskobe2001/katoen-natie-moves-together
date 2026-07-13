import { NextResponse } from "next/server";
import {
  fetchAthleteActivities,
  isCyclingActivity,
  metersToKm,
  refreshAccessToken,
} from "@/lib/strava/api";
import { getStravaTokens, setStravaTokens } from "@/lib/strava/tokens";
import {
  getStravaConnectionForCurrentUser,
  saveStravaConnection,
  updateStravaLastSync,
} from "@/lib/strava/connections";
import { getSessionUser } from "@/lib/auth/profile";
import type { StravaTokens } from "@/types";

const TDF_START = Math.floor(new Date("2026-07-04T00:00:00Z").getTime() / 1000);

async function resolveTokens(): Promise<StravaTokens | null> {
  const dbConnection = await getStravaConnectionForCurrentUser();
  if (dbConnection) {
    return {
      accessToken: dbConnection.accessToken,
      refreshToken: dbConnection.refreshToken,
      expiresAt: dbConnection.expiresAt,
      athleteId: dbConnection.athleteId,
    };
  }
  return getStravaTokens();
}

async function persistTokens(tokens: StravaTokens): Promise<void> {
  const user = await getSessionUser();
  if (user) {
    await saveStravaConnection(user.id, tokens);
  } else {
    await setStravaTokens(tokens);
  }
}

export async function POST() {
  let tokens = await resolveTokens();

  if (!tokens) {
    return NextResponse.json({ error: "Strava not connected" }, { status: 401 });
  }

  if (tokens.expiresAt * 1000 < Date.now()) {
    try {
      tokens = await refreshAccessToken(tokens.refreshToken);
      await persistTokens(tokens);
    } catch {
      return NextResponse.json({ error: "Failed to refresh Strava token" }, { status: 401 });
    }
  }

  try {
    const activities = await fetchAthleteActivities(tokens.accessToken, TDF_START);
    const rides = activities.filter((a) => isCyclingActivity(a.type));

    const totalDistance = rides.reduce((sum, a) => sum + metersToKm(a.distance), 0);
    const totalElevation = rides.reduce((sum, a) => sum + a.total_elevation_gain, 0);

    const user = await getSessionUser();
    if (user) {
      await updateStravaLastSync(user.id);
    }

    return NextResponse.json({
      synced: true,
      activityCount: rides.length,
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalElevation: Math.round(totalElevation),
      activities: rides.map((a) => ({
        id: a.id,
        name: a.name,
        distance: metersToKm(a.distance),
        elevation: Math.round(a.total_elevation_gain),
        date: a.start_date,
        type: a.type,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to sync Strava activities" }, { status: 500 });
  }
}