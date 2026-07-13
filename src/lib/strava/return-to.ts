import { cookies } from "next/headers";

const COOKIE_NAME = "kn_strava_return_to";

export async function setStravaReturnTo(path: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, path, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });
}

export async function getStravaReturnTo(): Promise<string> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  cookieStore.delete(COOKIE_NAME);

  if (value === "account") return "/account?strava=connected";
  return "/tour-de-france?strava=connected";
}