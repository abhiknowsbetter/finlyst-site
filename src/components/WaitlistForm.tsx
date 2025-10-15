'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { X } from 'lucide-react';

export default function WaitlistForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function onJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(formRef.current!);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();

    const { error } = await supabase.from("waitlist").insert({ name, email });
    setLoading(false);
    if (!error) {
      formRef.current?.reset();
      setShowMessage(true); // your success toast
      return;
    }

    // Treat duplicate as success so users aren't blocked
    const isDup =
      (error as any)?.code === "23505" ||
      (error.message && error.message.toLowerCase().includes("duplicate"));

    if (isDup) {
      setShowMessage(true);
      return;
    }

    console.error("Waitlist insert error:", error);
    alert("Could not join. Please try again.");
  }

  useEffect(() => {
    if (!showMessage) return;
    const t = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(t);
  }, [showMessage]);

  console.log('Waitlist showMessage:', showMessage);
  return (
    <form ref={formRef} onSubmit={onJoin} className="space-y-3">
      <input className="input-metal" name="name" placeholder="Your Name" required />
      <input className="input-metal" name="email" type="email" placeholder="Your Email" required />
      <button type="submit" className="btn-metal-gradient" disabled={loading}>
        {loading ? 'Joining…' : 'Join the Waitlist'}
      </button>
      {showMessage && (
        <div>
          {/* Modal Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" aria-hidden="true" />
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="relative w-full max-w-md rounded-lg border-2 border-emerald-400 bg-gradient-to-r from-white/10 to-white/[0.05] p-6 text-center text-gray-100 shadow-lg animate-fade-in"
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setShowMessage(false)}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <p className="font-medium text-lg mb-1" role="status" aria-live="polite">✅ Thanks for joining the Finlyst waitlist!</p>
              <p className="text-sm text-gray-400">
                You’re officially on our early-access list — we’ll notify you when we launch.
              </p>
            </div>
          </div>
        </div>
      )}


    </form>
  );
