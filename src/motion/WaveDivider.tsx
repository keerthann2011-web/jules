import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WaveDividerProps {
  fill?: string;
  className?: string;
  flip?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ fill = '#f2eee1', className = '', flip = false }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!pathRef.current || !containerRef.current) return;

    // A sinusoidal wave animation
    // The "d" attributes must have matching numbers of points to animate cleanly.
    // We will do a simple y transform on scroll.

    gsap.fromTo(containerRef.current,
      { y: 0 },
      {
        y: flip ? 20 : -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, [flip]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`} style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg viewBox="0 0 1440 100" className="w-full h-auto block" preserveAspectRatio="none">
        <path
          ref={pathRef}
          fill={fill}
          d="M0,50 C320,100 420,0 720,50 C1020,100 1120,0 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
};
