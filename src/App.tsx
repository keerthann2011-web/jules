import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { ReservationModal } from './components/ReservationModal';

// Mock imports for pages (will create in next step)
import Home from './pages/Home';
import Menu from './pages/Menu';

function App() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary">
      <CustomCursor />
      <Loader />

      <Header onReserveClick={() => setIsModalOpen(true)} />

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageWrapper>
              <Home onReserveClick={() => setIsModalOpen(true)} />
            </PageWrapper>
          } />
          <Route path="/menu" element={
            <PageWrapper>
              <Menu />
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// Wave wipe transition
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <motion.main
        className="flex-grow w-full relative z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    );
  }

  return (
    <>
      <motion.main className="flex-grow w-full relative z-0">
        {children}
      </motion.main>

      {/* Wipe effect */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none bg-primary"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      />
    </>
  );
};

export default App;
