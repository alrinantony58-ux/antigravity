'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white py-16 lg:py-24 border-b border-blue-900/50">
      {/* Decorative ambient radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Winter 2026 Sovereign Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans leading-tight">
              Artisanship in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">
                Royal Cobalt Blue
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Engineered with uncompromising precision. Discover our signature collection of luxury 
              automatic timepieces, spatial acoustic systems, and bespoke everyday gear.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-royal-lg hover:shadow-royal-md transition-all flex items-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#catalog"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm backdrop-blur-sm transition-all"
              >
                View Lookbook
              </a>
            </div>

            {/* Micro stats / Trust indicators */}
            <div className="pt-8 border-t border-blue-900/40 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-white font-mono">100%</p>
                <p className="text-xs text-blue-300 font-medium uppercase tracking-wider">Certified Swiss & Titan</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-400 font-mono">4.9 / 5</p>
                <p className="text-xs text-blue-300 font-medium uppercase tracking-wider">Verified Global Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-400 font-mono">3-Year</p>
                <p className="text-xs text-blue-300 font-medium uppercase tracking-wider">Atelier Warranty</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Feature Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Outer decorative card frame with royal blue glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-5 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                    alt="Cobalt Horizon Automatic Chronograph"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-blue-700/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-400/30">
                    Flagship Timepiece
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                      Mechanical Series 01
                    </span>
                    <span className="text-xs font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                      Limited Run: 500 pcs
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Cobalt Horizon Automatic Chronograph
                  </h3>
                  <div className="flex items-baseline justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">$489</span>
                      <span className="text-sm text-slate-400 line-through">$599</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded">
                      Save $110
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-blue-900/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-blue-200">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Complimentary Global Courier</span>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Authenticity Guarantee</span>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span>30-Day Royal Courtesy Returns</span>
          </div>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Handcrafted Luxury Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

