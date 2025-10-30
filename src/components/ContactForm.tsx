'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';



export default function ContactForm() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const client = supabase;
    if (!client) {
      setLoading(false);
      return;
    }
    const f = new FormData(e.currentTarget);
    const { error } = await client.from('contact_messages').insert({
      name: f.get('name'),
      email: f.get('email'),
      subject: f.get('subject'),
      message: f.get('message'),
    });
    setLoading(false);
    if (!error) {
      if (e.currentTarget) {
        e.currentTarget.reset();
      }
      setOk(true);
      setTimeout(() => setOk(false), 4000);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 p-6 rounded-xl bg-silver-900/70 border border-silver-700 shadow-lg max-w-md mx-auto">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-silver-200 mb-1">Name</label>
        <input
          id="contact-name"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          name="name"
          placeholder="Your Name"
          required
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-silver-200 mb-1">Email</label>
        <input
          id="contact-email"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          name="email"
          type="email"
          placeholder="Your Email"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-silver-200 mb-1">Subject</label>
        <select
          id="contact-subject"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          name="subject"
          defaultValue="General"
        >
          <option value="General">General</option>
          <option value="Feedback">Feedback</option>
          <option value="Support">Support</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-silver-200 mb-1">Message</label>
        <textarea
          id="contact-message"
          className="input-metal w-full px-4 py-2 rounded-lg bg-silver-800/80 border border-silver-700 focus:ring-accent1 focus:border-accent1"
          rows={5}
          name="message"
          placeholder="Your Message"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] shadow-md hover:scale-[1.01] transition-transform text-lg w-full disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-accent1"
        disabled={loading}
        aria-busy={loading ? 'true' : 'false'}
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>
  // Removed unused ok state
    </form>
  );
}
