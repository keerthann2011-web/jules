import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from '../motion/SplitText';
import { Parallax } from '../motion/Parallax';

interface HeroProps {
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse hover subtle parallax on the background
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!bgRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-secondary">
      {/* Background with subtle mouse parallax & scroll parallax */}
      <Parallax speed={0.3} className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          ref={bgRef}
          className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AEOx6G2Aow01z4hM_r6p6J_gE9nE5R8Q4gq5uD3j2T8K8H2k3k_oX8V5L4N3k9M4lP3s6v7b_J1W2Y4A5T9H6V2Y9L3W_J5D_H9Q2K1T_L2T_X7')` }} // Placeholder, we'll need to verify this URL later or use a generic one if broken.
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-secondary/60"></div>

          {/* Particles/Bubbles Simulation (CSS-based for performance) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
             {/* We can add a few floating divs here for bubbles if desired, but keeping it light */}
             <div className="w-4 h-4 rounded-full bg-white absolute bottom-10 left-[20%] animate-ping" style={{ animationDuration: '4s' }}></div>
             <div className="w-2 h-2 rounded-full bg-white absolute bottom-20 left-[60%] animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
          </div>
        </div>
      </Parallax>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <div className="mb-6 flex justify-center">
          <div className="px-4 py-1.5 rounded-full border border-inverse-primary/30 backdrop-blur-md bg-inverse-surface/40">
            <span className="font-label-md text-inverse-primary uppercase tracking-widest">Whitefield, Bengaluru</span>
          </div>
        </div>

        <h1 className="font-display-hero text-on-secondary mb-8 leading-tight">
          <SplitText delay={0.5}>Botanical Tranquility Meets</SplitText><br/>
          <SplitText delay={0.7}>Masterful Craft Brewing.</SplitText>
        </h1>

        <p className="font-body-lg text-inverse-on-surface max-w-2xl mx-auto mb-10 opacity-90">
          Escape the city pace. Discover small-batch beers, wood-fired plates, and
          unhurried afternoons by the poolside courtyard.
        </p>

        <button
          onClick={onReserveClick}
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-title-lg shadow-xl overflow-hidden"
        >
          <span className="relative z-10 transition-colors group-hover:text-tertiary">Book a Table or Cabana</span>
          <div className="absolute inset-0 bg-surface-container translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-inverse-on-surface/70">
        <span className="font-label-sm uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-inverse-on-surface/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-inverse-on-surface animate-[slideDown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};
