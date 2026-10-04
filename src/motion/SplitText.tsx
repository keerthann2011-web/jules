import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ children, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word');

    if (prefersReducedMotion) {
      gsap.set(words, { y: 0, opacity: 1 });
      return;
    }

    gsap.set(words, { y: '100%', opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          delay,
        });
      },
      once: true
    });
  }, [delay]);

  // Split text by words and wrap in spans
  const words = children.split(' ').map((word, index) => (
    <span key={index} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
      <span className="word inline-block">{word}</span>
      {index < children.split(' ').length - 1 && '\u00A0'}
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {words}
    </div>
  );
};
