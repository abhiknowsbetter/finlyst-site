'use client';

import { useState } from 'react';

export const runtime = 'edge';

const FORMSPREE_ACTION = 'https://formspree.io/f/xqaywgdp'; // <-- Formspree form action

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Contact Us</h1>
        <p className="text-sm text-gray-400 mb-6">We usually reply within 24–48 hours.</p>

        <form
          action={FORMSPREE_ACTION}
          method="POST"
          onSubmit={() => setSent(true)}
          className="grid grid-cols-1 gap-4"
        >
          <input type="hidden" name="_subject" value="Finlyst – Contact Form" />
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Subject</label>
            <input
              name="subject"
              placeholder="How can we help?"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us a bit more…"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* success toast */}
          {sent && (
            <div className="rounded-lg px-3 py-2 text-sm bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 relative">
              An email has been sent. You will receive a reply within 24–48 hours.
              <button
                type="button"
                onClick={() => setSent(false)}
                className="absolute right-2 top-2 text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg py-2 font-medium text-black bg-gradient-to-r from-[#9BA0A6] to-[#D1D5DB] hover:opacity-95"
          >
            Send
          </button>
        </form>

        <p className="text-[11px] text-gray-500 mt-6">Or email us at <span className="text-gray-300">support@finlystapp.com</span></p>
      </div>
    </section>
  );
}
