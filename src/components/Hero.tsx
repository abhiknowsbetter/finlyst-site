'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import useParallax from '@/lib/useParallax';


export default function Hero() {
  const parallaxY = useParallax(0, 0.25); // 0.25 = parallax strength

    return (
      <header className="pt-12 pb-20 container-mx relative">
        {/* Offer Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500/90 to-blue-500/80 text-white font-bold text-sm shadow-lg border border-white/10 animate-pulse">
            🎉 First 500 — 6 months FREE premium
          </span>
        </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-5xl text-center perspective-1000"
      >
        <div className="relative mx-auto mb-0 flex flex-col items-center justify-center">
          {/* Animated Glow Behind Logo */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 top-0 mx-auto h-[220px] w-[220px] rounded-full bg-gradient-to-br from-accent1/40 to-accent2/30 blur-2xl opacity-60 animate-pulse z-0"
          />
          <motion.div
            initial={{ rotateX: 6, rotateY: -6, scale: 0.92 }}
            whileHover={{ rotateX: 0, rotateY: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 1.1 }}
            className="card-3d relative z-10"
            style={{ y: parallaxY }}
          >
            <Image
              src="/LOGO.png"
              alt="Finlyst logo: metallic F in blue gradient circle"
              width={180}
              height={180}
              priority
            />
          </motion.div>
        </div>

        <Reveal>
          <p className="text-[12px] tracking-[0.2em] text-silver-300 uppercase mt-2 mb-1">
            Spend. Track. Grow.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-3 text-[40px] sm:text-[54px] md:text-[62px] font-extrabold leading-tight accent-silver title-soft-glow sheen text-center">
            Finlyst — Coming Soon
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl text-silver-300 font-medium text-center">
            Your all-in-one money companion. Smarter insights. Effortless control.<br />
            <span className="block mt-1 text-silver-400 text-base">Built for peace of mind.</span>
            <span className="block mt-2 text-emerald-400 font-semibold text-base">Join the first 500 users to get 6 months of Finlyst Premium — free.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              className="relative inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] shadow-md hover:scale-[1.01] transition-transform text-lg"
              onClick={() => {
                const el = document.getElementById('waitlist');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              {/* CTA Glow */}
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-accent1/30 blur-lg opacity-40 animate-pulse -z-10" />
              🚀 Join Waitlist & Claim Offer
            </button>
            <button
              className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-accent1 border border-accent1 bg-transparent shadow hover:scale-[1.01] transition-transform text-lg"
              onClick={() => {
                const el = document.getElementById('blog');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              Our Journal
            </button>
          </motion.div>
        </Reveal>
      </motion.div>
    </header>
  );
}