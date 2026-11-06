'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Shield, Compass, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-blue-900/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Manifesto Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-blue-500/20 rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Royal Gazette</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white">
                Receive Private Invitations to Limited Editions
              </h3>
              <p className="text-sm text-slate-300 max-w-xl font-light">
                Subscribers receive first access to serialized timepiece runs, private atelier previews, and exclusive editorial essays.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-blue-900/40 border border-blue-500/40 text-blue-200 text-xs font-semibold text-center">
                  ✨ Welcome to the Royal Circle. Your inaugural invitation has been dispatched.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your private email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs bg-slate-900/80 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-royal-sm"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-serif font-black text-lg shadow-royal-sm">
                R
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white font-sans block">
                  ROYAL <span className="text-blue-400">COBALT</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-blue-400 font-bold -mt-1 block">
                  Maison & Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to the art of timeless design, pure royal cobalt hues, and masterwork engineering across horology, acoustic gear, and modern accessories.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Creations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#catalog" className="hover:text-blue-400 transition-colors">Automatic Chronographs</a></li>
              <li><a href="#catalog" className="hover:text-blue-400 transition-colors">Acoustic Audio Systems</a></li>
              <li><a href="#catalog" className="hover:text-blue-400 transition-colors">Precision Titanium Tech</a></li>
              <li><a href="#catalog" className="hover:text-blue-400 transition-colors">Royal Cashmere Apparel</a></li>
              <li><a href="#catalog" className="hover:text-blue-400 transition-colors">Full-Grain Leather Folios</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">Our Design Philosophy</a></li>
              <li><a href="#warranty" className="hover:text-blue-400 transition-colors">3-Year Atelier Warranty</a></li>
              <li><a href="#sustainability" className="hover:text-blue-400 transition-colors">Carbon Neutral Craft</a></li>
              <li><a href="#concierge" className="hover:text-blue-400 transition-colors">Private Concierge</a></li>
              <li><a href="#press" className="hover:text-blue-400 transition-colors">Press & Media</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#shipping" className="hover:text-blue-400 transition-colors">Complimentary Express Shipping</a></li>
              <li><a href="#returns" className="hover:text-blue-400 transition-colors">30-Day Courtesy Returns</a></li>
              <li><a href="#track" className="hover:text-blue-400 transition-colors">Track Consignment</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact Atelier</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ROYAL COBALT MAISON INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Sovereign Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

