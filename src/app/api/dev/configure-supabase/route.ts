import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { writeEnvLocal } from "@/lib/env/write-env";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const body = await request.json();
  const url = body.url?.trim();
  const anonKey = body.anonKey?.trim();
  const serviceKey = body.serviceKey?.trim();
  const adminEmails = body.adminEmails?.trim();

  if (!url || !anonKey) {
    return NextResponse.json({ error: "URL and anon key are required" }, { status: 400 });
  }

  if (!url.includes("supabase.co") && !url.includes("localhost")) {
    return NextResponse.json({ error: "Invalid Supabase URL" }, { status: 400 });
  }

  if (!anonKey.startsWith("eyJ")) {
    return NextResponse.json({ error: "Anon key should start with eyJ..." }, { status: 400 });
  }

  const testClient = createClient(url, anonKey);
  const { error } = await testClient.from("profiles").select("id").limit(1);
  if (error && !error.message.includes("does not exist") && error.code !== "PGRST116") {
    if (error.message.includes("Invalid API key") || error.message.includes("JWT")) {
      return NextResponse.json({ error: "Invalid anon key for this project" }, { status: 400 });
    }
  }

  writeEnvLocal({
    NEXT_PUBLIC_SUPABASE_URL: url,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
    ...(serviceKey ? { SUPABASE_SERVICE_ROLE_KEY: serviceKey } : {}),
    ...(adminEmails ? { ADMIN_EMAILS: adminEmails } : {}),
  });

  return NextResponse.json({
    success: true,
    message: "Credentials saved to .env.local. Restart the dev server (Ctrl+C then npm run dev).",
  });
}