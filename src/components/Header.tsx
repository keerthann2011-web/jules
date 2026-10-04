import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onReserveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update blur state
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'Visit', path: '/#visit' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div
        className={clsx(
          'w-full transition-all duration-300',
          isScrolled ? 'bg-surface-container-lowest/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50">
            {/* Using text logo as placeholder. You can replace this with an actual SVG/img */}
            <span className={clsx("font-display-hero text-2xl font-bold tracking-tight", isScrolled ? "text-on-surface" : "text-on-surface lg:text-surface-container-lowest")}>
              Oasis Brewery
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "font-title-md text-sm font-semibold tracking-wide uppercase transition-colors",
                  isScrolled ? "text-on-surface hover:text-primary" : "text-surface-container-lowest hover:text-primary-fixed"
                )}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="tel:08045888939"
              className={clsx(
                "font-title-md text-sm font-semibold tracking-wide uppercase flex items-center gap-1",
                isScrolled ? "text-on-surface hover:text-primary" : "text-surface-container-lowest hover:text-primary-fixed"
              )}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              080 4588 8939
            </a>

            <button
              onClick={onReserveClick}
              className={clsx(
                "px-6 py-2.5 rounded-lg font-title-md font-semibold transition-all shadow-md relative overflow-hidden group",
                isScrolled ? "bg-primary text-on-primary hover:bg-primary-container" : "bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim"
              )}
            >
              <span className="relative z-10">Reserve a table</span>
              {/* Liquid fill hover effect */}
              <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 p-2 text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface-container-lowest pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-headline-md text-2xl text-on-surface border-b border-outline-variant/30 pb-4"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="mt-4 px-6 py-4 rounded-xl bg-primary text-on-primary font-title-lg font-semibold w-full text-center"
              >
                Reserve a table
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
