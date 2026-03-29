
import React from 'react';

interface ResultViewProps {
  imageUrl: string;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ imageUrl, onReset }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `shorts-thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Thumbnail Preview Container */}
        <div className="relative group perspective-1000">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-1000"></div>
          
          <div className="relative bg-slate-950 border-[6px] border-slate-800 rounded-[2.5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] aspect-[9/16] w-full max-w-[340px] mx-auto transition-transform duration-700 hover:scale-[1.02]">
            <img src={imageUrl} alt="Generated High-Quality Thumbnail" className="w-full h-full object-cover" />
            
            {/* Overlay indicators for Shorts UI */}
            <div className="absolute bottom-10 right-4 flex flex-col gap-4 items-center opacity-40">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md"></div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md"></div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md"></div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Vertical 1080x1920 HD</span>
          </div>
        </div>

        {/* Controls & Feedback */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white leading-tight">
              Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Viral Success.</span>
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              We've analyzed your title to generate a perfect matching pose and high-contrast typography. The anatomy is refined for a pro creator look.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={downloadImage}
              className="group relative w-full bg-white text-slate-950 font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-2xl shadow-white/10"
            >
              <svg className="w-6 h-6 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD PNG
            </button>
            
            <button
              onClick={onReset}
              className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-bold py-5 rounded-[1.5rem] border border-slate-700/50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              NEW THUMBNAIL
            </button>
          </div>
          
          <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-2xl flex gap-4">
            <div className="text-blue-400 text-2xl">💡</div>
            <p className="text-sm text-slate-400 italic font-medium">
              Did you know? Thumbnails with matching expressions and pointing gestures see up to <span className="text-blue-400 font-bold">2.4x higher CTR</span> on the Shorts shelf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
