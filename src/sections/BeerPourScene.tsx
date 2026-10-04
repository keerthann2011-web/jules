import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BEERS = [
  { id: 'pale', name: 'Courtyard Pale Ale', color: '#e5b158', notes: 'CITRUS / FLORAL / 5.2% ABV' },
  { id: 'wheat', name: 'Botanical Witbier', color: '#f2c36c', notes: 'ORANGE PEEL / CORIANDER / 4.8% ABV' },
  { id: 'amber', name: 'Sunset Amber', color: '#b26533', notes: 'CARAMEL / TOASTED MALT / 6.0% ABV' },
  { id: 'stout', name: 'Midnight Stout', color: '#2a1a11', notes: 'COFFEE / DARK CHOCOLATE / 7.2% ABV' }
];

export const BeerPourScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const foamRef = useRef<SVGRectElement>(null);
  const [activeBeerIndex, setActiveBeerIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !liquidRef.current) return;

    // Pin the scene and scrub the pour
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Liquid rises
        gsap.set(liquidRef.current, {
          scaleY: progress,
          transformOrigin: 'bottom'
        });

        // Foam rises with liquid
        gsap.set(foamRef.current, {
          y: -progress * 150, // Arbitrary height adjustment based on SVG scale
          opacity: progress > 0.1 ? 1 : 0
        });

        // Change beer color based on progress sections (4 beers)
        const newIndex = Math.min(Math.floor(progress * BEERS.length), BEERS.length - 1);
        if (newIndex !== activeBeerIndex) {
          setActiveBeerIndex(newIndex);
          gsap.to(liquidRef.current, { fill: BEERS[newIndex].color, duration: 0.3 });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [activeBeerIndex]);

  return (
    <section ref={containerRef} className="h-screen w-full bg-surface-container-lowest flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* Left: Animated Text */}
        <div className="space-y-6">
          <h2 className="font-headline-sm text-primary tracking-widest uppercase">The Tap List</h2>
          <div className="h-32 relative">
            {BEERS.map((beer, i) => (
              <div
                key={beer.id}
                className={`absolute inset-0 transition-all duration-500 transform ${i === activeBeerIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h3 className="font-display-hero-mobile text-on-surface mb-2">{beer.name}</h3>
                <span className="font-label-md text-surface-tint border border-outline-variant px-3 py-1 rounded-full">
                  {beer.notes}
                </span>
              </div>
            ))}
          </div>
          <p className="font-body-lg text-on-surface-variant max-w-md">
            Small batches, brewed on-site. Watch our signature styles develop from bright ales to deep, roasted stouts.
          </p>
        </div>

        {/* Right: The Glass */}
        <div className="flex justify-center items-end h-[500px]">
          <svg viewBox="0 0 200 400" className="w-[200px] h-auto drop-shadow-2xl">
            <defs>
              <clipPath id="glass-clip">
                <path d="M 30 10 L 50 380 C 50 390 60 390 60 390 L 140 390 C 140 390 150 390 150 380 L 170 10 Z" />
              </clipPath>
            </defs>

            {/* The liquid and foam inside the clip path */}
            <g clipPath="url(#glass-clip)">
              {/* Background of empty glass */}
              <rect x="0" y="0" width="200" height="400" fill="rgba(255,255,255,0.1)" />

              {/* The Liquid */}
              <path
                ref={liquidRef}
                d="M 30 10 L 50 380 C 50 390 60 390 60 390 L 140 390 C 140 390 150 390 150 380 L 170 10 Z"
                fill="#e5b158"
              />

              {/* The Foam */}
              <rect
                ref={foamRef}
                x="30" y="380" width="140" height="20" fill="#fef9ec" opacity="0"
              />
            </g>

            {/* Glass Outline / Shine */}
            <path d="M 30 10 L 50 380 C 50 390 60 390 60 390 L 140 390 C 140 390 150 390 150 380 L 170 10" fill="none" stroke="#e6e2d6" strokeWidth="4" strokeLinejoin="round" />

            {/* Highlights */}
            <path d="M 40 20 L 55 350" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 160 20 L 145 200" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </section>
  );
};
