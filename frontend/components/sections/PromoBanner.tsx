import React from 'react';

const colors = {
  primary: '#facc15',
  secondary: '#1f2937',
  text: '#ffffff',
};

export default function PromoBanner() {
  return (
    <section className="my-12 max-w-7xl mx-auto px-4">
      <div
        className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="mb-6 md:mb-0">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ backgroundColor: colors.primary, color: colors.secondary }}
          >
            LIMITED TIME
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 italic">
            SPRING POWER SALE
          </h2>
          <p className="text-gray-400 max-w-md">
            Trade in your old car battery and get up to{' '}
            <span className="text-white font-bold">$30 off</span> your new purchase.
          </p>
        </div>
        <button
          className="px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: colors.primary, color: colors.secondary }}
        >
          GET DISCOUNT NOW
        </button>
      </div>
    </section>
  );
}
