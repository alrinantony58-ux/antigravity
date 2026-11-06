'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { SearchX, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 font-sans">
          No Creations Found
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          We couldn't find any masterworks matching your selected filters. Try searching for something else or reset your criteria.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold tracking-wide uppercase shadow-royal-sm transition-all"
        >
          View All Creations
        </button>
      </div>
    );
  }

  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

