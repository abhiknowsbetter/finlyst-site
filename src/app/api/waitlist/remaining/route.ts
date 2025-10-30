export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const MAX_SPOTS = 500;

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Missing Supabase config.' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { count, error } = await supabase.from('waitlist').select('*', { count: 'exact', head: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ remaining: MAX_SPOTS - (count ?? 0) });
}
