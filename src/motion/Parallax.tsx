import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 1 is normal scroll, < 1 is slower, > 1 is faster
  className?: string;
  yOffset?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.5, className = '', yOffset = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!containerRef.current || !targetRef.current) return;

    const target = targetRef.current;

    gsap.fromTo(target,
      { y: -yOffset * speed },
      {
        y: yOffset * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) {
          t.kill();
        }
      });
    };
  }, [speed, yOffset]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};
