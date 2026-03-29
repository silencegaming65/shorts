
import React, { useState } from 'react';
import Header from './components/Header';
import ThumbnailForm from './components/ThumbnailForm';
import ResultView from './components/ResultView';
import { generateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleGenerate = async (title: string, photo: string) => {
    setLoading(true);
    setError(null);
    try {
      const generatedUrl = await generateThumbnail(title, photo);
      setResultImage(generatedUrl);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate thumbnail. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <main className="mt-8 flex justify-center">
          {error && (
            <div className="w-full max-w-2xl mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-center animate-bounce">
              {error}
            </div>
          )}

          {!resultImage ? (
            <ThumbnailForm onGenerate={handleGenerate} isLoading={loading} />
          ) : (
            <ResultView imageUrl={resultImage} onReset={handleReset} />
          )}
        </main>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} AI Thumbnail Maker — Designed for YouTube Creators</p>
          <div className="mt-4 flex justify-center gap-6 opacity-50">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Powered by Gemini 2.5 Flash
            </span>
            <span>Vertical 9:16 Optimized</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
