import { NextRequest, NextResponse } from "next/server";
import { STRAVA_AUTH_URL, STRAVA_SCOPES, getStravaConfig } from "@/lib/strava/config";
import { setStravaReturnTo } from "@/lib/strava/return-to";

export async function GET(request: NextRequest) {
  const returnTo = request.nextUrl.searchParams.get("return_to") ?? "tour-de-france";
  await setStravaReturnTo(returnTo);
  const { clientId, redirectUri, isConfigured } = getStravaConfig();

  if (!isConfigured) {
    return NextResponse.json(
      { error: "Strava is not configured. Add STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET to .env.local" },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    response_type: "code",
    approval_prompt: "auto",
    scope: STRAVA_SCOPES,
  });

  return NextResponse.redirect(`${STRAVA_AUTH_URL}?${params}`);
}