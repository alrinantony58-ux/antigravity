'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/products';
import { SortOption } from '@/types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  totalFiltered: number;
  totalProducts: number;
  onReset: () => void;
  isFiltered: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  totalFiltered,
  totalProducts,
  onReset,
  isFiltered,
}) => {
  return (
    <div className="bg-white border-b border-slate-200/90 py-5 sticky top-20 z-30 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-blue-700 text-white shadow-royal-sm ring-2 ring-blue-700/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Match Counter */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Filter Reset Button */}
            {isFiltered && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            {/* Results Count */}
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{totalFiltered}</span> of {totalProducts}
            </span>

            {/* Sort Selector Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium hidden sm:inline flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort products"
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

