declare global {
  interface Window {
    analytics?: {
      track?: (event: string, props?: Record<string, any>) => void;
    };
  }
}

"use client";
"use client";
declare global {
  interface Window {
    analytics?: {
      track?: (event: string, props?: Record<string, any>) => void;
    };
  }
}
// Example: joinWaitlist using supabase-js
// import { supabase } from "@/lib/supabaseClient";
// async function joinWaitlist() {
//   const { data, error } = await supabase
//     .from('waitlist')
//     .insert([{ email: 'test@example.com', name: 'Abhi' }]);
//   if (error) console.error('waitlist error', error);
//   else console.log('ok', data);
// }
declare global {
  interface Window {
    analytics?: {
      track?: (event: string, props?: Record<string, any>) => void;
    };
  }
}

import { useState, useEffect } from "react";



export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(500);
  const [eligible, setEligible] = useState(false);

  // Fetch remaining spots
  useEffect(() => {
    fetch('/api/waitlist/remaining')
      .then(r => r.json())
      .then(d => {
        if (typeof d.remaining === 'number') setRemaining(d.remaining);
        if (typeof d.remaining === 'number') setRemaining(d.remaining);
      })
      .catch(() => setRemaining(500));
  }, [ok]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    // Client-side validation
    if (!name.trim()) {
      setErr('Name is required.');
      setLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // POST to API endpoint
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, tags: ['first500'] })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Could not join.');
      setOk("You're in! 🎉 You've reserved a spot in the first 500 — we'll email you the premium activation when we launch.");
      setEligible(true);
      setName('');
      setEmail('');
      // Analytics event
      if (window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track('waitlist_signup', { promo: 'first500', source: 'landing', email });
      } else {
        console.log('analytics.track', { promo: 'first500', source: 'landing', email });
      }
    } catch (e: any) {
      setErr(e.message || 'Could not join. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 p-6 rounded-xl bg-silver-900/70 border border-silver-700 shadow-lg max-w-md mx-auto" autoComplete="off">
      {/* Spots left indicator */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-emerald-400 text-sm">Spots left</span>
          <span className="font-bold text-white text-sm">{remaining}</span>
        </div>
        <div className="w-full h-2 bg-silver-800 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-500 waitlist-progress"
            style={{ width: `${Math.max(0, Math.min(remaining, 500)) / 500 * 100}%` }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="waitlist-name" className="block text-sm font-medium text-silver-200 mb-1">Name</label>
        <input
          id="waitlist-name"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          disabled={eligible}
        />
      </div>
      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-silver-200 mb-1">Email</label>
        <input
          id="waitlist-email"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          name="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={eligible}
        />
      </div>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] shadow-md transition-transform duration-200 text-lg w-full disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-accent1 hover:scale-105 hover:shadow-lg"
        disabled={loading || eligible}
  aria-busy={loading}
      >
        {/* Animated Shine on Hover */}
        <span className="absolute left-0 top-0 w-full h-full rounded-full pointer-events-none overflow-hidden">
          <span className="block w-1/3 h-full bg-white/20 blur-lg opacity-0 group-hover:opacity-80 animate-shine" />
        </span>
        {loading ? 'Joining…' : eligible ? 'Eligible — Claimed!' : 'Join Waitlist & Claim Offer'}
      </button>
      {/* Eligibility badge */}
      {eligible && (
        <div className="mt-2 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/80 to-blue-500/70 text-white font-bold text-xs shadow border border-white/10 animate-pulse">
            🎉 Eligible for 6 months FREE premium
          </span>
        </div>
      )}
      {/* Toast */}
      {(ok || err) && (
        <div className="mt-4 relative">
          <div className={`rounded-lg px-3 py-2 text-sm font-medium shadow-lg transition-colors duration-200 ${
            ok ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
               : 'bg-rose-600/20 text-rose-300 border border-rose-500/30'
          }`}>
            {ok || err}
            <button
              type="button"
              onClick={() => { setOk(null); setErr(null); }}
              className="absolute right-2 top-2 text-white/70 hover:text-white focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {/* Terms text */}
      <p className="mt-4 text-xs text-silver-400 text-center">
        Offer valid to the first 500 confirmed sign-ups. Activation & eligibility subject to verification. Terms apply.
      </p>
    </form>
  );
}

