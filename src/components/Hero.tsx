'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import useParallax from '@/lib/useParallax';


export default function Hero() {
  const parallaxY = useParallax(0, 0.25); // 0.25 = parallax strength

  return (
    <header className="section-py container-mx relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-5xl text-center perspective-1000"
      >
        <div className="relative mx-auto mb-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ rotateX: 6, rotateY: -6, scale: 0.98 }}
            whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 1.1 }}
            className="card-3d"
            style={{ y: parallaxY }}
          >
            <Image
              src="/LOGO.png"
              alt="Finlyst logo"
              width={320}
              height={320}
              priority
            />
          </motion.div>
        </div>

        <Reveal>
          <p className="text-[12px] tracking-[0.2em] text-silver-300 uppercase mt-2 mb-1">
            Personal Finance, Refined
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-3 text-[44px] sm:text-[60px] md:text-[68px] font-semibold leading-tight accent-silver title-soft-glow sheen">
            Finlyst – Coming Soon
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-silver-300">
            Track, Spend, Grow — a smarter way to master your money.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-3xl text-silver-400">
            Finlyst is your intelligent money companion — blending powerful analytics, seamless card management,
            and AI-driven insights in a refined, modern experience.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="badge">🎁 6 months of Finlyst Pro — free</span>
            <span className="badge">⚡ Priority access for first 500 users 🎁</span>
          </div>
        </Reveal>
      </motion.div>
    </header>
  );
}