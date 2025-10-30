// src/components/WaitlistForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  // optional prop if you want to show a small message after join
  successMessage?: string;
};

export default function WaitlistForm({ successMessage }: Props) {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const res = await fetch("/api/waitlist/remaining");
        const data = await res.json();
        setSpotsLeft(data.remaining);
      } catch {
        setSpotsLeft(null);
      }
    }
    fetchSpots();
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  useEffect(() => {
    // reset message when user edits inputs
    if (resultMsg) {
      const t = setTimeout(() => setResultMsg(null), 5000);
      return () => clearTimeout(t);
    }
  }, [resultMsg]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResultMsg(null);

    if (!name.trim()) {
      setResultMsg("Please enter your name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setResultMsg("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const { data: _data, error } = await supabase
        .from("waitlist")
        .insert([
          {
            email: email.trim(),
            name: name.trim() || null
          },
        ]);

      if (error) {
        setResultMsg(`Failed: ${error.message}`);
      } else {
        setResultMsg(
          successMessage ||
          "Thank you for joining the waitlist! You will be notified and receive your activation code when the app launches."
        );
        setEmail("");
        setName("");
      }
    } catch (err: any) {
      setResultMsg("Network error — please try again later.");
      console.error("waitlist submit error", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-xl bg-silver-900/70 border border-silver-700 shadow-lg max-w-md mx-auto">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500/90 to-blue-500/80 text-white font-bold text-sm shadow-lg border border-white/10 animate-pulse">
            🎉 First 500 — 6 months FREE premium
          </span>
        </div>
        {spotsLeft !== null && (
          <div className="mb-2 text-center text-base font-semibold text-emerald-400">
            Spots remaining: {spotsLeft}
            <div className="w-full h-2 mt-2 bg-silver-800/60 rounded-full border border-silver-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-700"
                style={{ ['--bar-width' as any]: `${(spotsLeft / 500) * 100}%`, width: 'var(--bar-width)' }}
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="waitlist-name" className="block text-sm font-medium text-silver-200 mb-1">Name</label>
          <input
            id="waitlist-name"
            className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-silver-200 mb-1">Email</label>
        <input
          id="waitlist-email"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] shadow-md hover:scale-[1.01] transition-transform text-lg w-full disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-accent1"
        disabled={loading}
  aria-busy={loading ? "true" : "false"}
      >
        {loading ? "Joining…" : "Join the waitlist"}
      </button>

      {resultMsg && (
        <div className="mt-4 text-green-400 text-center font-semibold animate-fade-in">
          {resultMsg}
        </div>
      )}
      </form>
    </>
  );
}