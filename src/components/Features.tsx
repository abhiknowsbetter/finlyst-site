"use client";
import Section from '@/components/Section';
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const items = [
  { icon: '📊', title: 'All-in-one money view', desc: 'Income, expenses, cards, and investments organized in one place.' },
  { icon: '🔎', title: 'Smart insights & nudges', desc: 'Spot patterns, avoid overspending, and receive timely AI-powered tips.' },
  { icon: '💳', title: 'Credit card control', desc: 'Track dues, fees, and rewards so your card works for you.' },
  { icon: '🎯', title: 'Goals & budgets', desc: 'Set targets, get alerts, and celebrate wins.' },
  { icon: '🧭', title: 'Investment snapshot', desc: 'A clean view across assets to rebalance confidently.' },
  { icon: '🔒', title: 'Privacy first', desc: 'Your privacy is our priority. We never share your data or send spam.' },
];

export default function Features() {
  return (
    <Section id="features">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-semibold">What you’ll get</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              className="card card-hover p-5 card-3d"
              initial={{ opacity: 0, y: 12, rotateX: 2 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ y: -2, rotateX: 0.5 }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-2 text-lg">{f.icon}</div>
              <h3 className="text-[15px] font-semibold text-silver-50">{f.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-silver-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}