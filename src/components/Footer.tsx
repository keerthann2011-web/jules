import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const cheersRef = useRef<HTMLHeadingElement>(null);
  const clinkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cheersRef.current) return;

    const chars = cheersRef.current.innerText.split('').map((char) => {
      return `<span class="inline-block cheers-char">${char === ' ' ? '&nbsp;' : char}</span>`;
    });
    cheersRef.current.innerHTML = chars.join('');

    const elements = cheersRef.current.querySelectorAll('.cheers-char');

    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cheersRef.current,
          start: 'top 90%',
        }
      }
    );

    // Wobble hover
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -10,
          rotation: Math.random() * 20 - 10,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      });
    });

  }, []);

  const handleClink = () => {
    if (clinkRef.current) {
      gsap.fromTo(clinkRef.current,
        { rotation: -15, scale: 0.8 },
        { rotation: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
    }
  };

  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-2xl pb-space-xl">

        {/* Giant Cheers Wordmark */}
        <div className="mb-16 flex justify-center">
          <h2 ref={cheersRef} className="font-display-hero text-[80px] lg:text-[140px] text-tertiary-fixed/90 tracking-tighter cursor-default">
            Cheers.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-2xl">
          <div className="space-y-space-md">
            <div className="flex items-center gap-3">
              <span className="font-headline-sm text-inverse-on-surface tracking-tight">Oasis Brewery</span>
            </div>
            <p className="font-body-sm text-outline-variant max-w-xs">
              Craft microbrewery & botanical courtyard dining in the heart of Whitefield's tech corridor.
            </p>
          </div>

          <div>
            <h4 className="font-title-lg text-tertiary-fixed mb-space-md">Quick Links</h4>
            <ul className="space-y-space-sm flex flex-col">
              <Link to="/menu" className="font-body-md text-outline-variant hover:text-inverse-on-surface transition-colors">Seasonal Tap List</Link>
              <Link to="/#about" className="font-body-md text-outline-variant hover:text-inverse-on-surface transition-colors">Our Story & Philosophy</Link>
              <Link to="/#reviews" className="font-body-md text-outline-variant hover:text-inverse-on-surface transition-colors">Guest Experiences</Link>
              <Link to="/#visit" className="font-body-md text-outline-variant hover:text-inverse-on-surface transition-colors">Location & Hours</Link>
            </ul>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-title-lg text-tertiary-fixed">Contact</h4>
            <div className="space-y-space-sm">
              <p className="font-body-sm text-outline-variant leading-relaxed">
                Sy No. 26, Plot No 1A & 2B, Whitefield Main Road, Bengaluru, Karnataka 560048
              </p>
              <a className="font-body-md block text-outline-variant hover:text-inverse-on-surface transition-colors" href="tel:08045888939">080 4588 8939</a>
            </div>
          </div>

          <div className="space-y-space-md">
            <h4 className="font-title-lg text-tertiary-fixed">Hours</h4>
            <div className="space-y-space-sm">
              <p className="font-body-sm text-outline-variant">Every Day: 12:00 PM – 1:00 AM</p>

              <button
                onMouseEnter={handleClink}
                className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 hover:bg-surface-variant/10 transition-colors group"
              >
                <span className="font-title-md text-inverse-on-surface group-hover:text-tertiary-fixed transition-colors">Reserve a Table</span>
                <span ref={clinkRef} className="material-symbols-outlined text-[20px] text-tertiary-fixed origin-bottom">sports_bar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-space-lg border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-outline-variant">© Oasis Brewery. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/#TODO-privacy" className="font-body-sm text-outline-variant hover:text-inverse-on-surface transition-colors">Privacy Policy</Link>
            <Link to="/#TODO-terms" className="font-body-sm text-outline-variant hover:text-inverse-on-surface transition-colors">Terms of Service</Link>
            <Link to="/#TODO-drink" className="font-body-sm text-outline-variant hover:text-inverse-on-surface transition-colors">Drink Responsibly</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
