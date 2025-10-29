"use client";"use client";


import { useState } from "react";


export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      if (!supabaseUrl || !supabaseAnon) {
        throw new Error('Supabase environment variables are missing.');
      }

      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnon,
          Authorization: `Bearer ${supabaseAnon}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Failed: ${res.status} ${body}`);
      }

      setOk('Thanks for joining the waitlist!');
      setName('');
      setEmail('');
    } catch (e: any) {
      setErr(e.message || 'Could not join. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="input-metal"
        name="name"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="input-metal"
        name="email"
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn-metal-gradient"
        disabled={loading}
      >
        {loading ? 'Joining…' : 'Join'}
      </button>
      {/* Toast */}
      {(ok || err) && (
        <div className="mt-4 relative">
          <div className={`rounded-lg px-3 py-2 text-sm ${
            ok ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
               : 'bg-rose-600/20 text-rose-300 border border-rose-500/30'
          }`}>
            {ok || err}
            <button
              onClick={() => { setOk(null); setErr(null); }}
              className="absolute right-2 top-2 text-white/70 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

