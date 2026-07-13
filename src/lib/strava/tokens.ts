import { cookies } from "next/headers";
import type { StravaTokens } from "@/types";

const COOKIE_NAME = "kn_strava_tokens";

export async function getStravaTokens(): Promise<StravaTokens | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StravaTokens;
  } catch {
    return null;
  }
}

export async function setStravaTokens(tokens: StravaTokens): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(tokens), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function clearStravaTokens(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}