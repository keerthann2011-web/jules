import { useEffect } from "react";
import { Hero } from '../sections/Hero';
import { QuickInfo } from '../sections/QuickInfo';
import { AboutStory } from '../sections/AboutStory';
import { BeerPourScene } from '../sections/BeerPourScene';
import { FlightExplorer } from '../sections/FlightExplorer';
import { ReviewsCarousel } from '../sections/ReviewsCarousel';
import { LiveOpenBadge } from '../components/LiveOpenBadge';

interface HomeProps {
  onReserveClick: () => void;
}

export default function Home({ onReserveClick }: HomeProps) {
  useEffect(() => {
    // Scroll to hash if present
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full">
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <LiveOpenBadge />
      </div>

      <Hero onReserveClick={onReserveClick} />
      <QuickInfo />
      <AboutStory />
      <BeerPourScene />
      <FlightExplorer />
      <ReviewsCarousel />

      {/* Visit / Directions section matching mockup */}
      <section id="visit" className="py-space-2xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-surface-container rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="space-y-6 max-w-md">
              <h2 className="font-headline-lg text-on-surface">Find Your Oasis</h2>
              <p className="font-body-lg text-on-surface-variant">
                Sy No. 26, Plot No 1A & 2B, Whitefield Main Road, Devasandra Industrial Estate, Bengaluru
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://maps.google.com/?q=Oasis+Brewery+Whitefield+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-primary text-on-primary font-title-md text-center hover:bg-primary-container transition-colors shadow-md"
                >
                  Get Directions
                </a>
                <a
                  href="tel:08045888939"
                  className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-title-md text-center hover:bg-surface-variant transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 aspect-video bg-surface-variant rounded-xl overflow-hidden relative">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL0AuNvMX77puTsr1EUaORxk3bc33GrzaLwfO8JM9WxgLbr0m5DsvNtlnR7py_oTbv452FNCOiDF4HOXz326LT1GRIgqSfP59OJzgOkX4YB_t3L83QROw2r6Pbkxl18DdPW51YyvHB_wZcdCOIzqmJz4EOUq5-P5zBF4yIkHdy-yB9YHA-KthQS2FylRKGZNmunm4pGYhm9BUgF23gNwAZXak9jEeMR3BRRPABkGuH_TDlMyOhAcOLqg')" }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
