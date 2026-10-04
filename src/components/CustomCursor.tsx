import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Disable on mobile or touch devices
    if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    // Interactive elements hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setCursorVariant('interactive');
        setCursorText('');
      } else if (target.closest('.drag-element')) {
        setCursorVariant('text');
        setCursorText('Drag');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: '2px solid rgba(74, 90, 43, 0.5)', // primary/50
    },
    interactive: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(74, 90, 43, 0.1)',
      border: '1px solid rgba(74, 90, 43, 0.8)',
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: 64,
      height: 64,
      backgroundColor: '#f5efe0',
      border: 'none',
      color: '#2b2a22',
      mixBlendMode: 'normal' as const
    }
  };

  // Hide entirely if mobile or reduced motion
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center font-label-sm uppercase tracking-wider backdrop-blur-[2px]"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      <span className="opacity-80">{cursorText}</span>
    </motion.div>
  );
};
