import React from 'react';

const Brands = () => {
  const brands = [
    { name: 'Tata Power Solar', type: 'Premium Tier-1' },
    { name: 'Waaree Solar', type: 'India\'s Largest' },
    { name: 'Adani Solar', type: 'Adani Green' },
    { name: 'Vikram Solar', type: 'Global Quality' },
    { name: 'Loom Solar', type: 'Mono PERC Specialist' },
    { name: 'Goldi Solar', type: 'High Efficiency' },
    { name: 'REC Group', type: 'European Standard' },
    { name: 'Havells Solar', type: 'Trusted Brand' },
  ];

  return (
    <section className="py-10 bg-slate-900 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
          Authorized Installation Partner for Tier-1 Brands
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-x-hidden w-full mask-gradient">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Marquee Content track */}
        <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-16 py-2">
          {/* First run */}
          {brands.map((brand, index) => (
            <div key={`brand-1-${index}`} className="flex flex-col items-center justify-center min-w-[150px] text-white">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-heading">
                {brand.name}
              </span>
              <span className="text-[10px] sm:text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                {brand.type}
              </span>
            </div>
          ))}
          {/* Second run to prevent gaps */}
          {brands.map((brand, index) => (
            <div key={`brand-2-${index}`} className="flex flex-col items-center justify-center min-w-[150px] text-white">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-heading">
                {brand.name}
              </span>
              <span className="text-[10px] sm:text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                {brand.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
