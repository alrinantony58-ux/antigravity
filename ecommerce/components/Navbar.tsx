'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3);

  const categories = [
    { label: 'All Creations', id: 'All' },
    { label: 'Timepieces', id: 'Timepieces' },
    { label: 'Audio & Acoustics', id: 'Audio' },
    { label: 'Luxury Tech', id: 'Tech' },
    { label: 'Apparel', id: 'Apparel' },
    { label: 'Accessories', id: 'Accessories' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-blue-900/40 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Curated Autumn/Winter Atelier Collection Now Available</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-3 text-slate-300">
            <span>Complimentary Express Shipping on orders over $150</span>
            <span className="hidden md:inline text-blue-400 font-mono font-medium px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60">
              CODE: ROYAL20
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
              USD ($) <ChevronDown className="w-3 h-3" />
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">Concierge</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo with Royal Crown Monogram */}
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setSelectedCategory('All')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-royal-sm text-white font-serif font-black tracking-wider text-xl transform hover:rotate-3 transition-transform">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans flex items-center gap-1.5">
                  ROYAL <span className="text-blue-700 font-black">COBALT</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-blue-600 font-bold -mt-1">
                  Atelier & Maison
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm font-semibold border border-blue-200/60'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Search Input & Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block w-48 lg:w-64">
                <input
                  type="text"
                  placeholder="Search masterpieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                type="button"
                onClick={() => setWishlistCount(wishlistCount + 1)}
                className="relative p-2.5 rounded-full text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white shadow-royal-sm hover:shadow-royal-md transition-all active:scale-95 group"
                aria-label="View Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-blue-700 animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold tracking-wide uppercase">
                  Cart ({totalItems})
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Row */}
          <div className="pb-3 md:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fade-in">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold px-3 py-1">
              Select Category
            </p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

