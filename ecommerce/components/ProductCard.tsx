'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, setQuickViewProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1, selectedColor);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Royal Pick':
        return 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-blue-400/40 shadow-sm';
      case 'Bestseller':
        return 'bg-amber-500 text-slate-950 font-black border-amber-300';
      case 'New':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'Limited Edition':
        return 'bg-slate-900 text-blue-300 border-blue-500/40';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-royal-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border shadow-sm ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 w-fit">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Top Right Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/85 text-slate-600 hover:text-rose-600 hover:bg-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-full bg-white/85 hover:bg-white text-slate-600 hover:text-blue-600 backdrop-blur-md transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-200"
            title="Quick Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content / Specs */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-2">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-blue-700 text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-base leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Swatches if present */}
          {product.colors && product.colors.length > 0 && (
            <div className="pt-1 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] text-slate-400 mr-1">Colors:</span>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-blue-600 ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pricing and Add To Cart Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 font-mono">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">In Stock & Ready</span>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-royal-sm'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

