import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Futuristic Monogram */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-mono text-2xl font-bold shadow-2xl shadow-purple-600/40 border border-purple-400/30 animate-pulse">
          AG
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-purple-500/30 animate-[spin_8s_linear_infinite]" />
      </div>

      {/* Identity Label */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-white tracking-wider">
          ALRIN ANTONY GONSALVEZ
        </h2>
        <p className="text-xs font-mono text-purple-400 tracking-widest mt-1">
          SOFTWARE ENGINEER // PORTFOLIO
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 max-w-[80vw]">
        <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-2">
          <span>INITIALIZING</span>
          <span className="text-purple-300">{Math.min(100, progress)}%</span>
        </div>
        <div className="w-full bg-[#181528] h-1.5 rounded-full overflow-hidden border border-purple-500/20">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-150 shadow-[0_0_10px_#a855f7]"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

