import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/strava/api";
import { setStravaTokens } from "@/lib/strava/tokens";
import { getStravaReturnTo } from "@/lib/strava/return-to";
import { getSessionUser } from "@/lib/auth/profile";
import { saveStravaConnection } from "@/lib/strava/connections";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const returnPath = await getStravaReturnTo();
  const errorPath = returnPath.includes("account")
    ? "/account?strava=error"
    : "/tour-de-france?strava=error";

  if (error || !code) {
    return NextResponse.redirect(new URL(errorPath, request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const user = await getSessionUser();

    if (user) {
      await saveStravaConnection(user.id, tokens);
    } else {
      await setStravaTokens(tokens);
    }

    return NextResponse.redirect(new URL(returnPath, request.url));
  } catch {
    return NextResponse.redirect(new URL(errorPath, request.url));
  }
}