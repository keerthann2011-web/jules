import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const REVIEWS = [
  { id: 1, text: "The wood-fired pizzas paired with the Courtyard Pale Ale are incredible. Love the poolside vibe.", author: "Rohan D." },
  { id: 2, text: "Best microbrewery in Whitefield. The staff is so polite and the outdoor seating under the trees is tranquil.", author: "Priya S." },
  { id: 3, text: "Even their mocktails are fantastic! A great place for team lunches or a relaxed weekend evening.", author: "Arjun K." },
  { id: 4, text: "That Malai Chicken Tikka Platter is a must-have. Fast service, great ambience.", author: "Neha M." },
  { id: 5, text: "Perfect escape from the city traffic. You feel like you're in a resort.", author: "Vikram P." }
];

const TAGS = ["Ambiance", "Polite Staff", "Outdoor Seating", "Poolside", "Mocktails", "Craft Beer", "Wood-fired", "Quick Service"];

export const ReviewsCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isInView) {
      if (prefersReducedMotion) {
        setRating(4.7);
        setCount(5058);
        return;
      }

      // Count up animation
      let startTimestamp: number;
      const duration = 2000;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        setRating(Number((ease * 4.7).toFixed(1)));
        setCount(Math.floor(ease * 5058));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setRating(4.7);
          setCount(5058);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} id="reviews" className="py-space-2xl bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-col md:flex-row gap-8 justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-on-surface mb-2">Guest Experiences</h2>
          <p className="font-body-lg text-on-surface-variant max-w-lg">
            See what our guests love about their time at Oasis.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30">
          <div className="text-right">
            <div className="font-display-hero-mobile text-on-surface leading-none mb-1">{rating}</div>
            <div className="font-label-sm text-on-surface-variant uppercase tracking-wider">From {count.toLocaleString()} reviews</div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star, i) => (
              <span key={i} className={`material-symbols-outlined text-[28px] ${star <= Math.round(rating) ? 'text-tertiary-fixed-dim' : 'text-outline-variant/30'}`}>
                star
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div className="pl-6 lg:pl-12 pb-8">
        <motion.div
          className="flex gap-6 cursor-grab active:cursor-grabbing drag-element"
          drag="x"
          dragConstraints={{ right: 0, left: -((REVIEWS.length * 340) - window.innerWidth + 48) }}
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              className="min-w-[300px] w-[300px] md:min-w-[340px] md:w-[340px] bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">star</span>
                ))}
              </div>
              <p className="font-body-md text-on-surface italic mb-6">"{review.text}"</p>
              <p className="font-label-md text-on-surface-variant">— {review.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tags Marquee */}
      <div className="mt-8 border-y border-outline-variant/20 py-4 overflow-hidden relative bg-surface-container">
        {/* Gradients for fade out edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
           {[...TAGS, ...TAGS].map((tag, i) => (
             <span key={i} className="font-label-md text-on-surface-variant px-6 border-r border-outline-variant/30 last:border-0 whitespace-nowrap">
               {tag}
             </span>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
