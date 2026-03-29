
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-900/30 border border-blue-500/50 rounded-full">
        Powered by Gemini 2.5
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Thumbnail</span> Maker
      </h1>
      <p className="max-w-xl mx-auto text-slate-400 text-lg">
        Upload your photo, enter your title, and let our AI craft a scroll-stopping 9:16 vertical thumbnail for your next viral Short.
      </p>
    </header>
  );
};

export default Header;
