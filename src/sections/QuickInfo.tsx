import React from 'react';
import { WaveDivider } from '../motion/WaveDivider';

export const QuickInfo: React.FC = () => {
  return (
    <section className="bg-surface-container-lowest relative pb-space-2xl">
      {/* We assume the section above this ended straight, so we start with a wave if needed, or just keep it simple. */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">sports_bar</span>
            </div>
            <h3 className="font-title-lg text-on-surface mb-2">Fresh Pours</h3>
            <p className="font-body-md text-on-surface-variant">Small-batch craft beers brewed right here, flowing from 8 signature taps.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border-y md:border-y-0 md:border-x border-outline-variant/30">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">local_pizza</span>
            </div>
            <h3 className="font-title-lg text-on-surface mb-2">Wood-Fired & Clay Oven</h3>
            <p className="font-body-md text-on-surface-variant">Artisanal pizzas and curated Indian plates designed to pair perfectly.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-[32px]">deck</span>
            </div>
            <h3 className="font-title-lg text-on-surface mb-2">Poolside Courtyard</h3>
            <p className="font-body-md text-on-surface-variant">Relax under the canopy with our signature botanical ambiance.</p>
          </div>

        </div>
      </div>

      {/* Wave going into the next darker section */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[1px]">
        <WaveDivider fill="#2f3820" />
      </div>
    </section>
  );
};
