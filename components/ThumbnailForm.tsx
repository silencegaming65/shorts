
import React, { useState, useRef } from 'react';

interface ThumbnailFormProps {
  onGenerate: (title: string, photo: string) => void;
  isLoading: boolean;
}

const ThumbnailForm: React.FC<ThumbnailFormProps> = ({ onGenerate, isLoading }) => {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && photo) {
      onGenerate(title, photo);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-slate-700/50 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">
              Video Title
            </label>
            <span className="text-[10px] text-slate-500 font-medium">MAX 5 WORDS RECOMMENDED</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 5 SECRETS TO VIRAL VIDEOS"
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-2xl px-5 py-4 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600 shadow-inner"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">
            Your Creator Portrait
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative h-72 w-full bg-slate-900/40 border-2 border-dashed border-slate-700/80 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400/50 hover:bg-slate-900/60 transition-all overflow-hidden group"
          >
            {photo ? (
              <>
                <img src={photo} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold text-white border border-white/20">Change Photo</span>
                </div>
              </>
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-300 font-bold text-lg">Click to upload headshot</p>
                  <p className="text-slate-500 text-sm mt-1">Upload a clear photo of your face & shoulders</p>
                </div>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !title || !photo}
          className="group relative w-full bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-blue-900/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-xl uppercase tracking-[0.2em]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mastering Your Pose...
            </span>
          ) : (
            <>
              Generate Thumbnail
              <div className="absolute inset-0 rounded-[1.5rem] bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ThumbnailForm;
