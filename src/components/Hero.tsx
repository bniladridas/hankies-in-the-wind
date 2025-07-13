import React from 'react';

const Hero = () => {
  return (
    <section className="bg-black text-white min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-16 w-full">
        <div className="grid grid-cols-2 gap-32 items-center">
          <div>
            <h1 className="text-3xl font-light leading-tight tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              Command line tools for developers with a dream
            </h1>
          </div>
          
          <div className="space-y-16">
            <div className="flex items-center justify-between opacity-0 animate-[fadeIn_1s_ease-out_1.0s_forwards] hover:opacity-30 transition-opacity duration-500">
              <span className="text-gray-600 font-light tracking-wide text-sm">2024</span>
              <span className="text-white font-light tracking-wide text-sm">Featured</span>
            </div>
            <div className="flex items-center justify-between opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards] hover:opacity-30 transition-opacity duration-500">
              <span className="text-gray-600 font-light tracking-wide text-sm">2023</span>
              <span className="text-white font-light tracking-wide text-sm">Popular</span>
            </div>
            <div className="flex items-center justify-between opacity-0 animate-[fadeIn_1s_ease-out_1.4s_forwards] hover:opacity-30 transition-opacity duration-500">
              <span className="text-gray-600 font-light tracking-wide text-sm">2022</span>
              <span className="text-white font-light tracking-wide text-sm">Essential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;