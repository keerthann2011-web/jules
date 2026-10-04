import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    try {
      const hasSeenLoader = sessionStorage.getItem('oasis_loader_seen');
      if (hasSeenLoader) {
        setIsVisible(false);
        return;
      }
    } catch (e) {
      // Ignore sessionStorage errors
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('oasis_loader_seen', 'true');
      } catch (e) {}
    }, 2500);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-inverse-surface flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="relative w-24 h-32">
          {/* Glass outline */}
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 140" fill="none" stroke="#f5efe0" strokeWidth="3" strokeLinejoin="round">
            <path d="M 15 5 L 25 130 C 25 135 30 135 30 135 L 70 135 C 70 135 75 135 75 130 L 85 5" />
          </svg>

          {/* Liquid fill */}
          <motion.div
            className="absolute bottom-[5px] left-0 right-0 bg-tertiary"
            style={{ width: '100%', clipPath: 'polygon(20% 0%, 80% 0%, 75% 100%, 25% 100%)' }}
            initial={{ height: '0%' }}
            animate={{ height: '90%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {/* Foam overflow simulation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-4 bg-[#fef9ec]"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
