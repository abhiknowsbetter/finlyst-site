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
          <h2 className="text-center text-[28px] sm:text-[36px] font-extrabold tracking-tight accent-gold title-soft-glow mb-2">
            Finlyst Features
          </h2>
          <p className="text-center text-silver-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Simplify your financial life with intuitive, intelligent tools—all in one dashboard.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              className="card card-hover p-6 card-3d bg-gradient-to-br from-silver-900/80 to-silver-800/80 border border-silver-700 shadow-lg rounded-xl transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 hover:ring-accent1 focus-within:ring-2 focus-within:ring-accent1"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.04 }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              tabIndex={0}
            >
              <div className="mb-3 flex items-center justify-center h-12">
                <span className="text-3xl sm:text-4xl accent-gold drop-shadow-lg inline-flex items-center justify-center w-10 h-10 leading-none">{f.icon}</span>
              </div>
              <h3 className="text-[17px] font-bold text-silver-50 mb-1 tracking-tight accent-gold">
                {f.title}
              </h3>
              <p className="text-[14px] leading-6 text-silver-300 mb-1">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}