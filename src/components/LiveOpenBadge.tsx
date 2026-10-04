import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';

// TODO: Confirm actual opening time with owner. Using 12:00 PM for now.
const CONFIG = {
  openingTime: 12, // 12:00 PM
  closingTime: 1, // 1:00 AM (next day)
};

export const LiveOpenBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      // Get current time in Asia/Kolkata
      const now = new Date();
      const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const istDate = new Date(istString);
      const hours = istDate.getHours();

      // Open if:
      // - 12 PM (12) to Midnight (23) OR
      // - Midnight (0) to 1 AM (0) -> meaning hour === 0

      const isCurrentlyOpen = (hours >= CONFIG.openingTime && hours <= 23) || (hours === 0);
      setIsOpen(isCurrentlyOpen);
    };

    checkStatus();
    // Recheck every minute
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-sm",
        isOpen ? "bg-primary-fixed/90 border-primary-fixed-dim" : "bg-surface-variant/90 border-outline-variant"
      )}
      aria-live="polite"
    >
      <div className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        )}
        <span className={clsx(
          "relative inline-flex rounded-full h-2.5 w-2.5",
          isOpen ? "bg-primary" : "bg-outline"
        )}></span>
      </div>
      <span className={clsx(
        "font-label-md uppercase tracking-wider",
        isOpen ? "text-on-primary-fixed" : "text-on-surface-variant"
      )}>
        {isOpen ? "Open now · closes 1 am" : "Closed · opens at 12 pm"}
      </span>
    </div>
  );
};
