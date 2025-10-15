"use client";
import { useEffect, useMemo, useRef } from "react";

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null);
  const count = 10;
  const parts = useMemo(() => Array.from({ length: count }, (_, i) => i), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".particle"));
    let raf = 0;
    // Initialize random starting positions
    nodes.forEach((n) => {
      n.style.left = Math.random() * 100 + 'vw';
      n.style.top = Math.random() * 100 + 'vh';
    });
    const speeds = nodes.map((_, i) => 0.06 + (i % 5) * 0.02);
    const angles = nodes.map((_, i) => Math.random() * Math.PI * 2);

    const loop = () => {
      const t = performance.now() / 1000;
      nodes.forEach((n, i) => {
        const s = speeds[i];
        const a = angles[i];
        const x = 50 + Math.sin(t * s + a) * 44; // vw
        const y = 20 + ((t * s * 8 + i * 12) % 80); // vh wrap
        n.style.left = x + "vw";
        n.style.top = (y % 100) + "vh";
        n.style.opacity = String(0.12 + (Math.sin(t * s * 2 + a) + 1) * 0.12);
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="particles" aria-hidden>
      {parts.map((i) => (
        <div key={i} className="particle" data-init="1" />
      ))}
    </div>
  );
}
