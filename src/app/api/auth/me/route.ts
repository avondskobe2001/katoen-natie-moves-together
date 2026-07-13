import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/profile";
import { getStravaConnectionForCurrentUser } from "@/lib/strava/connections";

export async function GET() {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const strava = await getStravaConnectionForCurrentUser();

  return NextResponse.json({
    authenticated: true,
    profile: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      terminal: profile.terminal,
      approvalStatus: profile.approvalStatus,
      emailType: profile.emailType,
      isAdmin: profile.isAdmin,
      stravaConnected: Boolean(strava),
    },
  });
}