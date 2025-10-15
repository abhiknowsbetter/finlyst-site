'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ContactForm() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.from('contact_messages').insert({
      name: f.get('name'),
      email: f.get('email'),
      subject: f.get('subject'),
      message: f.get('message'),
    });
    setLoading(false);
    if (!error) {
      e.currentTarget.reset();
      setOk(true);
      setTimeout(() => setOk(false), 4000);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="input-metal" name="name" placeholder="Your Name" required />
      <input className="input-metal" name="email" type="email" placeholder="Your Email" required />
      <input className="input-metal" name="subject" placeholder="Subject" />
      <textarea className="input-metal" rows={5} name="message" placeholder="Your Message" required />
      <button type="submit" className="btn-metal-gradient" disabled={loading}>
        {loading ? 'Sending…' : 'Send'}
      </button>
      {ok && <p className="text-gray-200">Thanks! Your message has been sent.</p>}
    </form>
  );
}
