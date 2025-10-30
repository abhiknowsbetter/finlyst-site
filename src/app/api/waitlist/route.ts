export const runtime = 'edge';

import { NextResponse } from "next/server";

type Body = {
  email?: string;
  name?: string | null;
  tags?: string[] | null;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    const email = (body.email || "").trim();
    const name = body.name ? String(body.name).trim() : null;
    const tags = Array.isArray(body.tags) ? body.tags : [];

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing SUPABASE env in server");
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
    }

    // Use the REST endpoint to insert server-side with the service_role key
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // use service role key on server only (bypasses RLS)
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        // return inserted row
        "Prefer": "return=representation",
      },
      body: JSON.stringify({ email, name, tags }),
    });

    const text = await insertRes.text();
    let json: any = null;
  try { json = JSON.parse(text); } catch { json = text; }

    if (!insertRes.ok) {
      console.error("Supabase insert failed", insertRes.status, json);
      // If RLS triggers, you'll see 42501 here; if key wrong -> 401
      return NextResponse.json({ ok: false, supabase_status: insertRes.status, result: json }, { status: 500 });
    }

    // success — json should be the inserted row(s)
    return NextResponse.json({ ok: true, inserted: json }, { status: 201 });
  } catch (err: any) {
    console.error("waitlist route error:", err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
