import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
	const missing = [
		!supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : null,
		!supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : null,
	].filter(Boolean);
	const msg = `Missing Supabase env var(s): ${missing.join(', ')}. Set them in .env.local`;
	// Fail fast in dev to avoid confusing runtime errors
	throw new Error(msg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);