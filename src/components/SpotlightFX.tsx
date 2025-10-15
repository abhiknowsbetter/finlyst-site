"use client";
import { useEffect } from "react";

/**
 * SpotlightFX attaches scroll listeners to animate CSS vars used by .spotlight.
 * It renders the backdrop element and updates --mx/--my based on scroll progress.
 */
export default function SpotlightFX() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let baseX = 50; // from scroll
    let baseY = 28; // from scroll
    let mouseX = 0.5; // 0..1
    let mouseY = 0.35; // 0..1

    const apply = () => {
      const dx = prefersReduced ? 0 : (mouseX - 0.5) * 8; // up to ±8%
      const dy = prefersReduced ? 0 : (mouseY - 0.5) * 6; // up to ±6%
      const mx = baseX + dx;
      const my = baseY + dy;
      document.documentElement.style.setProperty('--mx', mx.toFixed(2) + '%');
      document.documentElement.style.setProperty('--my', my.toFixed(2) + '%');
    };

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      baseY = 28 + p * 40; // 28% → 68%
      baseX = 50 + Math.sin(p * Math.PI * 2) * 6; // 44% ↔ 56%
      apply();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      apply();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
