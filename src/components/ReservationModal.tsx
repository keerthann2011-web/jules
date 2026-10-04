import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [partySize, setPartySize] = useState(2);
  const [isSuccess, setIsSuccess] = useState(false);

  // Focus trap & scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form after closing
      setTimeout(() => setIsSuccess(false), 500);
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // TODO: Wire up actual reservego.co booking link integration later
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
              <h2 id="modal-title" className="font-headline-sm text-on-surface">Reserve a Table</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface hover:bg-outline-variant transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block font-label-md text-on-surface-variant mb-2">Party Size</label>
                      <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))} className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center hover:bg-outline-variant">
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className="w-16 h-16 rounded-xl bg-surface-container-high flex flex-col items-center justify-center overflow-hidden">
                          {/* Slot counter effect */}
                          <motion.span
                            key={partySize}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="font-headline-md text-primary"
                          >
                            {partySize}
                          </motion.span>
                        </div>
                        <button type="button" onClick={() => setPartySize(Math.min(20, partySize + 1))} className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center hover:bg-outline-variant">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-md text-on-surface-variant mb-2">Date</label>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                        {['Today', 'Tomorrow', 'Fri, 24th'].map((d, i) => (
                          <button key={i} type="button" className={`snap-start whitespace-nowrap px-6 py-3 rounded-xl border ${i === 0 ? 'bg-primary border-primary text-on-primary' : 'bg-transparent border-outline-variant text-on-surface hover:bg-surface-variant'}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-md text-on-surface-variant mb-2">Time (closes at 1am)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['19:00', '19:30', '20:00', '20:30'].map((t, i) => (
                          <button key={i} type="button" className={`py-3 rounded-xl border ${i === 0 ? 'bg-primary border-primary text-on-primary relative' : 'bg-transparent border-outline-variant text-on-surface hover:bg-surface-variant'}`}>
                            {i === 0 && <motion.div layoutId="time-highlight" className="absolute inset-0 border-2 border-primary rounded-xl" />}
                            <span className="relative z-10">{t}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30">
                      <button type="submit" className="w-full py-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-title-lg shadow-md hover:bg-tertiary-fixed-dim transition-colors">
                        Confirm Reservation
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 relative">
                      {/* Animated checkmark */}
                      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path
                          d="M20 6L9 17l-5-5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        />
                      </svg>
                      {/* Confetti bubbles/leaves simulation */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1.2], opacity: [1, 0] }}
                        transition={{ duration: 1 }}
                        className="absolute inset-[-20px] border-4 border-tertiary-fixed rounded-full"
                      />
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-2">Table Confirmed</h3>
                    <p className="font-body-md text-on-surface-variant mb-6">
                      We've reserved your table for {partySize}. We look forward to hosting you!
                    </p>
                    <button onClick={onClose} className="px-8 py-3 rounded-xl bg-surface-variant text-on-surface hover:bg-outline-variant font-title-md transition-colors">
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
