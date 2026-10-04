import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // pixels per second roughly
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ children, speed = 50, pauseOnHover = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!containerRef.current || !trackRef.current) return;

    // Clone children to create infinite loop
    const track = trackRef.current;
    const items = Array.from(track.children);

    // Duplicate enough times to fill screen twice
    items.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Calculate duration based on width and speed
    const trackWidth = track.scrollWidth / 2;
    const duration = trackWidth / speed;

    tweenRef.current = gsap.to(track, {
      x: -trackWidth,
      ease: 'none',
      duration: duration,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
      }
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap w-full flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex gap-8 w-max">
        {children}
      </div>
    </div>
  );
};
