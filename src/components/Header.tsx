import React from 'react';

const Header = () => {
  return (
    <header className="bg-black">
      <div className="max-w-5xl mx-auto px-16">
        <div className="flex items-center justify-between h-16">
          <div className="text-white text-sm font-light tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
            CLI
          </div>
          <div className="text-gray-600 text-sm font-light tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            TOOLS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;