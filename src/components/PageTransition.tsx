"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const initial = reduce ? false : { opacity: 0, y: 8 } as const;
  const animate = { opacity: 1, y: 0 } as const;
  const exit = reduce ? {} : { opacity: 0, y: -8 } as const;
  const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={initial} animate={animate} exit={exit} transition={transition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
