import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient, hasAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    await requireAdmin();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "FORBIDDEN";
    return NextResponse.json({ error: msg }, { status: msg === "UNAUTHENTICATED" ? 401 : 403 });
  }

  if (!hasAdminClient()) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY required for admin operations" },
      { status: 503 }
    );
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id, name, email, terminal, country, birth_date, created_at")
    .eq("approval_status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    users: (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      terminal: row.terminal,
      country: row.country,
      birthDate: row.birth_date,
      createdAt: row.created_at,
    })),
  });
}