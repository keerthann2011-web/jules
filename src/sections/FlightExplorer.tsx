import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLIGHTS = [
  { id: 1, name: "Orchard Sour", type: "Fruit Sour", abv: 4.2, ibu: 12, color: "#e88873", note: "Tart, Raspberry, Crisp" },
  { id: 2, name: "Botanical Wit", type: "Witbier", abv: 4.8, ibu: 15, color: "#f2c36c", note: "Orange Peel, Coriander" },
  { id: 3, name: "Courtyard Pale", type: "Pale Ale", abv: 5.2, ibu: 35, color: "#e5b158", note: "Citrus, Pine, Balanced" },
  { id: 4, name: "Oasis IPA", type: "India Pale Ale", abv: 6.5, ibu: 55, color: "#c67a3b", note: "Grapefruit, Resinous" },
  { id: 5, name: "Midnight Stout", type: "Dry Stout", abv: 7.2, ibu: 40, color: "#2a1a11", note: "Coffee, Dark Cocoa" }
];

export const FlightExplorer: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-space-2xl bg-surface-container relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-on-surface mb-4">Interactive Craft Flight</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore our signature pours. Hover or tap a glass to reveal its tasting profile.
          </p>
        </div>

        {/* Flight Board container */}
        <div className="relative bg-[#e6dabf] rounded-2xl p-8 pb-12 shadow-[0_20px_40px_rgba(43,42,34,0.1)] mx-auto max-w-5xl">
          {/* Wood grain texture overlay optional */}
          <div className="absolute inset-0 opacity-5 mix-blend-multiply pointer-events-none rounded-2xl" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Glasses Row */}
          <div className="flex justify-between items-end gap-4 overflow-x-auto pb-4 snap-x relative z-10 px-4">
            {FLIGHTS.map((flight) => {
              const isHovered = hoveredId === flight.id;

              return (
                <div
                  key={flight.id}
                  className="flex flex-col items-center gap-6 min-w-[120px] snap-center cursor-pointer group"
                  onMouseEnter={() => setHoveredId(flight.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onTouchStart={() => setHoveredId(flight.id)}
                >
                  {/* The Tasting Glass */}
                  <motion.div
                    className="relative w-24 h-32"
                    animate={{
                      y: isHovered ? -15 : 0,
                      rotate: isHovered ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Glass Shape */}
                    <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
                       <path d="M 20 5 L 30 110 C 30 115 35 115 35 115 L 65 115 C 65 115 70 115 70 110 L 80 5" fill="rgba(255,255,255,0.2)" stroke="#fff" strokeWidth="2" />
                       <path d="M 22 20 L 29 108 C 29 110 32 112 35 112 L 65 112 C 68 112 71 110 71 108 L 78 20 Z" fill={flight.color} />
                       <path d="M 25 20 L 75 20" stroke="#fef9ec" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </motion.div>

                  {/* Metadata / Info */}
                  <div className="text-center h-24">
                    <h4 className="font-title-md text-on-surface whitespace-nowrap">{flight.name}</h4>
                    <p className="font-body-sm text-on-surface-variant mb-2">{flight.type}</p>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex justify-center"
                        >
                          <span className="font-label-sm bg-surface-container-lowest text-primary px-2 py-1 rounded-full border border-outline-variant/50 shadow-sm whitespace-nowrap">
                            {flight.note}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Flight Detail Bar (ABV/IBU) */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 relative h-16">
            <AnimatePresence mode="wait">
              {hoveredId ? (() => {
                const active = FLIGHTS.find(f => f.id === hoveredId)!;
                return (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between gap-8 px-4"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between font-label-md text-on-surface mb-1">
                        <span>ABV</span>
                        <span>{active.abv}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-tertiary-fixed-dim"
                          initial={{ width: 0 }}
                          animate={{ width: `${(active.abv / 10) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between font-label-md text-on-surface mb-1">
                        <span>Bitterness (IBU)</span>
                        <span>{active.ibu}</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(active.ibu / 80) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })() : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full text-on-surface-variant font-body-sm italic"
                >
                  Hover over a glass to see its details.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
