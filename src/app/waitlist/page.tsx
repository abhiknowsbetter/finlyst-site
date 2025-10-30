
"use client";
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ name, email }]);
      if (error) {
        if (error.message.includes('duplicate key value')) {
          throw new Error('This email is already on the waitlist.');
        }
        throw new Error(error.message);
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
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-lg">

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Join the Waitlist</h1>
        <p className="text-sm text-gray-400 mb-6">Be first to know when we launch. No spam, promise.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full rounded-lg bg-white border border-black px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="w-full rounded-lg bg-white border border-black px-3 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-2 font-medium text-black bg-gradient-to-r from-[#9BA0A6] to-[#D1D5DB] hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Joining…' : 'Join the Waitlist'}
          </button>
        </form>

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

        <p className="text-[11px] text-gray-500 mt-6">Privacy-first. We respect your privacy — no spam, ever.</p>
      </div>
    </section>
  );
}
