import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-5xl mx-auto px-16">
        <div className="flex items-center justify-between">
          <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.2s_forwards] hover:opacity-30 transition-opacity duration-500">
            2025
          </div>
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.4s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-4 text-center sm:text-left">
          @bniladridas · i write in my personal macbook air · i am a member of the mlx community in hugging face and contributor at google gemini (part-time on github) · i recently became a perplexity ai business fellow
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.6s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          how does this ai work? when the gemini quota ends, you can add your own api key to continue using deepmind's gemini model.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_3.8s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          animation inspired by “what if it was weightless” from https://www.thewayofcode.com/ and anthropic artifacts.
        </div>
        <div className="text-gray-600 font-light tracking-wide text-sm opacity-0 animate-[fadeIn_1s_ease-out_4.0s_forwards] hover:opacity-30 transition-opacity duration-500 lowercase mt-2 text-center sm:text-left">
          my accounts on the internet can be found with the username @bniladridas
        </div>
      </div>
    </footer>
  );
};

export default Footer;