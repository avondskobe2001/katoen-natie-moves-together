import { NextResponse } from "next/server";
import { clearStravaTokens } from "@/lib/strava/tokens";
import { deleteStravaConnection } from "@/lib/strava/connections";
import { getSessionUser } from "@/lib/auth/profile";

export async function POST() {
  const user = await getSessionUser();
  if (user) {
    await deleteStravaConnection(user.id);
  }
  await clearStravaTokens();
  return NextResponse.json({ disconnected: true });
}