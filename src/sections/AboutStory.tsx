import React from 'react';
import { Reveal } from '../motion/Reveal';

export const AboutStory: React.FC = () => {
  return (
    <section id="about" className="py-space-2xl bg-[#2f3820] text-inverse-on-surface relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <Reveal direction="right" className="space-y-6">
          <h2 className="font-headline-sm text-tertiary-fixed tracking-widest uppercase">Our Philosophy</h2>
          <h3 className="font-display-hero-mobile text-inverse-on-surface leading-tight">
            Crafted for the Palate, Designed for the Soul.
          </h3>
          <p className="font-body-lg text-inverse-on-surface/80">
            We believe a microbrewery should be more than just a taproom. It should be an oasis.
            Nestled in the bustling Devasandra Industrial Estate, our space marries the raw, tactile
            nature of craft brewing with the lush tranquility of a botanical garden.
          </p>
          <p className="font-body-md text-inverse-on-surface/70">
            From our master brewer's meticulous grain selection to the hand-cast ceramics on your table,
            every detail is chosen to slow down time. Whether you're sharing a Malai Chicken Tikka Platter
            or a flight of our latest seasonal experiments, you're experiencing our dedication to the craft.
          </p>
        </Reveal>

        <Reveal direction="left" className="relative h-[600px] rounded-t-[200px] rounded-b-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL0AuNvMX77puTsr1EUaORxk3bc33GrzaLwfO8JM9WxgLbr0m5DsvNtlnR7py_oTbv452FNCOiDF4HOXz326LT1GRIgqSfP59OJzgOkX4YB_t3L83QROw2r6Pbkxl18DdPW51YyvHB_wZcdCOIzqmJz4EOUq5-P5zBF4yIkHdy-yB9YHA-KthQS2FylRKGZNmunm4pGYhm9BUgF23gNwAZXak9jEeMR3BRRPABkGuH_TDlMyOhAcOLqg')" }}></div>
          <div className="absolute inset-0 bg-[#2f3820]/20 mix-blend-multiply"></div>
        </Reveal>

      </div>
    </section>
  );
};
