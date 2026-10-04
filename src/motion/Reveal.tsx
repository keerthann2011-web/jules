import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
      default: return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div style={{ width }} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
