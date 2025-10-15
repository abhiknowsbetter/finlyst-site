'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type RevealProps<C extends React.ElementType = 'div'> = {
  as?: C;
  delay?: number;
  amount?: number; // how much of element must be visible
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children'>;

export default function Reveal<C extends React.ElementType = 'div'>({
  as,
  delay = 0,
  amount = 0.2,
  className = '',
  children,
  ...rest
}: RevealProps<C>) {
  const Component = (as || 'div') as React.ElementType;
  return (
    <Component className={className} {...rest}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
